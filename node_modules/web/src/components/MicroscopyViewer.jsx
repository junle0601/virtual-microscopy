
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cellTypes = [
  {
    id: 'rbc',
    name: 'Red Blood Cells',
    shortName: 'RBC',
    scientific: 'Erythrocytes',
    image: 'https://horizons-cdn.hostinger.com/8eb78029-3bd2-43aa-aa08-42bf74427044/c9350ec606e73222ddfa8382e4935266.jpg',
    description: 'Biconcave discs lacking a nucleus. Primary function is the transport of oxygen and carbon dioxide.',
    count: '4.5 - 5.5 million/mcL'
  },
  {
    id: 'wbc',
    name: 'White Blood Cells',
    shortName: 'WBC',
    scientific: 'Leucocytes',
    image: 'https://horizons-cdn.hostinger.com/8eb78029-3bd2-43aa-aa08-42bf74427044/a8f72a18995bac28a14194a319a22d88.jpg',
    description: 'Nucleated cells of the immune system involved in protecting the body against both infectious disease and foreign invaders.',
    count: '4,500 - 11,000/mcL'
  },
  {
    id: 'platelets',
    name: 'Platelets',
    shortName: 'Platelets',
    scientific: 'Thrombocytes',
    image: 'https://horizons-cdn.hostinger.com/8eb78029-3bd2-43aa-aa08-42bf74427044/cdcd9154e66b3f99c621dde2f2d98eb9.jpg',
    description: 'Small, irregularly shaped clear cell fragments involved in hemostasis, leading to the formation of blood clots.',
    count: '150,000 - 450,000/mcL'
  }
];

const MicroscopyViewer = () => {
  const [selectedId, setSelectedId] = useState('rbc');
  const selectedCell = cellTypes.find(c => c.id === selectedId);

  return (
    <div className="case-bg p-6 md:p-8 border-2 border-[#2C1810]/20 shadow-xl mt-12 relative">
      <div className="case-tape-subtle top-[-12px] left-1/2 -translate-x-1/2"></div>
      
      <div className="mb-8 border-b-2 border-[#2C1810]/20 pb-4">
        <h2 className="font-montserrat font-bold text-3xl text-[#2C1810] uppercase tracking-tight">
          High-Resolution Microscopy
        </h2>
        <p className="font-roboto text-[#2C1810]/80 mt-2 text-lg">
          Detailed morphological analysis of isolated cellular components.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 relative min-h-[400px] lg:min-h-[600px] bg-[#2C1810]/5 border border-[#2C1810]/20 p-3 rounded-sm shadow-inner overflow-hidden flex flex-col">
          
          <div className="flex-1 relative overflow-hidden bg-black/10 border border-[#2C1810]/20 group">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedCell.id}
                src={selectedCell.image}
                alt={`Microscopy view of ${selectedCell.name}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover sepia-[0.15] contrast-125"
              />
            </AnimatePresence>
            
            <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
              <div className="w-full h-[1px] bg-[#2C1810]"></div>
              <div className="h-full w-[1px] bg-[#2C1810] absolute"></div>
              <div className="w-32 h-32 border border-[#2C1810] rounded-full absolute"></div>
            </div>
          </div>

          <div className="mt-4 bg-white/60 p-4 border border-[#2C1810]/10">
            <h3 className="font-oswald font-bold text-2xl text-[var(--case-red)] uppercase tracking-wide">
              {selectedCell.name} <span className="text-[#2C1810]/60 text-lg">({selectedCell.scientific})</span>
            </h3>
            <p className="font-roboto text-[#2C1810] mt-2 leading-relaxed">
              {selectedCell.description}
            </p>
            <div className="mt-3 flex items-center gap-4">
              <div className="inline-block bg-[#2C1810]/5 px-3 py-1 border border-[#2C1810]/20 font-ibm-plex-mono text-sm font-bold text-[#2C1810]">
                REF RANGE: {selectedCell.count}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 flex flex-col gap-4">
          <h3 className="font-poppins font-bold text-xl text-[#2C1810] uppercase border-b border-[#2C1810]/20 pb-2">
            Specimen Index
          </h3>
          
          {cellTypes.map((cell) => {
            const isActive = selectedId === cell.id;
            return (
              <button
                key={cell.id}
                onClick={() => setSelectedId(cell.id)}
                className={`text-left p-6 border-2 transition-all duration-300 relative overflow-hidden group ${
                  isActive 
                    ? 'border-[var(--case-red)] bg-[var(--case-red)]/5 shadow-md scale-[1.02]' 
                    : 'border-[#2C1810]/20 bg-white/40 hover:border-[#2C1810]/50 hover:bg-white/60 hover:shadow-sm hover:-translate-y-1'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicator" 
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-[var(--case-red)]"
                  />
                )}
                <div className="flex justify-between items-center">
                  <h4 className={`font-oswald font-bold text-2xl tracking-widest ${isActive ? 'text-[var(--case-red)]' : 'text-[#2C1810]'}`}>
                    {cell.shortName}
                  </h4>
                  <div className={`w-4 h-4 rounded-full border-2 ${isActive ? 'border-[var(--case-red)] bg-[var(--case-red)]' : 'border-[#2C1810]/30 group-hover:border-[#2C1810]/60'}`}></div>
                </div>
              </button>
            );
          })}
          
          <div className="mt-auto pt-6 border-t border-[#2C1810]/20">
            <div className="bg-[#2C1810] text-[#F5E6D3] p-4 font-ibm-plex-mono text-sm">
              <p className="font-bold mb-1">LABORATORY NOTES:</p>
              <p className="opacity-80">Select a specimen from the index to isolate and magnify the cellular structure for detailed morphological review.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MicroscopyViewer;
