import React, { useState } from 'react';
import logo from '../logo.png';
import fondo from '../fondo.jpg';


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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue;

    if (type === 'checkbox') {
      newValue = checked;
    } else if (type === 'range' || type === 'number') {
      newValue = Number(value); // Convierte a número
    } else {
      newValue = value;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);

  setTimeout(() => {
    setPrediction({
      probability: '62%',
      message: 'Moderada chance de victoria',
    });
    setLoading(false);
  }, 2000);
};

  const inputClass = 'bg-[#0e1525] text-white border border-orange-500 p-2 rounded-md placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-orange-500';


  return (
    <div
    className="min-h-screen bg-cover bg-center relative flex flex-col items-center justify-start px-4"
    style={{ backgroundImage: `url(${fondo})` }}
  >
    {/* Capa oscura encima del fondo */}
    <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

    {/* Contenido principal */}
    <div className="relative z-10 w-full max-w-4xl flex flex-col items-center py-12">
      {/* Header y logo */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <h1 className="text-4xl font-extrabold text-white">
            CSGO <span className="text-gray-300">PREDICTOR</span>
          </h1>
        </div>
        <p className="mt-2 text-lg text-gray-400">Predice la ronda. Domina la partida.</p>
        <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full text-lg">
          INICIAR PREDICCIÓN
        </button>
      </div>
    <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
      {/*--------------------------------------------------- div 1 ------------------------------------------------------------------*/}
      <div className="bg-[#101729] p-6 rounded-xl shadow-xl w-full md:w-[500px]">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <h2>CLASIFICACIÓN</h2>
          
          <div className="col-span-2">
            <label className="block text-orange-400 font-semibold mb-1">Valor del equipamiento de la ronda</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                name="equipmentValue"
                min="0"
                max="9000"
                step="100"
                value={formData.equipmentValue}
                onChange={handleChange}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <span className="text-orange-400 font-bold w-16 text-right">{formData.equipmentValue}</span>
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-orange-400 font-semibold mb-1">Valor del equipamiento del equipo</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                name="equipmentValue"
                min="0"
                max="9000"
                step="100"
                value={formData.equipmentValue}
                onChange={handleChange}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <span className="text-orange-400 font-bold w-16 text-right">{formData.equipmentValue}</span>
            </div>
          </div>

          <input type="number" name="kills" placeholder="Asesinatos en la ronda" value={formData.kills} onChange={handleChange} className={inputClass} />
          <input type="number" name="kills" placeholder="Asistencias en la ronda" value={formData.kills} onChange={handleChange} className={inputClass} />
          <input type="number" name="kills" placeholder="Tiempo de supervivencia" value={formData.kills} onChange={handleChange} className={inputClass} />
          <input type="number" name="kills" placeholder="Distancia recorrida" value={formData.kills} onChange={handleChange} className={inputClass} />
          
          <select name="map" value={formData.map} onChange={handleChange} className={inputClass}>
            <option value="">Equipo Ganador</option>
            <option value="Terroristas">Terroristas</option>
            <option value="ContraTerroristas">ContraTerroristas</option>
          </select>

          <button type="submit" className="col-span-2 mt-4 bg-orange-500 hover:bg-orange-600 font-bold py-3 px-6 rounded text-lg">
            Predecir Supervivencia
          </button>
        </form>

        {/* Mostrar mensaje de carga si está cargando */}
        {loading && (
          <div className="mt-10 text-center text-orange-400 font-semibold text-xl">
            Calculando...
          </div>
        )}

        {/* Mostrar predicción solo si ya está lista y no está cargando */}
        {!loading && prediction && (
          <div className="mt-10 text-center border-t border-gray-700 pt-6">
            <h2 className="text-white text-xl font-bold mb-2">Probabilidad de ganar</h2>
            <div className="text-5xl font-bold text-orange-400">{prediction.probability}</div>
            <p className="text-gray-400 mt-1">{prediction.message}</p>
            <div className="mt-4 flex justify-center">
              <div className="w-24 h-24 rounded-full border-8 border-orange-400 border-r-blue-500 rotate-45"></div>
            </div>
          </div>
        )}
      </div>

      {/*--------------------------------------------------- div 2 ------------------------------------------------------------------*/}
      <div className="bg-[#101729] p-6 rounded-xl shadow-xl w-full md:w-[500px]">

        <h2>REGRESIÓN</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-orange-400 font-semibold mb-1">Valor del equipamiento del equipo</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                name="equipmentValue"
                min="0"
                max="9000"
                step="100"
                value={formData.equipmentValue}
                onChange={handleChange}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <span className="text-orange-400 font-bold w-16 text-right">{formData.equipmentValue}</span>
            </div>
          </div>

          <input type="number" name="kills" placeholder="Asesinatos en la partida" value={formData.kills} onChange={handleChange} className={inputClass} />
          <input type="number" name="kills" placeholder="Tiempo de supervivencia" value={formData.kills} onChange={handleChange} className={inputClass} />
          <input type="number" name="kills" placeholder="Distancia recorrida" value={formData.kills} onChange={handleChange} className={inputClass} />


          <button type="submit" className="col-span-2 mt-4 bg-orange-500 hover:bg-orange-600 font-bold py-3 px-6 rounded text-lg">
            Calcular probabilidad de victoria
          </button>
        </form>

        {/* Mostrar mensaje de carga si está cargando */}
        {loading && (
          <div className="mt-10 text-center text-orange-400 font-semibold text-xl">
            Calculando...
          </div>
        )}

        {/* Mostrar predicción solo si ya está lista y no está cargando */}
        {!loading && prediction && (
          <div className="mt-10 text-center border-t border-gray-700 pt-6">
            <h2 className="text-white text-xl font-bold mb-2">Probabilidad de ganar</h2>
            <div className="text-5xl font-bold text-orange-400">{prediction.probability}</div>
            <p className="text-gray-400 mt-1">{prediction.message}</p>
            <div className="mt-4 flex justify-center">
              <div className="w-24 h-24 rounded-full border-8 border-orange-400 border-r-blue-500 rotate-45"></div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  </div>
  );
};

export default CSGOPredictor;
