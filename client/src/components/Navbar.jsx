import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav style={{ background: "#eee", padding: "1rem" }}>
      <Link to="/">Dashboard</Link> | <Link to="/reports">Reports</Link> |{" "}
      <Link to="/about">About</Link>
    </nav>
  )
}
