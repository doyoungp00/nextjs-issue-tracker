import { useEffect, useState } from "react";

interface Stats {
  [key: string]: number;
}

function useIssuesStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/issues/stats");
        if (!response.ok) throw new Error("Network response was not ok");

        const data: Stats = await response.json();
        setStats(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading, error };
}

export default useIssuesStats;
