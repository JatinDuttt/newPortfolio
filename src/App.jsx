import { useEffect, useRef } from "react";

const TYPED_LINES = [
  "Full Stack Developer and DevOps Engineer",
  "Building reliable products with clean delivery",
  "Focused on shipping work that teams can trust"
];

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" }
];

const STATS = [
  { value: 2, label: "Industry experiences" },
  { value: 3, label: "Selected projects" },
  { value: 20, label: "Core tools and technologies" }
];

const HIGHLIGHTS = [
  {
    number: "01",
    title: "Product-minded execution",
    text: "I care about how software feels to use, how easy it is to maintain, and how confidently it can be released."
  },
  {
    number: "02",
    title: "Development to deployment coverage",
    text: "My background connects frontend, backend, cloud setup, and release workflows into one dependable delivery loop."
  },
  {
    number: "03",
    title: "Early-career, high-ownership mindset",
    text: "I learn quickly, communicate clearly, and aim to contribute with consistency rather than needing heavy oversight."
  }
];

const EXPERIENCE = [
  {
    date: "Jan 2026 - Apr 2026",
    role: "DevOps Engineer Intern",
    company: "Restroedge Private Limited",
    points: [
      "Built and deployed containerized applications with Docker, improving repeatability across environments.",
      "Worked with AWS services such as EC2 and S3 to support cloud hosting and deployment workflows.",
      "Contributed to CI/CD-oriented delivery practices that reduced manual deployment effort.",
      "Helped monitor infrastructure health and troubleshoot release issues with a reliability-first approach."
    ]
  },
  {
    date: "Jul 2025 - Aug 2025",
    role: "Java Full Stack Trainee",
    company: "Vinayak India & Overseas",
    points: [
      "Strengthened practical foundations in Core Java, Advanced Java, SQL, and full stack application development.",
      "Built hands-on projects covering backend logic, database interactions, and user-facing interfaces.",
      "Improved implementation quality through structured assignments, debugging, and problem-solving exercises."
    ]
  }
];

const PROJECTS = [
  {
    index: "Project 01",
    type: "AI Workflow",
    title: "AI Impact Reporting Generator",
    description:
      "Designed a reporting workflow that estimates sustainability metrics such as plastic savings and carbon reduction from structured operational data.",
    outcome: "Turned a complex reporting process into a clearer, faster, and more repeatable system.",
    role: "Frontend flow, calculation logic, and report structure",
    features: ["Metric estimation", "Structured inputs", "Export-ready summary"],
    stack: ["JavaScript", "AI Logic", "Structured Data"],
    liveUrl: ""
  },
  {
    index: "Project 02",
    type: "Automation",
    title: "AI Auto Category System",
    description:
      "Built an AI-assisted categorization flow that automatically tags and classifies products to improve organization and SEO consistency.",
    outcome: "Reduced manual effort while producing cleaner catalog structure and stronger discoverability.",
    role: "Automation logic, category rules, and SEO-focused output",
    features: ["Auto tagging", "Catalog cleanup", "SEO consistency"],
    stack: ["JavaScript", "Automation", "SEO"],
    liveUrl: ""
  },
  {
    index: "Project 03",
    type: "Platform",
    title: "User Management System",
    description:
      "Developed a role-based user management platform with authentication, CRUD workflows, and structured access control.",
    outcome: "Delivered a maintainable foundation for secure user operations and admin management.",
    role: "Authentication, admin workflows, and access-control UI",
    features: ["Role-based access", "CRUD operations", "Admin dashboard"],
    stack: ["Authentication", "CRUD", "Full Stack"],
    liveUrl: ""
  }
];

const SKILL_GROUPS = [
  {
    title: "Frontend",
    summary: "Interfaces that are clean, responsive, and easy to extend.",
    items: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS"]
  },
  {
    title: "Backend & Data",
    summary: "Application logic, persistence, and structured data handling.",
    items: ["Java", "Node.js", "SQL", "JDBC", "Firebase"]
  },
  {
    title: "Cloud & DevOps",
    summary: "Tooling and workflows that help software ship with confidence.",
    items: ["AWS", "Docker", "CI/CD", "Linux", "Shell Scripting", "Git", "GitHub"]
  },
  {
    title: "Core Foundations",
    summary: "Concepts that support maintainable software and dependable systems.",
    items: ["OOP", "DBMS", "REST APIs"]
  }
];

const SKILL_HIGHLIGHTS = [
  {
    label: "Full Stack",
    text: "Frontend implementation plus backend and database fundamentals."
  },
  {
    label: "DevOps Ready",
    text: "Comfortable with containers, deployment workflows, and cloud basics."
  },
  {
    label: "Production Mindset",
    text: "Focused on reliability, maintainability, and clean handoff to teams."
  }
];

const CONTACT_FACTS = [
  { label: "Looking for", value: "Full-time Software Engineer, Full Stack, and DevOps roles" },
  { label: "Based in", value: "Haryana, India" },
  { label: "Work style", value: "Open to onsite, hybrid, and remote opportunities" },
  { label: "Strengths", value: "Clean implementation, quick learning, and dependable execution" }
];

const CONTACT_FOCUS = ["Full Stack Development", "DevOps Workflows", "Cloud Deployment", "Production Readiness"];

const FOOTER_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" }
];

const EDUCATION = [
  {
    degree: "Bachelor of Technology (B.Tech)",
    period: "2022 - 2026",
    school: "Deenbandhu Chhotu Ram University of Science and Technology, Murthal"
  },
  {
    degree: "Bachelor of Science",
    period: "2021 - 2022",
    school: "Maharshi Dayanand University, Rohtak"
  }
];

export default function App() {
  const typedText = TYPED_LINES[0];
  const progressRef = useRef(null);
  const tiltRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (progressRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
        progressRef.current.style.width = `${percent}%`;
      }

      const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
      const sections = document.querySelectorAll("main section[id]");

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const active = rect.top <= 140 && rect.bottom >= 140;

        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${section.id}` && active);
        });
      });
    };

    const onTiltMove = (event) => {
      if (!tiltRef.current) {
        return;
      }

      const rect = tiltRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      tiltRef.current.style.transform = `perspective(1200px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    };

    const onTiltLeave = () => {
      if (tiltRef.current) {
        tiltRef.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
      }
    };

    const tiltElement = tiltRef.current;

    window.addEventListener("scroll", onScroll, { passive: true });
    tiltElement?.addEventListener("mousemove", onTiltMove);
    tiltElement?.addEventListener("mouseleave", onTiltLeave);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      tiltElement?.removeEventListener("mousemove", onTiltMove);
      tiltElement?.removeEventListener("mouseleave", onTiltLeave);
    };
  }, []);

  useEffect(() => {
    const removeExtensionOverlays = () => {
      document.querySelectorAll("[data-extension-id], [data-extension], [data-ext], iframe[src^='chrome-extension://']").forEach((node) => {
        node.remove();
      });

      document.querySelectorAll("img[src^='chrome-extension://'], script[src^='chrome-extension://']").forEach((node) => {
        node.remove();
      });
    };

    removeExtensionOverlays();
    const observer = new MutationObserver(removeExtensionOverlays);
    observer.observe(document.documentElement, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  const closeMobileMenu = (event) => {
    event.currentTarget.closest("details")?.removeAttribute("open");
  };

  return (
    <>
      <div className="progress" ref={progressRef} aria-hidden="true" />

      <nav aria-label="Primary navigation">
        <div className="nav-inner">
          <a className="brand" href="#top">
            <div className="brand-mark">
              <img
                src="/profile-160.png"
                sizes="45px"
                width="45"
                height="45"
                alt="Jatin Dutt"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                  const fallback = event.currentTarget.nextElementSibling;
                  if (fallback) {
                    fallback.hidden = false;
                  }
                }}
              />
              <span className="brand-fallback" hidden>
                JD
              </span>
            </div>
            <div>
              <strong>Jatin Dutt</strong>
              <span>Full Stack + DevOps</span>
            </div>
          </a>

          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={item.href === "#contact" ? "hire" : ""}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <details className="mobile-menu">
            <summary>Menu</summary>
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={closeMobileMenu}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </nav>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="reveal">
              <div className="pill">Jatin Dutt // Full Stack + DevOps</div>
              <h1>
                I build software teams can <span>ship with confidence.</span>
              </h1>
              <div className="typed">{typedText}</div>
              <p className="lead">
                I'm Jatin Dutt, a full stack developer with DevOps experience focused on clean interfaces, dependable
                backend logic, and delivery workflows that hold up in production.
              </p>

              <div className="actions">
                <a href="#projects" className="btn primary">
                  View Projects
                </a>
                <a href="/JatinDutt_CV.pdf" className="btn secondary" download="JatinDutt_CV.pdf">
                  Download CV
                </a>
              </div>

              <div className="hero-availability">
                <span>Available for full-time roles</span>
                <a href="mailto:duttjatinn@gmail.com">duttjatinn@gmail.com</a>
                <a href="https://www.linkedin.com/in/jatin-dutt-8b357930a/" target="_blank" rel="noreferrer">
                  Jatin Dutt on LinkedIn
                </a>
              </div>

              <div className="proof">
                {STATS.map((item) => (
                  <div className="proof-card" key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel reveal" ref={tiltRef}>
              <div className="hero-card">
                <div className="hero-card-head">
                  <span className="hero-card-label">Portfolio Snapshot</span>
                  <span className="hero-card-status">Available</span>
                </div>

                <div className="hero-card-profile">
                  <div className="hero-card-avatar">
                    <img
                      src="/profile-160.png"
                      sizes="80px"
                      width="80"
                      height="80"
                      alt="Jatin Dutt"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                        const fallback = event.currentTarget.nextElementSibling;
                        if (fallback) {
                          fallback.hidden = false;
                        }
                      }}
                    />
                    <span className="hero-card-avatar-fallback" hidden>
                      JD
                    </span>
                  </div>

                  <div className="hero-card-copy">
                    <h2>Jatin Dutt</h2>
                    <p>Full Stack Developer + DevOps Engineer</p>
                    <span>{typedText}</span>
                  </div>
                </div>

                <div className="hero-card-note">
                  I build software with clear structure, dependable delivery, and a strong bias toward maintainable implementation.
                </div>

                <div className="hero-card-grid">
                  <article className="hero-card-block hero-card-block-accent">
                    <small>Focus</small>
                    <strong>Frontend, backend, and cloud workflows</strong>
                    <p>Balanced across product UI, backend logic, and deployment basics.</p>
                  </article>

                  <article className="hero-card-block">
                    <small>Style</small>
                    <strong>Clean, reliable, production-minded</strong>
                    <p>I care about code quality, handoff clarity, and smooth releases.</p>
                  </article>
                </div>

                <div className="hero-card-stack">
                  <span>React</span>
                  <span>Java</span>
                  <span>AWS</span>
                  <span>Docker</span>
                  <span>CI/CD</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">About</div>
                <h2>An engineer who values execution quality as much as technical skill.</h2>
              </div>
              <p>
                I aim to contribute as someone who is dependable, fast to learn, and thoughtful about how software moves
                from implementation to production.
              </p>
            </div>

            <div className="features">
              {HIGHLIGHTS.map((item) => (
                <article className="feature reveal" key={item.number}>
                  <small>{item.number}</small>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">Experience</div>
                <h2>Hands-on roles that strengthened both engineering discipline and delivery thinking.</h2>
              </div>
              <p>
                My professional training and hands-on experience helped me connect code quality, deployment workflows,
                and practical problem-solving in real work settings.
              </p>
            </div>

            <div className="timeline">
              {EXPERIENCE.map((item) => (
                <article className="timeline-card reveal" key={`${item.company}-${item.role}`}>
                  <div className="date">{item.date}</div>
                  <div>
                    <h3>{item.role}</h3>
                    <h4>{item.company}</h4>
                    <ul>
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">Projects</div>
                <h2>Selected work that shows how I approach real implementation problems.</h2>
              </div>
              <p>
                Each project reflects a balance of practical thinking, implementation quality, and attention to useful
                outcomes rather than just feature completion.
              </p>
            </div>

            <div className="projects">
              {PROJECTS.map((project) => (
                <article className="project reveal" key={project.title}>
                  <div className="topline">
                    <div className="index">{project.index}</div>
                    <div className="tag">{project.type}</div>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-role">
                    <span>Role</span>
                    <strong>{project.role}</strong>
                  </div>
                  <ul className="project-features">
                    {project.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <div className="metric">{project.outcome}</div>
                  <ul className="tags">
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link"
                      aria-label={`Open ${project.title}`}
                    >
                      Open Project
                    </a>
                  ) : (
                    <span className="project-link disabled">
                      Vercel Link Coming Soon
                    </span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">Skills</div>
                <h2>Technical strengths shaped around shipping polished applications and reliable delivery workflows.</h2>
              </div>
              <p>
                My strongest work sits at the intersection of product building and delivery, where code quality,
                deployment discipline, and maintainability all matter together.
              </p>
            </div>

            <div className="skills">
              <div className="skill-grid">
                {SKILL_GROUPS.map((group) => (
                  <article className="skill-card reveal" key={group.title}>
                    <div className="skill-card-head">
                      <h3>{group.title}</h3>
                      <p>{group.summary}</p>
                    </div>
                    <ul className="stack">
                      {group.items.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <div className="side">
                <article className="signal-panel reveal">
                  <h3>Where I add value</h3>
                  <div className="highlight-list">
                    {SKILL_HIGHLIGHTS.map((item) => (
                      <div className="highlight-item" key={item.label}>
                        <strong>{item.label}</strong>
                        <p>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </article>
                <article className="signal-panel reveal">
                  <h3>Best-fit opportunities</h3>
                  <p>
                    This profile is strongest for Full Stack Developer, Software Engineer, and early-career DevOps roles
                    where I can contribute across implementation, deployment, and iterative product improvement.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="education">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">Education</div>
                <h2>Academic grounding backed by practical project and hands-on industry experience.</h2>
              </div>
              <p>
                My coursework built the technical base, while project work and practical experience helped translate
                that knowledge into execution.
              </p>
            </div>

            <div className="edu-grid">
              {EDUCATION.map((item) => (
                <article className="education reveal" key={item.degree}>
                  <h3>{item.degree}</h3>
                  <p>
                    {item.period}
                    <br />
                    {item.school}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="container">
            <div className="contact-card reveal">
              <div className="contact-layout">
                <div className="contact-main">
                  <div className="eyebrow">Contact</div>
                  <h2>Available for full-time engineering roles and growth-focused teams.</h2>
                  <p>
                    If you're hiring for a role where strong fundamentals, clear communication, and dependable
                    execution matter, I'd be glad to connect.
                  </p>

                  <div className="contact-links">
                    <a
                      href="mailto:duttjatinn@gmail.com"
                      className="btn primary icon-btn"
                      aria-label="Email"
                      title="Email"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M3 5.75A2.75 2.75 0 0 1 5.75 3h12.5A2.75 2.75 0 0 1 21 5.75v12.5A2.75 2.75 0 0 1 18.25 21H5.75A2.75 2.75 0 0 1 3 18.25V5.75Zm2.2-.75a.75.75 0 0 0-.44 1.36l6.8 4.94a.75.75 0 0 0 .88 0l6.8-4.94A.75.75 0 0 0 18.8 5H5.2Zm14.3 2.82-6.18 4.49a2.25 2.25 0 0 1-2.64 0L4.5 7.82v10.43c0 .41.34.75.75.75h13.5c.41 0 .75-.34.75-.75V7.82Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://github.com/JatinDuttt"
                      target="_blank"
                      rel="noreferrer"
                      className="btn secondary icon-btn"
                      aria-label="GitHub"
                      title="GitHub"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.93c.58.11.79-.25.79-.56v-2.18c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.69.08-.69 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.27 1.19-3.07-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.19 1.17A11.1 11.1 0 0 1 12 6.1c.98 0 1.97.13 2.9.38 2.22-1.48 3.19-1.17 3.19-1.17.63 1.57.23 2.73.11 3.02.74.8 1.19 1.82 1.19 3.07 0 4.41-2.7 5.39-5.27 5.67.41.35.78 1.04.78 2.09v3.1c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/jatin-dutt-8b357930a/"
                      target="_blank"
                      rel="noreferrer"
                      className="btn secondary icon-btn"
                      aria-label="LinkedIn"
                      title="LinkedIn"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46 2.48 2.48 0 0 0 4.98 3.5ZM2.75 9.75h4.46V21H2.75V9.75ZM10.01 9.75h4.28v1.54h.06c.6-1.13 2.06-2.32 4.25-2.32 4.54 0 5.38 2.99 5.38 6.88V21h-4.45v-4.57c0-1.09-.02-2.49-1.52-2.49-1.52 0-1.75 1.19-1.75 2.41V21h-4.45V9.75Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://wa.me/919053620235"
                      target="_blank"
                      rel="noreferrer"
                      className="btn secondary icon-btn"
                      aria-label="WhatsApp"
                      title="WhatsApp"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M20.52 3.48A11.85 11.85 0 0 0 12.06 0C5.5 0 .16 5.33.16 11.9c0 2.1.55 4.15 1.58 5.96L0 24l6.32-1.65a11.84 11.84 0 0 0 5.74 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44ZM12.07 21.8h-.01a9.85 9.85 0 0 1-5.02-1.38l-.36-.21-3.75.98 1-3.66-.24-.38a9.84 9.84 0 0 1-1.52-5.25c0-5.44 4.43-9.87 9.88-9.87 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.9 6.97c0 5.45-4.43 9.89-9.86 9.89Zm5.41-7.41c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.69.15-.2.3-.79.98-.96 1.18-.18.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.46-.88-.79-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.69-1.66-.95-2.27-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.53.08-.81.38-.28.3-1.07 1.04-1.07 2.53 0 1.49 1.09 2.93 1.24 3.13.15.2 2.13 3.26 5.16 4.57.72.31 1.29.49 1.74.63.73.23 1.39.2 1.91.12.58-.09 1.78-.73 2.03-1.43.25-.71.25-1.31.17-1.43-.07-.12-.27-.2-.57-.35Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                    <a
                      href="tel:9053620235"
                      className="btn secondary icon-btn"
                      aria-label="Phone"
                      title="Phone"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20a1 1 0 0 1-1 1C10.06 21 3 13.94 3 5a1 1 0 0 1 1-1h3.49c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.19 2.2Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="contact-side">
                  <article className="contact-panel">
                    <h3>Quick details</h3>
                    <div className="contact-facts">
                      {CONTACT_FACTS.map((item) => (
                        <div className="contact-fact" key={item.label}>
                          <span>{item.label}</span>
                          <strong>{item.value}</strong>
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="contact-panel">
                    <h3>Best aligned with</h3>
                    <ul className="contact-focus">
                      {CONTACT_FOCUS.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="footer-name">Jatin Dutt</span>
              <p>
                Full Stack Developer with DevOps exposure, focused on building maintainable products and shipping them
                with reliability.
              </p>
            </div>

            <div className="footer-nav">
              {FOOTER_LINKS.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>

            <a className="footer-toplink" href="#top">
              Back to top
            </a>
          </div>

          <div className="footer-bottom">
            <span>Built with React for a sharper professional presence.</span>
            <span>Open to full-time engineering opportunities.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
