"use client"

import { useState, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import styles from "./resumebuilder.module.css"


const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState("personal")
  const [previewMode, setPreviewMode] = useState(false)
  const formRef = useRef(null)

  const [resumeData, setResumeData] = useState({
    template: "standard",
    font: "inter",
    personal: {
      name: "John Doe",
      email: "mail@mail.com",
      phone: "+351 919191919",
      location: "Lisbon, Portugal",
      linkedin: "https://www.linkedin.com/in/john/",
      github: "https://github.com/john",
      website: "https://john.dev/",
      jobTitle: "Software Engineer",
    },
    summary: "Software Engineer with X years of full stack web development...",
    experience: [
      {
        id: "exp1",
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ],
    education: [
      {
        id: "edu1",
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    skills: [{ id: "skill1", name: "", level: "Intermediate" }],
    languages: [{ id: "lang1", name: "", proficiency: "Intermediate" }],
    certifications: [
      {
        id: "cert1",
        name: "",
        issuer: "",
        date: "",
        url: "",
      },
    ],
    projects: [
      {
        id: "proj1",
        name: "",
        description: "",
        url: "",
        technologies: "",
      },
    ],
    hobbies: "Self-hosting, 3D printing, Open-source contributions, Hackathons...",
  })

  const handleInputChange = (section, field, value) => {
    setResumeData({
      ...resumeData,
      [section]: {
        ...resumeData[section],
        [field]: value,
      },
    })
  }

  const handleArrayInputChange = (section, index, field, value) => {
    const newArray = [...resumeData[section]]
    newArray[index] = {
      ...newArray[index],
      [field]: value,
    }
    setResumeData({
      ...resumeData,
      [section]: newArray,
    })
  }

  const addItem = (section) => {
    const id = `${section.slice(0, 3)}${resumeData[section].length + 1}`
    let newItem = {}

    switch (section) {
      case "experience":
        newItem = {
          id,
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        }
        break
      case "education":
        newItem = {
          id,
          degree: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        }
        break
      case "skills":
        newItem = { id, name: "", level: "Intermediate" }
        break
      case "languages":
        newItem = { id, name: "", proficiency: "Intermediate" }
        break
      case "certifications":
        newItem = {
          id,
          name: "",
          issuer: "",
          date: "",
          url: "",
        }
        break
      case "projects":
        newItem = {
          id,
          name: "",
          description: "",
          url: "",
          technologies: "",
        }
        break
      default:
        break
    }

    setResumeData({
      ...resumeData,
      [section]: [...resumeData[section], newItem],
    })
  }

  const removeItem = (section, id) => {
    const newArray = resumeData[section].filter((item) => item.id !== id)
    setResumeData({
      ...resumeData,
      [section]: newArray,
    })
  }

  const handleTemplateChange = (template) => {
    setResumeData({
      ...resumeData,
      template,
    })
  }

  const handleFontChange = (font) => {
    setResumeData({
      ...resumeData,
      font,
    })
  }

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode)
  }

 /* const handleDownloadPDF = useCallback(async () => {
    try {
      // Dynamic import of jsPDF
      const { jsPDF } = await import("jspdf")

      const doc = new jsPDF()
      doc.setFont("helvetica")

      let yPosition = 20
      const pageWidth = doc.internal.pageSize.width
      const margin = 20
      const contentWidth = pageWidth - margin * 2

      if (resumeData.template === "standard") {
        // Standard Template PDF Layout
        doc.setFontSize(24)
        doc.setFont("helvetica", "bold")
        const nameWidth = doc.getTextWidth(resumeData.personal.name)
        doc.text(resumeData.personal.name, (pageWidth - nameWidth) / 2, yPosition)
        yPosition += 10

        doc.setFontSize(16)
        doc.setFont("helvetica", "normal")
        const jobTitleWidth = doc.getTextWidth(resumeData.personal.jobTitle)
        doc.text(resumeData.personal.jobTitle, (pageWidth - jobTitleWidth) / 2, yPosition)
        yPosition += 15

        doc.setFontSize(10)
        const contactInfo = `${resumeData.personal.email} | ${resumeData.personal.phone} | ${resumeData.personal.location}`
        const contactWidth = doc.getTextWidth(contactInfo)
        doc.text(contactInfo, (pageWidth - contactWidth) / 2, yPosition)
        yPosition += 8

        if (resumeData.personal.linkedin || resumeData.personal.github || resumeData.personal.website) {
          const links = [resumeData.personal.linkedin, resumeData.personal.github, resumeData.personal.website]
            .filter(Boolean)
            .join(" | ")
          const linksWidth = doc.getTextWidth(links)
          doc.text(links, (pageWidth - linksWidth) / 2, yPosition)
          yPosition += 15
        }

        doc.setLineWidth(0.5)
        doc.line(margin, yPosition, pageWidth - margin, yPosition)
        yPosition += 15
      } else {
        // Minimal Template PDF Layout
        doc.setFontSize(20)
        doc.setFont("helvetica", "bold")
        doc.text(resumeData.personal.name, margin, yPosition)
        yPosition += 8

        doc.setFontSize(12)
        doc.setFont("helvetica", "normal")
        doc.text(resumeData.personal.jobTitle, margin, yPosition)
        yPosition += 10

        doc.setFontSize(10)
        if (resumeData.personal.github) {
          doc.text(`GitHub: ${resumeData.personal.github}`, margin, yPosition)
          yPosition += 6
        }
        if (resumeData.personal.website) {
          doc.text(`Website: ${resumeData.personal.website}`, margin, yPosition)
          yPosition += 10
        }

        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")
        doc.text("CONTACT", margin, yPosition)
        yPosition += 8

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.text(resumeData.personal.email, margin, yPosition)
        yPosition += 6
        doc.text(resumeData.personal.phone, margin, yPosition)
        yPosition += 6
        doc.text(resumeData.personal.location, margin, yPosition)
        yPosition += 6
        if (resumeData.personal.linkedin) {
          doc.text(resumeData.personal.linkedin, margin, yPosition)
          yPosition += 10
        }
      }

      // Summary Section
      if (resumeData.summary) {
        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")
        doc.text("SUMMARY", margin, yPosition)
        yPosition += 8

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        const summaryLines = doc.splitTextToSize(resumeData.summary, contentWidth)
        doc.text(summaryLines, margin, yPosition)
        yPosition += summaryLines.length * 5 + 10
      }

      // Work Experience Section
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("WORK EXPERIENCE", margin, yPosition)
      yPosition += 8

      doc.setFontSize(10)
      doc.setFont("helvetica", "italic")
      doc.text("Work experience items will appear here when added.", margin, yPosition)
      yPosition += 15

      // Education Section
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("EDUCATION", margin, yPosition)
      yPosition += 8

      doc.setFontSize(10)
      doc.setFont("helvetica", "italic")
      doc.text("Education items will appear here when added.", margin, yPosition)
      yPosition += 15

      // Skills Section
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("SKILLS", margin, yPosition)
      yPosition += 8

      doc.setFontSize(10)
      doc.setFont("helvetica", "italic")
      doc.text("Skills will appear here when added.", margin, yPosition)
      yPosition += 15

      // Hobbies Section
      if (resumeData.hobbies) {
        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")
        doc.text("HOBBIES", margin, yPosition)
        yPosition += 8

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        const hobbiesLines = doc.splitTextToSize(resumeData.hobbies, contentWidth)
        doc.text(hobbiesLines, margin, yPosition)
      }

      // Save the PDF
      const fileName = `${resumeData.personal.name.replace(/\s+/g, "_")}_Resume.pdf`
      doc.save(fileName)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again.")
    }
  }, [resumeData])*/

  const handleDownloadPDF = useCallback(async () => {
    try {
      // Dynamic import of jsPDF
      const { jsPDF } = await import("jspdf")
      const doc = new jsPDF()

      let yPosition = 20
      const pageWidth = doc.internal.pageSize.width
      const pageHeight = doc.internal.pageSize.height
      const margin = 20
      const contentWidth = pageWidth - margin * 2

      // Helper function to check if we need a new page
      const checkPageBreak = (requiredSpace) => {
        if (yPosition + requiredSpace > pageHeight - margin) {
          doc.addPage()
          yPosition = margin
        }
      }

      // Helper function to add text with word wrapping
      const addWrappedText = (text, x, y, maxWidth, fontSize = 10) => {
        doc.setFontSize(fontSize)
        const lines = doc.splitTextToSize(text, maxWidth)
        doc.text(lines, x, y)
        return lines.length * (fontSize * 0.4) // Return height used
      }

      // Header Section
      doc.setFontSize(24)
      doc.setFont("helvetica", "bold")
      const nameWidth = doc.getTextWidth(resumeData.personal.name)
      doc.text(resumeData.personal.name, (pageWidth - nameWidth) / 2, yPosition)
      yPosition += 10

      doc.setFontSize(16)
      doc.setFont("helvetica", "normal")
      const jobTitleWidth = doc.getTextWidth(resumeData.personal.jobTitle)
      doc.text(resumeData.personal.jobTitle, (pageWidth - jobTitleWidth) / 2, yPosition)
      yPosition += 15

      // Contact Information
      doc.setFontSize(10)
      const contactInfo = `${resumeData.personal.email} | ${resumeData.personal.phone} | ${resumeData.personal.location}`
      const contactWidth = doc.getTextWidth(contactInfo)
      doc.text(contactInfo, (pageWidth - contactWidth) / 2, yPosition)
      yPosition += 8

      if (resumeData.personal.linkedin || resumeData.personal.github || resumeData.personal.website) {
        const links = [resumeData.personal.linkedin, resumeData.personal.github, resumeData.personal.website]
          .filter(Boolean)
          .join(" | ")
        const linksWidth = doc.getTextWidth(links)
        doc.text(links, (pageWidth - linksWidth) / 2, yPosition)
        yPosition += 15
      }

      // Separator line
      doc.setLineWidth(0.5)
      doc.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 15

      // Professional Summary
      if (resumeData.summary) {
        checkPageBreak(30)
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("PROFESSIONAL SUMMARY", margin, yPosition)
        yPosition += 10

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        const summaryHeight = addWrappedText(resumeData.summary, margin, yPosition, contentWidth)
        yPosition += summaryHeight + 15
      }

      // Work Experience Section - FIXED TO INCLUDE ACTUAL DATA
      if (resumeData.experience.length > 0 && resumeData.experience[0].title) {
        checkPageBreak(30)
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("WORK EXPERIENCE", margin, yPosition)
        yPosition += 10

        resumeData.experience.forEach((exp) => {
          if (exp.title) {
            checkPageBreak(40)

            doc.setFontSize(12)
            doc.setFont("helvetica", "bold")
            doc.text(exp.title, margin, yPosition)
            yPosition += 6

            doc.setFontSize(10)
            doc.setFont("helvetica", "normal")
            const companyLocation = exp.location ? `${exp.company}, ${exp.location}` : exp.company
            doc.text(companyLocation, margin, yPosition)

            const dateRange = exp.current ? `${exp.startDate} - Present` : `${exp.startDate} - ${exp.endDate}`
            const dateWidth = doc.getTextWidth(dateRange)
            doc.text(dateRange, pageWidth - margin - dateWidth, yPosition)
            yPosition += 8

            if (exp.description) {
              const descHeight = addWrappedText(exp.description, margin, yPosition, contentWidth)
              yPosition += descHeight + 10
            }
          }
        })
        yPosition += 5
      }

      // Education Section - FIXED TO INCLUDE ACTUAL DATA
      if (resumeData.education.length > 0 && resumeData.education[0].degree) {
        checkPageBreak(30)
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("EDUCATION", margin, yPosition)
        yPosition += 10

        resumeData.education.forEach((edu) => {
          if (edu.degree) {
            checkPageBreak(30)

            doc.setFontSize(12)
            doc.setFont("helvetica", "bold")
            doc.text(edu.degree, margin, yPosition)
            yPosition += 6

            doc.setFontSize(10)
            doc.setFont("helvetica", "normal")
            const institutionLocation = edu.location ? `${edu.institution}, ${edu.location}` : edu.institution
            doc.text(institutionLocation, margin, yPosition)

            const dateRange = `${edu.startDate} - ${edu.endDate}`
            const dateWidth = doc.getTextWidth(dateRange)
            doc.text(dateRange, pageWidth - margin - dateWidth, yPosition)
            yPosition += 8

            if (edu.description) {
              const descHeight = addWrappedText(edu.description, margin, yPosition, contentWidth)
              yPosition += descHeight + 10
            }
          }
        })
        yPosition += 5
      }

      // Skills Section - FIXED TO INCLUDE ACTUAL DATA
      if (resumeData.skills.length > 0 && resumeData.skills[0].name) {
        checkPageBreak(30)
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("SKILLS", margin, yPosition)
        yPosition += 10

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        const skillsText = resumeData.skills
          .filter((skill) => skill.name)
          .map((skill) => `${skill.name} (${skill.level})`)
          .join(" • ")

        const skillsHeight = addWrappedText(skillsText, margin, yPosition, contentWidth)
        yPosition += skillsHeight + 15
      }

      // Languages
      if (resumeData.languages.length > 0 && resumeData.languages[0].name) {
        checkPageBreak(20)
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("LANGUAGES", margin, yPosition)
        yPosition += 10

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        const languagesText = resumeData.languages
          .filter((lang) => lang.name)
          .map((lang) => `${lang.name} (${lang.proficiency})`)
          .join(" • ")

        const langHeight = addWrappedText(languagesText, margin, yPosition, contentWidth)
        yPosition += langHeight + 15
      }

      // Certifications
      if (resumeData.certifications.length > 0 && resumeData.certifications[0].name) {
        checkPageBreak(30)
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("CERTIFICATIONS", margin, yPosition)
        yPosition += 10

        resumeData.certifications.forEach((cert) => {
          if (cert.name) {
            checkPageBreak(20)

            doc.setFontSize(10)
            doc.setFont("helvetica", "bold")
            doc.text(cert.name, margin, yPosition)
            yPosition += 5

            doc.setFont("helvetica", "normal")
            const certInfo = `${cert.issuer} - ${cert.date}`
            doc.text(certInfo, margin, yPosition)
            yPosition += 8
          }
        })
        yPosition += 5
      }

      // Projects
      if (resumeData.projects.length > 0 && resumeData.projects[0].name) {
        checkPageBreak(30)
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("PROJECTS", margin, yPosition)
        yPosition += 10

        resumeData.projects.forEach((proj) => {
          if (proj.name) {
            checkPageBreak(30)

            doc.setFontSize(12)
            doc.setFont("helvetica", "bold")
            doc.text(proj.name, margin, yPosition)
            yPosition += 6

            if (proj.technologies) {
              doc.setFontSize(9)
              doc.setFont("helvetica", "italic")
              doc.text(`Technologies: ${proj.technologies}`, margin, yPosition)
              yPosition += 6
            }

            if (proj.description) {
              doc.setFontSize(10)
              doc.setFont("helvetica", "normal")
              const descHeight = addWrappedText(proj.description, margin, yPosition, contentWidth)
              yPosition += descHeight + 8
            }
          }
        })
        yPosition += 5
      }

      // Hobbies
      if (resumeData.hobbies) {
        checkPageBreak(20)
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("HOBBIES & INTERESTS", margin, yPosition)
        yPosition += 10

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        addWrappedText(resumeData.hobbies, margin, yPosition, contentWidth)
      }

      // Save the PDF
      const fileName = `${resumeData.personal.name.replace(/\s+/g, "_")}_Resume.pdf`
      doc.save(fileName)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again.")
    }
  }, [resumeData])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Resume data:", resumeData)
    alert("Resume saved successfully!")
  }

  const sections = [
    { id: "personal", label: "Personal Info", icon: "👤" },
    { id: "summary", label: "Summary", icon: "📝" },
    { id: "experience", label: "Work Experience", icon: "💼" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "languages", label: "Languages", icon: "🌐" },
    { id: "certifications", label: "Certifications", icon: "🏆" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "hobbies", label: "Hobbies", icon: "🎮" },
  ]

  const templates = [
    { id: "standard", name: "Standard" },
    { id: "minimal", name: "Minimal" },
    { id: "modern", name: "Modern" },
    { id: "creative", name: "Creative" },
  ]

  const fonts = [
    { id: "inter", name: "Inter", class: "font-inter" },
    { id: "roboto", name: "Roboto", class: "font-roboto" },
    { id: "poppins", name: "Poppins", class: "font-poppins" },
    { id: "montserrat", name: "Montserrat", class: "font-montserrat" },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Resume Builder</h1>
          <div className={styles.actions}>
            <button className={styles.previewButton} onClick={togglePreviewMode}>
              {previewMode ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3 17V7c0-1.1.9-2 2-2h4v2H5v10h4v2H5c-1.1 0-2-.9-2-2zm16 0V7c0-1.1-.9-2-2-2h-4v2h4v10h-4v2h4c1.1 0 2-.9 2-2zm-8-6V9h-2V7h2V5h2v2h2v2h-2v2h-2z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Edit Resume
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Preview Resume
                </>
              )}
            </button>
            <button className={styles.downloadButton} onClick={handleDownloadPDF}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {previewMode ? (
          <div className={styles.previewContainer}>
            <div className={`${styles.resumePreview} ${styles[resumeData.template]} ${styles[resumeData.font]}`}>
              <div className={styles.previewHeader}>
                <h1 className={styles.previewName}>{resumeData.personal.name || "Your Name"}</h1>
                <p className={styles.previewJobTitle}>{resumeData.personal.jobTitle || "Professional Title"}</p>
                <div className={styles.previewContact}>
                  {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                  {resumeData.personal.phone && <span>{resumeData.personal.phone}</span>}
                  {resumeData.personal.location && <span>{resumeData.personal.location}</span>}
                </div>
                <div className={styles.previewLinks}>
                  {resumeData.personal.linkedin && <span>LinkedIn: {resumeData.personal.linkedin}</span>}
                  {resumeData.personal.github && <span>GitHub: {resumeData.personal.github}</span>}
                  {resumeData.personal.website && <span>Website: {resumeData.personal.website}</span>}
                </div>
              </div>

              {resumeData.summary && (
                <div className={styles.previewSection}>
                  <h2 className={styles.previewSectionTitle}>Professional Summary</h2>
                  <p className={styles.previewSummary}>{resumeData.summary}</p>
                </div>
              )}

              {resumeData.experience.length > 0 && resumeData.experience[0].title && (
                <div className={styles.previewSection}>
                  <h2 className={styles.previewSectionTitle}>Work Experience</h2>
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className={styles.previewItem}>
                      <div className={styles.previewItemHeader}>
                        <h3 className={styles.previewItemTitle}>{exp.title}</h3>
                        <p className={styles.previewItemSubtitle}>
                          {exp.company}
                          {exp.location && `, ${exp.location}`}
                        </p>
                        <p className={styles.previewItemDate}>
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </p>
                      </div>
                      <p className={styles.previewItemDescription}>{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {resumeData.education.length > 0 && resumeData.education[0].degree && (
                <div className={styles.previewSection}>
                  <h2 className={styles.previewSectionTitle}>Education</h2>
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className={styles.previewItem}>
                      <div className={styles.previewItemHeader}>
                        <h3 className={styles.previewItemTitle}>{edu.degree}</h3>
                        <p className={styles.previewItemSubtitle}>
                          {edu.institution}
                          {edu.location && `, ${edu.location}`}
                        </p>
                        <p className={styles.previewItemDate}>
                          {edu.startDate} - {edu.endDate}
                        </p>
                      </div>
                      {edu.description && <p className={styles.previewItemDescription}>{edu.description}</p>}
                    </div>
                  ))}
                </div>
              )}

              {resumeData.skills.length > 0 && resumeData.skills[0].name && (
                <div className={styles.previewSection}>
                  <h2 className={styles.previewSectionTitle}>Skills</h2>
                  <div className={styles.previewSkills}>
                    {resumeData.skills.map((skill) => (
                      <div key={skill.id} className={styles.previewSkill}>
                        <span className={styles.previewSkillName}>{skill.name}</span>
                        <span className={styles.previewSkillLevel}>{skill.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resumeData.languages.length > 0 && resumeData.languages[0].name && (
                <div className={styles.previewSection}>
                  <h2 className={styles.previewSectionTitle}>Languages</h2>
                  <div className={styles.previewLanguages}>
                    {resumeData.languages.map((lang) => (
                      <div key={lang.id} className={styles.previewLanguage}>
                        <span className={styles.previewLanguageName}>{lang.name}</span>
                        <span className={styles.previewLanguageProficiency}>{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resumeData.certifications.length > 0 && resumeData.certifications[0].name && (
                <div className={styles.previewSection}>
                  <h2 className={styles.previewSectionTitle}>Certifications</h2>
                  {resumeData.certifications.map((cert) => (
                    <div key={cert.id} className={styles.previewItem}>
                      <div className={styles.previewItemHeader}>
                        <h3 className={styles.previewItemTitle}>{cert.name}</h3>
                        <p className={styles.previewItemSubtitle}>{cert.issuer}</p>
                        <p className={styles.previewItemDate}>{cert.date}</p>
                      </div>
                      {cert.url && (
                        <p className={styles.previewItemUrl}>
                          <a href={cert.url} target="_blank" rel="noopener noreferrer">
                            View Certificate
                          </a>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {resumeData.projects.length > 0 && resumeData.projects[0].name && (
                <div className={styles.previewSection}>
                  <h2 className={styles.previewSectionTitle}>Projects</h2>
                  {resumeData.projects.map((proj) => (
                    <div key={proj.id} className={styles.previewItem}>
                      <div className={styles.previewItemHeader}>
                        <h3 className={styles.previewItemTitle}>{proj.name}</h3>
                        {proj.technologies && <p className={styles.previewItemTech}>{proj.technologies}</p>}
                      </div>
                      <p className={styles.previewItemDescription}>{proj.description}</p>
                      {proj.url && (
                        <p className={styles.previewItemUrl}>
                          <a href={proj.url} target="_blank" rel="noopener noreferrer">
                            View Project
                          </a>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {resumeData.hobbies && (
                <div className={styles.previewSection}>
                  <h2 className={styles.previewSectionTitle}>Hobbies & Interests</h2>
                  <p className={styles.previewHobbies}>{resumeData.hobbies}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.builderContainer}>
            <div className={styles.sidebar}>
              <div className={styles.sidebarContent}>
                <h2 className={styles.sidebarTitle}>Resume Sections</h2>
                <div className={styles.sectionList}>
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      className={`${styles.sectionButton} ${activeSection === section.id ? styles.active : ""}`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      <span className={styles.sectionIcon}>{section.icon}</span>
                      <span className={styles.sectionLabel}>{section.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.formContainer}>
              <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
                {/* Personal Info Section */}
                {activeSection === "personal" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={styles.sectionContent}
                  >
                    <h2 className={styles.sectionTitle}>Personal Information</h2>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.formLabel}>
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className={styles.formInput}
                          value={resumeData.personal.name}
                          onChange={(e) => handleInputChange("personal", "name", e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.formLabel}>
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className={styles.formInput}
                          value={resumeData.personal.email}
                          onChange={(e) => handleInputChange("personal", "email", e.target.value)}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.formLabel}>
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          className={styles.formInput}
                          value={resumeData.personal.phone}
                          onChange={(e) => handleInputChange("personal", "phone", e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="location" className={styles.formLabel}>
                          Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          className={styles.formInput}
                          value={resumeData.personal.location}
                          onChange={(e) => handleInputChange("personal", "location", e.target.value)}
                          placeholder="City, Country"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="linkedin" className={styles.formLabel}>
                          LinkedIn
                        </label>
                        <input
                          type="text"
                          id="linkedin"
                          className={styles.formInput}
                          value={resumeData.personal.linkedin}
                          onChange={(e) => handleInputChange("personal", "linkedin", e.target.value)}
                          placeholder="linkedin.com/in/johndoe"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="github" className={styles.formLabel}>
                          GitHub
                        </label>
                        <input
                          type="text"
                          id="github"
                          className={styles.formInput}
                          value={resumeData.personal.github}
                          onChange={(e) => handleInputChange("personal", "github", e.target.value)}
                          placeholder="github.com/johndoe"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="website" className={styles.formLabel}>
                          Personal Website
                        </label>
                        <input
                          type="text"
                          id="website"
                          className={styles.formInput}
                          value={resumeData.personal.website}
                          onChange={(e) => handleInputChange("personal", "website", e.target.value)}
                          placeholder="johndoe.com"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="jobTitle" className={styles.formLabel}>
                          Job Title
                        </label>
                        <input
                          type="text"
                          id="jobTitle"
                          className={styles.formInput}
                          value={resumeData.personal.jobTitle}
                          onChange={(e) => handleInputChange("personal", "jobTitle", e.target.value)}
                          placeholder="Software Engineer"
                        />
                      </div>
                    </div>

                    {/* Template and Font Selection */}
                    <div className={styles.customizationSection}>
                      <h3 className={styles.subsectionTitle}>Template</h3>
                      <div className={styles.templateGrid}>
                        {templates.map((template) => (
                          <div
                            key={template.id}
                            className={`${styles.templateCard} ${
                              resumeData.template === template.id ? styles.selectedTemplate : ""
                            }`}
                            onClick={() => handleTemplateChange(template.id)}
                          >
                            <div className={styles.templatePreview}>
                              <div className={styles.templateHeader}></div>
                              <div className={styles.templateBody}>
                                <div className={styles.templateLine}></div>
                                <div className={styles.templateLine} style={{ width: "80%" }}></div>
                                <div className={styles.templateLine} style={{ width: "60%" }}></div>
                              </div>
                            </div>
                            <span className={styles.templateName}>{template.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.customizationSection}>
                      <h3 className={styles.subsectionTitle}>Fonts</h3>
                      <div className={styles.fontGrid}>
                        {fonts.map((font) => (
                          <div
                            key={font.id}
                            className={`${styles.fontCard} ${resumeData.font === font.id ? styles.selectedFont : ""}`}
                            onClick={() => handleFontChange(font.id)}
                          >
                            <span className={`${styles.fontPreview} ${styles[font.class]}`}>Aa</span>
                            <span className={styles.fontName}>{font.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Summary Section */}
                {activeSection === "summary" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={styles.sectionContent}
                  >
                    <h2 className={styles.sectionTitle}>Professional Summary</h2>
                    <div className={styles.formGroup}>
                      <label htmlFor="summary" className={styles.formLabel}>
                        Write a brief summary of your professional background and goals
                      </label>
                      <textarea
                        id="summary"
                        className={styles.formTextarea}
                        value={resumeData.summary}
                        onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                        placeholder="Experienced software engineer with a passion for creating efficient and scalable applications..."
                        rows={6}
                      />
                      <p className={styles.formHint}>
                        Keep your summary concise (3-5 sentences) and focus on your key strengths and career goals.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Work Experience Section */}
                {activeSection === "experience" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={styles.sectionContent}
                  >
                    <h2 className={styles.sectionTitle}>Work Experience</h2>
                    {resumeData.experience.map((exp, index) => (
                      <div key={exp.id} className={styles.itemCard}>
                        <div className={styles.itemHeader}>
                          <h3 className={styles.itemTitle}>Experience #{index + 1}</h3>
                          {resumeData.experience.length > 1 && (
                            <button
                              type="button"
                              className={styles.removeButton}
                              onClick={() => removeItem("experience", exp.id)}
                            >
                              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M18 6L6 18M6 6l12 12"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                        <div className={styles.formGrid}>
                          <div className={styles.formGroup}>
                            <label htmlFor={`title-${exp.id}`} className={styles.formLabel}>
                              Job Title
                            </label>
                            <input
                              type="text"
                              id={`title-${exp.id}`}
                              className={styles.formInput}
                              value={exp.title}
                              onChange={(e) => handleArrayInputChange("experience", index, "title", e.target.value)}
                              placeholder="Software Engineer"
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label htmlFor={`company-${exp.id}`} className={styles.formLabel}>
                              Company
                            </label>
                            <input
                              type="text"
                              id={`company-${exp.id}`}
                              className={styles.formInput}
                              value={exp.company}
                              onChange={(e) => handleArrayInputChange("experience", index, "company", e.target.value)}
                              placeholder="Acme Inc."
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label htmlFor={`location-${exp.id}`} className={styles.formLabel}>
                              Location
                            </label>
                            <input
                              type="text"
                              id={`location-${exp.id}`}
                              className={styles.formInput}
                              value={exp.location}
                              onChange={(e) => handleArrayInputChange("experience", index, "location", e.target.value)}
                              placeholder="San Francisco, CA"
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label htmlFor={`startDate-${exp.id}`} className={styles.formLabel}>
                              Start Date
                            </label>
                            <input
                              type="text"
                              id={`startDate-${exp.id}`}
                              className={styles.formInput}
                              value={exp.startDate}
                              onChange={(e) => handleArrayInputChange("experience", index, "startDate", e.target.value)}
                              placeholder="Jan 2020"
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label htmlFor={`endDate-${exp.id}`} className={styles.formLabel}>
                              End Date
                            </label>
                            <div className={styles.endDateContainer}>
                              <input
                                type="text"
                                id={`endDate-${exp.id}`}
                                className={styles.formInput}
                                value={exp.endDate}
                                onChange={(e) => handleArrayInputChange("experience", index, "endDate", e.target.value)}
                                placeholder="Present"
                                disabled={exp.current}
                              />
                              <div className={styles.currentCheckbox}>
                                <input
                                  type="checkbox"
                                  id={`current-${exp.id}`}
                                  checked={exp.current}
                                  onChange={(e) =>
                                    handleArrayInputChange("experience", index, "current", e.target.checked)
                                  }
                                />
                                <label htmlFor={`current-${exp.id}`}>Current</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.formGroup}>
                          <label htmlFor={`description-${exp.id}`} className={styles.formLabel}>
                            Description
                          </label>
                          <textarea
                            id={`description-${exp.id}`}
                            className={styles.formTextarea}
                            value={exp.description}
                            onChange={(e) => handleArrayInputChange("experience", index, "description", e.target.value)}
                            placeholder="Describe your responsibilities and achievements..."
                            rows={4}
                          />
                        </div>
                      </div>
                    ))}
                    <button type="button" className={styles.addButton} onClick={() => addItem("experience")}>
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Add Work Experience
                    </button>
                  </motion.div>
                )}

                {/* Education Section */}
                {activeSection === "education" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={styles.sectionContent}
                  >
                    <h2 className={styles.sectionTitle}>Education</h2>
                    {resumeData.education.map((edu, index) => (
                      <div key={edu.id} className={styles.itemCard}>
                        <div className={styles.itemHeader}>
                          <h3 className={styles.itemTitle}>Education #{index + 1}</h3>
                          {resumeData.education.length > 1 && (
                            <button
                              type="button"
                              className={styles.removeButton}
                              onClick={() => removeItem("education", edu.id)}
                            >
                              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M18 6L6 18M6 6l12 12"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                        <div className={styles.formGrid}>
                          <div className={styles.formGroup}>
                            <label htmlFor={`degree-${edu.id}`} className={styles.formLabel}>
                              Degree
                            </label>
                            <input
                              type="text"
                              id={`degree-${edu.id}`}
                              className={styles.formInput}
                              value={edu.degree}
                              onChange={(e) => handleArrayInputChange("education", index, "degree", e.target.value)}
                              placeholder="Bachelor of Science in Computer Science"
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label htmlFor={`institution-${edu.id}`} className={styles.formLabel}>
                              Institution
                            </label>
                            <input
                              type="text"
                              id={`institution-${edu.id}`}
                              className={styles.formInput}
                              value={edu.institution}
                              onChange={(e) =>
                                handleArrayInputChange("education", index, "institution", e.target.value)
                              }
                              placeholder="University of California, Berkeley"
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label htmlFor={`eduLocation-${edu.id}`} className={styles.formLabel}>
                              Location
                            </label>
                            <input
                              type="text"
                              id={`eduLocation-${edu.id}`}
                              className={styles.formInput}
                              value={edu.location}
                              onChange={(e) => handleArrayInputChange("education", index, "location", e.target.value)}
                              placeholder="Berkeley, CA"
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label htmlFor={`eduStartDate-${edu.id}`} className={styles.formLabel}>
                              Start Date
                            </label>
                            <input
                              type="text"
                              id={`eduStartDate-${edu.id}`}
                              className={styles.formInput}
                              value={edu.startDate}
                              onChange={(e) => handleArrayInputChange("education", index, "startDate", e.target.value)}
                              placeholder="Sep 2016"
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label htmlFor={`eduEndDate-${edu.id}`} className={styles.formLabel}>
                              End Date
                            </label>
                            <input
                              type="text"
                              id={`eduEndDate-${edu.id}`}
                              className={styles.formInput}
                              value={edu.endDate}
                              onChange={(e) => handleArrayInputChange("education", index, "endDate", e.target.value)}
                              placeholder="May 2020"
                            />
                          </div>
                        </div>
                        <div className={styles.formGroup}>
                          <label htmlFor={`eduDescription-${edu.id}`} className={styles.formLabel}>
                            Description (Optional)
                          </label>
                          <textarea
                            id={`eduDescription-${edu.id}`}
                            className={styles.formTextarea}
                            value={edu.description}
                            onChange={(e) => handleArrayInputChange("education", index, "description", e.target.value)}
                            placeholder="Relevant coursework, achievements, activities..."
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}
                    <button type="button" className={styles.addButton} onClick={() => addItem("education")}>
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Add Education
                    </button>
                  </motion.div>
                )}

                {/* Skills Section */}
                {activeSection === "skills" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={styles.sectionContent}
                  >
                    <h2 className={styles.sectionTitle}>Skills</h2>
                    {resumeData.skills.map((skill, index) => (
                      <div key={skill.id} className={styles.itemCard}>
                        <div className={styles.itemHeader}>
                          <h3 className={styles.itemTitle}>Skill #{index + 1}</h3>
                          {resumeData.skills.length > 1 && (
                            <button
                              type="button"
                              className={styles.removeButton}
                              onClick={() => removeItem("skills", skill.id)}
                            >
                              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M18 6L6 18M6 6l12 12"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                        <div className={styles.formGrid}>
                          <div className={styles.formGroup}>
                            <label htmlFor={`skillName-${skill.id}`} className={styles.formLabel}>
                              Skill Name
                            </label>
                            <input
                              type="text"
                              id={`skillName-${skill.id}`}
                              className={styles.formInput}
                              value={skill.name}
                              onChange={(e) => handleArrayInputChange("skills", index, "name", e.target.value)}
                              placeholder="JavaScript"
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label htmlFor={`skillLevel-${skill.id}`} className={styles.formLabel}>
                              Proficiency Level
                            </label>
                            <select
                              id={`skillLevel-${skill.id}`}
                              className={styles.formSelect}
                              value={skill.level}
                              onChange={(e) => handleArrayInputChange("skills", index, "level", e.target.value)}
                            >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                              <option value="Expert">Expert</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button type="button" className={styles.addButton} onClick={() => addItem("skills")}>
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Add Skill
                    </button>
                  </motion.div>
                )}

                {/* Languages Section */}
                {activeSection === "languages" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={styles.sectionContent}
                  >
                    <h2 className={styles.sectionTitle}>Languages</h2>
                    {resumeData.languages.map((lang, index) => (
                      <div key={lang.id} className={styles.itemCard}>
                        <div className={styles.itemHeader}>
                          <h3 className={styles.itemTitle}>Language #{index + 1}</h3>
                          {resumeData.languages.length > 1 && (
                            <button
                              type="button"
                              className={styles.removeButton}
                              onClick={() => removeItem("languages", lang.id)}
                            >
                              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M18 6L6 18M6 6l12 12"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                        <div className={styles.formGrid}>
                          <div className={styles.formGroup}>
                            <label htmlFor={`langName-${lang.id}`} className={styles.formLabel}>
                              Language
                            </label>
                            <input
                              type="text"
                              id={`langName-${lang.id}`}
                              className={styles.formInput}
                              value={lang.name}
                              onChange={(e) => handleArrayInputChange("languages", index, "name", e.target.value)}
                              placeholder="English"
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label htmlFor={`langProficiency-${lang.id}`} className={styles.formLabel}>
                              Proficiency
                            </label>
                            <select
                              id={`langProficiency-${lang.id}`}
                              className={styles.formSelect}
                              value={lang.proficiency}
                              onChange={(e) =>
                                handleArrayInputChange("languages", index, "proficiency", e.target.value)
                              }
                            >
                              <option value="Elementary">Elementary</option>
                              <option value="Limited Working">Limited Working</option>
                              <option value="Professional Working">Professional Working</option>
                              <option value="Full Professional">Full Professional</option>
                              <option value="Native/Bilingual">Native/Bilingual</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button type="button" className={styles.addButton} onClick={() => addItem("languages")}>
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Add Language
                    </button>
                  </motion.div>
                )}

                {/* Certifications Section */}
                {activeSection === "certifications" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={styles.sectionContent}
                  >
                    <h2 className={styles.sectionTitle}>Certifications</h2>
                    {resumeData.certifications.map((cert, index) => (
                      <div key={cert.id} className={styles.itemCard}>
                        <div className={styles.itemHeader}>
                          <h3 className={styles.itemTitle}>Certification #{index + 1}</h3>
                          {resumeData.certifications.length > 1 && (
                            <button
                              type="button"
                              className={styles.removeButton}
                              onClick={() => removeItem("certifications", cert.id)}
                            >
                              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M18 6L6 18M6 6l12 12"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                        <div className={styles.formGrid}>
                          <div className={styles.formGroup}>
                            <label htmlFor={`certName-${cert.id}`} className={styles.formLabel}>
                              Certification Name
                            </label>
                            <input
                              type="text"
                              id={`certName-${cert.id}`}
                              className={styles.formInput}
                              value={cert.name}
                              onChange={(e) => handleArrayInputChange("certifications", index, "name", e.target.value)}
                              placeholder="AWS Certified Solutions Architect"
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label htmlFor={`certIssuer-${cert.id}`} className={styles.formLabel}>
                              Issuing Organization
                            </label>
                            <input
                              type="text"
                              id={`certIssuer-${cert.id}`}
                              className={styles.formInput}
                              value={cert.issuer}
                              onChange={(e) =>
                                handleArrayInputChange("certifications", index, "issuer", e.target.value)
                              }
                              placeholder="Amazon Web Services"
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label htmlFor={`certDate-${cert.id}`} className={styles.formLabel}>
                              Date
                            </label>
                            <input
                              type="text"
                              id={`certDate-${cert.id}`}
                              className={styles.formInput}
                              value={cert.date}
                              onChange={(e) => handleArrayInputChange("certifications", index, "date", e.target.value)}
                              placeholder="May 2022"
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label htmlFor={`certUrl-${cert.id}`} className={styles.formLabel}>
                              URL (Optional)
                            </label>
                            <input
                              type="text"
                              id={`certUrl-${cert.id}`}
                              className={styles.formInput}
                              value={cert.url}
                              onChange={(e) => handleArrayInputChange("certifications", index, "url", e.target.value)}
                              placeholder="https://www.credential.net/..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button type="button" className={styles.addButton} onClick={() => addItem("certifications")}>
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Add Certification
                    </button>
                  </motion.div>
                )}

                {/* Projects Section */}
                {activeSection === "projects" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={styles.sectionContent}
                  >
                    <h2 className={styles.sectionTitle}>Projects</h2>
                    {resumeData.projects.map((proj, index) => (
                      <div key={proj.id} className={styles.itemCard}>
                        <div className={styles.itemHeader}>
                          <h3 className={styles.itemTitle}>Project #{index + 1}</h3>
                          {resumeData.projects.length > 1 && (
                            <button
                              type="button"
                              className={styles.removeButton}
                              onClick={() => removeItem("projects", proj.id)}
                            >
                              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M18 6L6 18M6 6l12 12"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                        <div className={styles.formGrid}>
                          <div className={styles.formGroup}>
                            <label htmlFor={`projName-${proj.id}`} className={styles.formLabel}>
                              Project Name
                            </label>
                            <input
                              type="text"
                              id={`projName-${proj.id}`}
                              className={styles.formInput}
                              value={proj.name}
                              onChange={(e) => handleArrayInputChange("projects", index, "name", e.target.value)}
                              placeholder="E-commerce Platform"
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label htmlFor={`projTech-${proj.id}`} className={styles.formLabel}>
                              Technologies Used
                            </label>
                            <input
                              type="text"
                              id={`projTech-${proj.id}`}
                              className={styles.formInput}
                              value={proj.technologies}
                              onChange={(e) =>
                                handleArrayInputChange("projects", index, "technologies", e.target.value)
                              }
                              placeholder="React, Node.js, MongoDB"
                            />
                          </div>
                        </div>
                        <div className={styles.formGroup}>
                          <label htmlFor={`projDescription-${proj.id}`} className={styles.formLabel}>
                            Description
                          </label>
                          <textarea
                            id={`projDescription-${proj.id}`}
                            className={styles.formTextarea}
                            value={proj.description}
                            onChange={(e) => handleArrayInputChange("projects", index, "description", e.target.value)}
                            placeholder="Describe the project, your role, and key achievements..."
                            rows={3}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label htmlFor={`projUrl-${proj.id}`} className={styles.formLabel}>
                            Project URL (Optional)
                          </label>
                          <input
                            type="text"
                            id={`projUrl-${proj.id}`}
                            className={styles.formInput}
                            value={proj.url}
                            onChange={(e) => handleArrayInputChange("projects", index, "url", e.target.value)}
                            placeholder="https://github.com/username/project"
                          />
                        </div>
                      </div>
                    ))}
                    <button type="button" className={styles.addButton} onClick={() => addItem("projects")}>
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Add Project
                    </button>
                  </motion.div>
                )}

                {/* Hobbies Section */}
                {activeSection === "hobbies" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={styles.sectionContent}
                  >
                    <h2 className={styles.sectionTitle}>Hobbies & Interests</h2>
                    <div className={styles.formGroup}>
                      <label htmlFor="hobbies" className={styles.formLabel}>
                        List your hobbies and interests
                      </label>
                      <textarea
                        id="hobbies"
                        className={styles.formTextarea}
                        value={resumeData.hobbies}
                        onChange={(e) => setResumeData({ ...resumeData, hobbies: e.target.value })}
                        placeholder="Photography, hiking, playing guitar, reading science fiction..."
                        rows={4}
                      />
                      <div className={styles.formTips}>
                        <h4 className={styles.tipsTitle}>Tips for including hobbies:</h4>
                        <ul className={styles.tipsList}>
                          <li>Only include hobbies that demonstrate skills or qualities relevant to the job</li>
                          <li>
                            Include hobbies that make you memorable, especially in fields where personality and cultural
                            fit matter
                          </li>
                          <li>Avoid generic interests or those with limited work experience relevance</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className={styles.formActions}>
                  
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumeBuilder
