import { useEffect, useState } from "react";
const api = import.meta.env.VITE_API_URL;

export default function LinkTable() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchLinks() {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/links`);
      const data = await res.json();
      setLinks(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleDelete = async (code) => {
    try {
      await fetch(`${api}/api/links/${code}`, { method: "DELETE" });
      fetchLinks();
    } catch (err) {
      console.error("Failed to delete link", err);
    }
  };

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div>Loading…</div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Code</th>
              <th className="border border-gray-300 px-4 py-2">URL</th>
              <th className="border border-gray-300 px-4 py-2">TinyLink</th>
              <th className="border border-gray-300 px-4 py-2">Clicks</th>
              <th className="border border-gray-300 px-4 py-2">Last Clicked</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => {
              const tinyLink = `${window.location.origin}/${link.short_code}`;
              return (
                <tr key={link.short_code} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-mono">
                    {link.short_code}
                  </td>
                  <td
                    title={link.target_url}
                    className="border border-gray-300 px-4 py-2 truncate max-w-xs"
                  >
                    {link.target_url.length > 50
                      ? link.target_url.slice(0, 50) + "…"
                      : link.target_url}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-blue-600 underline">
                    <a
                      href={tinyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tinyLink}
                    </a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {link.total_clicks}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {link.last_clicked
                      ? new Date(link.last_clicked).toLocaleString()
                      : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                      onClick={() => handleDelete(link.short_code)}
                      aria-label={`Delete link ${link.short_code}`}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded transition"
                      onClick={() =>
                        navigator.clipboard.writeText(tinyLink).then(() => {
                          alert(`Copied to clipboard: ${tinyLink}`);
                        })
                      }
                      aria-label={`Copy link ${link.short_code}`}
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
