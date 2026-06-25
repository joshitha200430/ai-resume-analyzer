from fastapi import FastAPI, UploadFile, File
import os
import shutil
import fitz  # PyMuPDF
import docx

app = FastAPI()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/")
def home():
    return {"message": "AI Resume Analyzer API is running"}


@app.post("/upload-resume/")
async def upload_resume(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text(file_path)
    skills = extract_skills(text)
    jobs = recommend_jobs(skills)
    score = calculate_score(skills)

    return {
    "message": "Resume analyzed successfully",
    "filename": file.filename,
    "skills_found": skills,
    "recommended_jobs": jobs,
    "resume_score": score
}

def extract_text(file_path):
    if file_path.endswith(".pdf"):
        return extract_pdf(file_path)
    elif file_path.endswith(".docx"):
        return extract_docx(file_path)
    else:
        return "Unsupported file format"


def extract_pdf(path):
    text = ""
    doc = fitz.open(path)
    for page in doc:
        text += page.get_text()
    return text


def extract_docx(path):
    doc = docx.Document(path)
    return "\n".join([para.text for para in doc.paragraphs])
SKILLS_DB = [
    "python", "java", "c", "sql", "aws", "ec2", "s3",
    "cloudwatch", "docker", "react", "node", "html", "css",
    "communication", "problem solving", "git"
]
def extract_skills(text):
    text = text.lower()
    found_skills = []

    for skill in SKILLS_DB:
        if skill in text:
            found_skills.append(skill)

    return list(set(found_skills))
JOB_MAP = {
    "python": ["Python Developer", "Backend Developer", "Automation Engineer"],
    "java": ["Java Developer", "Backend Developer"],
    "aws": ["Cloud Engineer", "DevOps Engineer"],
    "sql": ["Data Analyst", "Database Engineer"],
    "react": ["Frontend Developer", "Full Stack Developer"],
    "html": ["Frontend Developer"],
    "css": ["Frontend Developer"],
    "cloudwatch": ["Cloud Support Engineer"],
    "communication": ["Business Analyst", "Support Engineer"]
}
def recommend_jobs(skills):
    jobs = set()

    for skill in skills:
        if skill in JOB_MAP:
            jobs.update(JOB_MAP[skill])

    return list(jobs)
def calculate_score(skills):
    total_skills = len(SKILLS_DB)
    matched_skills = len(skills)

    if total_skills == 0:
        return 0

    score = (matched_skills / total_skills) * 100
    return round(score, 2)