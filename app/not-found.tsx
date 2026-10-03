import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        background: "#f5f8fe",
        color: "#0a2a6b",
        fontFamily: '"Manrope", "Segoe UI", Arial, sans-serif',
        textAlign: "center",
      }}
    >
      <div>
        <p style={{ color: "#1556c9", fontWeight: 800, letterSpacing: "0.1em" }}>404</p>
        <h1 style={{ margin: "0 0 1rem" }}>Page not found</h1>
        <p style={{ margin: "0 0 1.5rem" }}>The page you requested is unavailable.</p>
        <Link href="/home" style={{ color: "#1556c9", fontWeight: 800 }}>
          Return home
        </Link>
      </div>
    </main>
  );
}
