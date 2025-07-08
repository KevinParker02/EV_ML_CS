from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import joblib
from fastapi.middleware.cors import CORSMiddleware

# Inicialización de la app
app = FastAPI()

# Permitir CORS para conexión con frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Carga del modelo entrenado
modelo = joblib.load("modelo_regresion.pkl")

# Clase de entrada esperada por el modelo
class DatosEntrada(BaseModel):
    team_starting_equipment_value: float
    match_kills: float
    time_alive: float
    travelled_distance: float

# Endpoint principal de prueba
@app.get("/")
def root():
    return {"message": "FastAPI funcionando correctamente 🚀"}

# Endpoint de predicción
@app.post("/predict_regresion")  # si quieres puedes cambiarlo a "/predict_regresion"
def predecir(data: DatosEntrada):
    entrada = np.array([[ 
        data.team_starting_equipment_value,
        data.match_kills,
        data.time_alive,
        data.travelled_distance
    ]])
    pred = modelo.predict(entrada)
    return {"victory_probability": float(pred[0])}
