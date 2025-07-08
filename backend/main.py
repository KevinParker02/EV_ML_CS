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

# Carga de modelos entrenados
modelo = joblib.load("modelo_regresion.pkl")              # Modelo de regresión
modelo2 = joblib.load("modelo_xgb_survived.pkl")          # Modelo de clasificación

# ----------- MODELO DE REGRESIÓN -----------
class DatosRegresion(BaseModel):
    match_headshots: float
    team_starting_equipment_value: float
    match_flank_kills: float
    match_assists: float

@app.get("/")
def root():
    return {"message": "FastAPI funcionando correctamente 🚀"}

@app.post("/predict_regresion")
def predecir_kills(data: DatosRegresion):
    entrada = np.array([[ 
        data.match_headshots,
        data.team_starting_equipment_value,
        data.match_flank_kills,
        data.match_assists
    ]])
    pred = modelo.predict(entrada)
    return {"match_kills": float(pred[0])}

# ----------- MODELO DE CLASIFICACIÓN -----------
class DatosClasificacion(BaseModel):
    round_winner: str             # "Terroristas" o "ContraTerroristas"
    round_starting_equipment_value: float
    team_starting_equipment_value: float
    round_kills: float
    round_assists: float
    time_alive: float
    travelled_distance: float
    aggro_ratio: float
    map: str                      # "inferno", "mirage", "nuke"
    team_terrorist: str           # "true" o "false"

@app.post("/predict_clasificacion")
def predecir_clasificacion(data: DatosClasificacion):
    # Codificación de variables
    round_winner = 1 if data.round_winner == "Terroristas" else 0
    team_terrorist = 1 if data.team_terrorist.lower() == "true" else 0
    map_inferno = 1 if data.map == "inferno" else 0
    map_mirage = 1 if data.map == "mirage" else 0
    map_nuke = 1 if data.map == "nuke" else 0

    entrada = np.array([[ 
        round_winner,
        data.round_starting_equipment_value,
        data.time_alive,
        data.aggro_ratio,
        data.round_kills,
        data.round_assists,
        data.travelled_distance,
        data.team_starting_equipment_value,
        map_inferno,
        map_mirage,
        map_nuke,
        team_terrorist
    ]])

    pred_clase = int(modelo2.predict(entrada)[0])
    pred_proba = float(modelo2.predict_proba(entrada)[0][1])  # ya está entre 0 y 1
    prob_percent = round(pred_proba * 100, 2)

    return {
        "clase": pred_clase,
        "probability": prob_percent,
        "message": "✅ Probabilidad de sobrevivir" if pred_clase == 1 else "❌ Alta probabilidad de morir"
    }
