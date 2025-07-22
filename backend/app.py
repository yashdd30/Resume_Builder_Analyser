from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
from docx import Document
import google.generativeai as genai
import os
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY is missing in .env")

genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel(
    model_name='gemini-1.5-flash',
    system_instruction="""
You are a senior recruiter with 10+ years of experience in tech hiring. Analyze this resume against the provided job description and provide specific, actionable feedback in the following format:

1. Overall Match Assessment
2. Key Skills Match:
   • Strong Matches
   • Partial Matches
   • Missing Skills
3. Experience Relevance:
   • High-Impact Points
   • Areas for Improvement
   • Missing Requirements
4. Specific Improvement Suggestions:
   • Quantify
   • Keywords
   • Reframing
   • Formatting

Keep your feedback constructive and actionable.
"""
)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'docx'}
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_pdf(file_path):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text

def extract_text_from_docx(file_path):
    doc = Document(file_path)
    return "\n".join(p.text for p in doc.paragraphs)

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    if 'resume' not in request.files:
        return jsonify({'error': 'No resume file uploaded'}), 400

    file = request.files['resume']
    job_description = request.form.get('jobDescription', '').strip()

    if not job_description:
        return jsonify({'error': 'No job description provided'}), 400

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type (PDF/DOCX only)'}), 400

    try:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        if filename.endswith(".pdf"):
            resume_text = extract_text_from_pdf(file_path)
        else:
            resume_text = extract_text_from_docx(file_path)

        os.remove(file_path)

        prompt = f"""
Resume:
{resume_text}

Job Description:
{job_description}
        """

        response = model.generate_content(prompt)
        return jsonify({'analysis': response.text})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
