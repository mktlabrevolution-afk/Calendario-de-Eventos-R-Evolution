
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { EdTechEvent, UserStateMap, COLORS, GRADIENTS } from '../types';

interface EventMapProps {
  events: EdTechEvent[];
  userState: UserStateMap;
}

// Helper to create custom HTML icons
const createCustomIcon = (id: number, region: string, hasStatus: boolean) => {
  let color = '#CCCCCC';
  if (region === 'Norteamérica') color = COLORS.na;
  else if (region === 'Latinoamérica') color = COLORS.latam;
  else if (region === 'España') color = COLORS.spain;
  else if (region === 'Virtual/Global') color = COLORS.global;

  const bgColor = hasStatus ? color : 'white';
  const textColor = hasStatus ? 'white' : color;

  const html = `<div class="custom-div-icon" style="border-color: ${color}; background-color: ${bgColor}; color: ${textColor};">${id}</div>`;

  return L.divIcon({
    className: 'custom-marker',
    html: html,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

export const EventMap: React.FC<EventMapProps> = ({ events, userState }) => {
  return (
    <section className="bg-[#0B1221]/70 border border-white/5 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8 space-y-6">
      <h2 className={`text-3xl font-bold border-b pb-4 border-white/10`}>
        <span className={`bg-clip-text text-transparent ${GRADIENTS.title}`}>Mapa Mundial Interactivo</span>
      </h2>
      <div className="h-96 w-full rounded-2xl shadow-inner overflow-hidden border border-white/10 relative z-0">
        <MapContainer 
            center={[15, -40] as L.LatLngExpression} 
            zoom={3} 
            scrollWheelZoom={false} 
            style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {events.map((event) => {
            if (event.lat === 0 && event.lng === 0) return null;
            
            const state = userState[event.id];
            const hasStatus = !!(state && state.status);
            
            return (
              <Marker 
                key={event.id} 
                position={[event.lat, event.lng]} 
                icon={createCustomIcon(event.id, event.region, hasStatus)}
              >
                <Popup className="leaflet-popup-content-wrapper-custom">
                  <div className="font-sans text-sm text-gray-800 p-1">
                    <h4 className="font-bold text-base mb-1">{event.name}</h4>
                    <p><strong>Fecha:</strong> {event.date}</p>
                    <p><strong>Ubicación:</strong> {event.location}</p>
                    <p><strong>Audiencia:</strong> {event.type}</p>
                    <p><strong>Relevancia:</strong> {event.relevance}</p>
                    <p className="mt-2 text-xs italic text-gray-600">{event.notes.substring(0, 50)}...</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      <div className="flex flex-wrap justify-center gap-6 text-sm font-medium pt-4 text-slate-300">
         <div className="flex items-center"><span className="inline-block w-3 h-3 rounded-full mr-2 shadow-[0_0_8px_rgba(59,130,246,0.6)]" style={{ backgroundColor: COLORS.na }}></span> Norteamérica</div>
         <div className="flex items-center"><span className="inline-block w-3 h-3 rounded-full mr-2 shadow-[0_0_8px_rgba(0,220,130,0.6)]" style={{ backgroundColor: COLORS.latam }}></span> Latinoamérica</div>
         <div className="flex items-center"><span className="inline-block w-3 h-3 rounded-full mr-2 shadow-[0_0_8px_rgba(249,115,22,0.6)]" style={{ backgroundColor: COLORS.spain }}></span> España</div>
         <div className="flex items-center"><span className="inline-block w-3 h-3 rounded-full mr-2 shadow-[0_0_8px_rgba(217,70,239,0.6)]" style={{ backgroundColor: COLORS.global }}></span> Virtual/Global</div>
      </div>
    </section>
  );
};
