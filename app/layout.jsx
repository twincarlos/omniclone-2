import "./globals.css";
import Script from "next/script";
import { Inter } from "next/font/google";
import Logo from "./components/Logo/Logo";
import Menu from "./components/Menu/Menu";
import Modal from "./components/Modal/Modal";
import ModalProvider from "./context/ModalContext";
import { Analytics } from "@vercel/analytics/react";
import PlayerProvider from "./context/PlayerContext";
import FavTournamentsProvider from "./context/FavTournamentsContext";
import RatingCalculatorProvider from "./context/RatingCalculatorContext";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "OMNICLONE",
  description: "All USATT and OmniPong data in one portal.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PlayerProvider>
          <ModalProvider>
            <RatingCalculatorProvider>
              <FavTournamentsProvider>
                <Script src="https://kit.fontawesome.com/09c2dac4bc.js" crossOrigin="anonymous" />
                <Modal />
                <Logo />
                <Menu />
                {children}
                <Analytics />
              </FavTournamentsProvider>
            </RatingCalculatorProvider>
          </ModalProvider>
        </PlayerProvider>
      </body>
    </html>
  );
};