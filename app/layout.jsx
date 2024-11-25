import "./globals.css";
import Script from "next/script";
import Logo from "./components/Logo/Logo";
import Menu from "./components/Menu/Menu";
import Modal from "./components/Modal/Modal";
import ModalProvider from "./context/ModalContext";
import PlayerProvider from "./context/PlayerContext";
import RatingCalculatorProvider from "./context/RatingCalculatorContext";

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
            <RatingCalculatorProvider>
              <Script src="https://kit.fontawesome.com/09c2dac4bc.js" crossOrigin="anonymous" />
              <Modal />
              <Logo />
              <Menu />
              {children}
            </RatingCalculatorProvider>
          </ModalProvider>
        </PlayerProvider>
      </body>
    </html>
  );
};