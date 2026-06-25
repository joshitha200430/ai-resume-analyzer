def analyze_resume(resume_text):
    resume_text_lower = resume_text.lower()

    skills_db = [
        "python", "java", "sql", "html", "css", "javascript",
        "react", "flask", "django", "aws", "docker", "git",
        "mongodb", "mysql", "pandas", "numpy", "machine learning"
    ]

    matched_skills = [skill for skill in skills_db if skill in resume_text_lower]

    important_skills = ["python", "sql", "react", "aws", "docker", "git"]
    missing_skills = [skill for skill in important_skills if skill not in resume_text_lower]

    if "python" in matched_skills and "react" in matched_skills:
        job_recommendations = [
            "Full Stack Developer",
            "Python Developer",
            "Software Engineer"
        ]
    elif "python" in matched_skills:
        job_recommendations = [
            "Python Developer",
            "Backend Developer",
            "Software Engineer"
        ]
    elif "react" in matched_skills or "javascript" in matched_skills:
        job_recommendations = [
            "Frontend Developer",
            "React Developer",
            "UI Developer"
        ]
    else:
        job_recommendations = [
            "Software Engineer",
            "Junior Developer",
            "IT Support Engineer"
        ]

    ats_score = min(100, 40 + len(matched_skills) * 8)

    suggestions = []
    if "summary" not in resume_text_lower and "objective" not in resume_text_lower:
        suggestions.append("Add a professional summary section to improve ATS relevance.")
    if len(matched_skills) < 5:
        suggestions.append("Add more relevant technical skills based on your target job role.")
    if "project" not in resume_text_lower:
        suggestions.append("Include academic or personal projects with technologies used.")
    if "internship" not in resume_text_lower and "experience" not in resume_text_lower:
        suggestions.append("Add internship, training, or practical experience if available.")
    if "aws" not in resume_text_lower and "docker" not in resume_text_lower:
        suggestions.append("Adding cloud or deployment skills like AWS or Docker can strengthen the resume.")

    if not suggestions:
        suggestions = ["Your resume already has a strong base. Improve it further with quantified achievements."]

    return {
        "ats_score": ats_score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "job_recommendations": job_recommendations,
        "suggestions": suggestions
    }