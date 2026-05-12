import { useState } from "react";

const months = [
  {
    number: 1,
    title: "Foundations",
    subtitle: "Build Your Base",
    color: "#00ff9f",
    icon: "⬡",
    focus: "Networking & OS Fundamentals",
    tasks: [
      { label: "Learn the OSI & TCP/IP models", detail: "Understand how data travels across networks — this is foundational for everything." },
      { label: "Study IP addressing, subnetting, DNS, HTTP/S", detail: "Know how devices find each other and how the web communicates." },
      { label: "Get comfortable with Linux (Kali or Ubuntu)", detail: "Ethical hackers live in the terminal. Learn basic commands, file permissions, and navigation." },
      { label: "Understand Windows basics & Active Directory concepts", detail: "Most corporate environments run Windows — you need to know how to navigate them." },
      { label: "Set up a home lab (VirtualBox + Kali Linux)", detail: "Practice legally in your own environment. Start with 2 VMs minimum." },
    ],
    certs: ["CompTIA IT Fundamentals (ITF+) — optional starter"],
    resources: ["Professor Messer (free YouTube)", "TryHackMe — Pre-Security path", "NetworkChuck YouTube"],
    milestone: "You can explain how a packet travels from your browser to Google and back.",
  },
  {
    number: 2,
    title: "Security Concepts",
    subtitle: "Think Like a Defender",
    color: "#00cfff",
    icon: "◈",
    focus: "Core Security Principles",
    tasks: [
      { label: "Study CIA Triad, AAA, threat models", detail: "The core pillars of all security thinking — Confidentiality, Integrity, Availability." },
      { label: "Learn common attack types: phishing, MITM, DoS, SQLi, XSS", detail: "You can't defend (or attack ethically) what you don't understand." },
      { label: "Understand firewalls, IDS/IPS, VPNs, proxies", detail: "Learn what each tool does and where it sits in a network." },
      { label: "Study cryptography basics: hashing, symmetric/asymmetric encryption", detail: "Passwords, HTTPS, certificates — all rely on this." },
      { label: "Start CompTIA Security+ study materials", detail: "This is the #1 entry-level cert employers look for. Begin now." },
    ],
    certs: ["Begin CompTIA Security+ prep"],
    resources: ["Professor Messer Security+ (free)", "TryHackMe — SOC Level 1", "Cybrary (free tier)"],
    milestone: "You can identify and explain 10+ common attack vectors to a non-technical person.",
  },
  {
    number: 3,
    title: "Ethical Hacking Intro",
    subtitle: "First Steps in Offense",
    color: "#ffcc00",
    icon: "◉",
    focus: "Reconnaissance & Scanning",
    tasks: [
      { label: "Learn the 5 phases of ethical hacking", detail: "Recon → Scanning → Gaining Access → Maintaining Access → Covering Tracks." },
      { label: "Master Nmap for port scanning and enumeration", detail: "Nmap is the #1 recon tool. Know all major flags and scan types cold." },
      { label: "Practice with Metasploit Framework basics", detail: "Learn to use existing exploits responsibly in your lab environment." },
      { label: "Learn OSINT techniques (Shodan, theHarvester, Maltego)", detail: "Gather intelligence on targets using only publicly available data." },
      { label: "Complete TryHackMe's Jr Penetration Tester path", detail: "Guided hands-on rooms that walk you through real techniques safely." },
    ],
    certs: ["eJPT (eLearnSecurity Junior Penetration Tester) — beginner-friendly, ~$200"],
    resources: ["TryHackMe Jr Penetration Tester", "HackTheBox Starting Point", "IppSec YouTube (HTB walkthroughs)"],
    milestone: "You complete your first TryHackMe CTF room from scratch without hints.",
  },
  {
    number: 4,
    title: "Core Attack Skills",
    subtitle: "Web & Network Exploitation",
    color: "#ff9500",
    icon: "◆",
    focus: "Active Exploitation Techniques",
    tasks: [
      { label: "Learn web app vulnerabilities (OWASP Top 10)", detail: "SQLi, XSS, CSRF, IDOR, broken auth — every pentester must know these inside-out." },
      { label: "Practice with Burp Suite Community Edition", detail: "The industry-standard tool for intercepting and manipulating web traffic." },
      { label: "Study privilege escalation (Linux & Windows)", detail: "Getting in is step 1. Escalating from user to root/admin is the real skill." },
      { label: "Learn password attacks: Hashcat, John the Ripper, wordlists", detail: "Understand how passwords are cracked and why strong hashing matters." },
      { label: "Solve 10+ HackTheBox easy machines", detail: "HTB is the closest thing to real-world pentesting you'll find for free." },
    ],
    certs: ["Continue CompTIA Security+ prep — aim to sit exam this month"],
    resources: ["PortSwigger Web Security Academy (FREE — best web hacking resource)", "GTFOBins, HackTricks for privesc", "HackTheBox Academy"],
    milestone: "You earn CompTIA Security+ certification. 🎉",
  },
  {
    number: 5,
    title: "Specialization",
    subtitle: "Pick Your Lane",
    color: "#ff5e5e",
    icon: "◇",
    focus: "Advanced Techniques & Tooling",
    tasks: [
      { label: "Choose a focus: Web App Pentesting, Network Pentesting, or Red Team", detail: "Specializing makes you more hireable. Most entry jobs are web or network focused." },
      { label: "Learn scripting: Python or Bash for automation", detail: "Write your own tools, automate recon, customize exploits. 100 lines of Python will take you far." },
      { label: "Study Active Directory attacks (Kerberoasting, Pass-the-Hash, BloodHound)", detail: "AD attacks are in nearly every real corporate pentest. This sets you apart." },
      { label: "Practice writing pentest reports", detail: "Technical findings mean nothing if you can't communicate them. Reports are half the job." },
      { label: "Participate in a CTF competition (PicoCTF, CTFtime events)", detail: "Competitions sharpen skills fast and look excellent on a resume." },
    ],
    certs: ["eJPT if not already done", "Begin CEH or PNPT study (pick one)"],
    resources: ["PNPT (Practical Network Penetration Tester) by TCM Security", "AD lab setup guide by TCM Security (free YouTube)", "CTFtime.org"],
    milestone: "You write a full mock pentest report for a vulnerable VM (e.g., VulnHub machine).",
  },
  {
    number: 6,
    title: "Job Ready",
    subtitle: "Launch Your Career",
    color: "#c084fc",
    icon: "★",
    focus: "Portfolio, Applications & Interviews",
    tasks: [
      { label: "Build a GitHub portfolio with writeups and scripts", detail: "Document your HTB/TryHackMe solutions, custom tools, and lab setups. Employers will check this." },
      { label: "Create a professional LinkedIn with security focus", detail: "List your certs, labs, and projects. Connect with security professionals actively." },
      { label: "Apply for Bug Bounty programs (HackerOne, Bugcrowd)", detail: "Even $0 bug reports prove real-world testing. A paid bounty is gold on a resume." },
      { label: "Apply for entry-level roles: Jr Pentester, SOC Analyst L1, Security Analyst", detail: "Don't wait for 'perfect.' Apply broadly — SOC roles are a great launchpad to pentesting." },
      { label: "Practice interview questions: explain attacks, tools, methodology", detail: "Be ready to explain your thought process out loud. Technical interviews often involve live walkthroughs." },
    ],
    certs: ["CompTIA Security+ ✓", "eJPT ✓", "CEH or PNPT — schedule exam"],
    resources: ["TCM Security's 'Getting into Infosec' (YouTube)", "Resume templates on Reddit r/netsec", "HackerOne & Bugcrowd for bug bounties"],
    milestone: "You land your first interview — or your first bug bounty payout. Either counts. 🚀",
  },
];

const certPath = [
  { name: "CompTIA Security+", month: 4, color: "#00cfff", tier: "Essential" },
  { name: "eJPT", month: 5, color: "#ffcc00", tier: "Hands-On" },
  { name: "CEH or PNPT", month: 6, color: "#c084fc", tier: "Advanced" },
];

export default function Roadmap() {
  const [active, setActive] = useState(0);
  const [expandedTask, setExpandedTask] = useState(null);

  const m = months[active];

  return (
    <div style={{
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      background: "#080c14",
      minHeight: "100vh",
      color: "#e2e8f0",
      padding: "0",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&family=Syne:wght@700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d1117; }
        ::-webkit-scrollbar-thumb { background: #1e2d40; border-radius: 2px; }

        .grid-bg {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background-image: 
            linear-gradient(rgba(0,255,159,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,159,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none; z-index: 0;
        }

        .scanline {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.03) 2px,
            rgba(0,0,0,0.03) 4px
          );
          pointer-events: none; z-index: 0;
        }

        .month-btn {
          background: transparent;
          border: 1px solid #1a2535;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .month-btn:hover {
          border-color: var(--mc);
          background: rgba(255,255,255,0.03);
        }

        .month-btn.active {
          border-color: var(--mc);
          background: rgba(0,0,0,0.4);
        }

        .month-btn.active::before {
          content: '';
          position: absolute; left: 0; top: 0;
          width: 3px; height: 100%;
          background: var(--mc);
          box-shadow: 0 0 10px var(--mc);
        }

        .task-item {
          background: rgba(255,255,255,0.02);
          border: 1px solid #1a2535;
          border-radius: 4px;
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 8px;
        }

        .task-item:hover {
          border-color: var(--mc);
          background: rgba(255,255,255,0.04);
        }

        .task-item.open {
          border-color: var(--mc);
          background: rgba(0,0,0,0.3);
        }

        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .glow-text {
          text-shadow: 0 0 20px var(--mc), 0 0 40px var(--mc);
        }

        .tag {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 2px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1px solid currentColor;
        }

        .progress-bar {
          height: 2px;
          background: #1a2535;
          border-radius: 1px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 1px;
          transition: width 0.4s ease;
          box-shadow: 0 0 8px var(--mc);
        }

        .section-header {
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #4a5568;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .section-header::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #1a2535;
        }

        .resource-chip {
          display: inline-block;
          background: rgba(255,255,255,0.04);
          border: 1px solid #1a2535;
          border-radius: 2px;
          padding: 4px 10px;
          font-size: 11px;
          margin: 3px 3px 3px 0;
          color: #94a3b8;
          transition: all 0.2s;
        }

        .resource-chip:hover {
          border-color: var(--mc);
          color: var(--mc);
        }
      `}</style>

      <div className="grid-bg" />
      <div className="scanline" />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* Header */}
        <div style={{ padding: "32px 32px 0", borderBottom: "1px solid #0d1a26", background: "rgba(8,12,20,0.9)", backdropFilter: "blur(10px)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "#00ff9f", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="pulse">▶</span> ETHICAL HACKER ROADMAP // 6-MONTH PROGRAM
                </div>
                <h1 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(28px, 5vw, 48px)",
                  fontWeight: 800,
                  lineHeight: 1,
                  color: "#f8fafc",
                  marginBottom: 8,
                }}>
                  FROM ZERO<br />
                  <span style={{ color: "#00ff9f", textShadow: "0 0 30px rgba(0,255,159,0.4)" }}>TO HIRED</span>
                </h1>
                <p style={{ fontSize: 12, color: "#64748b", letterSpacing: "0.05em" }}>
                  Beginner → Entry-Level Penetration Tester
                </p>
              </div>
              <div style={{ textAlign: "right", display: "none" }} className="desktop-stats">
                <div style={{ fontSize: 40, fontWeight: 700, color: "#00ff9f", lineHeight: 1 }}>6</div>
                <div style={{ fontSize: 10, color: "#4a5568", letterSpacing: "0.2em" }}>MONTHS</div>
              </div>
            </div>

            {/* Month tabs */}
            <div style={{ display: "flex", gap: 4, overflowX: "auto", paddingBottom: 0 }}>
              {months.map((m, i) => (
                <button
                  key={i}
                  className={`month-btn ${active === i ? "active" : ""}`}
                  style={{ "--mc": m.color, padding: "12px 16px", minWidth: 100, textAlign: "left", borderRadius: "4px 4px 0 0", borderBottom: "none" }}
                  onClick={() => { setActive(i); setExpandedTask(null); }}
                >
                  <div style={{ fontSize: 9, color: active === i ? m.color : "#4a5568", letterSpacing: "0.15em", marginBottom: 4 }}>
                    MONTH {m.number}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: active === i ? "#f8fafc" : "#64748b" }}>
                    {m.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: "24px 32px 40px", overflowY: "auto" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>

            {/* Active month header */}
            <div style={{
              background: "rgba(0,0,0,0.4)",
              border: `1px solid ${m.color}22`,
              borderTop: `3px solid ${m.color}`,
              borderRadius: "0 0 8px 8px",
              padding: "20px 24px",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                  <span style={{ fontSize: 28, color: m.color }}>{m.icon}</span>
                  <div>
                    <div style={{ fontSize: 9, color: m.color, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 2 }}>
                      Month {m.number} — {m.focus}
                    </div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#f8fafc" }}>
                      {m.title}: <span style={{ color: m.color }}>{m.subtitle}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="progress-bar" style={{ "--mc": m.color, width: 160, marginBottom: 6 }}>
                  <div className="progress-fill" style={{ width: `${(m.number / 6) * 100}%`, background: m.color }} />
                </div>
                <div style={{ fontSize: 10, color: "#4a5568" }}>{m.number}/6 months complete</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>

              {/* Left — tasks */}
              <div>
                <div className="section-header">Weekly Tasks & Skills</div>

                {m.tasks.map((task, i) => (
                  <div
                    key={i}
                    className={`task-item ${expandedTask === i ? "open" : ""}`}
                    style={{ "--mc": m.color }}
                    onClick={() => setExpandedTask(expandedTask === i ? null : i)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{
                        width: 20, height: 20, borderRadius: "50%",
                        border: `1.5px solid ${expandedTask === i ? m.color : "#1e3a5f"}`,
                        background: expandedTask === i ? m.color + "22" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 9, color: m.color, flexShrink: 0,
                        transition: "all 0.2s",
                      }}>
                        {i + 1}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: expandedTask === i ? "#f8fafc" : "#cbd5e1", flex: 1 }}>
                        {task.label}
                      </span>
                      <span style={{ fontSize: 10, color: "#4a5568", transform: expandedTask === i ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>▶</span>
                    </div>
                    {expandedTask === i && (
                      <div style={{
                        marginTop: 10, paddingTop: 10,
                        borderTop: `1px solid ${m.color}33`,
                        fontSize: 12, color: "#94a3b8", lineHeight: 1.7,
                        paddingLeft: 30,
                      }}>
                        {task.detail}
                      </div>
                    )}
                  </div>
                ))}

                {/* Milestone */}
                <div style={{
                  marginTop: 20,
                  background: `linear-gradient(135deg, ${m.color}11, transparent)`,
                  border: `1px solid ${m.color}44`,
                  borderRadius: 6,
                  padding: "14px 18px",
                }}>
                  <div style={{ fontSize: 9, letterSpacing: "0.2em", color: m.color, marginBottom: 6 }}>▲ MONTH {m.number} MILESTONE</div>
                  <div style={{ fontSize: 13, color: "#f8fafc", lineHeight: 1.6 }}>{m.milestone}</div>
                </div>
              </div>

              {/* Right sidebar */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Certs */}
                <div style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid #1a2535",
                  borderRadius: 6,
                  padding: 16,
                }}>
                  <div className="section-header">Certifications</div>
                  {m.certs.map((c, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "flex-start", gap: 8,
                      marginBottom: 8, fontSize: 12, color: "#94a3b8", lineHeight: 1.5,
                    }}>
                      <span style={{ color: m.color, fontSize: 14, marginTop: 1, flexShrink: 0 }}>◈</span>
                      {c}
                    </div>
                  ))}
                </div>

                {/* Resources */}
                <div style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid #1a2535",
                  borderRadius: 6,
                  padding: 16,
                }}>
                  <div className="section-header">Resources</div>
                  <div>
                    {m.resources.map((r, i) => (
                      <span key={i} className="resource-chip" style={{ "--mc": m.color }}>{r}</span>
                    ))}
                  </div>
                </div>

                {/* Cert Path */}
                <div style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid #1a2535",
                  borderRadius: 6,
                  padding: 16,
                }}>
                  <div className="section-header">Cert Roadmap</div>
                  {certPath.map((c, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      marginBottom: 10, opacity: active + 1 >= c.month ? 1 : 0.35,
                    }}>
                      <div style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: active + 1 >= c.month ? c.color : "#1a2535",
                        boxShadow: active + 1 >= c.month ? `0 0 8px ${c.color}` : "none",
                        flexShrink: 0,
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>{c.name}</div>
                        <div style={{ fontSize: 10, color: "#4a5568" }}>Month {c.month} · {c.tier}</div>
                      </div>
                      {active + 1 >= c.month && (
                        <span style={{ fontSize: 9, color: c.color, letterSpacing: "0.1em" }}>UNLOCKED</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Quick stats */}
                <div style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid #1a2535",
                  borderRadius: 6,
                  padding: 16,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}>
                  {[
                    { label: "Hours/Week", value: active < 2 ? "10–15" : active < 4 ? "15–20" : "20–25" },
                    { label: "Difficulty", value: ["★☆☆☆☆", "★★☆☆☆", "★★★☆☆", "★★★★☆", "★★★★☆", "★★★★★"][active] },
                    { label: "Cost", value: active < 2 ? "$0" : active === 3 ? "~$400" : active === 4 ? "~$200" : "~$200" },
                    { label: "Tasks", value: `${m.tasks.length} items` },
                  ].map((s, i) => (
                    <div key={i}>
                      <div style={{ fontSize: 9, color: "#4a5568", letterSpacing: "0.15em", marginBottom: 4 }}>{s.label.toUpperCase()}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: m.color }}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div style={{
          borderTop: "1px solid #0d1a26",
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(8,12,20,0.95)",
          backdropFilter: "blur(10px)",
        }}>
          <button
            onClick={() => { setActive(Math.max(0, active - 1)); setExpandedTask(null); }}
            disabled={active === 0}
            style={{
              background: "transparent", border: "1px solid #1a2535",
              color: active === 0 ? "#2d3748" : "#94a3b8",
              padding: "8px 20px", cursor: active === 0 ? "default" : "pointer",
              fontSize: 12, borderRadius: 4, fontFamily: "inherit",
              transition: "all 0.2s",
            }}
          >
            ← Prev Month
          </button>

          <div style={{ display: "flex", gap: 8 }}>
            {months.map((m, i) => (
              <div
                key={i}
                onClick={() => { setActive(i); setExpandedTask(null); }}
                style={{
                  width: active === i ? 24 : 8,
                  height: 4,
                  borderRadius: 2,
                  background: active === i ? m.color : "#1a2535",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: active === i ? `0 0 8px ${m.color}` : "none",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => { setActive(Math.min(5, active + 1)); setExpandedTask(null); }}
            disabled={active === 5}
            style={{
              background: active === 5 ? "transparent" : months[active].color + "22",
              border: `1px solid ${active === 5 ? "#1a2535" : months[active].color}`,
              color: active === 5 ? "#2d3748" : months[active].color,
              padding: "8px 20px", cursor: active === 5 ? "default" : "pointer",
              fontSize: 12, borderRadius: 4, fontFamily: "inherit",
              transition: "all 0.2s",
            }}
          >
            Next Month →
          </button>
        </div>
      </div>
    </div>
  );
}
