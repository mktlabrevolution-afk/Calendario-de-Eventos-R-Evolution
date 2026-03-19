
import React, { useState, useEffect } from 'react';
import { events } from './data';
import { UserStateMap, COLORS, UserEventState, GRADIENTS } from './types';
import { SummarySection } from './components/SummarySection';
import { ChartsSection } from './components/ChartsSection';
import { EventMap } from './components/EventMap';
import { EventTable } from './components/EventTable';
import { CommentModal } from './components/CommentModal';
import { FinancialModal } from './components/FinancialModal';
import { ParticipationSection } from './components/ParticipationSection';

const App: React.FC = () => {
  const [userState, setUserState] = useState<UserStateMap>({});
  
  // Persistence
  useEffect(() => {
    try {
      const stored = localStorage.getItem('edTechEventsState');
      if (stored) {
        setUserState(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error loading state", e);
    }
  }, []);

  const saveState = (newState: UserStateMap) => {
    setUserState(newState);
    try {
      localStorage.setItem('edTechEventsState', JSON.stringify(newState));
    } catch (e) {
      console.error("Error saving state", e);
    }
  };

  const handleUpdateState = (id: number, field: string, value: string) => {
    const currentState = userState[id] || { status: '', organization: 'Ninguna', comment: '', financialInfo: '' };
    const updated = { ...currentState, [field]: value };
    saveState({ ...userState, [id]: updated });
  };

  // KPI Calculation
  const kpis = {
    total: events.length,
    attending: 0,
    attended: 0,
    orgCount: 0
  };

  Object.values(userState).forEach((val) => {
    const state = val as UserEventState;
    if (state.status === 'Voy a asistir') kpis.attending++;
    if (state.status === 'Ya asistí') kpis.attended++;
    if (state.organization && state.organization !== 'Ninguna') kpis.orgCount++;
  });

  // Comment Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ id: 0, name: '', comment: '' });

  const openModal = (id: number, name: string, comment: string) => {
    setModalData({ id, name, comment });
    setModalOpen(true);
  };

  const handleSaveComment = (comment: string) => {
    handleUpdateState(modalData.id, 'comment', comment);
    setModalOpen(false);
  };

  // Financial Modal State
  const [financialModalOpen, setFinancialModalOpen] = useState(false);
  const [financialModalData, setFinancialModalData] = useState({ id: 0, name: '', info: '' });

  const openFinancialModal = (id: number, name: string, info: string) => {
    setFinancialModalData({ id, name, info });
    setFinancialModalOpen(true);
  };

  const handleSaveFinancial = (info: string) => {
    handleUpdateState(financialModalData.id, 'financialInfo', info);
    setFinancialModalOpen(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative bg-[#030712] overflow-x-hidden">
        {/* Textured Background with Gradients */}
        <div className="fixed inset-0 z-0 pointer-events-none">
            {/* Dark base */}
            <div className="absolute inset-0 bg-[#030712]"></div>
            
            {/* Gradient Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00DC82]/10 rounded-full blur-[120px] mix-blend-screen"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0047FF]/10 rounded-full blur-[120px] mix-blend-screen"></div>
            <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-[#00DC82]/5 rounded-full blur-[100px] mix-blend-screen"></div>
            
            {/* Subtle Grid/Dot Texture */}
            <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        </div>

        <div className="max-w-7xl mx-auto space-y-12 pb-20 relative z-10">
            {/* Header */}
            <header className="text-center mb-8 p-8 bg-[#0B1221]/70 border border-white/5 backdrop-blur-md rounded-3xl shadow-2xl">
                <h1 className="text-5xl font-extrabold text-white tracking-tight">
                    <span className={`bg-clip-text text-transparent ${GRADIENTS.title}`}>R'Evolution</span> EdTech Events Navigator
                </h1>
                <p className="text-lg text-slate-400 mt-4 max-w-2xl mx-auto">Gestión, Planificación y Análisis Estratégico de Eventos Globales.</p>
            </header>

            {/* KPIs */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-[#0B1221]/80 border border-white/5 backdrop-blur-md rounded-2xl shadow-xl p-6 border-b-4 border-slate-600 transition hover:transform hover:-translate-y-1">
                    <p className="text-xs uppercase font-bold tracking-widest text-slate-400">Total de Eventos</p>
                    <p className="text-4xl font-black mt-2 text-white">{kpis.total}</p>
                </div>
                <div className="bg-[#0B1221]/80 border border-white/5 backdrop-blur-md rounded-2xl shadow-xl p-6 border-b-4 transition hover:transform hover:-translate-y-1" style={{ borderBottomColor: COLORS.attending }}>
                    <p className="text-xs uppercase font-bold tracking-widest text-slate-400">Voy a Asistir</p>
                    <p className="text-4xl font-black mt-2 text-white">{kpis.attending}</p>
                </div>
                <div className="bg-[#0B1221]/80 border border-white/5 backdrop-blur-md rounded-2xl shadow-xl p-6 border-b-4 transition hover:transform hover:-translate-y-1" style={{ borderBottomColor: COLORS.attended }}>
                    <p className="text-xs uppercase font-bold tracking-widest text-slate-400">Ya Asistí</p>
                    <p className="text-4xl font-black mt-2 text-white">{kpis.attended}</p>
                </div>
                <div className="bg-[#0B1221]/80 border border-white/5 backdrop-blur-md rounded-2xl shadow-xl p-6 border-b-4 transition hover:transform hover:-translate-y-1" style={{ borderBottomColor: COLORS.org }}>
                    <p className="text-xs uppercase font-bold tracking-widest text-slate-400">Eventos Elegidos por Org</p>
                    <p className="text-4xl font-black mt-2 text-white">{kpis.orgCount}</p>
                    <p className="text-xs mt-1 text-slate-500 font-medium">Tag de Organización</p>
                </div>
            </section>

            <SummarySection />
            <ChartsSection events={events} />
            <EventMap events={events} userState={userState} />
            <EventTable 
                events={events} 
                userState={userState} 
                onUpdateState={handleUpdateState}
                onOpenCommentModal={openModal}
                onOpenFinancialModal={openFinancialModal}
            />
            
            <ParticipationSection events={events} />

            <CommentModal 
                isOpen={modalOpen} 
                eventName={modalData.name} 
                initialComment={modalData.comment}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveComment}
            />

            <FinancialModal 
                isOpen={financialModalOpen}
                eventName={financialModalData.name}
                initialInfo={financialModalData.info}
                onClose={() => setFinancialModalOpen(false)}
                onSave={handleSaveFinancial}
            />
        </div>
    </div>
  );
};

export default App;
