from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import joblib
from fastapi.middleware.cors import CORSMiddleware

# ⬇️ ESTA línea es clave
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

modelo = joblib.load("modelo_regresion.pkl")

class DatosEntrada(BaseModel):
    team_starting_equipment_value: float
    match_kills: float
    time_alive: float
    travelled_distance: float

@app.post("/predict_regresion")
def predecir(data: DatosEntrada):
    entrada = np.array([[
        data.team_starting_equipment_value,
        data.match_kills,
        data.time_alive,
        data.travelled_distance
    ]])
    pred = modelo.predict(entrada)
    return {"victory_probability": float(pred[0])}
