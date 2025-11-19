import { useState } from "react";

const api = import.meta.env.VITE_API_URL;

export default function LinkForm({ onCreated }) {
  const [target_url, setTargetUrl] = useState("");
  const [short_code, setShortCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setShortenedUrl("");
    try {
      const res = await fetch(`${api}/api/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target_url, short_code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Unknown error");
      } else {
        setSuccess("Link created!");
        // Assuming backend returns shortened url or short code in data.shortLink
        setShortenedUrl(
          data.shortLink || `${api}/${data.short_code || short_code}`
        );
        setTargetUrl("");
        setShortCode("");
        onCreated && onCreated();
      }
    } catch {
      setError("Network error");
    }
    setLoading(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          placeholder="Long URL"
          className="px-2 py-1 border rounded w-full"
          value={target_url}
          onChange={(e) => setTargetUrl(e.target.value)}
          required
        />
        <input
          placeholder="Custom Code (6-8 chars)"
          className="px-2 py-1 border rounded w-full"
          value={short_code}
          onChange={(e) => setShortCode(e.target.value)}
        />
        <button
          disabled={loading}
          className="bg-blue-500 text-white px-4 mb-5 py-2 rounded w-full"
          type="submit"
        >
          {loading ? "Loading…" : "Shorten"}
        </button>
        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}
      </form>

      {shortenedUrl && (
        <div className="mt-2 text-blue-600 break-all">
          Shortened URL:{" "}
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </div>
      )}
    </>
  );
}
