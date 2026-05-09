import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LearningObjectivesPage = () => {
  const navigate = useNavigate();

  const objectives = [
    'Identify normal blood components and their functions',
    'Recognize morphological abnormalities in blood cells',
    'Analyze patient case studies and symptoms',
    'Diagnose specific blood disorders (Anaemia, Leukemia, Platelet Disorders)',
    'Match appropriate treatments to diagnosed conditions'
  ];

  return (
    <>
      <Helmet>
        <title>Investigation Requirements - Case Files</title>
      </Helmet>

      <div className="min-h-screen board-bg flex items-center justify-center p-4 sm:p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-4xl"
        >
          <div className="case-bg p-8 md:p-16 min-h-[80vh] shadow-2xl relative">
            <div className="case-tape top-4 left-4"></div>
            <div className="case-tape top-4 right-4"></div>
            <div className="case-pin top-8 left-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-10 border-b-2 border-[#2C1810]/20 pb-6">
                <div>
                  <h1 className="font-bebas-neue text-5xl md:text-6xl text-[#2C1810] tracking-wide">
                    CASE FILE #001
                  </h1>
                  <h2 className="font-oswald text-xl md:text-2xl text-[#2C1810]/80 uppercase tracking-widest mt-1">
                    Blood Disorder Investigation
                  </h2>
                </div>
                <div className="case-stamp font-bebas-neue text-3xl">ACTIVE CASE</div>
              </div>

              <div className="font-roboto text-lg mb-8 text-[#2C1810]">
                <p className="mb-6 font-medium">Before proceeding to the investigation board, ensure you are prepared to meet the following operational objectives:</p>
                
                <div className="space-y-6 pl-4">
                  {objectives.map((obj, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      className="flex items-start"
                    >
                      <svg className="w-6 h-6 mr-4 flex-shrink-0 text-[var(--case-red)] mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <motion.path 
                          d="M20 6L9 17l-5-5" 
                          className="animate-checkmark"
                        />
                      </svg>
                      <span className="font-roboto text-xl leading-relaxed">{obj}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-16 text-center border-t-2 border-[#2C1810]/10 pt-8">
                <p className="font-oswald text-[var(--case-red)] text-xl mb-6 uppercase tracking-widest font-bold">Do you accept this assignment?</p>
                <Button 
                  size="lg" 
                  onClick={() => navigate('/engage')}
                  className="text-lg px-10 py-6 bg-transparent border-2 border-[#2C1810] text-[#2C1810] hover:bg-[#2C1810] hover:text-[#F5E6D3] font-ibm-plex-mono font-bold uppercase tracking-widest transition-all"
                >
                  Acknowledge & Proceed
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LearningObjectivesPage;