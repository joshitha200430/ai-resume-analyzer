from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

from services.resume_parser import analyze_resume

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


@app.route("/")
def home():
    return "AI Resume Analyzer Backend is running!"


@app.route("/analyze", methods=["POST"])
def analyze():
    print("ANALYZE API HIT")

    if "resume" not in request.files:
        print("No resume key in request.files")
        return jsonify({"error": "No resume file uploaded"}), 400

    file = request.files["resume"]

    if file.filename == "":
        print("Empty filename")
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(file_path)

    print("Saved file:", file_path)

    result = analyze_resume(file_path)
    print("RESULT SENT TO FRONTEND:", result)
    return jsonify(result)



if __name__ == "__main__":
    print("APP.PY IS RUNNING")
    app.run(debug=True, host="127.0.0.1", port=5000)