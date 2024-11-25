"use client";
import "./Menu.css";
import PlayerWidget from "../PlayerWidget/PlayerWidget";
import { useState } from "react";
import Link from "next/link";
import List from "../List/List";

export default function Menu() {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <main className="menu margin-x2">
            <div className="menu-details">
                <PlayerWidget />
            </div>
            <div className="menu-dropdown">
                <button className="show-menu-button" onClick={() => setShowMenu(!showMenu)}>
                    <i className="fa-solid fa-bars" />
                </button>
                {
                    showMenu && (
                        <List>
                            <Link onClick={() => setShowMenu(false)} className="padding" href="/rating-calculator">Rating calculator <i className="fa-solid fa-square-root-variable" /></Link>
                            <Link onClick={() => setShowMenu(false)} className="padding" href="/head-to-head">Head to head <i className="fa-solid fa-scale-unbalanced-flip" /></Link>
                        </List>
                    )
                }
            </div>
        </main >
    );
};