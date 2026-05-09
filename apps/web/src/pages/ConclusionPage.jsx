import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar.jsx';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ConclusionPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Case Closed - Case Files</title>
      </Helmet>

      <div className="min-h-screen board-bg pb-20">
        <NavigationBar />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="mb-12">
            <motion.div 
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="case-stamp text-6xl md:text-7xl mb-8"
            >
              CASE CLOSED
            </motion.div>
            <h1 className="font-bebas-neue text-5xl text-white mb-6 tracking-widest">INVESTIGATION COMPLETE</h1>
          </div>

          <div className="case-folder text-left mb-12 p-8 md:p-12">
            <div className="border-b-2 border-[#2C1810]/20 pb-4 mb-6">
              <span className="font-ibm-plex-mono font-bold bg-[#2C1810] text-[#F5E6D3] px-2 py-1">FINAL REPORT</span>
              <h2 className="font-montserrat font-bold text-3xl mt-4 text-[#2C1810] uppercase">Case Findings & Outcomes</h2>
            </div>
            
            <div className="font-roboto space-y-6 relative z-10 text-[#2C1810]">
              <p className="font-bold text-lg">The investigator has successfully demonstrated the ability to:</p>
              <ul className="space-y-4 pl-4">
                <li className="flex items-start">
                  <span className="font-oswald font-bold text-[var(--case-red)] text-xl mr-3 leading-none">✓</span>
                  <span className="text-lg">Identify normal blood components and their functions.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-oswald font-bold text-[var(--case-red)] text-xl mr-3 leading-none">✓</span>
                  <span className="text-lg">Analyze patient symptoms to guide diagnostic focus.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-oswald font-bold text-[var(--case-red)] text-xl mr-3 leading-none">✓</span>
                  <span className="text-lg">Recognize morphological abnormalities in Anaemia, Leukemia, and Platelet Disorders.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-oswald font-bold text-[var(--case-red)] text-xl mr-3 leading-none">✓</span>
                  <span className="text-lg">Match appropriate clinical treatments to specific blood disorders.</span>
                </li>
              </ul>
            </div>
          </div>

          <Button size="lg" onClick={() => navigate('/post-study')} className="px-10 py-8 text-xl bg-[#2C1810] text-[#F5E6D3] hover:bg-[#3E2723] font-ibm-plex-mono font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all">
            Proceed to Debriefing <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ConclusionPage;