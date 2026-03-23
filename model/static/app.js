const form = document.getElementById("prediction-form");
const resultCard = document.getElementById("result-card");
const resultTitle = document.getElementById("result-title");
const resultText = document.getElementById("result-text");

const setResultState = (state, title, text) => {
  resultCard.className = `result-card ${state}`;
  resultTitle.textContent = title;
  resultText.textContent = text;
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  payload.Pregnancies = Number(payload.Pregnancies);
  payload.Glucose = Number(payload.Glucose);
  payload.BloodPressure = Number(payload.BloodPressure);
  payload.SkinThickness = Number(payload.SkinThickness);
  payload.Insulin = Number(payload.Insulin);
  payload.BMI = Number(payload.BMI);
  payload.DiabetesPedigreeFunction = Number(payload.DiabetesPedigreeFunction);
  payload.Age = Number(payload.Age);

  setResultState(
    "result-card--idle",
    "Processing assessment",
    "The request is being submitted to the prediction API."
  );

  try {
    const response = await fetch("/diabetes_prediction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("The API returned an unsuccessful response.");
    }

    const data = await response.json();
    const prediction = data.prediction || "Prediction received.";

    if (prediction.toLowerCase().includes("not diabetic")) {
      setResultState(
        "result-card--success",
        "Lower diabetes indication",
        prediction
      );
      return;
    }

    setResultState(
      "result-card--danger",
      "Elevated diabetes indication",
      prediction
    );
  } catch (error) {
    setResultState(
      "result-card--danger",
      "Request failed",
      error.message || "An unexpected error occurred while contacting the API."
    );
  }
});

form.addEventListener("reset", () => {
  window.setTimeout(() => {
    setResultState(
      "result-card--idle",
      "Awaiting submission",
      "Complete the form and submit it to receive the model prediction."
    );
  }, 0);
});
