export default function MetricsTable({ data }) {
  return (
    <table border="1" style={{ width: "100%", marginTop: "1rem" }}>
      <thead>
        <tr>
          <th>Page</th>
          <th>LCP (ms)</th>
          <th>FID (ms)</th>
          <th>CLS</th>
          <th>TTFB (ms)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((m, i) => (
          <tr key={i}>
            <td>{m.page}</td>
            <td>{m.lcp}</td>
            <td>{m.fid}</td>
            <td>{m.cls}</td>
            <td>{m.ttfb}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
