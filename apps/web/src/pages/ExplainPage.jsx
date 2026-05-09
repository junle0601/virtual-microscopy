import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { usePhase } from '@/contexts/PhaseContext.jsx';
import NavigationBar from '@/components/NavigationBar.jsx';
import { motion } from 'framer-motion';

const ExplainPage = () => {
  const navigate = useNavigate();
  const { unlockedCases } = usePhase();

  const cases = [
    {
      id: 'anaemia',
      number: '#001',
      title: 'Sickle Cell Anaemia (RBC Disorder)',
      description: 'Analyze the blood smear of a 19-year-old female presenting with fatigue, weakness, and pale skin.',
      path: '/explain/anaemia',
    },
    {
      id: 'leukemia',
      number: '#002',
      title: 'Leukemia (WBC Disorder)',
      description: 'Examine the blood smear of a 30-year-old male experiencing weight loss, night sweats, and swollen lymph nodes.',
      path: '/explain/leukemia',
    },
    {
      id: 'platelet',
      number: '#003',
      title: 'Thrombocytopenia',
      description: 'Investigate the blood smear of a 7-year-old boy presenting with excessive bleeding and abnormal clotting.',
      path: '/explain/platelet',
    }
  ];

  const handleCaseSelect = (caseId, path) => {
    if (unlockedCases.includes(caseId)) {
      navigate(path);
    }
  };

  return (
    <>
      <Helmet>
        <title>Pathology Cases - Case Files</title>
      </Helmet>

      <div className="min-h-screen board-bg pb-20 relative">
        <NavigationBar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="mb-12 text-center">
            <div className="inline-block bg-[#F5E6D3] p-4 border-2 border-[#2C1810] shadow-lg">
              <h1 className="font-bebas-neue text-5xl text-[#2C1810] tracking-widest">PATHOLOGY CASE FILES</h1>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cases.map((c, idx) => {
              const isUnlocked = unlockedCases.includes(c.id);
              return (
                <motion.div 
                  key={c.id}
                  whileHover={isUnlocked ? { scale: 1.02, y: -4 } : {}}
                  onClick={() => handleCaseSelect(c.id, c.path)}
                  className={`case-folder p-6 transition-all duration-200 ${
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
                    <div className="p-3 bg-black/5 border border-black/10 relative">
                      <span className="font-bold font-oswald tracking-wide">CLINICAL PRESENTATION:</span>
                      <p className="mt-1 text-gray-800">{c.description}</p>
                    </div>

                    {isUnlocked && (
                      <div className="pt-4 flex justify-end">
                        <span className="font-oswald font-bold text-[var(--case-red)] text-lg uppercase tracking-wide">Review Evidence &rarr;</span>
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

export default ExplainPage;