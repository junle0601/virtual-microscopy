import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { usePhase } from '@/contexts/PhaseContext.jsx';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();
  const { goToPhase } = usePhase();

  const handleStartSimulation = () => {
    goToPhase('engage');
    navigate('/engage');
  };

  return (
    <>
      <Helmet>
        <title>Case Files: Blood Disorder Investigation</title>
      </Helmet>

      <div className="min-h-screen board-bg flex items-center justify-center p-4 sm:p-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl"
        >
          <div className="case-folder p-8 md:p-16 min-h-[80vh] flex flex-col relative overflow-hidden">
            {/* Textures and Marks */}
            <div className="case-crease"></div>
            <div className="case-coffee-stain top-10 right-10 opacity-60"></div>
            <div className="case-coffee-stain bottom-20 left-5 opacity-40" style={{ transform: 'scale(0.7)' }}></div>
            <div className="case-tape top-[-10px] left-1/2 -translate-x-1/2"></div>
            <div className="case-tape bottom-[-10px] right-20 rotate-12"></div>
            
            <div className="relative z-10 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-12">
                <div className="case-typewriter text-sm opacity-70">
                  FILE REF: BD-2026-04<br/>
                  DEPT: HEMATOLOGY<br/>
                  STATUS: OPEN
                </div>
                <motion.div 
                  initial={{ scale: 2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.85 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="case-stamp text-3xl md:text-4xl"
                >
                  ACTIVE CASE
                </motion.div>
              </div>

              <div className="text-center mb-12">
                <h1 className="case-handwritten text-5xl md:text-7xl font-bold mb-8 leading-tight transform -rotate-2">
                  Blood Disorder<br/>Investigation Case Files
                </h1>
                
                <div className="case-typewriter text-lg md:text-xl max-w-2xl mx-auto space-y-6 text-left bg-white/30 p-6 border border-black/10 shadow-inner">
                  <p>
                    ATTN: Lead Investigator
                  </p>
                  <p>
                    We have several anomalous blood samples requiring immediate analysis. Your objective is to identify cellular abnormalities, diagnose the underlying conditions, and recommend treatment protocols.
                  </p>
                  <p className="case-red-pen text-2xl mt-4">
                    * Time is critical. Review the evidence carefully. *
                  </p>
                </div>
              </div>

              <div className="mt-auto text-center">
                <Button
                  size="lg"
                  onClick={handleStartSimulation}
                  className="text-xl px-12 py-8 bg-[#2C1810] hover:bg-[#3E2723] text-[#F5E6D3] font-typewriter uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 case-tear"
                >
                  Open Case File
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default HomePage;