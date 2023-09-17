import "@pages/newtab/Newtab.css";
import withSuspense from "@src/shared/hoc/withSuspense";
import WalletOnboarding from "@root/src/components/Onboarding/WalletOnboarding";
import { Router } from 'react-chrome-extension-router';
import logo from "@assets/img/logo.svg";

const Newtab = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Lambda Wallet</h2>
        <br></br>
        <Router>
          <WalletOnboarding />
        </Router>
      </header>
    </div>
  );
};

export default withSuspense(Newtab);
