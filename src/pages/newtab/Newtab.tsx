import "@pages/newtab/Newtab.css";
import withSuspense from "@src/shared/hoc/withSuspense";
import WalletOnboarding from "@root/src/components/Onboarding/WalletOnboarding";
import { Router } from 'react-chrome-extension-router';

const Newtab = () => {
  return (
    <div className="App">
        <Router>
          <WalletOnboarding />
        </Router>
    </div>
  );
};

export default withSuspense(Newtab);
