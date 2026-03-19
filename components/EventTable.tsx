
import React, { useState } from 'react';
import { EdTechEvent, UserStateMap, ORGANIZATIONS, COLORS, GRADIENTS } from '../types';

interface EventTableProps {
  events: EdTechEvent[];
  userState: UserStateMap;
  onUpdateState: (id: number, field: string, value: string) => void;
  onOpenCommentModal: (id: number, name: string, currentComment: string) => void;
  onOpenFinancialModal: (id: number, name: string, currentInfo: string) => void;
}

export const EventTable: React.FC<EventTableProps> = ({ events, userState, onUpdateState, onOpenCommentModal, onOpenFinancialModal }) => {
  const [filterRegion, setFilterRegion] = useState('Todas');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [filterRelevance, setFilterRelevance] = useState('Todas');

  const filteredEvents = events.filter(event => {
    const state = userState[event.id] || { status: '' };
    const regionMatch = filterRegion === 'Todas' || event.region === filterRegion;
    const statusMatch = filterStatus === 'Todos' || state.status === filterStatus;
    const relevanceMatch = filterRelevance === 'Todas' || event.relevance === filterRelevance;
    return regionMatch && statusMatch && relevanceMatch;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => a.id - b.id);

  const resetFilters = () => {
    setFilterRegion('Todas');
    setFilterStatus('Todos');
    setFilterRelevance('Todas');
  };

  const exportToExcel = () => {
     const headers = [
         "ID", "Nombre", "Fecha", "Ubicación", "Región", "Tipo", "Relevancia", "Website", "Notas Clave",
         "Estado Usuario", "Organización Taggeada", "Comentarios/Feedback", "Inversión/Costos"
     ];
     let csvContent = headers.join(";") + "\n";

     events.forEach(event => {
         const state = userState[event.id] || { status: '', organization: '', comment: '', financialInfo: '' };
         const rowData = [
             event.id,
             `"${event.name.replace(/"/g, '""')}"`,
             event.date,
             `"${event.location.replace(/"/g, '""')}"`,
             event.region,
             event.type,
             event.relevance,
             event.website || '',
             `"${event.notes.replace(/"/g, '""')}"`,
             state.status || 'No Marcado',
             state.organization || 'Ninguna',
             `"${(state.comment || '').replace(/"/g, '""')}"`,
             `"${(state.financialInfo || '').replace(/"/g, '""')}"`
         ];
         csvContent += rowData.join(";") + "\n";
     });

     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
     const url = URL.createObjectURL(blob);
     const link = document.createElement('a');
     link.setAttribute('href', url);
     link.setAttribute('download', 'Eventos_EdTech_Revolution_Planificacion.csv');
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
  };

  return (
    <section className="bg-[#0B1221]/70 border border-white/5 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8 space-y-6">
       <h2 className={`text-3xl font-bold border-b pb-4 border-white/10`}>
            <span className={`bg-clip-text text-transparent ${GRADIENTS.title}`}>Directorio Completo de Eventos</span>
        </h2>

        {/* Controls */}
        <div className="flex flex-wrap items-end gap-4 p-4 bg-[#030712]/40 rounded-xl border border-white/5">
             <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-slate-300 mb-1">Región</label>
                <select 
                    value={filterRegion} 
                    onChange={(e) => setFilterRegion(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base rounded-lg text-white bg-[#1E293B] border border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#00DC82] sm:text-sm transition shadow-sm"
                >
                    <option value="Todas">Todas</option>
                    <option value="Norteamérica">Norteamérica</option>
                    <option value="Latinoamérica">Latinoamérica</option>
                    <option value="España">España</option>
                    <option value="Virtual/Global">Virtual/Global</option>
                </select>
            </div>
            
            <div className="flex-1 min-w-[150px]">
                <label className="block text-sm font-medium text-slate-300 mb-1">Relevancia</label>
                <select 
                    value={filterRelevance}
                    onChange={(e) => setFilterRelevance(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base rounded-lg text-white bg-[#1E293B] border border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#00DC82] sm:text-sm transition shadow-sm"
                >
                    <option value="Todas">Todas</option>
                    <option value="Muy Alta">Muy Alta</option>
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                </select>
            </div>

            <div className="flex-1 min-w-[150px]">
                <label className="block text-sm font-medium text-slate-300 mb-1">Estado</label>
                <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base rounded-lg text-white bg-[#1E293B] border border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#00DC82] sm:text-sm transition shadow-sm"
                >
                    <option value="Todos">Todos</option>
                    <option value="Ya asistí">Ya asistí</option>
                    <option value="Voy a asistir">Voy a asistir</option>
                </select>
            </div>
             <button onClick={resetFilters} className="px-5 py-2 bg-slate-700 text-white font-semibold rounded-lg shadow-md hover:bg-slate-600 transition duration-150 h-10 border border-slate-600">
                Limpiar
            </button>
            <button onClick={exportToExcel} className="px-5 py-2 text-white font-semibold rounded-lg shadow-md ml-auto transition duration-150 h-10 flex items-center bg-gradient-to-r from-[#00DC82] to-[#0047FF] hover:opacity-90 border border-white/10">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 011 1v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0V8H8a1 1 0 010-2h2V4a1 1 0 011-1z" clipRule="evenodd" fillRule="evenodd"></path><path d="M15.414 10.586a2 2 0 00-2.828 0L10 13.172l-2.586-2.586a2 2 0 10-2.828 2.828l4 4a2 2 0 002.828 0l4-4a2 2 0 000-2.828z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                Exportar
            </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl shadow-inner border border-white/5">
            <table className="min-w-full divide-y divide-white/5">
                <thead className="bg-[#030712]/80 text-slate-300">
                    <tr>
                        <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">#</th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Fecha / Región</th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Relevancia</th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Org & Estado</th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Inversión / Costos</th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Notas & Comentarios</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {sortedEvents.map(event => {
                        const state = userState[event.id] || { status: '', organization: 'Ninguna', comment: '', financialInfo: '' };
                        
                        // Inline style for border color
                        const borderColor = event.region === 'Norteamérica' ? COLORS.na : 
                                            event.region === 'Latinoamérica' ? COLORS.latam : 
                                            event.region === 'España' ? COLORS.spain : COLORS.global;

                        const relevanceClass = event.relevance === 'Muy Alta' ? 'bg-red-500/20 text-red-200 border border-red-500/30' :
                                               event.relevance === 'Alta' ? 'bg-orange-500/20 text-orange-200 border border-orange-500/30' :
                                               'bg-blue-500/20 text-blue-200 border border-blue-500/30';

                        return (
                            <tr key={event.id} className="bg-[#030712]/30 hover:bg-[#030712]/60 transition duration-150" style={{ borderLeft: `4px solid ${borderColor}` }}>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-400">{event.id}</td>
                                <td className="px-6 py-4 text-sm font-semibold text-white max-w-[200px]">
                                    {event.name}
                                    {event.website && <br/>}
                                    {event.website && <a href={event.website} target="_blank" rel="noreferrer" className="text-xs text-[#00DC82] hover:text-[#00DC82]/80 hover:underline">Ver Website</a>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                    <div className="flex flex-col">
                                        <span>{event.date}</span>
                                        <span className="text-xs text-slate-500">{event.location}</span>
                                        <span className="text-xs opacity-70" style={{ color: borderColor }}>{event.region}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-xs">
                                    <span className={`inline-flex px-2 py-1 rounded-full font-semibold leading-tight ${relevanceClass}`}>
                                        {event.relevance}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex flex-col space-y-2">
                                        <select 
                                            value={state.organization} 
                                            onChange={(e) => onUpdateState(event.id, 'organization', e.target.value)}
                                            className="p-1.5 border rounded-lg text-xs text-white bg-[#1E293B] border-slate-600 focus:ring-[#00DC82] focus:border-[#00DC82] w-full shadow-sm"
                                        >
                                            {ORGANIZATIONS.map(org => (
                                                <option key={org} value={org}>{org}</option>
                                            ))}
                                        </select>
                                        <div className="flex space-x-1">
                                            <button 
                                                onClick={() => onUpdateState(event.id, 'status', state.status === 'Ya asistí' ? '' : 'Ya asistí')}
                                                className={`flex-1 py-1 text-[10px] font-bold rounded transition duration-100 border ${state.status === 'Ya asistí' ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-transparent text-slate-400 border-slate-600 hover:text-yellow-500'}`}
                                            >
                                                Asistí
                                            </button>
                                            <button 
                                                onClick={() => onUpdateState(event.id, 'status', state.status === 'Voy a asistir' ? '' : 'Voy a asistir')}
                                                className={`flex-1 py-1 text-[10px] font-bold rounded transition duration-100 border ${state.status === 'Voy a asistir' ? 'bg-[#00DC82] text-black border-[#00DC82]' : 'bg-transparent text-slate-400 border-slate-600 hover:text-[#00DC82]'}`}
                                            >
                                                Iré
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                {/* Nueva Columna de Inversión/Costos */}
                                <td className="px-6 py-4 text-sm min-w-[200px]">
                                    <div className="flex flex-col space-y-2">
                                        {state.financialInfo ? (
                                             <div className="text-xs text-yellow-100 bg-yellow-900/20 border border-yellow-500/20 p-2 rounded relative">
                                                <span className="font-bold block text-yellow-500 mb-1">Datos registrados:</span>
                                                <p className="line-clamp-3">{state.financialInfo}</p>
                                             </div>
                                        ) : (
                                            <span className="text-xs text-slate-600 italic">Sin datos financieros</span>
                                        )}
                                        <button 
                                            onClick={() => onOpenFinancialModal(event.id, event.name, state.financialInfo || '')}
                                            className="flex items-center justify-center space-x-1 py-1 px-3 text-xs font-semibold rounded-lg border border-yellow-600/50 text-yellow-500 hover:bg-yellow-500/10 transition"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{state.financialInfo ? 'Editar Costos' : 'Sumar Costos'}</span>
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm max-w-xs min-w-[200px]">
                                    <div className="space-y-2">
                                        <p className="text-xs text-slate-500">{event.notes}</p>
                                        <div className="text-sm italic text-slate-300 bg-[#1E293B]/50 p-2 rounded-lg border border-white/5 relative group cursor-pointer" onClick={() => onOpenCommentModal(event.id, event.name, state.comment)}>
                                            {state.comment || 'Sin comentarios'}
                                            <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center rounded-lg text-xs font-bold text-white">Editar</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </section>
  );
};
