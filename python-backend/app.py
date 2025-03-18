
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import cv2
import numpy as np
import time
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov', 'webm'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def analyze_cricket_video(video_path):
    """
    Analyze cricket video to determine the type of play.
    This is a placeholder for actual ML model implementation.
    
    In a real implementation, you would:
    1. Load a pre-trained model (PyTorch, TensorFlow, etc.)
    2. Extract frames from the video
    3. Process frames through the model
    4. Aggregate results to determine the final decision
    """
    # Placeholder for real ML analysis
    # For demo purposes, we'll extract some basic video features
    
    cap = cv2.VideoCapture(video_path)
    
    # Extract some basic video metrics
    frame_count = 0
    motion_metric = 0
    
    # Get filename for basic pattern matching (similar to JS version)
    filename = os.path.basename(video_path).lower()
    
    # Process some frames to estimate motion
    prev_frame = None
    while frame_count < 30:  # Analyze first 30 frames
        ret, frame = cap.read()
        if not ret:
            break
            
        frame_count += 1
        
        # Convert to grayscale for simpler processing
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        if prev_frame is not None:
            # Compute frame difference to estimate motion
            diff = cv2.absdiff(gray, prev_frame)
            motion_metric += np.sum(diff)
            
        prev_frame = gray
    
    cap.release()
    
    # Normalize motion metric
    if frame_count > 1:
        motion_metric /= (frame_count - 1)
    
    # Determine decision based on features and filename
    decision = 'legal-ball'  # Default
    
    # First try to determine from filename patterns
    if 'no-ball' in filename or 'noball' in filename:
        decision = 'no-ball'
        confidence = 0.85 + (np.random.random() * 0.1)  # 85-95%
    elif 'run-out' in filename or 'runout' in filename:
        decision = 'run-out'
        confidence = 0.85 + (np.random.random() * 0.1)
    elif 'wide' in filename:
        decision = 'wide-ball'
        confidence = 0.85 + (np.random.random() * 0.1)
    elif 'lbw' in filename:
        decision = 'lbw'
        confidence = 0.85 + (np.random.random() * 0.1)
    else:
        # Use video metrics for a more "intelligent" guess
        # This is still just a placeholder for real ML analysis
        motion_threshold = 100  # Arbitrary threshold
        
        if motion_metric > motion_threshold * 2:
            decision = 'run-out'
            confidence = 0.75 + (np.random.random() * 0.15)
        elif motion_metric > motion_threshold:
            decision = 'no-ball'
            confidence = 0.75 + (np.random.random() * 0.15)
        elif motion_metric < motion_threshold / 2:
            decision = 'wide-ball'
            confidence = 0.75 + (np.random.random() * 0.15)
        else:
            decision = 'lbw' if np.random.random() > 0.5 else 'legal-ball'
            confidence = 0.75 + (np.random.random() * 0.15)
    
    return {
        'decision': decision,
        'confidence': float(confidence)
    }

@app.route('/analyze', methods=['POST'])
def analyze_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided'}), 400
        
    file = request.files['video']
    
    if file.filename == '':
        return jsonify({'error': 'No video file selected'}), 400
        
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Analyze the video
        result = analyze_cricket_video(filepath)
        
        # Remove the file after analysis
        os.remove(filepath)
        
        return jsonify(result)
    
    return jsonify({'error': 'Invalid file format'}), 400

if __name__ == '__main__':
    app.run(debug=True)
