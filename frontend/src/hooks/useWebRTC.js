import { useEffect, useRef, useCallback } from "react";
import SimplePeer from "simple-peer";
import { getSocket } from "./useSocket";

const getIceServers = () => {
    const servers = [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
    ];

    // Add TURN servers for NAT traversal across different networks
    const turnUrl = import.meta.env.VITE_TURN_URL;
    if (turnUrl) {
        servers.push({
            urls: turnUrl,
            username: import.meta.env.VITE_TURN_USERNAME || "",
            credential: import.meta.env.VITE_TURN_CREDENTIAL || "",
        });
    }

    // Support multiple TURN servers (VITE_TURN_URL_2, etc.)
    const turnUrl2 = import.meta.env.VITE_TURN_URL_2;
    if (turnUrl2) {
        servers.push({
            urls: turnUrl2,
            username: import.meta.env.VITE_TURN_USERNAME || "",
            credential: import.meta.env.VITE_TURN_CREDENTIAL || "",
        });
    }

    return { iceServers: servers };
};

/**
 * useWebRTC hook
 * Manages the entire WebRTC peer lifecycle via simple-peer.
 *
 * @param {object} params
 * @param {string|null} params.roomId       - Current room ID (null when not matched)
 * @param {boolean}     params.isInitiator  - Whether this peer creates the offer
 * @param {MediaStream|null} params.localStream - Local camera+mic stream
 * @param {function}    params.onRemoteStream - Called with remote MediaStream
 * @param {function}    params.onError       - Called with error string
 */
export function useWebRTC({ roomId, isInitiator, localStream, onRemoteStream, onError }) {
    const peerRef = useRef(null);
    const streamRef = useRef(localStream);
    const socket = getSocket();

    const destroyPeer = useCallback(() => {
        if (peerRef.current) {
            peerRef.current.destroy();
            peerRef.current = null;
        }
    }, []);

    // ── Keep track of localStream to avoid remounting the peer ────────────────
    useEffect(() => {
        if (peerRef.current && !peerRef.current.destroyed && localStream && streamRef.current !== localStream) {
            if (!streamRef.current) {
                // If stream was null when peer was created, add it now
                try {
                    peerRef.current.addStream(localStream);
                } catch (e) {
                    console.error("Failed to add stream", e);
                }
            } else {
                // Replace or add individual tracks
                localStream.getTracks().forEach(newTrack => {
                    const oldTrack = streamRef.current.getTracks().find(t => t.kind === newTrack.kind)
                    if (oldTrack) {
                        try {
                            peerRef.current.replaceTrack(oldTrack, newTrack, streamRef.current)
                        } catch (e) {
                            console.error("Failed to replace track", e)
                        }
                    } else {
                        try {
                            peerRef.current.addTrack(newTrack, localStream)
                        } catch (e) {
                            console.error("Failed to add track", e)
                        }
                    }
                })
            }
            streamRef.current = localStream;
        } else if (!peerRef.current) {
            streamRef.current = localStream;
        }
    }, [localStream]);

    // ── Create peer only when room changes ────────────────────────────────────
    useEffect(() => {
        if (!roomId) return;
        destroyPeer();

        try {
            const peer = new SimplePeer({
                initiator: isInitiator,
                stream: streamRef.current,
                trickle: true,
                config: getIceServers(),
                offerOptions: {
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true,
                },
            });

            peer.on("signal", (signal) => {
                socket.emit("webrtc_signal", { roomId, signal });
            });

            peer.on("stream", (remoteStream) => {
                onRemoteStream(remoteStream);
            });

            peer.on("error", (err) => {
                console.error("[WebRTC] Peer error:", err.message);
                onError("WebRTC connection failed. Falling back to text-only mode.");
            });

            peerRef.current = peer;
        } catch (err) {
            console.error("[WebRTC] Failed to create peer:", err);
            onError("WebRTC setup failed. Text chat still available.");
        }

        return () => destroyPeer();
    }, [roomId, isInitiator, destroyPeer, onError, onRemoteStream, socket]);

    useEffect(() => {
        const handleSignal = ({ signal }) => {
            if (peerRef.current && !peerRef.current.destroyed) {
                try {
                    peerRef.current.signal(signal);
                } catch (err) {
                    console.error("[WebRTC] Signal error:", err.message);
                }
            }
        };

        socket.on("webrtc_signal", handleSignal);
        return () => socket.off("webrtc_signal", handleSignal);
    }, [socket]);

    return { destroyPeer };
}
