import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import {
  FaThumbsUp,
  FaUserShield,
  FaSearch,
  FaRegLightbulb,
} from "react-icons/fa";
import Proof from "./components/anon-aadhaar-proof";
import Petitions from "./pages/petitions";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/petitions" element={<Petitions />} />
      </Routes>
    </Router>
  );
}

// Create a separate Home component with the existing content
function Home() {
  const navigate = useNavigate();

  return (
    <main className="container mx-auto px-4 flex-grow text-black plus-jakarta-sans-uniquifier">
      <div className="w-full max-w-3xl mx-auto">
        <header
          className="text-center text-2xl font-semibold my-10"
          style={{
            WebkitTextFillColor: "#FFFFFF",
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "#000",
          }}
        >
          Anon-Petition
        </header>
        <section className="text-left mt-20">
          <h1 className="text-2xl font-semibold mb-5">
            Anonymously Submit Your Petition
          </h1>

          <div className="relative max-w-xl flex gap-2">
            <Proof />
            <button
              onClick={() => navigate("/petitions")}
              className="px-4 py-1 border border-orange-500 rounded-lg text-orange-500 font-semibold hover:bg-gray-50"
            >
              View the Petition
            </button>
          </div>

          <p className="text-gray-600 mt-8">
            Share your concerns without revealing your identity. We use Anon
            Aadhaar to ensure that petitions are from Indian citizens only,
            safeguarding your privacy while ensuring authenticity.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="text-2xl font-semibold mb-4">
            How Anon-Petition Works
          </h2>

          <div className="flex flex-wrap mb-6 gap-2">
            <div className="capitalize">
              <a
                href="https://pse.dev/en/projects/anon-aadhaar"
                className="text-blue-600 hover:underline font-semibold"
              >
                Anon Aadhaar
              </a>
              : Ensure your petition is from a verified Indian citizen while
              maintaining your privacy.
            </div>
            <div className="capitalize">
              <span className="font-semibold">
                Anonymous Petition Submission:
              </span>{" "}
              Submit your petition with complete anonymity.
            </div>
            <div className="capitalize">
              <span className="font-semibold">Anonymous Upvoting:</span> Support
              petitions you resonate with while keeping your identity hidden.
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-2xl font-semibold mb-4">
            Why Use Anon-Petition?
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center mb-2">
              <FaUserShield className="w-4 h-4 mr-2 text-gray-500" />
              Full anonymity with Aadhaar verification
            </li>
            <li className="flex items-center mb-2">
              <FaSearch className="w-4 h-4 mr-2 text-gray-500" />
              Easily find and support relevant petitions
            </li>
            <li className="flex items-center mb-2">
              <FaRegLightbulb className="w-4 h-4 mr-2 text-gray-500" />
              Platform for Indian citizens' voices to be heard
            </li>
            <li className="flex items-center mb-2">
              <FaThumbsUp className="w-4 h-4 mr-2 text-gray-500" />
              Support others by upvoting petitions you resonate with
            </li>
          </ul>
        </section>

        <section className="mt-24 mb-12">
          <footer className="text-center text-gray-600 mt-24 mb-12">
            <p>
              &copy; Anon-Petition - Submit petitions, support change, and
              amplify your voice securely and anonymously.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <a
                href="/privacy"
                className="text-blue-600 hover:underline text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-blue-600 hover:underline text-sm"
              >
                Terms of Service
              </a>
              <a
                href="/report"
                className="text-blue-600 hover:underline text-sm"
              >
                Report Issues
              </a>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
