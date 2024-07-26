import "./style.css";
export const metadata = {
  title: "Tic-Tac-Toe",
  description: "Play Tic-Tac-Toe with AI now !!!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
