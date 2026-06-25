import fitz  # PyMuPDF
from docx import Document
import os
import re

# Expanded skills database
SKILLS_DB = [
    "python", "java", "c", "c++", "javascript", "typescript",
    "html", "css", "bootstrap", "tailwind",
    "react", "node", "nodejs", "node.js", "nestjs", "express",
    "flask", "django", "spring boot",
    "sql", "mysql", "postgresql", "mongodb",
    "aws", "docker", "kubernetes", "git", "github",
    "rest api", "rest apis", "api",
    "machine learning", "data analysis", "power bi", "excel",
    "firebase"
]


# ---------- TEXT EXTRACTION ----------
def extract_text_from_pdf(file_path):
    text = ""
    try:
        doc = fitz.open(file_path)
        for page in doc:
            text += page.get_text("text") + "\n"
        doc.close()
    except Exception as e:
        print("PDF extraction error:", e)
    return text


def extract_text_from_docx(file_path):
    try:
        doc = Document(file_path)
        return "\n".join([para.text for para in doc.paragraphs])
    except Exception as e:
        print("DOCX extraction error:", e)
        return ""


def extract_resume_text(file_path):
    ext = os.path.splitext(file_path)[1].lower()

    if ext == ".pdf":
        return extract_text_from_pdf(file_path)
    elif ext == ".docx":
        return extract_text_from_docx(file_path)
    else:
        return ""


# ---------- CLEAN TEXT ----------
def normalize_text(text):
    text = text.lower()

    # normalize common variations
    replacements = {
        "node.js": "nodejs",
        "node js": "nodejs",
        "restful api": "rest api",
        "restful apis": "rest api",
        "rest apis": "rest api",
        "amazon web services": "aws",
        "machine-learning": "machine learning",
        "data-analysis": "data analysis"
    }

    for old, new in replacements.items():
        text = text.replace(old, new)

    # remove extra symbols but keep + and #
    text = re.sub(r"[^\w\s\+#\.]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()

    return text


# ---------- SKILL MATCHING ----------
def find_matched_skills(resume_text):
    resume_text = normalize_text(resume_text)
    matched = set()

    skill_patterns = {
        "Python": [r"\bpython\b"],
        "Java": [r"\bjava\b"],
        "C": [r"\bc\b"],
        "C++": [r"\bc\+\+\b"],
        "JavaScript": [r"\bjavascript\b"],
        "TypeScript": [r"\btypescript\b"],
        "HTML": [r"\bhtml\b"],
        "CSS": [r"\bcss\b"],
        "Bootstrap": [r"\bbootstrap\b"],
        "Tailwind": [r"\btailwind\b"],
        "React": [r"\breact\b"],
        "Node.js": [r"\bnodejs\b", r"\bnode\b"],
        "NestJS": [r"\bnestjs\b"],
        "Express": [r"\bexpress\b"],
        "Flask": [r"\bflask\b"],
        "Django": [r"\bdjango\b"],
        "Spring Boot": [r"\bspring boot\b"],
        "SQL": [r"\bsql\b"],
        "MySQL": [r"\bmysql\b"],
        "PostgreSQL": [r"\bpostgresql\b"],
        "MongoDB": [r"\bmongodb\b"],
        "AWS": [r"\baws\b"],
        "Docker": [r"\bdocker\b"],
        "Kubernetes": [r"\bkubernetes\b"],
        "Git": [r"\bgit\b"],
        "GitHub": [r"\bgithub\b"],
        "REST API": [r"\brest api\b", r"\bapi\b"],
        "Machine Learning": [r"\bmachine learning\b"],
        "Data Analysis": [r"\bdata analysis\b"],
        "Power BI": [r"\bpower bi\b"],
        "Excel": [r"\bexcel\b"],
        "Firebase": [r"\bfirebase\b"]
    }

    for skill, patterns in skill_patterns.items():
        for pattern in patterns:
            if re.search(pattern, resume_text):
                matched.add(skill)
                break

    return sorted(list(matched))


# ---------- MISSING SKILLS ----------
def find_missing_skills(matched_skills):
    all_skills = [
        "Python", "Java", "C", "C++", "JavaScript", "TypeScript",
        "HTML", "CSS", "Bootstrap", "Tailwind",
        "React", "Node.js", "NestJS", "Express",
        "Flask", "Django", "Spring Boot",
        "SQL", "MySQL", "PostgreSQL", "MongoDB",
        "AWS", "Docker", "Kubernetes",
        "Git", "GitHub", "REST API",
        "Machine Learning", "Data Analysis", "Power BI", "Excel", "Firebase"
    ]

    missing = [skill for skill in all_skills if skill not in matched_skills]
    return missing[:8]


# ---------- JOB RECOMMENDATIONS ----------
def recommend_jobs(matched_skills):
    skills = [skill.lower() for skill in matched_skills]
    jobs = []

    if any(skill in skills for skill in ["react", "html", "css", "javascript"]):
        jobs.append("Frontend Developer")

    if "python" in skills and "sql" in skills:
        jobs.append("Python Developer")

    if any(skill in skills for skill in ["flask", "django", "node.js", "nestjs", "express"]):
        jobs.append("Backend Developer")

    if ("react" in skills or "javascript" in skills) and ("python" in skills or "node.js" in skills):
        jobs.append("Full Stack Developer")

    if any(skill in skills for skill in ["machine learning", "data analysis"]):
        jobs.append("Data Analyst / ML Engineer")

    if not jobs:
        jobs.append("Software Engineer")

    return jobs


# ---------- AI SUGGESTIONS ----------
def generate_suggestions(matched_skills, missing_skills):
    suggestions = []

    if "AWS" in missing_skills or "Docker" in missing_skills:
        suggestions.append("Add cloud and deployment skills like AWS, Docker, or CI/CD if relevant to your profile.")

    if len(matched_skills) < 5:
        suggestions.append("Include more technical skills in your resume based on your projects, internships, and coursework.")

    suggestions.append("Quantify project impact using numbers, metrics, or measurable outcomes.")
    suggestions.append("Improve your resume summary with role-specific keywords for ATS optimization.")
    suggestions.append("Mention tools, frameworks, and backend/frontend technologies clearly in a separate skills section.")

    return suggestions


# ---------- ATS SCORE ----------
def calculate_ats_score(matched_skills):
    score = 35 + (len(matched_skills) * 7)

    if score > 95:
        score = 95

    return score


# ---------- MAIN ANALYSIS ----------
def analyze_resume(file_path):
    resume_text = extract_resume_text(file_path)

    print("\n========== EXTRACTED RESUME TEXT ==========")
    print(resume_text[:3000])  # print first 3000 chars for debugging
    print("==========================================\n")

    if not resume_text.strip():
        return {
            "ats_score": 0,
            "matched_skills": [],
            "missing_skills": [],
            "job_recommendations": [],
            "suggestions": ["Could not extract text from the uploaded resume."]
        }

    matched_skills = find_matched_skills(resume_text)
    missing_skills = find_missing_skills(matched_skills)
    job_recommendations = recommend_jobs(matched_skills)
    suggestions = generate_suggestions(matched_skills, missing_skills)
    ats_score = calculate_ats_score(matched_skills)

    result = {
        "ats_score": ats_score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "job_recommendations": job_recommendations,
        "suggestions": suggestions
    }

    print("FINAL ANALYSIS RESULT:", result)

    return result