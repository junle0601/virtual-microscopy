
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar.jsx';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ElaboratePlateletPage = () => {
  const navigate = useNavigate();

  const treatments = [
    {
      name: 'Corticosteroids',
      description: 'First-line therapy for immune-mediated thrombocytopenia (ITP) to suppress the immune system\'s destruction of platelets.'
    },
    {
      name: 'Intravenous Immunoglobulin (IVIG)',
      description: 'Helps increase platelet count quickly in acute, life-threatening bleeding situations or prior to surgery.'
    },
    {
      name: 'TPO Receptor Agonists',
      description: 'Medications like Romiplostim and Eltrombopag that stimulate the bone marrow to produce more platelets.'
    },
    {
      name: 'Platelet Transfusions',
      description: 'Used to replenish platelets rapidly in cases of severe active bleeding or profound depletion.'
    },
    {
      name: 'Rituximab',
      description: 'A biologic therapy that targets immune cells (B cells) to reduce the production of anti-platelet antibodies.'
    },
    {
      name: 'Splenectomy',
      description: 'Surgical removal of the spleen, often recommended if medical therapies fail, to prevent the destruction of platelets.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Consultation: Dr. Platelet - Case Files</title>
      </Helmet>

      <div className="min-h-screen board-bg pb-20">
        <NavigationBar />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-4 flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/elaborate/leukemia')} className="font-ibm-plex-mono font-bold text-white hover:bg-white/10">
              <ChevronLeft className="w-4 h-4 mr-2" /> Prev Consultation
            </Button>
            <div className="space-x-4">
              <Button onClick={() => navigate('/elaborate/quiz')} className="font-ibm-plex-mono font-bold bg-[#D32F2F] text-white hover:bg-[#C62828]">
                Final Assessment <ArrowRight className="w-4 h-4 ml-2" />
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
                <h1 className="case-handwritten text-5xl font-bold text-[#2C1810]">Dr. Platelet</h1>
                <p className="case-typewriter text-lg font-bold text-[#2C1810]/70 mt-2">SPECIALTY: Hematology (Platelet Disorders)</p>
              </div>
              <div className="text-right">
                <span className="font-ibm-plex-mono bg-[#2C1810]/10 px-3 py-1 text-sm font-bold text-[#2C1810]">FILE #003 PROTOCOL</span>
              </div>
            </div>
            
            <div className="case-typewriter space-y-8">
              <div className="bg-[var(--case-red)]/10 border-l-4 border-[var(--case-red)] p-4">
                <p className="font-bold text-[var(--case-red)] text-lg uppercase tracking-wide">Primary Objective:</p>
                <p className="text-[#2C1810] mt-1">Restore safe platelet levels, prevent spontaneous hemorrhaging, and address underlying immune dysfunction.</p>
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
                <span className="case-handwritten text-4xl text-[#2C1810]">Signed: Dr. Platelet</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ElaboratePlateletPage;
