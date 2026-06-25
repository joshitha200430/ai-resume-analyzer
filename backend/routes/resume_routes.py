from flask import Blueprint, request, jsonify
import os
from services.resume_parser import extract_text_from_resume
from services.resume_analyzer import analyze_resume

resume_bp = Blueprint("resume", __name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@resume_bp.route("/analyze", methods=["POST"])
def analyze_resume_route():
    try:
        if "resume" not in request.files:
            return jsonify({"error": "No resume file uploaded"}), 400

        file = request.files["resume"]

        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)

        resume_text = extract_text_from_resume(file_path)

        if not resume_text or not resume_text.strip():
            return jsonify({"error": "Could not extract text from resume"}), 400

        result = analyze_resume(resume_text)
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500