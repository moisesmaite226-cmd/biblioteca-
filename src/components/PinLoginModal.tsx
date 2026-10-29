import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { ArrowLeft, Sparkles, Check, Key } from 'lucide-react';

interface PinLoginModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

export const PinLoginModal: React.FC<PinLoginModalProps> = ({ isOpen, onSuccess, onClose }) => {
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(null);
      setIsSuccess(false);
    }
  }, [isOpen]);

  // Suporte a teclado físico (0-9, Backspace, Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, pin]);

  const handleDigit = (digit: string) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setError(null);

      if (nextPin.length === 4) {
        verifyPin(nextPin);
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(null);
  };

  const verifyPin = (candidatePin: string) => {
    const isValid = db.verifyLibrarianPin(candidatePin);
    if (isValid) {
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 400);
    } else {
      setShake(true);
      setError('Senha de 4 dígitos incorreta. Tente novamente.');
      setTimeout(() => {
        setShake(false);
        setPin('');
      }, 600);
    }
  };

  const handleDemoFill = () => {
    const defaultPin = db.getLibrarianPin();
    setPin(defaultPin);
    verifyPin(defaultPin);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1712]/50 backdrop-blur-xs animate-fade-in font-serif-vintage">
      <div
        className={`relative w-full max-w-sm bg-[#fcf8ef] border border-[#d4c9b2] shadow-[0_4px_28px_rgba(28,23,18,0.18)] p-7 transition-transform duration-200 ${
          shake ? 'translate-x-1' : ''
        }`}
      >
        {/* Moldura dupla clássica interna */}
        <div className="absolute inset-1.5 border border-[#d4c9b2] pointer-events-none" />

        {/* Faixa superior tricolor dourado - verde oliva - dourado */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#b89155] via-[#556b2f] to-[#b89155]" />

        {/* Botão Fechar / Voltar */}
        <button
          onClick={onClose}
          className="relative z-10 text-[#877b69] hover:text-[#a8563c] transition-colors flex items-center gap-1 text-xs cursor-pointer mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar</span>
        </button>

        <div className="text-center relative z-10 pt-2 pb-3">
          <div className="w-14 h-14 mx-auto mb-2.5 rounded-full bg-[#ede6d6] border-2 border-[#b89155] grid place-items-center text-xl text-[#556b2f] shadow-[inset_0_0_0_3px_#fcf8ef]">
            {isSuccess ? <Check className="w-6 h-6 text-[#556b2f]" /> : <Key className="w-6 h-6 text-[#556b2f]" />}
          </div>
          <h2 className="text-lg font-normal text-[#1c1712]">Autenticação da Bibliotecária</h2>
          <p className="text-xs italic text-[#877b69] mt-0.5">
            Insira o PIN de 4 dígitos para gerenciar o acervo
          </p>
        </div>

        {/* 4 Pontos de PIN Ex-Libris */}
        <div className="flex justify-center gap-3.5 my-4 relative z-10">
          {[0, 1, 2, 3].map((index) => {
            const isFilled = pin.length > index;
            return (
              <div
                key={index}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                  isSuccess
                    ? 'bg-[#556b2f] scale-110'
                    : isFilled
                    ? 'bg-[#556b2f] scale-125 shadow-xs'
                    : 'bg-[#ede6d6] border border-[#d4c9b2]'
                }`}
              />
            );
          })}
        </div>

        {/* Mensagem de Erro */}
        {error && (
          <div className="relative z-10 text-center text-[#a8563c] text-xs italic mb-3 bg-[#f8e5df] py-1 px-2.5 border border-[#a8563c]/30">
            {error}
          </div>
        )}

        {/* Teclado Numérico Estilo Clássico */}
        <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto relative z-10">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleDigit(num)}
              className="h-11 bg-[#f6f1e8] hover:bg-[#edf3e4] active:bg-[#dbe6ce] text-[#1c1712] hover:text-[#556b2f] font-serif-vintage text-base border border-[#d4c9b2] hover:border-[#556b2f] transition-all shadow-xs flex items-center justify-center cursor-pointer"
            >
              {num}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleDigit('0')}
            className="h-11 bg-[#f6f1e8] hover:bg-[#edf3e4] active:bg-[#dbe6ce] text-[#1c1712] hover:text-[#556b2f] font-serif-vintage text-base border border-[#d4c9b2] hover:border-[#556b2f] transition-all shadow-xs flex items-center justify-center cursor-pointer"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            aria-label="Apagar dígito"
            className="h-11 bg-[#ede6d6] hover:bg-[#ddd3bf] text-[#877b69] hover:text-[#1c1712] font-serif-vintage text-xs uppercase tracking-wider border border-[#d4c9b2] transition-all flex items-center justify-center cursor-pointer"
          >
            Apagar
          </button>
        </div>

        {/* Dica de demonstração para a senha padrão 1234 */}
        <div className="mt-5 pt-3 border-t border-[#d4c9b2] text-center relative z-10">
          <button
            onClick={handleDemoFill}
            className="inline-flex items-center gap-1.5 text-xs text-[#556b2f] hover:text-[#3c4d1f] hover:underline cursor-pointer italic"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#b89155]" />
            <span>Preencher senha padrão de teste: <strong>1234</strong></span>
          </button>
        </div>
      </div>
    </div>
  );
};
