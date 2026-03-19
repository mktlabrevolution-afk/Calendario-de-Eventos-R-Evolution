
import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { EdTechEvent, COLORS, GRADIENTS } from '../types';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface ChartsSectionProps {
  events: EdTechEvent[];
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({ events }) => {
  // 1. Geographic Data
  const regionCounts = events.reduce((acc, event) => {
    acc[event.region] = (acc[event.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const regionLabels = Object.keys(regionCounts);
  const regionDataValues = Object.values(regionCounts);

  const regionBackgroundColors = regionLabels.map(label => {
    if (label === 'Norteamérica') return COLORS.na;
    if (label === 'Latinoamérica') return COLORS.latam;
    if (label === 'España') return COLORS.spain;
    return COLORS.global;
  });

  const geoData = {
    labels: regionLabels,
    datasets: [
      {
        data: regionDataValues,
        backgroundColor: regionBackgroundColors,
        borderWidth: 0,
        hoverOffset: 12,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: { 
            color: '#CBD5E1',
            font: { family: "'Inter', sans-serif", size: 12 }
        },
      },
    },
  };

  // 2. Relevance/Priority Data (NEW)
  const relevanceCounts = events.reduce((acc, event) => {
    acc[event.relevance] = (acc[event.relevance] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Force order: Muy Alta -> Alta -> Media
  const relevanceOrder = ['Muy Alta', 'Alta', 'Media'];
  const relevanceLabels = relevanceOrder.filter(r => relevanceCounts[r] > 0);
  const relevanceDataValues = relevanceLabels.map(r => relevanceCounts[r]);

  const relevanceColors = relevanceLabels.map(label => {
      if (label === 'Muy Alta') return '#EF4444'; // Red-500
      if (label === 'Alta') return '#F97316'; // Orange-500
      return '#3B82F6'; // Blue-500
  });

  const relevanceData = {
      labels: relevanceLabels,
      datasets: [
          {
              data: relevanceDataValues,
              backgroundColor: relevanceColors,
              borderWidth: 0,
              hoverOffset: 12,
          }
      ]
  };

  // 3. Temporal Data (2026 ONLY)
  const getQuarterAndYear = (dateStr: string): string | null => {
    // 1. Try standard date parsing for ISO dates (YYYY-MM-DD)
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      const month = date.getMonth();
      const year = date.getFullYear();
      
      // Filter strictly for 2026
      if (year !== 2026) return null;
      
      const q = Math.floor(month / 3) + 1;
      return `Q${q} 2026`;
    }

    // 2. Handle text descriptions for 2026
    if (!dateStr.includes('2026')) return null;

    const lower = dateStr.toLowerCase();
    
    // Manual mapping for Spanish months text
    if (lower.match(/enero|febrero|marzo/)) return 'Q1 2026';
    if (lower.match(/abril|mayo|junio/)) return 'Q2 2026';
    if (lower.match(/julio|agosto|septiembre/)) return 'Q3 2026';
    if (lower.match(/octubre|noviembre|diciembre|oct\/nov/)) return 'Q4 2026';

    return null;
  };

  // Initialize quarters for 2026
  const quarters: Record<string, number> = {
    'Q1 2026': 0,
    'Q2 2026': 0,
    'Q3 2026': 0,
    'Q4 2026': 0,
  };

  events.forEach(event => {
    const qy = getQuarterAndYear(event.date);
    if (qy && quarters.hasOwnProperty(qy)) {
        quarters[qy]++;
    }
  });

  const tempLabels = Object.keys(quarters);
  const tempDataValues = Object.values(quarters);

  const tempData = {
    labels: tempLabels,
    datasets: [{
      label: 'Eventos por Trimestre (2026)',
      data: tempDataValues,
      backgroundColor: COLORS.accentGreen,
      hoverBackgroundColor: COLORS.accentBlue,
      borderRadius: 6,
    }]
  };

  const tempOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#CBD5E1', precision: 0 },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        border: { display: false }
      },
      x: {
        ticks: { color: '#CBD5E1' },
        grid: { display: false },
        border: { display: false }
      }
    },
    plugins: { legend: { display: false } }
  };

  return (
    <section className="bg-[#0B1221]/70 border border-white/5 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8 space-y-6">
      <h2 className={`text-3xl font-bold border-b pb-4 border-white/10`}>
        <span className={`bg-clip-text text-transparent ${GRADIENTS.title}`}>Visualización de Datos</span>
      </h2>
      
      {/* Top Row: Region & Relevance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 bg-[#030712]/50 rounded-2xl border border-white/5 shadow-inner">
          <h3 className="text-lg font-bold text-white mb-6 tracking-wide">Distribución Geográfica</h3>
          <div className="h-64 relative">
            <Doughnut data={geoData} options={chartOptions} />
          </div>
        </div>
        <div className="p-6 bg-[#030712]/50 rounded-2xl border border-white/5 shadow-inner">
          <h3 className="text-lg font-bold text-white mb-6 tracking-wide">Distribución por Prioridad</h3>
          <div className="h-64 relative">
            <Doughnut data={relevanceData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Bottom Row: Timeline */}
      <div className="p-6 bg-[#030712]/50 rounded-2xl border border-white/5 shadow-inner flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6 tracking-wide">Calendario Trimestral 2026</h3>
           <div className="h-64 relative flex-grow">
            <Bar data={tempData} options={tempOptions} />
          </div>
          <p className="mt-4 text-xs text-slate-400 italic text-center">
            *Nota: Eventos sin fecha específica 2026 no se muestran en el cronograma.
          </p>
      </div>
    </section>
  );
};
