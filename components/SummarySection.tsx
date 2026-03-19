
import React from 'react';
import { COLORS, GRADIENTS } from '../types';

export const SummarySection: React.FC = () => {
  return (
    <section className="bg-[#0B1221]/70 border border-white/5 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8 space-y-6">
        <h2 className={`text-3xl font-bold border-b pb-4 border-white/10`}>
            <span className={`bg-clip-text text-transparent ${GRADIENTS.title}`}>Análisis Estratégico y ROI</span>
        </h2>

        <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Top Eventos Prioridad "A" (Imprescindibles)</h3>
            <ul className="list-disc list-inside ml-4 space-y-3 text-sm text-slate-300">
                <li><strong style={{ color: COLORS.latam }}>IFE EdTech Summit (Monterrey):</strong> Enero 27-29. Epicentro de innovación educativa en LATAM.</li>
                <li><strong style={{ color: COLORS.na }}>ASU+GSV Summit (San Diego):</strong> Abril 12-15. El evento #1 global para inversión y CEOs.</li>
                <li><strong style={{ color: COLORS.latam }}>Bett Brasil (São Paulo):</strong> Mayo 5-8. La feria de tecnología educativa más grande de la región.</li>
                <li><strong style={{ color: COLORS.latam }}>THE Latin America Universities Summit (Barranquilla):</strong> Mayo 12-14. Networking estratégico Higher Ed.</li>
                <li><strong style={{ color: COLORS.na }}>ISTELive 26 + ASCD Annual (Orlando):</strong> Junio 28 - Julio 1. Máxima visibilidad global en K-12 y Tech.</li>
            </ul>
        </div>

        <div className="space-y-4 border-t border-white/10 pt-6">
            <h3 className="text-xl font-bold text-white">Eventos Clave de Alta Relevancia (Prioridad B)</h3>
            <ul className="list-disc list-inside ml-4 space-y-3 text-sm text-slate-300">
                <li><strong style={{ color: COLORS.na }}>EDUCAUSE Annual (Denver):</strong> Líder absoluto en tecnología para Educación Superior (Sept/Oct).</li>
                <li><strong style={{ color: COLORS.na }}>EdTech Week (NYC):</strong> Networking de alto perfil e inversión en Octubre.</li>
                <li><strong style={{ color: COLORS.na }}>HolonIQ Summits (NY/DC):</strong> Skills y tendencias de mercado global (Marzo y Sept).</li>
                <li><strong style={{ color: COLORS.na }}>SXSW EDU (Austin):</strong> Convergencia de educación, cultura y creatividad (Marzo).</li>
                <li><strong style={{ color: COLORS.latam }}>Edutechnia (Bogotá):</strong> Feria clave para el mercado de la región Andina (Agosto).</li>
            </ul>
        </div>

        <div className="space-y-4 border-t border-white/10 pt-6">
            <h3 className="text-xl font-bold text-white">Recomendaciones Estratégicas 2026</h3>
            <ol className="list-decimal list-inside ml-4 space-y-3 text-sm text-slate-300">
                <li><strong style={{ color: COLORS.accentGreen }}>Ofensiva LATAM 2026:</strong> 3 de los 5 eventos "Prioridad A" son en Latinoamérica (Monterrey, São Paulo, Barranquilla). Es un año clave para consolidar presencia regional.</li>
                <li><strong style={{ color: COLORS.accentGreen }}>Densidad en H1 (Primer Semestre):</strong> Enero arranca fuerte con IFE y FETC. Abril y Mayo concentran ASU+GSV, Bett Brasil y THE Summit. Requiere logística y presupuesto anticipado.</li>
                <li><strong style={{ color: COLORS.accentGreen }}>Higher Ed & Internacionalización:</strong> THE Summit (Colombia), QS Americas (Guadalajara) y EDUCAUSE son los ejes vertebrales para alianzas universitarias este año.</li>
                <li><strong style={{ color: COLORS.accentGreen }}>K-12 & Tecnología:</strong> ISTELive y Bett Brasil deben ser los hitos principales para productos y servicios enfocados en educación básica y media.</li>
            </ol>
        </div>
    </section>
  );
};
