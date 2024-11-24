"use client";
import "./Menu.css";
import { useModal } from "@/app/context/ModalContext";
import { usePlayer } from "@/app/context/PlayerContext";
import PlayerLookup from "../PlayerLookup/PlayerLookup";

export default function Menu() {
    const { setContent } = useModal();
    const { savePlayerId } = usePlayer();
    return (
        <main className="menu">
            <div className="menu-details">
                <button onClick={() => {
                    setContent(<PlayerLookup onClick={player => savePlayerId(player.id)} />);
                }}>
                    <i className="fa-solid fa-link" /> Sync USATT
                </button>
            </div>
            <button>
                <i className="fa-solid fa-bars" />
            </button>
        </main >
    );
};