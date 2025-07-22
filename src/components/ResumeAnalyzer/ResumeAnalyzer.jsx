import React, { useState } from "react";
import styles from "./app.module.css";

const ResumeAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !jobDescription.trim()) {
      setError("Both resume and job description are required.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);
    formData.append("jobDescription", jobDescription);

    try {
      setIsLoading(true);
      setError("");
      // const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const API_BASE = process.env.REACT_APP_API_URL || "http://3.82.112.5:5000/";


      const response = await fetch(`${API_BASE}/analyze`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Server error");
      }

      const data = await response.json();
      setAnalysisResult(data.analysis);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Backend error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Analyze your Resume with AI</h1>
        <p className={styles.subtitle}>
          Get personalized feedback on how well your resume fits the job
        </p>
      </header>

      <main className={styles.grid}>
        <div className={styles.leftColumn}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Upload Resume</h2>
            <label className={styles.uploadLabel}>
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className={styles.fileInput}
              />
              <div className={styles.uploadBox}>
                <p>Click to upload or drag & drop</p>
                <span>PDF, DOCX files are supported</span>
              </div>
            </label>
            {selectedFile && <p className={styles.fileName}>📄 {selectedFile.name}</p>}
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Enter Job Description</h2>
            <textarea
              className={styles.textarea}
              placeholder="Enter the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            className={styles.analyzeButton}
            onClick={handleAnalyze}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className={styles.spinner}></div> Analyzing...
              </>
            ) : (
              "Analyze Resume"
            )}
          </button>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Analysis Result</h2>
          <div className={styles.analysisBox}>
            {analysisResult ? (
              <pre className={styles.analysisResult}>{analysisResult}</pre>
            ) : (
              <div className={styles.placeholder}>
                <span>🔍</span>
                <p>No analysis yet</p>
                <small>Upload your resume and enter a job description to get started</small>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>© {new Date().getFullYear()} Resume Analyzer AI</p>
          <p className={styles.footerSubtext}>Built with ❤️ using React & Flask</p>
          <div className={styles.footerLinks}>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResumeAnalyzer;
