import Image from "next/image";

export default function Header() {
  return (
    <header className="header">
      <Image
        src="/logo.png"
        priority
        width={200}
        height={50}
        alt="Tic Tac Toe"
      />
    </header>
  );
}
