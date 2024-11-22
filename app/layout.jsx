import "./globals.css";

export const metadata = {
  title: "Omniclone",
  description: "All USATT and OmniPong data in one portal.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
