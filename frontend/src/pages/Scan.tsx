import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Concern {
  id: number;
  name: string;
  description: string;
  category: string;
  severity: string;
  keywords: string[];
}

export default function Scan() {
  const [documentText, setDocumentText] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [concerns, setConcerns] = useState<Concern[]>([]);
  const [selectedConcerns, setSelectedConcerns] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categoriesCollapsed, setCategoriesCollapsed] = useState<Record<string, boolean>>({});
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchConcerns();
  }, []);

  const fetchConcerns = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/concerns`);
      if (!response.ok) throw new Error("Failed to fetch concerns");
      const data = await response.json();
      setConcerns(data);

      // Group by category to know which to expand
      const categories = new Set(data.map((c: Concern) => c.category));
      const collapsed: Record<string, boolean> = {};
      categories.forEach((cat) => {
        collapsed[cat] = false;
      });
      setCategoriesCollapsed(collapsed);

      // Select all by default
      setSelectedConcerns(data.map((c: Concern) => c.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch concerns");
    }
  };

  const toggleConcern = (id: number) => {
    setSelectedConcerns((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const toggleCategory = (category: string) => {
    setCategoriesCollapsed((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!documentText.trim()) {
      setError("Please enter document text");
      return;
    }

    if (selectedConcerns.length === 0) {
      setError("Please select at least one concern");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/scans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          documentText,
          documentName: documentName || "Untitled Document",
          selectedConcernIds: selectedConcerns,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Scan failed");
      }

      const data = await response.json();
      navigate(`/results/${data.scan.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scan failed");
    } finally {
      setLoading(false);
    }
  };

  const categorizedConcerns = concerns.reduce(
    (acc, concern) => {
      if (!acc[concern.category]) {
        acc[concern.category] = [];
      }
      acc[concern.category].push(concern);
      return acc;
    },
    {} as Record<string, Concern[]>
  );

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
              <span className="text-sm text-gray-600">{user?.email}</span>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-4">
              <p className="text-sm font-semibold text-red-900">⚠️ {error}</p>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-lg">📋</span>
              </div>
              <h2 className="text-2xl font-extrabold" style={{ color: '#000000' }}>
                Step 1: Select Your Privacy Concerns
              </h2>
            </div>
            <p className="text-gray-800 font-semibold mb-6">
              Which privacy issues matter most to you? We'll scan the document for these specific concerns.
            </p>

            <div className="space-y-4">
              {Object.entries(categorizedConcerns).map(([category, categoryConcerns]) => (
                <div key={category} className="border border-gray-200 rounded-lg">
                  <button
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50"
                  >
                    <h3 className="font-bold text-lg" style={{ color: '#000000' }}>{category}</h3>
                    <span className="text-sm font-semibold text-gray-700">
                      {
                        categoryConcerns.filter((c) =>
                          selectedConcerns.includes(c.id)
                        ).length
                      }/{categoryConcerns.length}
                    </span>
                  </button>

                  {!categoriesCollapsed[category] && (
                    <div className="border-t border-gray-200 px-4 py-3 space-y-2">
                      {categoryConcerns.map((concern) => (
                        <label key={concern.id} className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={selectedConcerns.includes(concern.id)}
                            onChange={() => toggleConcern(concern.id)}
                            className="mt-1"
                          />
                          <div>
                            <p className="font-bold" style={{ color: '#000000' }}>{concern.name}</p>
                            <p className="text-sm font-medium" style={{ color: '#1f2937' }}>{concern.description}</p>
                            <p className="text-xs text-gray-700 font-semibold mt-1">
                              Severity: <span className="text-purple-700">{concern.severity}</span>
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-lg">📄</span>
              </div>
              <h2 className="text-2xl font-extrabold" style={{ color: '#000000' }}>
                Step 2: Paste Your Terms & Conditions
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Document Name (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Instagram Terms of Service"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Document Text
                </label>
                <textarea
                  placeholder="Paste the full text of the Terms & Conditions or Privacy Policy here..."
                  value={documentText}
                  onChange={(e) => setDocumentText(e.target.value)}
                  rows={12}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="text-sm font-medium text-gray-700">
                Characters: <span className="text-purple-600 font-semibold">{documentText.length}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? "Scanning..." : "Scan Document"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-900 font-medium rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
