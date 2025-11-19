import { useEffect, useState } from "react";
const api = import.meta.env.VITE_API_URL;
export default function HealthPage() {
  const [info, setInfo] = useState(null);
  useEffect(() => {
    fetch(`${api}/healthz`).then((res) => {
      if (res.ok) res.json().then(setInfo);
    });
  }, []);
  return (
    <div>
      <h2>Healthcheck</h2>
      {!info ? <div>Loading…</div> : <pre>{JSON.stringify(info, null, 2)}</pre>}
    </div>
  );
}
