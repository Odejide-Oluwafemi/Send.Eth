import "./styles/app.css";
import { NavBar } from "./components/NavBar";
import ConnectWallet from "./components/ConnectWallet";
import Logo from "./components/Logo";

const App = () => {
  return (
    <>
      <header>
        <Logo/>
        <NavBar />
        <ConnectWallet/>
      </header>
    </>
  );
};

export default App;
