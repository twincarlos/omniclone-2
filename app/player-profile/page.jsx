"use client";
import { redirect } from "next/navigation";
import { useModal } from "../context/ModalContext";
import PlayerLookup from "../components/PlayerLookup/PlayerLookup";

export default function SelectPlayerProfile() {
    const { setContent } = useModal();
    return (
        <main>
            <button onClick={() => setContent(<PlayerLookup onClick={player => {
                setContent(null);
                redirect(`/player-profile/${player.id}`);
            }} />)} className="primary">
                <i className="fa-regular fa-user" /> Lookup player
            </button>
        </main>
    );
};