"use client";
import "./Modal.css";
import { useModal } from "@/app/context/ModalContext";

export default function Modal() {
    const { content, setContent } = useModal();
    if (!content) return null;
    return (
        <div className="modal-overlay">
            <div className="margin-x2 padding-x2 modal-content">
                <button onClick={() => setContent(null)}>Close</button>
                {content}
            </div>
        </div>
    );
};