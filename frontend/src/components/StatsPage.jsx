import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const api = import.meta.env.VITE_API_URL;
export default function StatsPage() {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  useEffect(() => {
    fetch(`${api}/api/links/${code}`).then((res) => {
      if (res.ok) res.json().then(setLink);
    });
  }, [code]);
  if (!link) return <div>Loading…</div>;
  return (
    <div>
      <h2>Stats for {code}</h2>
      <p>Target: {link.target_url}</p>
      <p>Clicks: {link.total_clicks}</p>
      <p>
        Last Clicked:{" "}
        {link.last_clicked ? new Date(link.last_clicked).toLocaleString() : "-"}
      </p>
    </div>
  );
}
