
import React, { useState } from 'react';

const CSGOPredictor = () => {
  const [formData, setFormData] = useState({
    map: '',
    team: '',
    weapon: '',
    equipmentValue: '',
    timeAlive: '',
    distance: '',
    lethal: false,
    nonLethal: false,
    kills: '',
    assists: '',
    headshots: '',
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular resultado
    setPrediction({
      probability: '73%',
      message: 'Alta chance de victoria',
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-xl shadow-xl">
      <h1 className="text-3xl font-bold text-orange-400 mb-4">CSGO Predictor</h1>
      <p className="mb-6 text-gray-300">Predice el resultado de una ronda con base en datos tácticos.</p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <select name="map" value={formData.map} onChange={handleChange} className="p-2 rounded">
            <option value="">Selecciona el mapa</option>
            <option value="Dust2">Dust2</option>
            <option value="Inferno">Inferno</option>
            <option value="Mirage">Mirage</option>
          </select>

          <select name="team" value={formData.team} onChange={handleChange} className="p-2 rounded">
            <option value="">Selecciona el equipo</option>
            <option value="Terrorist">Terrorist</option>
            <option value="Counter-Terrorist">Counter-Terrorist</option>
          </select>

          <select name="weapon" value={formData.weapon} onChange={handleChange} className="p-2 rounded">
            <option value="">Tipo de arma</option>
            <option value="Rifle">Rifle</option>
            <option value="SMG">SMG</option>
            <option value="Sniper">Sniper</option>
          </select>

          <input type="number" name="equipmentValue" placeholder="Valor equipamiento" value={formData.equipmentValue} onChange={handleChange} className="p-2 rounded" />
          <input type="number" name="timeAlive" placeholder="Tiempo vivo (s)" value={formData.timeAlive} onChange={handleChange} className="p-2 rounded" />
          <input type="number" name="distance" placeholder="Distancia recorrida (m)" value={formData.distance} onChange={handleChange} className="p-2 rounded" />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="lethal" checked={formData.lethal} onChange={handleChange} /> Granada Letal
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="nonLethal" checked={formData.nonLethal} onChange={handleChange} /> Granada No Letal
          </label>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <input type="number" name="kills" placeholder="Kills" value={formData.kills} onChange={handleChange} className="p-2 rounded" />
          <input type="number" name="assists" placeholder="Assists" value={formData.assists} onChange={handleChange} className="p-2 rounded" />
          <input type="number" name="headshots" placeholder="Headshots" value={formData.headshots} onChange={handleChange} className="p-2 rounded" />
        </div>

        <button type="submit" className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
          Predecir Resultado
        </button>
      </form>

      {prediction && (
        <div className="mt-6 p-4 bg-gray-700 rounded-xl text-center">
          <h2 className="text-xl font-semibold text-green-400">Probabilidad de Victoria: {prediction.probability}</h2>
          <p className="text-gray-300 mt-2">{prediction.message}</p>
        </div>
      )}
    </div>
  );
};

export default CSGOPredictor;
