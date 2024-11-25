import "./Logo.css";
import Link from "next/link";

export default function Logo() {
    return (
        <Link className="margin-top-bottom logo" href="/">
            Omniclone
        </Link>
    );
};