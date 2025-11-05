import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: "1rem",
        marginBottom: "3rem",
        backgroundColor: "#1f1818ff",
        color: "#fff",
      }}
    >
      <Link style={{ color: "#fff" }} to="/">
        Dashboard
      </Link>{" "}
      |{" "}
      <Link style={{ color: "#fff" }} to="/reports">
        Reports
      </Link>{" "}
      |{" "}
      <Link style={{ color: "#fff" }} to="/about">
        About
      </Link>
    </nav>
  )
}
