
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar.jsx';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, ChevronLeft } from 'lucide-react';

const ExplainPlateletPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Case 003: Thrombocytopenia - Case Files</title>
      </Helmet>

      <div className="min-h-screen board-bg pb-20">
        <NavigationBar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-4">
            <Button variant="ghost" onClick={() => navigate(-1)} className="font-ibm-plex-mono font-bold text-[#2C1810] hover:bg-[#2C1810]/10">
              <ChevronLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          </div>

          <div className="flex justify-between items-center mb-8 bg-[var(--case-paper)] p-4 border-2 border-[#2C1810] shadow-md">
            <div>
              <span className="font-ibm-plex-mono font-bold bg-[#2C1810] text-[#F5E6D3] px-2 py-1">CASE #003</span>
              <h1 className="font-bebas-neue text-4xl text-[#2C1810] mt-2 tracking-wide">THROMBOCYTOPENIA</h1>
            </div>
            <div className="space-x-4">
              <Button variant="outline" onClick={() => navigate('/explain/leukemia')} className="font-ibm-plex-mono font-bold bg-transparent border-2 border-[#2C1810] text-[#2C1810] hover:bg-[#2C1810] hover:text-[#F5E6D3]">
                <ArrowLeft className="w-4 h-4 mr-2" /> Prev Case
              </Button>
              <Button onClick={() => navigate('/elaborate/anaemia')} className="font-ibm-plex-mono font-bold bg-[#D32F2F] text-white hover:bg-[#C62828]">
                Consult Experts <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="case-bg p-6 shadow-md min-h-full">
                <div className="case-stamp font-bebas-neue text-4xl mb-6">EVIDENCE</div>
                
                <div className="font-roboto space-y-6 text-[#2C1810]">
                  <div>
                    <span className="font-bold text-[var(--case-red)] border-b border-[var(--case-red)] font-oswald tracking-wide uppercase">DEFINITION:</span>
                    <p className="mt-2 text-lg">A condition characterized by abnormally low levels of platelets in the blood.</p>
                  </div>
                  <div>
                    <span className="font-bold text-[var(--case-red)] border-b border-[var(--case-red)] font-oswald tracking-wide uppercase">CAUSES:</span>
                    <p className="mt-2 text-lg">Can be inherited, or caused by medications, immune system errors (ITP), or bone marrow issues.</p>
                  </div>
                  <div className="p-4 border border-[#2C1810]/30 bg-black/5">
                    <span className="font-bold font-oswald tracking-wide uppercase">INVESTIGATOR'S NOTE:</span>
                    <p className="font-ibm-plex-mono text-sm mt-2 leading-relaxed text-[#2C1810]">Without enough platelets, the blood cannot clot effectively, leading to excessive bruising.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="case-bg p-8 shadow-md">
                <h2 className="font-montserrat font-bold text-3xl mb-6 border-b-2 border-[#2C1810]/20 pb-2 text-[#2C1810] uppercase">Evidence Analysis: Microscopy</h2>
                
                <div className="max-w-xl mx-auto">
                  <div>
                    <h3 className="font-ibm-plex-mono font-bold text-center mb-2 text-[#2C1810]">EXHIBIT A: Baseline</h3>
                    <div className="evidence-photo h-80 relative overflow-hidden">
                      <img src="https://horizons-cdn.hostinger.com/8eb78029-3bd2-43aa-aa08-42bf74427044/cdcd9154e66b3f99c621dde2f2d98eb9.jpg" alt="Platelet baseline" className="w-full h-full object-cover sepia-[0.2] contrast-125" />
                    </div>
                    <div className="text-center text-xs text-gray-500 mt-1 font-roboto">© 2005-2026. T. Clark Brelje and Robert L. Sorenson</div>
                    <div className="mt-4 text-center font-roboto font-medium text-lg text-[#2C1810]">
                      Adequate number of small purple platelet fragments.
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 border-2 border-[var(--case-red)] bg-[var(--case-red)]/5">
                  <h3 className="font-bebas-neue text-2xl text-[var(--case-red)] mb-3">EXHIBIT A ANALYSIS</h3>
                  <p className="font-roboto text-lg text-[#2C1810] leading-relaxed">
                    <span className="font-bold">Baseline platelets</span> are small disc-shaped fragments visible between red blood cells. In abnormal smears, a severe lack or complete absence of these fragments directly correlates with the patient's inability to form clots.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExplainPlateletPage;
