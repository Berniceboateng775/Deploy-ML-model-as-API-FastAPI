from pathlib import Path
import pickle

from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel


BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model" / "diabetes_model.sav"
STATIC_DIR = BASE_DIR / "model" / "static"

app = FastAPI(
    title="Diabetes Prediction API",
    description="FastAPI service for diabetes risk prediction with a professional web interface.",
    version="1.0.0",
)


class ModelInput(BaseModel):
    Pregnancies: int
    Glucose: int
    BloodPressure: int
    SkinThickness: int
    Insulin: int
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int


diabetes_model = pickle.load(open(MODEL_PATH, "rb"))

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


@app.get("/", response_class=HTMLResponse)
def home():
    return (STATIC_DIR / "index.html").read_text(encoding="utf-8")


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/diabetes_prediction")
def diabetes_prediction(input_parameters: ModelInput):
    input_list = [
        input_parameters.Pregnancies,
        input_parameters.Glucose,
        input_parameters.BloodPressure,
        input_parameters.SkinThickness,
        input_parameters.Insulin,
        input_parameters.BMI,
        input_parameters.DiabetesPedigreeFunction,
        input_parameters.Age,
    ]

    prediction = diabetes_model.predict([input_list])

    if prediction[0] == 0:
        return {"prediction": "The person is not diabetic"}
    return {"prediction": "The person is diabetic"}
