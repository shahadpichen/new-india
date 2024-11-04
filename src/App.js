import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Petitions from "./pages/petitions";
import Home from "./pages/landing-page";
import SubmitPetition from "./pages/submit-petition";

function App() {
  return (
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
      </Routes>
    </Router>
  );
}

export default App;
