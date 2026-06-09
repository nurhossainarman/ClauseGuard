import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ScanResult {
  id: number;
  matchedText: string;
  context: string;
  concern: {
    id: number;
    name: string;
    category: string;
    severity: string;
    description: string;
  };
}

interface ScanData {
  scan: {
    id: number;
    documentName: string;
    createdAt: string;
  };
  results: ScanResult[];
}

export default function Results() {
  const { scanId } = useParams<{ scanId: string }>();
  const [data, setData] = useState<ScanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedResults, setExpandedResults] = useState<Set<number>>(new Set());
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchResults();
  }, [scanId]);

  const fetchResults = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/scans/${scanId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch results");
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  const toggleResult = (id: number) => {
    setExpandedResults((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block mb-4">
            <div className="animate-spin text-4xl">🔍</div>
          </div>
          <p className="text-gray-600 font-medium">Analyzing document...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <h1 className="flex items-center text-2xl font-bold text-gray-900">ClauseGuard</h1>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Back
              </button>
            </div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto py-12 px-4 text-center">
          <p className="text-red-600">{error || "Results not found"}</p>
        </div>
      </div>
    );
  }

  const filteredResults = severityFilter
    ? data.results.filter((r) => r.concern.severity === severityFilter)
    : data.results;

  const severityCounts = {
    high: data.results.filter((r) => r.concern.severity === "high").length,
    medium: data.results.filter((r) => r.concern.severity === "medium").length,
    low: data.results.filter((r) => r.concern.severity === "low").length,
  };

  const severityColor = {
    high: "text-red-600 bg-red-50",
    medium: "text-orange-600 bg-orange-50",
    low: "text-yellow-600 bg-yellow-50",
  } as Record<string, string>;

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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-extrabold mb-2" style={{ color: '#000000' }}>
                {data.scan.documentName}
              </h2>
              <p className="text-gray-800 font-semibold">
                Scanned on {new Date(data.scan.createdAt).toLocaleDateString()} at{" "}
                {new Date(data.scan.createdAt).toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={() => navigate("/scan")}
              className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700"
            >
              New Scan
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <button
              onClick={() => setSeverityFilter(severityFilter === "high" ? null : "high")}
              className={`p-4 rounded-xl border-2 text-left transition transform hover:scale-105 ${
                severityFilter === "high"
                  ? "border-red-600 bg-red-50"
                  : "border-gray-200 hover:border-red-400"
              }`}
            >
              <p className="text-2xl font-bold text-red-600">{severityCounts.high}</p>
              <p className="text-sm text-red-800 font-semibold">🚨 High Severity</p>
            </button>
            <button
              onClick={() => setSeverityFilter(severityFilter === "medium" ? null : "medium")}
              className={`p-4 rounded-xl border-2 text-left transition transform hover:scale-105 ${
                severityFilter === "medium"
                  ? "border-orange-600 bg-orange-50"
                  : "border-gray-200 hover:border-orange-400"
              }`}
            >
              <p className="text-2xl font-bold text-orange-600">{severityCounts.medium}</p>
              <p className="text-sm text-orange-800 font-semibold">⚠️ Medium Severity</p>
            </button>
            <button
              onClick={() => setSeverityFilter(severityFilter === "low" ? null : "low")}
              className={`p-4 rounded-xl border-2 text-left transition transform hover:scale-105 ${
                severityFilter === "low"
                  ? "border-yellow-600 bg-yellow-50"
                  : "border-gray-200 hover:border-yellow-400"
              }`}
            >
              <p className="text-2xl font-bold text-yellow-600">{severityCounts.low}</p>
              <p className="text-sm text-amber-900 font-semibold">📝 Low Severity</p>
            </button>
          </div>
        </div>

        {filteredResults.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="text-4xl mb-4">✨</div>
            <p className="text-gray-900 text-lg font-bold">
              {severityFilter
                ? `No ${severityFilter} severity concerns found.`
                : "No concerning clauses found in this document."}
            </p>
            <p className="text-gray-700 text-sm font-medium mt-2">Great news! This document seems pretty fair.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResults.map((result, index) => (
              <div
                key={result.id}
                className={`bg-white rounded-xl shadow-sm border-l-4 overflow-hidden transition hover:shadow-md ${
                  result.concern.severity === "high"
                    ? "border-red-600 hover:bg-red-50"
                    : result.concern.severity === "medium"
                      ? "border-orange-600 hover:bg-orange-50"
                      : "border-yellow-600 hover:bg-yellow-50"
                }`}
              >
                <button
                  onClick={() => toggleResult(result.id)}
                  className="w-full px-6 py-4 flex justify-between items-start hover:bg-gray-50"
                >
                  <div className="text-left flex-1">
                    <p className="font-bold text-lg" style={{ color: '#000000' }}>{result.concern.name}</p>
                    <p className="text-sm font-medium mt-1" style={{ color: '#1f2937' }}>
                      {result.concern.description}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded ${severityColor[result.concern.severity]}`}
                      >
                        {result.concern.severity.charAt(0).toUpperCase() +
                          result.concern.severity.slice(1)}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-900 font-semibold">
                        {result.concern.category}
                      </span>
                    </div>
                  </div>
                  <span className="ml-4 text-gray-400">
                    {expandedResults.has(result.id) ? "▼" : "▶"}
                  </span>
                </button>

                {expandedResults.has(result.id) && (
                  <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">MATCHED TEXT:</p>
                      <p className="text-sm font-mono bg-white p-3 rounded border border-gray-200 text-red-600">
                        {result.matchedText}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-2">CONTEXT:</p>
                      <p className="text-sm text-gray-700 bg-white p-3 rounded border border-gray-200 leading-relaxed">
                        {result.context}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/scan")}
            className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700"
          >
            Scan Another Document
          </button>
        </div>
      </main>
    </div>
  );
}
