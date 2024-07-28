import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <section>
        <div className="home_content">
          <h1>Choose how you wanna play?</h1>
          <div className="home_buttons">
            <Link href="/vs-bot">
              <div className="bot_option">
                <Image
                  src="/robot.png"
                  width={100}
                  height={100}
                  alt="robot image"
                />
                <p>V/S BOT</p>
              </div>
            </Link>
            <Link href="/vs-human">
              <div className="player_option">
                <Image
                  src="/acc.png"
                  width={100}
                  height={100}
                  alt="robot image"
                />
                <p>MULTIPLAYER</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
