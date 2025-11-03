export const fetchMetrics = async () => {
  const res = await fetch("http://localhost:4000/api/metrics");
  return res.json(); // No caching
};

export const fetchReports = async () => {
  const res = await fetch("http://localhost:4000/api/reports");
  return res.json();
};
