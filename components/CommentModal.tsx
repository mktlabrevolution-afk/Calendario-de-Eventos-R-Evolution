
import React, { useState, useEffect } from 'react';
import { GRADIENTS } from '../types';

interface CommentModalProps {
  isOpen: boolean;
  eventName: string;
  initialComment: string;
  onClose: () => void;
  onSave: (comment: string) => void;
}

export const CommentModal: React.FC<CommentModalProps> = ({ isOpen, eventName, initialComment, onClose, onSave }) => {
  const [comment, setComment] = useState(initialComment);

  useEffect(() => {
    setComment(initialComment);
  }, [initialComment, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <div className="bg-[#0B1221] border border-white/10 p-8 w-full max-w-lg rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Modal Glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00DC82] to-[#0047FF]"></div>

            <h3 className="text-2xl font-bold mb-6 text-white">
                Comentarios para <span className={`bg-clip-text text-transparent ${GRADIENTS.primary}`}>{eventName}</span>
            </h3>
            <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-4 border border-slate-700 rounded-xl resize-none focus:ring-2 focus:ring-[#00DC82] focus:border-transparent bg-[#030712] text-white placeholder-slate-500 transition-all outline-none"
                rows={5}
                placeholder="Agrega tus notas, feedback y objetivos..."
            />
            <div className="flex justify-end space-x-4 mt-6">
                <button 
                    onClick={onClose}
                    className="px-6 py-2.5 bg-transparent border border-slate-600 text-slate-300 rounded-xl hover:bg-slate-800 transition font-medium"
                >
                    Cancelar
                </button>
                <button 
                    onClick={() => onSave(comment)}
                    className="px-6 py-2.5 bg-[#00DC82] text-black font-bold rounded-xl hover:bg-[#00DC82]/90 transition shadow-lg shadow-[#00DC82]/20"
                >
                    Guardar
                </button>
            </div>
        </div>
    </div>
  );
};
