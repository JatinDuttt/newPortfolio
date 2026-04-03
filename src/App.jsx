import { useEffect, useRef, useState } from "react";

const TYPED_LINES = [
  "Full Stack Developer + DevOps Engineer",
  "Focused on dependable applications and clean delivery",
  "Building with clarity, structure, and reliability"
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
          timeoutId = window.setTimeout(typeLoop, 1400);
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

      timeoutId = window.setTimeout(typeLoop, deleting ? 28 : 54);
    };

    timeoutId = window.setTimeout(typeLoop, 200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const target = Number(entry.target.dataset.count);
          const start = performance.now();
          const duration = 1200;

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            entry.target.textContent = Math.floor(progress * target);

            if (progress < 1) {
              window.requestAnimationFrame(tick);
            } else {
              entry.target.textContent = String(target);
            }
          };

          window.requestAnimationFrame(tick);
          countObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.7 }
    );

    document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));

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
        const top = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progressRef.current.style.width = `${max > 0 ? (top / max) * 100 : 0}%`;
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
      <div className="progress" id="progress" ref={progressRef} />
      <div className="spotlight" id="spotlight" ref={spotlightRef} />

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
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#experience">Experience</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#contact" className="hire">
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="reveal">
              <div className="pill">Open to internships and full-time roles</div>
              <h1>
                Engineering digital products with <span>clarity, reliability, and polish.</span>
              </h1>
              <div className="typed" id="typed">
                {typedText}
              </div>
              <p>
                I am Jatin Dutt, a full stack developer with DevOps experience, focused on building dependable applications,
                improving deployment workflows, and delivering work that reflects strong engineering fundamentals.
              </p>
              <div className="actions">
                <a href="#projects" className="btn primary">
                  View Portfolio
                </a>
                <a href="#contact" className="btn secondary">
                  Contact Me
                </a>
              </div>
              <div className="proof">
                <div className="proof-card">
                  <strong data-count="2">0</strong>
                  <span>Professional Experiences</span>
                </div>
                <div className="proof-card">
                  <strong data-count="3">0</strong>
                  <span>Featured Projects</span>
                </div>
                <div className="proof-card">
                  <strong data-count="14">0</strong>
                  <span>Technical Skills</span>
                </div>
              </div>
            </div>

            <div className="panel reveal" id="tilt" ref={tiltRef}>
              <div className="window">
                <div className="topbar">
                  <span className="dot r" />
                  <span className="dot y" />
                  <span className="dot g" />
                </div>
                <div className="inside">
                  <div className="terminal">
                    <div>
                      <span>$</span> profile.role
                    </div>
                    <div>Full Stack Developer &amp; DevOps Engineer</div>
                    <br />
                    <div>
                      <span>$</span> strengths.list()
                    </div>
                    <div>["application development", "deployment", "cloud workflows", "problem solving"]</div>
                  </div>
                  <div className="panel-grid">
                    <div className="mini">
                      <strong>Professional focus</strong>
                      <p>Application development supported by backend understanding and deployment discipline.</p>
                      <div className="bars">
                        <i />
                        <i />
                        <i />
                        <i />
                      </div>
                    </div>
                    <div className="signal">
                      <div className="badge">Engineering mindset</div>
                      <div style={{ marginTop: ".8rem" }}>
                        <strong>From development to delivery</strong>
                        <p>I build with maintainability, deployment, and reliability in mind.</p>
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
                      <span>Cloud deployment</span>
                    </div>
                    <div>
                      <strong>React</strong>
                      <span>Frontend engineering</span>
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
                <div className="eyebrow">Profile</div>
                <h2>A practical engineer with a product and delivery mindset.</h2>
              </div>
              <p>
                I aim to present myself as someone who can contribute with discipline, learn quickly, communicate clearly,
                and take ownership of work from implementation through deployment.
              </p>
            </div>
            <div className="features">
              <article className="feature reveal">
                <small>01</small>
                <h3>Structured execution</h3>
                <p>I prefer work that is clear, usable, and complete rather than only technically functional.</p>
              </article>
              <article className="feature reveal">
                <small>02</small>
                <h3>Development to deployment thinking</h3>
                <p>I understand how application code, cloud environments, and release workflows connect.</p>
              </article>
              <article className="feature reveal">
                <small>03</small>
                <h3>Strong growth potential</h3>
                <p>My background across Java, React, SQL, Docker, and AWS helps me adapt quickly in engineering teams.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">Experience</div>
                <h2>Professional experience that strengthened my engineering approach.</h2>
              </div>
              <p>
                These roles helped me develop stronger habits around reliability, deployment quality, problem-solving,
                and execution in practical environments.
              </p>
            </div>
            <div className="timeline">
              <article className="timeline-card reveal">
                <div className="date">Jan 2026 - Apr 2026</div>
                <div>
                  <h3>DevOps Engineer Intern</h3>
                  <h4>Restroedge Private Limited</h4>
                  <ul>
                    <li>Built and deployed containerized applications using Docker to improve release consistency.</li>
                    <li>Worked with AWS services including EC2 and S3 to support cloud-based application delivery.</li>
                    <li>Contributed to CI/CD-style workflows that reduced manual deployment effort.</li>
                    <li>Monitored infrastructure health and helped troubleshoot deployment issues quickly.</li>
                  </ul>
                </div>
              </article>
              <article className="timeline-card reveal">
                <div className="date">Jul 2025 - Aug 2025</div>
                <div>
                  <h3>Java Full Stack Trainee</h3>
                  <h4>Vinayak India &amp; Overseas</h4>
                  <ul>
                    <li>Strengthened foundations in Core Java, Advanced Java, and full stack application development.</li>
                    <li>Built practical projects involving backend logic, databases, and user-focused interfaces.</li>
                    <li>Improved code quality and problem-solving through hands-on assignments and implementation work.</li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">Projects</div>
                <h2>Selected work demonstrating technical ability and applied thinking.</h2>
              </div>
              <p>
                These projects reflect how I approach problem-solving, implementation quality, and the practical value
                a solution should provide.
              </p>
            </div>
            <div className="projects">
              <article className="project reveal">
                <div className="topline">
                  <div className="index">Project 01</div>
                  <div className="tag">AI System</div>
                </div>
                <h3>AI Impact Reporting Generator</h3>
                <p>
                  Built an AI-assisted sustainability reporting workflow that estimates environmental impact metrics
                  such as plastic savings and carbon reduction using structured data logic.
                </p>
                <div className="metric">Focus: transforming complex reporting into a clearer and more efficient process.</div>
                <ul className="tags">
                  <li>JavaScript</li>
                  <li>AI Logic</li>
                  <li>Database</li>
                </ul>
              </article>
              <article className="project reveal">
                <div className="topline">
                  <div className="index">Project 02</div>
                  <div className="tag">Automation</div>
                </div>
                <h3>AI Auto Category System</h3>
                <p>
                  Created an AI-powered categorization flow for automatically tagging and classifying products,
                  improving organization and supporting cleaner SEO structure.
                </p>
                <div className="metric">Focus: reducing manual effort while improving consistency and discoverability.</div>
                <ul className="tags">
                  <li>AI</li>
                  <li>JavaScript</li>
                  <li>SEO</li>
                </ul>
              </article>
              <article className="project reveal">
                <div className="topline">
                  <div className="index">Project 03</div>
                  <div className="tag">Platform</div>
                </div>
                <h3>User Management System</h3>
                <p>
                  Developed a user management platform with authentication, role-based access control, and CRUD
                  functionality for structured data handling.
                </p>
                <div className="metric">Focus: secure access management and maintainable application structure.</div>
                <ul className="tags">
                  <li>Auth</li>
                  <li>CRUD</li>
                  <li>Full Stack</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">Skills</div>
                <h2>Technologies I use to build dependable software.</h2>
              </div>
              <p>
                My strongest work happens when frontend, backend, and deployment responsibilities are aligned into one
                dependable workflow.
              </p>
            </div>
            <div className="skills">
              <article className="skill-card reveal">
                <h3>Core stack</h3>
                <ul className="stack">
                  <li>HTML5</li>
                  <li>CSS3</li>
                  <li>JavaScript</li>
                  <li>Java</li>
                  <li>SQL</li>
                  <li>JDBC</li>
                  <li>Python</li>
                  <li>Git</li>
                  <li>Docker</li>
                  <li>AWS EC2 / S3</li>
                  <li>CI/CD</li>
                  <li>Tailwind CSS</li>
                  <li>jQuery</li>
                  <li>Swing</li>
                </ul>
              </article>
              <div className="side">
                <article className="signal-panel reveal">
                  <h3>Professional value</h3>
                  <p>
                    I can contribute to application development while understanding deployment workflows,
                    infrastructure basics, and production readiness.
                  </p>
                </article>
                <article className="signal-panel reveal">
                  <h3>Role alignment</h3>
                  <p>
                    Full Stack Developer, Software Engineer Intern, DevOps Intern, and early-career engineering roles
                    where I can contribute responsibly and continue growing.
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
                <h2>Academic foundation supporting practical engineering work.</h2>
              </div>
              <p>
                My academic background provided core technical knowledge, while projects and internships helped
                translate that knowledge into practical execution.
              </p>
            </div>
            <div className="edu-grid">
              <article className="education reveal">
                <h3>Bachelor of Technology (B.Tech)</h3>
                <p>
                  2022 - 2026
                  <br />
                  Deenbandhu Chhotu Ram University of Science and Technology, Murthal
                </p>
              </article>
              <article className="education reveal">
                <h3>Bachelor of Science</h3>
                <p>
                  2021 - 2022
                  <br />
                  Maharshi Dayanand University, Rohtak
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="container">
            <div className="contact-card reveal">
              <div className="eyebrow">Contact</div>
              <h2>Available for internships and early-career engineering opportunities.</h2>
              <p>
                I am currently open to internships, entry-level software roles, and professional opportunities where I
                can contribute with discipline, learn quickly, and continue growing as an engineer.
              </p>
              <div className="contact-links">
                <a href="/JatinDutt_CV.pdf" className="btn primary" download="JatinDutt_CV.pdf">
                  Download CV
                </a>
                <a href="mailto:duttjatinn@gmail.com" className="btn primary">
                  duttjatinn@gmail.com
                </a>
                <a href="https://github.com/JatinDuttt" target="_blank" rel="noreferrer" className="btn secondary">
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/jatin-dutt-8b357930a/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn secondary"
                >
                  LinkedIn
                </a>
                <a href="https://wa.me/919053620235" target="_blank" rel="noreferrer" className="btn secondary">
                  WhatsApp
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
          <span>Making ordinary things extraordinary</span>
        </div>
      </footer>
    </>
  );
}
