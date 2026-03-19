
import React, { useState, useEffect } from 'react';
import { GRADIENTS } from '../types';

interface FinancialModalProps {
  isOpen: boolean;
  eventName: string;
  initialInfo: string;
  onClose: () => void;
  onSave: (info: string) => void;
}

export const FinancialModal: React.FC<FinancialModalProps> = ({ isOpen, eventName, initialInfo, onClose, onSave }) => {
  const [info, setInfo] = useState(initialInfo);

  useEffect(() => {
    setInfo(initialInfo);
  }, [initialInfo, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <div className="bg-[#0B1221] border border-white/10 p-8 w-full max-w-lg rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Modal Glow (Gold for Finance) */}
            <div className={`absolute top-0 left-0 w-full h-1 ${GRADIENTS.gold}`}></div>

            <h3 className="text-2xl font-bold mb-2 text-white">
                Inversión y Costos
            </h3>
            <p className="text-sm text-slate-400 mb-6">
                Evento: <span className="text-yellow-400 font-semibold">{eventName}</span>
            </p>

            <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Detalle de Gastos (Fees, Viáticos, Stands)</label>
                <textarea 
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                    className="w-full p-4 border border-slate-700 rounded-xl resize-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-[#030712] text-white placeholder-slate-600 transition-all outline-none"
                    rows={6}
                    placeholder="Ej: Fee Entrada: $1,500 USD. Stand 3x3: $4,000 USD. Vuelo+Hotel: $2,000 USD..."
                />
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
                <button 
                    onClick={onClose}
                    className="px-6 py-2.5 bg-transparent border border-slate-600 text-slate-300 rounded-xl hover:bg-slate-800 transition font-medium"
                >
                    Cancelar
                </button>
                <button 
                    onClick={() => onSave(info)}
                    className="px-6 py-2.5 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition shadow-lg shadow-yellow-500/20"
                >
                    Guardar Datos
                </button>
            </div>
        </div>
    </div>
  );
};
