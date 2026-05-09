
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar.jsx';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ElaborateTreatmentPage = () => {
  const navigate = useNavigate();
  const [selectedDoc, setSelectedDoc] = useState(null);

  const doctors = [
    {
      id: 'anaemia',
      name: 'Dr. Anaemia',
      specialty: 'Hematology (Sickle Cell Anaemia)',
      treatments: [
        {
          name: 'Hydroxyurea (Droxia, Hydrea)',
          description: 'Reduces pain crisis frequency, may reduce transfusions and hospital stays, increases infection risk, contraindicated in pregnancy.'
        },
        {
          name: 'L-glutamine oral powder (Endari)',
          description: 'Helps to reduce the frequency of pain crises.'
        },
        {
          name: 'Crizanlizumab (Adakveo)',
          description: 'Injection therapy for adults and children 16+, reduces pain crisis frequency. Side effects include nausea, joint pain, back pain, and fever.'
        },
        {
          name: 'Pain-relieving medicines',
          description: 'Narcotics prescribed during pain crises for acute symptom management.'
        },
        {
          name: 'Blood transfusion',
          description: 'Reserved for severe cases and managing life-threatening complications.'
        },
        {
          name: 'Iron supplement',
          description: 'Used only as a supplementary treatment when verified iron deficiency is also present.'
        }
      ]
    },
    {
      id: 'leukemia',
      name: 'Dr. Leukemia',
      specialty: 'Oncology (Leukemia)',
      treatments: [
        { name: 'Chemotherapy', description: 'Primary treatment to kill leukemia cells.' },
        { name: 'Targeted therapy drugs', description: 'Attacks specific vulnerabilities within cancer cells.' },
        { name: 'Radiation therapy', description: 'Uses high-energy radiation to damage leukemia cells and halt their growth.' },
        { name: 'Bone marrow / Stem cell transplant', description: 'Replaces diseased bone marrow with healthy stem cells.' }
      ]
    },
    {
      id: 'platelet',
      name: 'Dr. Platelet',
      specialty: 'Specialist (Platelet Disorders)',
      treatments: [
        { name: 'Corticosteroids', description: 'Reduces immune system destruction of platelets.' },
        { name: 'IVIG (Intravenous immunoglobulin)', description: 'Helps increase platelet count quickly in acute situations.' },
        { name: 'Platelet transfusions', description: 'Replenishes platelets in severe, life-threatening bleeding.' },
        { name: 'Splenectomy', description: 'Surgical removal of spleen if medication fails.' }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Expert Consultants - Case Files</title>
      </Helmet>

      <div className="min-h-screen board-bg pb-20">
        <NavigationBar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-4">
            <Button variant="ghost" onClick={() => navigate(-1)} className="font-ibm-plex-mono font-bold text-white hover:bg-white/10">
              <ChevronLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          </div>

          <div className="flex justify-between items-center mb-12 bg-white/10 backdrop-blur-sm p-4 border-2 border-[#2C1810]">
            <div>
              <div className="case-stamp case-stamp-green mb-2 text-xl">CONSULTATION PHASE</div>
              <h1 className="case-handwritten text-4xl font-bold text-white mt-2">Expert Consultants</h1>
            </div>
            <div className="space-x-4">
              <Button variant="outline" onClick={() => navigate('/explain/platelet')} className="case-typewriter bg-[var(--case-paper)] text-[#2C1810] hover:bg-[#E8D7C3]">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button onClick={() => navigate('/elaborate/quiz')} className="case-typewriter bg-[#D32F2F] text-white hover:bg-[#C62828]">
                Final Assessment <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {doctors.map((doc, idx) => {
              const isSelected = selectedDoc?.id === doc.id;
              return (
                <motion.div 
                  key={doc.id} 
                  whileHover={{ scale: 1.02 }}
                  className={`case-bg p-6 cursor-pointer transition-all duration-300 ${isSelected ? 'shadow-2xl ring-4 ring-[var(--case-red)]' : 'shadow-lg opacity-90 hover:opacity-100'}`}
                  style={{ transform: `rotate(${idx === 1 ? 2 : -1}deg)` }}
                  onClick={() => setSelectedDoc(doc)}
                >
                  <div className="case-pin top-4 left-1/2 -translate-x-1/2"></div>
                  <div className="mt-6 text-center border-b-2 border-[#2C1810]/20 pb-4">
                    <h3 className="case-handwritten text-3xl font-bold">{doc.name}</h3>
                    <p className="case-typewriter text-sm font-bold mt-1">{doc.specialty}</p>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="case-stamp text-xl">CONSULTANT</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {selectedDoc && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="case-folder p-8 md:p-12 max-w-4xl mx-auto"
            >
              <div className="case-tape top-[-10px] left-1/2 -translate-x-1/2"></div>
              <div className="border-b-2 border-[#2C1810]/20 pb-4 mb-6">
                <h2 className="case-handwritten text-4xl font-bold">Treatment Protocol</h2>
                <p className="case-typewriter text-sm">REF: {selectedDoc.specialty}</p>
              </div>
              
              <div className="case-typewriter space-y-6">
                <p className="font-bold text-[var(--case-red)] text-lg">RECOMMENDED INTERVENTIONS:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedDoc.treatments.map((treatment, idx) => (
                    <div key={idx} className="bg-white/40 border border-[#2C1810]/20 p-4 relative shadow-sm">
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
                <div className="mt-12 pt-6 border-t border-[#2C1810]/20 flex justify-end">
                  <span className="case-handwritten text-3xl">Signed: {selectedDoc.name}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default ElaborateTreatmentPage;
