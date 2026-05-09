import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { usePhase } from '@/contexts/PhaseContext.jsx';
import NavigationBar from '@/components/NavigationBar.jsx';
import { motion } from 'framer-motion';

const EngagePage = () => {
  const navigate = useNavigate();
  const { selectCase, unlockedCases } = usePhase();

  const cases = [
    {
      id: 'normal',
      number: '#000',
      title: 'Baseline Reference',
      patient: 'Healthy Subject',
      symptoms: 'None. Routine checkup.',
      description: 'Study normal blood components to establish a baseline for comparison.',
      status: 'ACTIVE',
      pos: 'col-span-1 md:col-span-2 lg:col-span-1'
    },
    {
      id: 'anaemia',
      number: '#001',
      title: 'The Exhausted Student',
      patient: '19-year-old female',
      symptoms: 'Fatigue, weakness, pale skin, shortness of breath.',
      description: 'Patient reports struggling to stay awake during classes.',
      status: 'PENDING',
      pos: 'col-span-1'
    },
    {
      id: 'leukemia',
      number: '#002',
      title: 'The Aching Professional',
      patient: '30-year-old male',
      symptoms: 'Weight loss, night sweats, bone pain.',
      description: 'Patient presents with unexplained weight loss.',
      status: 'PENDING',
      pos: 'col-span-1'
    },
    {
      id: 'platelet',
      number: '#003',
      title: 'The Bruised Child',
      patient: '7-year-old boy',
      symptoms: 'Excessive bleeding, abnormal clotting.',
      description: 'Parents report the child bruises very easily.',
      status: 'PENDING',
      pos: 'col-span-1 md:col-span-2 lg:col-span-1'
    }
  ];

  const handleCaseSelect = async (caseId) => {
    if (unlockedCases.includes(caseId)) {
      await selectCase(caseId);
      navigate('/explore');
    }
  };

  return (
    <>
      <Helmet>
        <title>Investigation Board - Case Files</title>
      </Helmet>

      <div className="min-h-screen board-bg pb-20 relative">
        <NavigationBar />

        {/* SVG Strings connecting cases */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" style={{ filter: 'drop-shadow(1px 2px 1px rgba(0,0,0,0.5))' }}>
          <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="#D32F2F" strokeWidth="2" strokeDasharray="4,4" />
          <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="#D32F2F" strokeWidth="2" />
          <line x1="50%" y1="50%" x2="50%" y2="80%" stroke="#D32F2F" strokeWidth="2" />
        </svg>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="mb-12 text-center">
            <div className="inline-block bg-[#F5E6D3] p-4 border-2 border-[#2C1810] shadow-lg">
              <h1 className="font-bebas-neue text-5xl text-[#2C1810] tracking-widest">INVESTIGATION CASES</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((c, idx) => {
              const isUnlocked = unlockedCases.includes(c.id);
              return (
                <motion.div 
                  key={c.id}
                  whileHover={isUnlocked ? { scale: 1.02, y: -4 } : {}}
                  onClick={() => handleCaseSelect(c.id)}
                  className={`case-folder p-6 transition-all duration-200 ${c.pos} ${
                    isUnlocked 
                      ? 'cursor-pointer hover:shadow-xl' 
                      : 'opacity-90 cursor-not-allowed'
                  }`}
                >
                  <div className="case-pin top-4 left-1/2 -translate-x-1/2"></div>
                  
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-[#2C1810]/5 z-20 flex items-center justify-center rounded-sm backdrop-blur-[1px]">
                      <div className="case-stamp font-bebas-neue text-4xl bg-[var(--case-paper)]">
                        LOCKED
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 border-b-2 border-[#2C1810]/20 pb-4 mb-4">
                    <span className="font-ibm-plex-mono font-bold text-sm bg-[#2C1810] text-[#F5E6D3] px-2 py-1">CASE {c.number}</span>
                    <h2 className="font-montserrat text-2xl font-bold mt-4 leading-tight text-[#2C1810] uppercase">{c.title}</h2>
                  </div>
                  
                  <div className="space-y-4 font-roboto text-sm text-[#2C1810]">
                    <div>
                      <span className="font-bold border-b border-[#2C1810]/30 font-oswald tracking-wide">SUBJECT:</span> {c.patient}
                    </div>
                    
                    <div>
                      <span className="font-bold border-b border-[#2C1810]/30 font-oswald tracking-wide">SYMPTOMS:</span>
                      <p className="mt-1">{c.symptoms}</p>
                    </div>

                    <div className="mt-4 p-3 bg-black/5 border border-black/10 relative">
                      <span className="font-bold font-oswald tracking-wide">NOTES:</span>
                      <p className="mt-1 text-gray-800">{c.description}</p>
                    </div>

                    {isUnlocked && (
                      <div className="pt-4 flex justify-between items-center">
                        <span className="case-stamp-green case-stamp font-bebas-neue text-xl px-2 py-0">ACTIVE</span>
                        <span className="font-oswald font-bold text-[var(--case-red)] text-lg uppercase tracking-wide">Open File &rarr;</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default EngagePage;