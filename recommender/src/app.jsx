import { useState } from "react";

const questions = [
  { id: "teamSize",    label: "Team size",            options: ["Solo", "2–5", "6–15", "15+"] },
  { id: "experience", label: "Team JS experience",    options: ["Beginner", "Intermediate", "Advanced"] },
  { id: "projectType",label: "Project type",          options: ["SPA", "Dashboard", "E-commerce", "Enterprise App", "Prototype / MVP"] },
  { id: "scale",      label: "Expected scale",        options: ["Small", "Medium", "Large / Long-term"] },
  { id: "seoNeeded",  label: "SEO / SSR needed?",     options: ["Yes", "No", "Maybe"] },
  { id: "ecosystem",  label: "Ecosystem preference",  options: ["Full control", "Opinionated defaults", "No preference"] },
];

const RC = "#38bdf8";
const VC = "#34d399";

function ScoreBar({ value, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ background: "#1e1e24", borderRadius: 4, height: 6, flex: 1, overflow: "hidden" }}>
        <div style={{ width: `${value * 10}%`, background: color, height: "100%", borderRadius: 4, transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
      <span style={{ color: "#71717a", fontSize: 11, width: 16, textAlign: "right" }}>{value}</span>
    </div>
  );
}

export default function App() {
  const [answers, setAnswers]   = useState({});
  const [result,  setResult]    = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error,   setError]     = useState(null);
  const [chosen,  setChosen]    = useState(null);

  const allAnswered = questions.every((q) => answers[q.id]);

  const handleSelect = (id, value) => {
    setAnswers((p) => ({ ...p, [id]: value }));
    setResult(null);
    setChosen(null);
  };

  const analyse = async () => {
    setLoading(true); setError(null); setResult(null); setChosen(null);
    try {
      // Calls the Vercel serverless function in /api/analyse.js
      // Your API key lives there — never in this file
      const res  = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setResult(data);
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'DM Mono', monospace", background: "#0a0a0d", minHeight: "100vh", color: "#e4e4e7" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Fraunces:opsz,wght@9..144,300;9..144,600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .btn { transition: all 0.15s ease; cursor: pointer; border: none; }
        .btn:hover:not(:disabled) { opacity: 0.85; }
        .card { background: #111116; border: 1px solid #1e1e28; border-radius: 10px; padding: 20px; }
        .fade-in { animation: fadeIn 0.5s ease forwards; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @media (max-width:600px) { .two-col { grid-template-columns: 1fr !important; } }
      `}</style>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "48px 20px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#52525b", textTransform: "uppercase", marginBottom: 10 }}>Framework Compass</p>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 36, lineHeight: 1.2, color: "#fafafa" }}>
            React <span style={{ color: "#3f3f46" }}>or</span> Vue<span style={{ color: RC }}>.</span>
          </h1>
          <p style={{ marginTop: 10, fontSize: 13, color: "#52525b", lineHeight: 1.6 }}>
            Answer 6 questions. Get a balanced breakdown. <em>You</em> decide.
          </p>
        </div>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 32 }}>
          {questions.map((q, qi) => (
            <div key={q.id}>
              <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "#71717a", textTransform: "uppercase", marginBottom: 10 }}>
                <span style={{ color: "#3f3f46", marginRight: 8 }}>{String(qi + 1).padStart(2, "0")}</span>{q.label}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {q.options.map((opt) => {
                  const sel = answers[q.id] === opt;
                  return (
                    <button key={opt} className="btn" onClick={() => handleSelect(q.id, opt)} style={{
                      fontSize: 12, padding: "6px 14px", borderRadius: 6,
                      border: `1px solid ${sel ? "#e4e4e7" : "#2a2a35"}`,
                      background: sel ? "#e4e4e7" : "#111116",
                      color: sel ? "#0a0a0d" : "#71717a", fontFamily: "inherit",
                    }}>{opt}</button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="btn" onClick={analyse} disabled={!allAnswered || loading} style={{
          width: "100%", padding: "14px", borderRadius: 8, fontSize: 13, fontFamily: "inherit",
          letterSpacing: "0.1em", border: "none",
          background: allAnswered && !loading ? "#e4e4e7" : "#1a1a22",
          color:      allAnswered && !loading ? "#0a0a0d"  : "#3f3f46",
          cursor:     allAnswered && !loading ? "pointer"  : "not-allowed",
        }}>
          {loading ? <span className="pulse">Analysing both frameworks…</span> : "Analyse My Project →"}
        </button>

        {error && <p style={{ marginTop: 12, color: "#f87171", fontSize: 13, textAlign: "center" }}>{error}</p>}

        {/* Results */}
        {result && (
          <div className="fade-in" style={{ marginTop: 40 }}>

            <div style={{ background: "#111116", border: "1px solid #1e1e28", borderRadius: 8, padding: "12px 16px", marginBottom: 20, display: "flex", gap: 10 }}>
              <span style={{ color: "#fbbf24", fontSize: 14, flexShrink: 0 }}>ℹ</span>
              <p style={{ fontSize: 12, color: "#71717a", lineHeight: 1.6 }}>
                Both frameworks are production-ready and used at scale. This analysis is based on your project context — the right choice is ultimately yours.
              </p>
            </div>

            {/* Side-by-side */}
            <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              {["react", "vue"].map((fw) => {
                const d = result[fw];
                const color = fw === "react" ? RC : VC;
                const label = fw === "react" ? "React" : "Vue";
                const isChosen = chosen === fw;
                return (
                  <div key={fw} className="card" style={{
                    display: "flex", flexDirection: "column", gap: 16,
                    borderColor: isChosen ? color : (fw === "react" ? "rgba(56,189,248,0.2)" : "rgba(52,211,153,0.2)"),
                    boxShadow: isChosen ? `0 0 0 2px ${color}` : "none",
                    transition: "box-shadow 0.2s ease",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "'Fraunces', serif", fontSize: 24, color, fontWeight: 600 }}>{label}</span>
                      {isChosen && <span style={{ fontSize: 10, letterSpacing: "0.12em", padding: "3px 8px", borderRadius: 20, background: color, color: "#0a0a0d", textTransform: "uppercase" }}>Your pick</span>}
                    </div>

                    <div>
                      <p style={{ fontSize: 10, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>Strengths</p>
                      <ul style={{ display: "flex", flexDirection: "column", gap: 6, listStyle: "none" }}>
                        {d.strengths.map((s, i) => (
                          <li key={i} style={{ display: "flex", gap: 8, fontSize: 12, color: "#a1a1aa", lineHeight: 1.5 }}>
                            <span style={{ color, flexShrink: 0 }}>+</span>{s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p style={{ fontSize: 10, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>Weaknesses</p>
                      <ul style={{ display: "flex", flexDirection: "column", gap: 6, listStyle: "none" }}>
                        {d.weaknesses.map((s, i) => (
                          <li key={i} style={{ display: "flex", gap: 8, fontSize: 12, color: "#a1a1aa", lineHeight: 1.5 }}>
                            <span style={{ color: "#52525b", flexShrink: 0 }}>−</span>{s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ borderTop: "1px solid #1e1e28", paddingTop: 12 }}>
                      <p style={{ fontSize: 10, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>Best for</p>
                      <p style={{ fontSize: 12, color: "#71717a", lineHeight: 1.5, fontStyle: "italic" }}>{d.bestFor}</p>
                    </div>

                    <button className="btn" onClick={() => setChosen(isChosen ? null : fw)} style={{
                      marginTop: "auto", padding: "10px", borderRadius: 6, fontSize: 12,
                      fontFamily: "inherit", letterSpacing: "0.08em",
                      background: isChosen ? color : "transparent",
                      color: isChosen ? "#0a0a0d" : color,
                      border: `1px solid ${color}`, cursor: "pointer", transition: "all 0.2s ease",
                    }}>
                      {isChosen ? `✓ Chosen ${label}` : `I'll go with ${label}`}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Dimensions */}
            <div className="card" style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 10, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>Dimension scores — contextual to your project</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {result.dimensions.map((d) => (
                  <div key={d.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 11, color: "#71717a" }}>{d.label}</span>
                      <div style={{ display: "flex", gap: 12, fontSize: 11 }}>
                        <span style={{ color: RC }}>React {d.react}</span>
                        <span style={{ color: VC }}>Vue {d.vue}</span>
                      </div>
                    </div>
                    <ScoreBar value={d.react} color={RC} />
                    <div style={{ marginTop: 4 }}><ScoreBar value={d.vue} color={VC} /></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lean + Key question */}
            <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: chosen ? 16 : 0 }}>
              <div className="card">
                <p style={{ fontSize: 10, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>AI's honest lean</p>
                <p style={{ fontSize: 12, color: "#a1a1aa", lineHeight: 1.7 }}>{result.leanNote}</p>
                <p style={{ marginTop: 10, fontSize: 10, color: "#3f3f46", fontStyle: "italic" }}>One perspective — not a verdict.</p>
              </div>
              <div className="card" style={{ borderColor: "rgba(250,204,21,0.2)" }}>
                <p style={{ fontSize: 10, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>Ask yourself</p>
                <p style={{ fontSize: 13, color: "#fbbf24", lineHeight: 1.7, fontStyle: "italic" }}>"{result.keyQuestion}"</p>
              </div>
            </div>

            {/* Chosen */}
            {chosen && (
              <div className="fade-in card" style={{ borderColor: chosen === "react" ? "rgba(56,189,248,0.4)" : "rgba(52,211,153,0.4)", textAlign: "center", padding: 28 }}>
                <p style={{ fontSize: 11, color: "#52525b", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>You've chosen</p>
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: 32, color: chosen === "react" ? RC : VC, fontWeight: 600 }}>
                  {chosen === "react" ? "React" : "Vue"}
                </p>
                <p style={{ marginTop: 8, fontSize: 12, color: "#52525b" }}>Great choice. Now go build something.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
