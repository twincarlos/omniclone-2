import "./globals.css";
import Script from "next/script";
import Menu from "./components/Menu/Menu";
import Modal from "./components/Modal/Modal";
import ModalProvider from "./context/ModalContext";
import PlayerProvider from "./context/PlayerContext";

export const metadata = {
  title: "Omniclone",
  description: "All USATT and OmniPong data in one portal.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PlayerProvider>
          <ModalProvider>
            <Script src="https://kit.fontawesome.com/09c2dac4bc.js" crossOrigin="anonymous" />
            <Modal />
            <Menu />
            {children}
          </ModalProvider>
        </PlayerProvider>
      </body>
    </html>
  );
};