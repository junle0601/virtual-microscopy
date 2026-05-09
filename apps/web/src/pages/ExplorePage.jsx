import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar.jsx';
import MicroscopyViewer from '@/components/MicroscopyViewer.jsx';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ExplorePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('function');
  const [selectedComponent, setSelectedComponent] = useState(null);

  const components = [
    {
      id: 'rbc',
      name: 'Red Blood Cells (Erythrocytes)',
      shape: 'Biconcave disc, no nucleus',
      function: 'Transport oxygen from lungs to tissues and carbon dioxide back to lungs.',
      range: '4.5 - 5.5 million/mcL'
    },
    {
      id: 'wbc',
      name: 'White Blood Cells (Leucocytes)',
      shape: 'Irregular shape, contains nucleus',
      function: 'Defend the body against infections and foreign materials.',
      range: '4,500 - 11,000/mcL'
    },
    {
      id: 'platelets',
      name: 'Platelets (Thrombocytes)',
      shape: 'Small, irregular cell fragments',
      function: 'Form clots to stop bleeding and repair damaged blood vessels.',
      range: '150,000 - 450,000/mcL'
    },
    {
      id: 'plasma',
      name: 'Plasma',
      shape: 'Liquid matrix (yellowish)',
      function: 'Carries cells, nutrients, hormones, and proteins throughout the body.',
      range: 'Makes up ~55% of total blood volume'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Baseline Investigation - Case Files</title>
      </Helmet>

      <div className="min-h-screen board-bg pb-20">
        <NavigationBar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8 bg-[var(--case-paper)] p-4 border-2 border-[#2C1810] shadow-md">
            <div>
              <span className="font-ibm-plex-mono font-bold bg-[#2C1810] text-[#F5E6D3] px-2 py-1">CASE #000</span>
              <h1 className="font-montserrat font-bold text-3xl text-[#2C1810] mt-2 uppercase">Baseline Investigation</h1>
            </div>
            <div className="space-x-4 flex items-center">
              <Button variant="outline" onClick={() => navigate('/engage')} className="font-ibm-plex-mono font-bold bg-transparent border-2 border-[#2C1810] text-[#2C1810] hover:bg-[#2C1810] hover:text-[#F5E6D3]">
                <ArrowLeft className="w-4 h-4 mr-2" /> Board
              </Button>
              <Button onClick={() => navigate('/explore/quiz')} className="font-ibm-plex-mono font-bold bg-[#D32F2F] text-white hover:bg-[#C62828]">
                Assessment <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="flex space-x-2 mb-0 pl-4">
            <button 
              className={`file-tab ${activeTab === 'function' ? 'bg-[var(--case-paper)] z-10' : 'bg-[var(--case-paper-dark)] opacity-80 hover:opacity-100'}`}
              onClick={() => setActiveTab('function')}
            >
              1. Function
            </button>
            <button 
              className={`file-tab ${activeTab === 'components' ? 'bg-[var(--case-paper)] z-10' : 'bg-[var(--case-paper-dark)] opacity-80 hover:opacity-100'}`}
              onClick={() => setActiveTab('components')}
            >
              2. Components
            </button>
            <button 
              className={`file-tab ${activeTab === 'microscopy' ? 'bg-[var(--case-paper)] z-10' : 'bg-[var(--case-paper-dark)] opacity-80 hover:opacity-100'}`}
              onClick={() => setActiveTab('microscopy')}
            >
              3. Microscopy
            </button>
          </div>

          <div className="case-bg p-8 md:p-12 min-h-[600px] shadow-xl border border-[#2C1810]/20 rounded-b-sm rounded-tr-sm">
            {activeTab === 'function' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 gap-12 items-start relative z-10">
                <div className="space-y-6">
                  <h2 className="font-poppins font-bold text-3xl border-b-2 border-[#2C1810]/20 pb-2 text-[#2C1810] uppercase">Subject Overview</h2>
                  <p className="font-roboto text-lg leading-relaxed text-[#2C1810]">
                    Blood is a specialized body fluid that delivers necessary substances such as nutrients and oxygen to the cells and transports metabolic waste products away from those same cells.
                  </p>
                  <div className="p-6 border border-[#2C1810]/30 bg-black/5">
                    <h3 className="font-poppins font-bold text-xl mb-4 text-[#2C1810] uppercase">Key Functions:</h3>
                    <ul className="font-roboto space-y-3 text-[#2C1810]">
                      <li className="flex items-center"><span className="text-[var(--case-red)] font-bold mr-2">■</span> Transportation (O2, nutrients)</li>
                      <li className="flex items-center"><span className="text-[var(--case-red)] font-bold mr-2">■</span> Regulation (Temp, pH)</li>
                      <li className="flex items-center"><span className="text-[var(--case-red)] font-bold mr-2">■</span> Protection (Immune, clotting)</li>
                    </ul>
                  </div>
                </div>
                <div className="evidence-photo">
                  <div className="case-pin top-2 left-1/2 -translate-x-1/2"></div>
                  <div className="bg-[#2C1810]/5 p-2 border border-[#2C1810]/10 rounded-sm">
                    <img 
                      src="https://horizons-cdn.hostinger.com/8eb78029-3bd2-43aa-aa08-42bf74427044/blood-cells-image-yltAW.webp" 
                      alt="Vascular System" 
                      className="w-full h-auto max-h-[260px] object-contain sepia-[0.2] contrast-125"
                    />
                  </div>
                  <div className="mt-4 text-center font-ibm-plex-mono font-bold text-sm text-[#2C1810]">EXHIBIT A: Vascular System</div>
                  <div className="font-oswald font-bold text-[var(--case-red)] text-lg text-center mt-2 uppercase tracking-wide">Note the complex network</div>
                </div>
              </motion.div>
            )}

            {activeTab === 'components' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 gap-12 relative z-10">
                <div className="space-y-4">
                  <h3 className="font-poppins font-bold text-2xl mb-4 text-[#2C1810] uppercase">Component Index</h3>
                  {components.map(comp => (
                    <div 
                      key={comp.id}
                      onClick={() => setSelectedComponent(comp)}
                      className={`p-4 border-2 cursor-pointer transition-all font-roboto ${
                        selectedComponent?.id === comp.id ? 'border-[var(--case-red)] bg-[var(--case-red)]/5 shadow-sm' : 'border-[#2C1810]/20 hover:border-[#2C1810]/50 bg-white/30'
                      }`}
                    >
                      <h4 className="font-bold text-[#2C1810]">{comp.name}</h4>
                    </div>
                  ))}
                </div>
                
                <div className="h-full flex flex-col justify-start pt-12">
                  {selectedComponent ? (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-8 border border-[#2C1810]/30 bg-white/40 relative">
                      <h2 className="font-poppins font-bold text-3xl border-b border-[#2C1810]/20 pb-4 mb-6 text-[#2C1810] uppercase">
                        {selectedComponent.name}
                      </h2>
                      <div className="font-roboto space-y-6 text-[#2C1810]">
                        <div>
                          <span className="font-bold text-[var(--case-red)] font-oswald tracking-wide">MORPHOLOGY:</span>
                          <p className="mt-1 text-lg">{selectedComponent.shape}</p>
                        </div>
                        <div>
                          <span className="font-bold text-[var(--case-red)] font-oswald tracking-wide">FUNCTION:</span>
                          <p className="mt-1 text-lg">{selectedComponent.function}</p>
                        </div>
                        <div>
                          <span className="font-bold text-[var(--case-red)] font-oswald tracking-wide">NORMAL RANGE:</span>
                          <p className="mt-2 border border-[#2C1810]/20 inline-block px-3 py-2 bg-black/5 font-ibm-plex-mono font-bold">{selectedComponent.range}</p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center font-oswald font-bold text-[var(--case-red)] text-2xl opacity-70 uppercase tracking-widest mt-20">
                      Select a component to review its profile
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'microscopy' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 w-full h-full">
                <div className="space-y-6">
                  <MicroscopyViewer />
                  <div className="text-center text-xs text-gray-500 font-roboto">
                    © 2005-2026. T. Clark Brelje and Robert L. Sorenson
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" onClick={() => navigate('/explore/quiz')} className="font-ibm-plex-mono font-bold bg-[#D32F2F] text-white hover:bg-[#C62828] text-lg px-8 py-6 shadow-md hover:shadow-lg transition-all">
              Proceed to Assessment <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ExplorePage;