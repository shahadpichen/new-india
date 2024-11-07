import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Petitions from "./pages/petitions";
import Home from "./pages/landing-page";
import SubmitPetition from "./pages/submit-petition";
import { Toaster } from "sonner";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";

function App() {
  return (
    <>
      <Toaster richColors position="bottom-right" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/petitions"
            element={<Navigate to="/petitions/india" replace />}
          />
          <Route path="/petitions/india" element={<Petitions />} />
          <Route path="/petitions/india/:state" element={<Petitions />} />
          <Route
            path="/petitions/india/:state/:pincode"
            element={<Petitions />}
          />
          <Route path="/submit-petition" element={<SubmitPetition />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
