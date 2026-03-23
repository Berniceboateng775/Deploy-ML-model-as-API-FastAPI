# ML Model Deployment with FastAPI

This repository contains a production-ready implementation of a Machine Learning model deployed as a RESTful API using **FastAPI**. The project demonstrates how to serve predictions efficiently, handle data validation, and document the API automatically.

## Features
- **FastAPI Framework**: High-performance web framework for building APIs with Python 3.7+.
- **Pydantic Validation**: Strict data validation and settings management using Python type annotations.
- **Automated Documentation**: Interactive API documentation provided by Swagger UI (`/docs`) and ReDoc (`/redoc`).
- **ML Integration**: Seamless integration of a pre-trained machine learning model for real-time inference.
- **Uvicorn**: ASGI server implementation for lightning-fast serving.

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ml_model_as_api-fastapi
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. **Start the API server:**
   ```bash
   uvicorn main:app --reload
   ```

2. **Access the API:**
   - The server will run at `http://127.0.0.1:8000`
   - Open `http://127.0.0.1:8000/docs` to test the endpoints via the interactive Swagger UI.
   - Public url using ngrok ` https://unevidenced-goodheartedly-aliana.ngrok-free.dev/diabetes_prediction`
   - Hosted app : ` https://diabetes-predictor-64wt.onrender.com/ `

## Project Structure
- `main.py`: The entry point of the application containing API routes.
- `model/`: Directory containing the serialized ML model (e.g., `.pkl` or `.joblib` files).
- `schemas/`: Pydantic models defining the request and response data structures.
- `requirements.txt`: List of Python dependencies.

## Example API Endpoints
- `GET /`: Health check to ensure the API is running.
- `POST /predict`: Accepts input features in JSON format and returns the model's prediction.
