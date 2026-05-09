
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar.jsx';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ElaborateLeukemiaPage = () => {
  const navigate = useNavigate();

  const treatments = [
    {
      name: 'Chemotherapy',
      description: 'The primary treatment for most types of leukemia. Uses chemicals to kill rapidly dividing abnormal leukemia cells.'
    },
    {
      name: 'Targeted Therapy',
      description: 'Drugs designed to attack specific vulnerabilities or genetic mutations within cancer cells (e.g., tyrosine kinase inhibitors).'
    },
    {
      name: 'Immunotherapy / CAR T-cell Therapy',
      description: 'Engineers the patient\'s own immune T-cells to specifically recognize and destroy leukemia cells.'
    },
    {
      name: 'Bone Marrow / Stem Cell Transplant',
      description: 'Replaces diseased bone marrow with healthy stem cells after high-dose chemotherapy or radiation.'
    },
    {
      name: 'Radiation Therapy',
      description: 'Uses high-energy radiation to damage leukemia cells and halt their growth, sometimes used prior to stem cell transplants.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Consultation: Dr. Leukemia - Case Files</title>
      </Helmet>

      <div className="min-h-screen board-bg pb-20">
        <NavigationBar />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-4 flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/elaborate/anaemia')} className="font-ibm-plex-mono font-bold text-white hover:bg-white/10">
              <ChevronLeft className="w-4 h-4 mr-2" /> Prev Consultation
            </Button>
            <div className="space-x-4">
              <Button onClick={() => navigate('/elaborate/platelet')} className="font-ibm-plex-mono font-bold bg-[#D32F2F] text-white hover:bg-[#C62828]">
                Next Consultation <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="case-folder p-8 md:p-12 relative mt-8"
          >
            <div className="case-tape top-[-10px] left-1/2 -translate-x-1/2"></div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#2C1810]/20 pb-6 mb-8 gap-4">
              <div>
                <div className="case-stamp text-xl mb-2 inline-block">CONSULTATION PHASE</div>
                <h1 className="case-handwritten text-5xl font-bold text-[#2C1810]">Dr. Leukemia</h1>
                <p className="case-typewriter text-lg font-bold text-[#2C1810]/70 mt-2">SPECIALTY: Oncology (Leukemia)</p>
              </div>
              <div className="text-right">
                <span className="font-ibm-plex-mono bg-[#2C1810]/10 px-3 py-1 text-sm font-bold text-[#2C1810]">FILE #002 PROTOCOL</span>
              </div>
            </div>
            
            <div className="case-typewriter space-y-8">
              <div className="bg-[var(--case-red)]/10 border-l-4 border-[var(--case-red)] p-4">
                <p className="font-bold text-[var(--case-red)] text-lg uppercase tracking-wide">Primary Objective:</p>
                <p className="text-[#2C1810] mt-1">Eradicate malignant cells, restore normal bone marrow function, and prevent disease relapse.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {treatments.map((treatment, idx) => (
                  <div key={idx} className="bg-white/50 border border-[#2C1810]/20 p-5 relative shadow-sm hover:shadow-md transition-shadow">
                    <div className="absolute -left-2 -top-2 w-4 h-4 bg-[var(--case-red)] rounded-full shadow-sm"></div>
                    <h4 className="font-bold text-lg text-[#2C1810] mb-2 font-montserrat uppercase leading-tight">
                      {treatment.name}
                    </h4>
                    <p className="text-gray-800 text-sm leading-relaxed font-roboto">
                      {treatment.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t-2 border-[#2C1810]/20 flex justify-between items-center">
                <span className="case-stamp text-xl opacity-50">CONFIDENTIAL</span>
                <span className="case-handwritten text-4xl text-[#2C1810]">Signed: Dr. Leukemia</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ElaborateLeukemiaPage;
