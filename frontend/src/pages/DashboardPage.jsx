import { useState, useEffect } from "react";
import LinkForm from "../components/LinkForm";
import LinkTable from "../components/LinkTable";

const api = import.meta.env.VITE_API_URL;

export default function DashboardPage() {
  const [links, setLinks] = useState([]);

  // Function to fetch links from backend
  async function fetchLinks() {
    try {
      const res = await fetch(`${api}/api/links`);
      const data = await res.json();
      setLinks(data);
    } catch (error) {
      console.error("Failed to fetch links", error);
    }
  }

  // Fetch links once when component mounts
  useEffect(() => {
    fetchLinks();
  }, []);

  // Callback to refetch links after new link is created
  function handleLinkCreated() {
    fetchLinks();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold my-4">Dashboard</h1>
      <LinkForm onCreated={handleLinkCreated} />
      <LinkTable links={links} />
    </div>
  );
}
