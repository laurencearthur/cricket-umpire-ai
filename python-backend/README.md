
# Cricket Video Analysis - Python Backend

This is a Flask-based backend service that analyzes cricket videos using Python and OpenCV.

## Setup

1. Install Python 3.7+ if not already installed
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run the server:
   ```
   python app.py
   ```

The server will start on http://localhost:5000

## API Endpoint

POST /analyze
- Accepts a video file with field name 'video'
- Returns JSON with decision and confidence
