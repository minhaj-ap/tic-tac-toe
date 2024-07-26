import Image from "next/image";
export default function Home() {
  return (
    <main>
      <header className="header">
        <Image
          src="/logo.png"
          priority
          width={200}
          height={50}
          alt="Tic Tac Toe"
        />
      </header>
      <section>
        <div className="home_content">
          <h1>Choose how you wanna play?</h1>
          <div className="home_buttons">
            <div className="bot_option">
              <Image
                src="/robot.png"
                width={100}
                height={100}
                alt="robot image"
              />
              <p>V/S BOT</p>
            </div>
            <div className="player_option">
            <Image
                src="/acc.png"
                width={100}
                height={100}
                alt="robot image"
              />
              <p>MULTIPLAYER</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
