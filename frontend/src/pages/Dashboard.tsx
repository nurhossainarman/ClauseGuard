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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Terms Radar</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Terms Radar
          </h2>
          <p className="text-gray-600 mb-8">
            Identify concerning clauses in Terms & Conditions before you sign up for a service.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Concerns</h3>
              <p className="text-gray-600 text-sm mt-2">
                Choose which privacy concerns matter to you
              </p>
            </div>
            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="text-lg font-semibold text-gray-900">Upload T&C</h3>
              <p className="text-gray-600 text-sm mt-2">
                Paste or upload the Terms & Conditions
              </p>
            </div>
            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="text-lg font-semibold text-gray-900">View Results</h3>
              <p className="text-gray-600 text-sm mt-2">
                See highlighted matches with context
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/scan")}
            className="mt-8 px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700"
          >
            Start New Scan
          </button>
        </div>
      </main>
    </div>
  );
}
