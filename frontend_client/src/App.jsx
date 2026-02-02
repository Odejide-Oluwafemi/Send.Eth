import "./styles/app.css";
import { NavBar, Logo, ConnectWallet } from "./components";

const App = () => {
  return (
    <>
      <header>
        <Logo />
        <NavBar />
        <ConnectWallet connectWallet={() => {}} />
      </header>

      <main>
        <section id="hero-section">
          <div className="hero-left-container">
            <h1>
              Send ETH{" "}
              <span className="text-orangeAccent font-bungee">safely</span> to
              any wallet{" "}
              <span className="text-orangeAccent font-bungee">instantly</span>
            </h1>
            <button className="secondary-btn">Try it out now</button>
          </div>

          <div className="hero-right-container">
            <img src="vite.svg" />
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
