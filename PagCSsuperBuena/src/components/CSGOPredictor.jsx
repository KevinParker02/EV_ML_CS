import React, { useState } from 'react';
import logo from '../logo.png';
import fondo from '../fondo.jpg';

const CSGOPredictor = () => {
  const [formClasificacion, setFormClasificacion] = useState({
    round_winner: '',
    round_starting_equipment_value: 0,
    team_starting_equipment_value: 0,
    round_kills: 0,
    round_assists: 0,
    time_alive: 0,
    travelled_distance: 0,
    aggro_ratio: 0.0,
    map: '',
    team_terrorist: '',
  });

  const [formRegresion, setFormRegresion] = useState({
    match_headshots: 0,
    team_starting_equipment_value: 0,
    match_flank_kills: 0,
    match_assists: 0,
  });

  const [prediction, setPrediction] = useState(null);
  const [regresionResult, setRegresionResult] = useState(null);
  const [loadingClasificacion, setLoadingClasificacion] = useState(false);
  const [loadingRegresion, setLoadingRegresion] = useState(false);

  const handleChangeClasificacion = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : type === 'range' || type === 'number' ? Number(value) : value;
    setFormClasificacion({ ...formClasificacion, [name]: newValue });
  };

  const handleChangeRegresion = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : type === 'range' || type === 'number' ? Number(value) : value;
    setFormRegresion({ ...formRegresion, [name]: newValue });
  };

  const handleSubmitClasificacion = async (e) => {
    e.preventDefault();
    setLoadingClasificacion(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/predict_clasificacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formClasificacion),
      });
      const data = await res.json();
      setPrediction({
        probability: data.probability,
        message: data.message || 'Resultado de predicción',
      });
    } catch (err) {
      console.error("Error al predecir clasificación:", err);
    } finally {
      setLoadingClasificacion(false);
    }
  };

  const handleSubmitRegresion = async (e) => {
    e.preventDefault();
    setLoadingRegresion(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/predict_regresion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formRegresion),
      });
      const data = await res.json();
      setRegresionResult(data.match_kills || 0);
    } catch (err) {
      console.error("Error al predecir regresión:", err);
    } finally {
      setLoadingRegresion(false);
    }
  };

  const inputClass = 'bg-[#0e1525] text-white border border-orange-500 p-2 rounded-md placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-orange-500';

  return (
    <div className="min-h-screen bg-cover bg-center relative flex flex-col items-center justify-start px-4" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center py-12">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3">
            <img src={logo} alt="logo" className="w-10 h-10" />
            <h1 className="text-4xl font-extrabold text-white">
              CSGO <span className="text-gray-300">PREDICTOR</span>
            </h1>
          </div>
          <p className="mt-2 text-lg text-gray-400">Predice la ronda. Domina la partida.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
          {/* CLASIFICACIÓN */}
          <div className="bg-[#101729] p-6 rounded-xl shadow-xl w-full md:w-[500px]">
            <form onSubmit={handleSubmitClasificacion} className="grid grid-cols-2 gap-4">
              <h2 className="col-span-2 text-white font-bold text-xl">CLASIFICACIÓN</h2>

              <div className="col-span-2">
                <label className="block text-orange-400 font-semibold mb-1">Valor de tu equipamiento de la ronda</label>
                <div className="flex items-center gap-4">
                  <input type="range" name="round_starting_equipment_value" min="0" max="9000" step="100" value={formClasificacion.round_starting_equipment_value} onChange={handleChangeClasificacion} className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer accent-orange-500" />
                  <span className="text-orange-400 font-bold w-16 text-right">{formClasificacion.round_starting_equipment_value}</span>
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-orange-400 font-semibold mb-1">Valor del equipamiento del equipo</label>
                <div className="flex items-center gap-4">
                  <input type="range" name="team_starting_equipment_value" min="0" max="9000" step="100" value={formClasificacion.team_starting_equipment_value} onChange={handleChangeClasificacion} className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer accent-orange-500" />
                  <span className="text-orange-400 font-bold w-16 text-right">{formClasificacion.team_starting_equipment_value}</span>
                </div>
              </div>

              <h2>Tus Kills</h2>
              <input type="number" name="round_kills" placeholder="Kills ronda" value={formClasificacion.round_kills} onChange={handleChangeClasificacion} className={inputClass} />
              <h2>Tus Asissts</h2>
              <input type="number" name="round_assists" placeholder="Asistencias ronda" value={formClasificacion.round_assists} onChange={handleChangeClasificacion} className={inputClass} />
              <h2>Segundos vivo</h2>
              <input type="number" name="time_alive" placeholder="Tiempo con vida (s)" value={formClasificacion.time_alive} onChange={handleChangeClasificacion} className={inputClass} />
              <h2>Distancia Recorrida (METROS)</h2>
              <input type="number" name="travelled_distance" placeholder="Distancia recorrida (m)" value={formClasificacion.travelled_distance} onChange={handleChangeClasificacion} className={inputClass} />

              <h2>¿Quién ganó?</h2>
              <select name="round_winner" value={formClasificacion.round_winner} onChange={handleChangeClasificacion} className={inputClass}>
                <option value="">Selecciona</option>
                <option value="Terroristas">Terroristas</option>
                <option value="ContraTerroristas">ContraTerroristas</option>
              </select>

              <h2>¿Qué tan agresivo fuiste?</h2>
              <input type="number" step="0.01" name="aggro_ratio" placeholder="Índice de agresividad" value={formClasificacion.aggro_ratio} onChange={handleChangeClasificacion} className={inputClass} />

              <h2>¿Qué mapa jugaste?</h2>
              <select name="map" value={formClasificacion.map} onChange={handleChangeClasificacion} className={inputClass}>
                <option value="">Selecciona</option>
                <option value="inferno">de_inferno</option>
                <option value="mirage">de_mirage</option>
                <option value="nuke">de_nuke</option>
              </select>

              <h2>¿Jugaste como terrorista?</h2>
              <select name="team_terrorist" value={formClasificacion.team_terrorist} onChange={handleChangeClasificacion} className={inputClass}>
                <option value="">Selecciona</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>

              <button type="submit" className="col-span-2 mt-4 bg-orange-500 hover:bg-orange-600 font-bold py-3 px-6 rounded text-lg">Predecir Supervivencia</button>
            </form>

            {loadingClasificacion && <div className="mt-10 text-center text-orange-400 font-semibold text-xl">Calculando...</div>}

            {!loadingClasificacion && prediction && (
              <div className="mt-10 text-center border-t border-gray-700 pt-6">
                <h2 className="text-white text-xl font-bold mb-2">Probabilidad de sobrevivir</h2>
                <div className="text-5xl font-bold text-orange-400">
                  {prediction.probability}%
                </div>
                <p className="text-gray-400 mt-1">{prediction.message}</p>
              </div>
            )}
          </div>

          {/* REGRESIÓN */}
          <div className="bg-[#101729] p-6 rounded-xl shadow-xl w-full md:w-[500px]">
            <h2 className="text-white font-bold text-xl mb-4">REGRESIÓN</h2>
            <form onSubmit={handleSubmitRegresion} className="grid grid-cols-2 gap-4">
              
              {/* Match Headshots */}
              <div className="col-span-2">
                <label className="block text-orange-400 font-semibold mb-1">Headshots del equipo</label>
                <input type="number" name="match_headshots" value={formRegresion.match_headshots} onChange={handleChangeRegresion} className={inputClass} />
              </div>

              {/* Flank Kills */}
              <div className="col-span-2">
                <label className="block text-orange-400 font-semibold mb-1">Flank kills del equipo</label>
                <input type="number" name="match_flank_kills" value={formRegresion.match_flank_kills} onChange={handleChangeRegresion} className={inputClass} />
              </div>

              {/* Match Assists */}
              <div className="col-span-2">
                <label className="block text-orange-400 font-semibold mb-1">Asistencias del equipo</label>
                <input type="number" name="match_assists" value={formRegresion.match_assists} onChange={handleChangeRegresion} className={inputClass} />
              </div>

              {/* Team Starting Equipment (slider) */}
              <div className="col-span-2">
                <label className="block text-orange-400 font-semibold mb-1">Valor del equipamiento del equipo</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    name="team_starting_equipment_value"
                    min="0"
                    max="9000"
                    step="100"
                    value={formRegresion.team_starting_equipment_value}
                    onChange={handleChangeRegresion}
                    className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer accent-orange-500"
                  />
                  <span className="text-orange-400 font-bold w-16 text-right">{formRegresion.team_starting_equipment_value}</span>
                </div>
              </div>

              <button type="submit" className="col-span-2 mt-4 bg-orange-500 hover:bg-orange-600 font-bold py-3 px-6 rounded text-lg">
                Calcular kills estimados
              </button>
            </form>

            {loadingRegresion && <div className="mt-10 text-center text-orange-400 font-semibold text-xl">Calculando...</div>}

            {!loadingRegresion && regresionResult !== null && (
              <div className="mt-10 text-center border-t border-gray-700 pt-6">
                <h2 className="text-white text-xl font-bold mb-2">Kills estimados</h2>
                <div className="text-5xl font-bold text-orange-400">{regresionResult.toFixed(2)}</div>
                <p className="text-gray-400 mt-1">Según rendimiento del equipo</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSGOPredictor;
