// "use client";
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import styles from "./landingpage.module.css";

// const LandingPage = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className={styles.container}>
//       {/* Header */}
//       <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
//         <div className={styles.navbar}>
//           {/* Logo */}
//           <div className={styles.logo}>
//             <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none">
//               <path
//                 d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               />
//               <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" />
//               <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" />
//               <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" />
//               <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" />
//             </svg>
//             <span className={styles.logoText}>ResumeAI Pro</span>
//           </div>

//           {/* Navigation Links */}
//           <nav className={styles.nav}>
//             <a href="#features" className={styles.navLink}>Features</a>
//             <a href="#about" className={styles.navLink}>About</a>
//             <a href="#contact" className={styles.navLink}>Contact</a>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className={styles.heroSection}>
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className={styles.heroContent}
//         >
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className={styles.heroTitle}
//           >
//             Build & Analyze Resumes <br />
//             <span className={styles.heroHighlight}>That Get You Hired</span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className={styles.heroSubtitle}
//           >
//             Create professional resumes with our intuitive builder and get instant AI-powered feedback to optimize your resume for maximum impact.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//             className={styles.heroButtons}
//           >
//             <button className={styles.buttonPrimary} onClick={() => navigate("/builder")}>
//               <svg className={styles.buttonIcon} fill="none" viewBox="0 0 24 24">
//                 <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//               Resume Builder
//             </button>
//             <button className={styles.buttonSecondary} onClick={() => navigate("/analyzer")}>
//               <svg className={styles.buttonIcon} fill="none" viewBox="0 0 24 24">
//                 <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//               AI Resume Analyzer
//             </button>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Placeholder for Features, About, Contact Sections */}
//       <section id="features" className={styles.section}>
//         <h2 className={styles.sectionTitle}>Features</h2>
//         <p className={styles.sectionText}>Our AI and template engine help you stand out from the crowd.</p>
//       </section>

//       <section id="about" className={styles.sectionAlt}>
//         <h2 className={styles.sectionTitle}>About Us</h2>
//         <p className={styles.sectionText}>We are a team of engineers, designers, and recruiters helping professionals worldwide land their dream jobs.</p>
//       </section>

//       <section id="contact" className={styles.section}>
//         <h2 className={styles.sectionTitle}>Contact</h2>
//         <p className={styles.sectionText}>Reach out at contact@resumeaipro.com</p>
//       </section>

//       {/* Footer */}
//       <footer className={styles.footer}>
//         <p>© {new Date().getFullYear()} ResumeAI Pro. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;
  















"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MainPage from "../Mainpage/MainPage"
import styles from "./landingpage.module.css"
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeFeature, setActiveFeature] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-cycle through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const headerClass = scrollY > 50 ? `${styles.header} ${styles.headerScrolled}` : styles.header

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={headerClass}>
        <div className={styles.headerContent}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.logo}
          >
            <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="14,2 14,8 20,8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="16"
                y1="13"
                x2="8"
                y2="13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="16"
                y1="17"
                x2="8"
                y2="17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="10,9 9,9 8,9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.logoText}>Resume Builder & Analyzer </span>
          </motion.div>

          <nav className={styles.nav}>
            {["Features", "Templates", "Analyzer", "Pricing"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                <a href={`#${item.toLowerCase()}`} className={styles.navLink}>
                  {item}
                </a>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            
            <button className={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </motion.div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.mobileMenu}
          >
            <div className={styles.mobileMenuContent}>
              {["Features", "Templates", "Analyzer", "Pricing"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button
                className={`${styles.button} ${styles.buttonPrimary} ${styles.mobileButton}`}
                onClick={() => {
                  setIsMenuOpen(false)
                  setIsModalOpen(true)
                }}
              >
                Get Started Free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroGradient1} />
          <div className={styles.heroGradient2} />
          <div className={styles.heroPattern} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={styles.heroTitle}
            >
              Build Professional Resumes That Get You Hired
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={styles.heroSubtitle}
            >
              Create stunning resumes in minutes with our AI-powered builder and analyzer. Stand out from the crowd with
              professional templates and real-time optimization.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={styles.heroButtons}
            >
              <button
                onClick={() => navigate("/MainPage")}
                className={`${styles.button} ${styles.buttonPrimary} ${styles.heroButton}`}
              >
                Start Building Now
                <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className={`${styles.button} ${styles.buttonSecondary}`}>View Templates</button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className={styles.heroDemo}
          >
            <div className={styles.demoContainer}>
              <div className={styles.demoHeader}>
                <div className={styles.demoControls}>
                  <span className={styles.demoControl}></span>
                  <span className={styles.demoControl}></span>
                  <span className={styles.demoControl}></span>
                </div>
                <span className={styles.demoTitle}>Resume Builder Pro</span>
              </div>

              <div className={styles.demoContent}>
                <div className={styles.demoSidebar}>
                  <div className={styles.demoSidebarItem}>
                    <div className={styles.demoIcon}></div>
                    <span>Personal Info</span>
                  </div>
                  <div className={styles.demoSidebarItem}>
                    <div className={styles.demoIcon}></div>
                    <span>Experience</span>
                  </div>
                  <div className={styles.demoSidebarItem}>
                    <div className={styles.demoIcon}></div>
                    <span>Education</span>
                  </div>
                  <div className={styles.demoSidebarItem}>
                    <div className={styles.demoIcon}></div>
                    <span>Skills</span>
                  </div>
                </div>

                <div className={styles.demoMain}>
                  <div className={styles.demoResume}>
                    <div className={styles.demoResumeHeader}>
                      <div className={styles.demoAvatar}></div>
                      <div className={styles.demoHeaderText}>
                        <div className={styles.demoLine} style={{ width: "60%" }}></div>
                        <div className={styles.demoLine} style={{ width: "40%" }}></div>
                      </div>
                    </div>
                    <div className={styles.demoSection}>
                      <div className={styles.demoSectionTitle}></div>
                      <div className={styles.demoLine}></div>
                      <div className={styles.demoLine} style={{ width: "80%" }}></div>
                      <div className={styles.demoLine} style={{ width: "90%" }}></div>
                    </div>
                    <div className={styles.demoSection}>
                      <div className={styles.demoSectionTitle}></div>
                      <div className={styles.demoLine}></div>
                      <div className={styles.demoLine} style={{ width: "70%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.featuresBackground}>
          <div className={styles.featuresGradient} />
        </div>

        <div className={styles.featuresContent}>
          <div className={styles.sectionHeader}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className={styles.sectionTitle}>Powerful Features</h2>
              <p className={styles.sectionSubtitle}>
                Everything you need to create a professional resume that stands out from the competition.
              </p>
            </motion.div>
          </div>

          <div className={styles.featuresGrid}>
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: "Professional Templates",
                description: "Choose from 50+ ATS-friendly templates designed by HR experts to help you stand out.",
                color: "purple",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: "AI Resume Analyzer",
                description:
                  "Get instant feedback on your resume with our AI-powered analyzer that checks for ATS compatibility.",
                color: "blue",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: "Real-time Editing",
                description:
                  "See your changes instantly with our live preview editor. No more guessing how it will look.",
                color: "green",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: "Multiple Export Formats",
                description:
                  "Download your resume in PDF, Word, or plain text format. Perfect for any application system.",
                color: "orange",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: "Expert Tips",
                description:
                  "Get personalized suggestions and tips from career experts to improve your resume content.",
                color: "pink",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: "Privacy Protected",
                description:
                  "Your data is encrypted and secure. We never share your personal information with third parties.",
                color: "red",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={styles.featureCard}
              >
                <div
                  className={`${styles.featureIcon} ${styles[`featureIcon${feature.color.charAt(0).toUpperCase() + feature.color.slice(1)}`]}`}
                >
                  {feature.icon}
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className={styles.templates}>
        <div className={styles.templatesContent}>
          <div className={styles.sectionHeader}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className={styles.sectionTitle}>Professional Templates</h2>
              <p className={styles.sectionSubtitle}>
                Choose from our collection of professionally designed, ATS-friendly resume templates.
              </p>
            </motion.div>
          </div>

          <div className={styles.templatesGrid}>
            {[
              { name: "Modern Professional", category: "Business", popular: true },
              { name: "Creative Designer", category: "Creative", popular: false },
              { name: "Tech Specialist", category: "Technology", popular: true },
              { name: "Executive Leader", category: "Management", popular: false },
              { name: "Fresh Graduate", category: "Entry Level", popular: true },
              { name: "Healthcare Pro", category: "Healthcare", popular: false },
            ].map((template, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={styles.templateCard}
              >
                {template.popular && <div className={styles.templateBadge}>Popular</div>}
                <div className={styles.templatePreview}>
                  <div className={styles.templateHeader}>
                    <div className={styles.templateAvatar}></div>
                    <div className={styles.templateHeaderText}>
                      <div className={styles.templateLine} style={{ width: "70%" }}></div>
                      <div className={styles.templateLine} style={{ width: "50%" }}></div>
                    </div>
                  </div>
                  <div className={styles.templateBody}>
                    <div className={styles.templateSection}>
                      <div className={styles.templateSectionTitle}></div>
                      <div className={styles.templateLine}></div>
                      <div className={styles.templateLine} style={{ width: "80%" }}></div>
                    </div>
                    <div className={styles.templateSection}>
                      <div className={styles.templateSectionTitle}></div>
                      <div className={styles.templateLine}></div>
                      <div className={styles.templateLine} style={{ width: "90%" }}></div>
                    </div>
                  </div>
                </div>
                <div className={styles.templateInfo}>
                  <h3 className={styles.templateName}>{template.name}</h3>
                  <p className={styles.templateCategory}>{template.category}</p>
                  <button className={`${styles.button} ${styles.buttonSmall} ${styles.buttonOutline}`}>
                    Use Template
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analyzer Section */}
      <section id="analyzer" className={styles.analyzer}>
        <div className={styles.analyzerBackground}>
          <div className={styles.analyzerGradient} />
        </div>

        <div className={styles.analyzerContent}>
          <div className={styles.analyzerGrid}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={styles.analyzerText}
            >
              <h2 className={styles.sectionTitle}>AI-Powered Resume Analyzer</h2>
              <p className={styles.sectionSubtitle}>
                Get instant feedback on your resume with our advanced AI analyzer. Optimize for ATS systems and improve
                your chances of getting hired.
              </p>
              <ul className={styles.analyzerFeatures}>
                {[
                  "ATS Compatibility Check",
                  "Keyword Optimization",
                  "Format & Structure Analysis",
                  "Content Improvement Suggestions",
                  "Industry-Specific Recommendations",
                ].map((feature, i) => (
                  <li key={i} className={styles.analyzerFeature}>
                    <svg
                      className={styles.checkIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`${styles.button} ${styles.buttonPrimary}`}>Try Analyzer Free</button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={styles.analyzerDemo}
            >
              <div className={styles.analyzerDashboard}>
                <div className={styles.analyzerHeader}>
                  <h3>Resume Analysis Results</h3>
                  <div className={styles.analyzerScore}>
                    <div className={styles.scoreCircle}>
                      <span className={styles.scoreNumber}>87</span>
                      <span className={styles.scoreLabel}>Score</span>
                    </div>
                  </div>
                </div>

                <div className={styles.analyzerMetrics}>
                  <div className={styles.metric}>
                    <div className={styles.metricLabel}>ATS Compatibility</div>
                    <div className={styles.metricBar}>
                      <div className={styles.metricProgress} style={{ width: "92%" }}></div>
                    </div>
                    <span className={styles.metricValue}>92%</span>
                  </div>
                  <div className={styles.metric}>
                    <div className={styles.metricLabel}>Keyword Match</div>
                    <div className={styles.metricBar}>
                      <div className={styles.metricProgress} style={{ width: "78%" }}></div>
                    </div>
                    <span className={styles.metricValue}>78%</span>
                  </div>
                  <div className={styles.metric}>
                    <div className={styles.metricLabel}>Format Quality</div>
                    <div className={styles.metricBar}>
                      <div className={styles.metricProgress} style={{ width: "95%" }}></div>
                    </div>
                    <span className={styles.metricValue}>95%</span>
                  </div>
                </div>

                <div className={styles.analyzerSuggestions}>
                  <h4>Improvement Suggestions</h4>
                  <div className={styles.suggestion}>
                    <div className={styles.suggestionIcon}>!</div>
                    <span>Add more industry-specific keywords</span>
                  </div>
                  <div className={styles.suggestion}>
                    <div className={styles.suggestionIcon}>✓</div>
                    <span>Include quantified achievements</span>
                  </div>
                  <div className={styles.suggestion}>
                    <div className={styles.suggestionIcon}>!</div>
                    <span>Optimize section headings</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={styles.pricing}>
        <div className={styles.pricingContent}>
          <div className={styles.sectionHeader}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className={styles.sectionTitle}>Simple, Transparent Pricing</h2>
              <p className={styles.sectionSubtitle}>
                Choose the plan that works best for you. No hidden fees, cancel anytime.
              </p>
            </motion.div>
          </div>

          <div className={styles.pricingGrid}>
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                description: "Perfect for getting started",
                features: ["3 resume templates", "Basic resume builder", "PDF download", "Email support"],
                popular: false,
                buttonText: "Get Started Free",
              },
              {
                name: "Pro",
                price: "$9.99",
                period: "per month",
                description: "Best for job seekers",
                features: [
                  "50+ premium templates",
                  "AI resume analyzer",
                  "Multiple export formats",
                  "Cover letter builder",
                  "Priority support",
                  "ATS optimization",
                ],
                popular: true,
                buttonText: "Start Free Trial",
              },
              {
                name: "Enterprise",
                price: "$29.99",
                period: "per month",
                description: "For teams and organizations",
                features: [
                  "Everything in Pro",
                  "Team collaboration",
                  "Custom branding",
                  "Analytics dashboard",
                  "API access",
                  "Dedicated support",
                ],
                popular: false,
                buttonText: "Contact Sales",
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${styles.pricingCard} ${plan.popular ? styles.pricingCardPopular : ""}`}
              >
                {plan.popular && <div className={styles.pricingBadge}>Most Popular</div>}
                <div className={styles.pricingHeader}>
                  <h3 className={styles.pricingName}>{plan.name}</h3>
                  <div className={styles.pricingPrice}>
                    <span className={styles.pricingAmount}>{plan.price}</span>
                    <span className={styles.pricingPeriod}>/{plan.period}</span>
                  </div>
                  <p className={styles.pricingDescription}>{plan.description}</p>
                </div>
                <ul className={styles.pricingFeatures}>
                  {plan.features.map((feature, i) => (
                    <li key={i} className={styles.pricingFeature}>
                      <svg
                        className={styles.checkIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`${styles.button} ${plan.popular ? styles.buttonPrimary : styles.buttonOutline} ${styles.pricingButton}`}
                  onClick={() => setIsModalOpen(true)}
                >
                  {plan.buttonText}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="14,2 14,8 20,8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="16"
                    y1="13"
                    x2="8"
                    y2="13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="16"
                    y1="17"
                    x2="8"
                    y2="17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="10,9 9,9 8,9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>ResumeBuilder Pro</span>
              </div>
              <p className={styles.footerDescription}>
                Build professional resumes that get you hired. Trusted by thousands of job seekers worldwide.
              </p>
            </div>

            <div className={styles.footerSection}>
              <h4 className={styles.footerTitle}>Product</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#templates">Templates</a>
                </li>
                <li>
                  <a href="#analyzer">Resume Analyzer</a>
                </li>
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
              </ul>
            </div>

            <div className={styles.footerSection}>
              <h4 className={styles.footerTitle}>Resources</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#">Resume Tips</a>
                </li>
                <li>
                  <a href="#">Career Advice</a>
                </li>
                <li>
                  <a href="#">Interview Guide</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
            </div>

            <div className={styles.footerSection}>
              <h4 className={styles.footerTitle}>Support</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>&copy; 2024 ResumeBuilder Pro. All rights reserved.</p>
            <div className={styles.footerSocial}>
              <a href="#" className={styles.socialLink}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a href="#" className={styles.socialLink}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="4"
                    cy="4"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modal} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Start Building Your Resume</h2>
              <button className={styles.modalClose} onClick={() => setIsModalOpen(false)}>
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>
                Join thousands of job seekers who have successfully landed their dream jobs with our resume builder.
              </p>
              <form className={styles.modalForm}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.modalInput}
                />
                <input type="text" placeholder="Full Name" className={styles.modalInput} />
                <button
                  type="submit"
                  className={`${styles.button} ${styles.buttonPrimary} ${styles.modalButton}`}
                  onClick={(e) => {
                    e.preventDefault()
                    alert("Welcome to ResumeBuilder Pro! Let's get started.")
                    setIsModalOpen(false)
                  }}
                >
                  Get Started Free
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
