from utils.skill_data import SKILL_KEYWORDS, JOB_ROLE_SKILLS


def find_matched_skills(resume_text):
    text = resume_text.lower()
    matched = []

    for skill in SKILL_KEYWORDS:
        if skill.lower() in text:
            matched.append(skill)

    return sorted(list(set(matched)))


def find_missing_skills(matched_skills):
    important_skills = ["docker", "aws", "ci/cd", "git", "sql", "api"]
    missing = [skill for skill in important_skills if skill not in matched_skills]
    return missing


def calculate_ats_score(matched_skills):
    total_important_skills = 10
    score = min(100, int((len(matched_skills) / total_important_skills) * 100))
    return score


def recommend_jobs(matched_skills):
    recommendations = []

    for job, required_skills in JOB_ROLE_SKILLS.items():
        match_count = sum(1 for skill in required_skills if skill in matched_skills)

        if match_count >= 3:
            recommendations.append(job)

    if not recommendations:
        recommendations = ["Software Engineer", "Python Developer"]

    return recommendations


def generate_ai_suggestions(ats_score, missing_skills):
    suggestions = []

    if ats_score < 60:
        suggestions.append("Add more technical skills relevant to your target job role.")
        suggestions.append("Include projects with tools, technologies, and measurable outcomes.")
        suggestions.append("Improve your resume summary using job-specific keywords.")
    elif ats_score < 80:
        suggestions.append("Add more role-specific keywords to improve ATS matching.")
        suggestions.append("Quantify your project impact with measurable achievements.")
    else:
        suggestions.append("Your resume has a good ATS foundation. Improve it further with stronger project impact statements.")

    if missing_skills:
        suggestions.append(f"Consider adding or learning these in-demand skills: {', '.join(missing_skills)}.")

    suggestions.append("Use action verbs and keep your resume tailored for each job application.")

    return suggestions


def analyze_resume_text(resume_text):
    matched_skills = find_matched_skills(resume_text)
    missing_skills = find_missing_skills(matched_skills)
    ats_score = calculate_ats_score(matched_skills)
    job_recommendations = recommend_jobs(matched_skills)
    suggestions = generate_ai_suggestions(ats_score, missing_skills)

    return {
        "ats_score": ats_score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "job_recommendations": job_recommendations,
        "suggestions": suggestions
    }