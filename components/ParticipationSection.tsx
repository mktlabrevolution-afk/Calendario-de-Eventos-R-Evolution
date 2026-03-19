
import React from 'react';
import { EdTechEvent, GRADIENTS } from '../types';

interface ParticipationSectionProps {
  events: EdTechEvent[];
}

export const ParticipationSection: React.FC<ParticipationSectionProps> = ({ events }) => {
  const groupedEvents = {
    'Muy Alta': events.filter(e => e.relevance === 'Muy Alta'),
    'Alta': events.filter(e => e.relevance === 'Alta'),
    'Media': events.filter(e => e.relevance === 'Media'),
  };

  const renderSection = (title: string, colorClass: string, items: EdTechEvent[]) => {
      if (items.length === 0) return null;
      return (
        <div className="mb-12 last:mb-0">
            <h3 className={`text-xl font-bold text-white mb-6 flex items-center border-b border-white/5 pb-4`}>
                <span className={`w-3 h-3 rounded-full mr-3 shadow-[0_0_12px] ${colorClass}`}></span>
                {title}
                <span className="ml-auto text-xs font-normal text-slate-400 bg-[#1E293B] border border-white/5 px-3 py-1 rounded-full">{items.length} Eventos</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {items.map(event => (
                    <div key={event.id} className="bg-[#030712]/40 border border-white/5 rounded-xl p-5 hover:bg-[#1E293B]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/40 group flex flex-col h-full relative overflow-hidden">
                        {/* Hover Gradient Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        
                        <div className="mb-4 relative z-10">
                            <h4 className="font-bold text-white text-base leading-snug group-hover:text-[#00DC82] transition-colors">{event.name}</h4>
                            <div className="flex flex-col mt-2 space-y-1">
                                <span className="text-xs text-slate-400 flex items-center">
                                    <svg className="w-3 h-3 mr-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    {event.date}
                                </span>
                                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider flex items-center">
                                     <svg className="w-3 h-3 mr-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    {event.location}
                                </span>
                            </div>
                        </div>
                        
                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-end relative z-10">
                             {event.website ? (
                                <a 
                                    href={event.website} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-full text-center inline-flex items-center justify-center px-3 py-2 rounded-lg bg-[#00DC82]/10 text-[#00DC82] text-xs font-bold border border-[#00DC82]/20 hover:bg-[#00DC82] hover:text-black transition-all shadow-[0_0_10px_rgba(0,220,130,0.1)] hover:shadow-[0_0_15px_rgba(0,220,130,0.4)]"
                                >
                                    Cómo Participar
                                    <svg className="w-3 h-3 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                             ) : (
                                 <span className="w-full text-center text-xs text-slate-600 cursor-not-allowed py-2 border border-white/5 rounded-lg bg-white/5">Info no disponible</span>
                             )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      );
  };

  return (
    <section className="bg-[#0B1221]/70 border border-white/5 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8">
        <h2 className={`text-3xl font-bold border-b pb-4 border-white/10 mb-8`}>
            <span className={`bg-clip-text text-transparent ${GRADIENTS.title}`}>Guía de Inscripción & Links</span>
        </h2>
        
        {renderSection('Prioridad Estratégica: Muy Alta', 'bg-red-500 shadow-red-500/50', groupedEvents['Muy Alta'])}
        {renderSection('Prioridad Estratégica: Alta', 'bg-orange-500 shadow-orange-500/50', groupedEvents['Alta'])}
        {renderSection('Prioridad Estratégica: Media', 'bg-blue-500 shadow-blue-500/50', groupedEvents['Media'])}
    </section>
  );
};
