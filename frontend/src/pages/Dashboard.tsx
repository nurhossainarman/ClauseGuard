import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-lg">
                <span className="text-white font-bold text-lg">🛡️</span>
              </div>
              <h1 className="text-2xl font-bold" style={{ color: '#000000' }}>
                ClauseGuard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Signed in as</p>
                <p className="text-sm font-semibold text-gray-900">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 bg-white rounded-xl p-12 shadow-sm border border-gray-100">
          <h2 className="text-5xl font-extrabold mb-6" style={{ color: '#000000' }}>
            Know What You're Agreeing To
          </h2>
          <p className="text-xl text-gray-900 leading-relaxed font-medium max-w-3xl">
            ClauseGuard identifies concerning clauses in Terms & Conditions and Privacy Policies before you sign up for a service. Select which privacy issues matter to you, paste a document, and instantly see highlighted red flags with full context.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 p-8">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#000000' }}>Select Concerns</h3>
            <p className="text-gray-700 font-medium">
              Choose which privacy issues matter most to you from 20+ pre-defined concerns.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 p-8">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📄</span>
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#000000' }}>Upload Document</h3>
            <p className="text-gray-700 font-medium">
              Paste or upload the full text of any Terms & Conditions or Privacy Policy.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 p-8">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#000000' }}>Get Results</h3>
            <p className="text-gray-700 font-medium">
              Instantly see highlighted red flags with full context and severity levels.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-extrabold mb-3">20+ Privacy Concerns</h3>
            <p className="text-purple-100 mb-6">
              We scan for data sharing, tracking, retention policies, forced arbitration, auto-renewal, and more.
            </p>
            <ul className="space-y-2 text-sm">
              <li>✓ Data Sharing & Selling</li>
              <li>✓ Tracking & Cookies</li>
              <li>✓ Indefinite Retention</li>
              <li>✓ Forced Arbitration</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-extrabold mb-3">Privacy-First</h3>
            <p className="text-blue-100 mb-6">
              Your documents never leave your browser. We don't track, store, or share your data.
            </p>
            <ul className="space-y-2 text-sm">
              <li>✓ No data storage</li>
              <li>✓ No tracking</li>
              <li>✓ No third-party sharing</li>
              <li>✓ Complete transparency</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate("/scan")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition transform hover:scale-105"
          >
            <span className="text-xl">🔍</span>
            Start Scanning Now
          </button>
          <p className="text-gray-600 text-sm mt-4">
            Takes just a few minutes to understand the terms you're agreeing to
          </p>
        </div>
      </main>
    </div>
  );
}
