import { useEffect, useRef, useState } from "react";

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
  { label: "Contact", href: "#contact" }
];

const STATS = [
  { value: 2, label: "Industry experiences" },
  { value: 3, label: "Selected projects" },
  { value: 14, label: "Core tools and technologies" }
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
    stack: ["JavaScript", "AI Logic", "Structured Data"]
  },
  {
    index: "Project 02",
    type: "Automation",
    title: "AI Auto Category System",
    description:
      "Built an AI-assisted categorization flow that automatically tags and classifies products to improve organization and SEO consistency.",
    outcome: "Reduced manual effort while producing cleaner catalog structure and stronger discoverability.",
    stack: ["JavaScript", "Automation", "SEO"]
  },
  {
    index: "Project 03",
    type: "Platform",
    title: "User Management System",
    description:
      "Developed a role-based user management platform with authentication, CRUD workflows, and structured access control.",
    outcome: "Delivered a maintainable foundation for secure user operations and admin management.",
    stack: ["Authentication", "CRUD", "Full Stack"]
  }
];

const SKILLS = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "Java",
  "SQL",
  "JDBC",
  "Python",
  "Git",
  "Docker",
  "AWS EC2 / S3",
  "CI/CD",
  "Tailwind CSS",
  "jQuery"
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
  const [typedText, setTypedText] = useState("");
  const spotlightRef = useRef(null);
  const progressRef = useRef(null);
  const tiltRef = useRef(null);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId;

    const typeLoop = () => {
      const text = TYPED_LINES[lineIndex];

      if (!deleting) {
        charIndex += 1;
        setTypedText(text.slice(0, charIndex));

        if (charIndex === text.length) {
          deleting = true;
          timeoutId = window.setTimeout(typeLoop, 1200);
          return;
        }
      } else {
        charIndex -= 1;
        setTypedText(text.slice(0, charIndex));

        if (charIndex === 0) {
          deleting = false;
          lineIndex = (lineIndex + 1) % TYPED_LINES.length;
        }
      }

      timeoutId = window.setTimeout(typeLoop, deleting ? 24 : 48);
    };

    timeoutId = window.setTimeout(typeLoop, 220);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.16 }
    );

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const target = Number(entry.target.dataset.count);
          const start = performance.now();
          const duration = 1100;

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            entry.target.textContent = String(Math.floor(progress * target));

            if (progress < 1) {
              window.requestAnimationFrame(tick);
              return;
            }

            entry.target.textContent = String(target);
          };

          window.requestAnimationFrame(tick);
          countObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.7 }
    );

    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
    document.querySelectorAll("[data-count]").forEach((element) => countObserver.observe(element));

    return () => {
      revealObserver.disconnect();
      countObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const onMouseMove = (event) => {
      if (!spotlightRef.current) {
        return;
      }

      spotlightRef.current.style.left = `${event.clientX}px`;
      spotlightRef.current.style.top = `${event.clientY}px`;
    };

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

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    tiltElement?.addEventListener("mousemove", onTiltMove);
    tiltElement?.addEventListener("mouseleave", onTiltLeave);
    onScroll();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      tiltElement?.removeEventListener("mousemove", onTiltMove);
      tiltElement?.removeEventListener("mouseleave", onTiltLeave);
    };
  }, []);

  return (
    <>
      <div className="progress" ref={progressRef} />
      <div className="spotlight" ref={spotlightRef} />

      <nav>
        <div className="nav-inner">
          <a className="brand" href="#top">
            <div className="brand-mark">JD</div>
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
        </div>
      </nav>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="reveal">
              <div className="pill">Open to full-time roles</div>
              <h1>
                Software that feels <span>reliable, polished, and production-ready.</span>
              </h1>
              <div className="typed">{typedText}</div>
              <p className="lead">
                I'm Jatin Dutt, a full stack developer with DevOps experience. I build applications with a strong focus
                on clean implementation, dependable deployment, and practical engineering discipline.
              </p>

              <div className="actions">
                <a href="#projects" className="btn primary">
                  View Projects
                </a>
                <a href="/JatinDutt_CV.pdf" className="btn secondary" download="JatinDutt_CV.pdf">
                  Download CV
                </a>
              </div>

              <div className="proof">
                {STATS.map((item) => (
                  <div className="proof-card" key={item.label}>
                    <strong data-count={item.value}>0</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel reveal" ref={tiltRef}>
              <div className="window">
                <div className="topbar">
                  <span className="dot r" />
                  <span className="dot y" />
                  <span className="dot g" />
                </div>

                <div className="inside">
                  <div className="terminal">
                    <div>
                      <span>$</span> profile.summary
                    </div>
                    <div>Full Stack Developer and DevOps Engineer</div>
                    <br />
                    <div>
                      <span>$</span> profile.strengths()
                    </div>
                    <div>["frontend", "backend", "cloud workflows", "deployment discipline"]</div>
                  </div>

                  <div className="panel-grid">
                    <div className="mini">
                      <strong>Professional focus</strong>
                      <p>Building software that is clear to maintain, solid in production, and thoughtful in execution.</p>
                      <div className="bars">
                        <i />
                        <i />
                        <i />
                        <i />
                      </div>
                    </div>

                    <div className="signal">
                      <div className="badge">Working style</div>
                      <div className="signal-copy">
                        <strong>Reliable from build to release</strong>
                        <p>I think beyond code and consider delivery, deployment, and long-term maintainability.</p>
                      </div>
                    </div>
                  </div>

                  <div className="strip">
                    <div>
                      <strong>Docker</strong>
                      <span>Containerization</span>
                    </div>
                    <div>
                      <strong>AWS</strong>
                      <span>Cloud delivery</span>
                    </div>
                    <div>
                      <strong>React</strong>
                      <span>Frontend systems</span>
                    </div>
                  </div>
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
                  <div className="metric">{project.outcome}</div>
                  <ul className="tags">
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
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
                <h2>Tools I use to build maintainable applications and dependable delivery pipelines.</h2>
              </div>
              <p>
                I'm most effective in environments where frontend, backend, and deployment concerns need to work
                together smoothly.
              </p>
            </div>

            <div className="skills">
              <article className="skill-card reveal">
                <h3>Core stack</h3>
                <ul className="stack">
                  {SKILLS.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>

              <div className="side">
                <article className="signal-panel reveal">
                  <h3>What I bring</h3>
                  <p>
                    A foundation that spans application development, cloud deployment basics, containerization, and
                    delivery-focused engineering habits.
                  </p>
                </article>
                <article className="signal-panel reveal">
                  <h3>Best-fit roles</h3>
                  <p>
                    Full Stack Developer, Software Engineer, DevOps Engineer, and other full-time engineering roles where
                    I can contribute meaningfully and keep growing quickly.
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
              <div className="eyebrow">Contact</div>
              <h2>Available for full-time engineering roles and growth-focused teams.</h2>
              <p>
                If you're hiring for a role where strong fundamentals, clear communication, and dependable execution
                matter, I'd be glad to connect.
              </p>

              <div className="contact-links">
                <a href="mailto:duttjatinn@gmail.com" className="btn primary">
                  duttjatinn@gmail.com
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
                <a href="tel:9053620235" className="btn secondary">
                  +91 9053620235
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer">
          <span>Jatin Dutt Portfolio</span>
          <span>Built with React and designed for a clearer professional first impression.</span>
        </div>
      </footer>
    </>
  );
}
