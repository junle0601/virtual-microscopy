
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar.jsx';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, ChevronLeft } from 'lucide-react';

const ExplainLeukemiaPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Case 002: Leukemia - Case Files</title>
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
              <span className="font-ibm-plex-mono font-bold bg-[#2C1810] text-[#F5E6D3] px-2 py-1">CASE #002</span>
              <h1 className="font-bebas-neue text-4xl text-[#2C1810] mt-2 tracking-wide">LEUKEMIA (WBC DISORDER)</h1>
            </div>
            <div className="space-x-4">
              <Button variant="outline" onClick={() => navigate('/explain/anaemia')} className="font-ibm-plex-mono font-bold bg-transparent border-2 border-[#2C1810] text-[#2C1810] hover:bg-[#2C1810] hover:text-[#F5E6D3]">
                <ArrowLeft className="w-4 h-4 mr-2" /> Prev Case
              </Button>
              <Button onClick={() => navigate('/explain/platelet')} className="font-ibm-plex-mono font-bold bg-[#D32F2F] text-white hover:bg-[#C62828]">
                Next Case <ArrowRight className="w-4 h-4 ml-2" />
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
                    <p className="mt-2 text-lg">Cancer of the body's blood-forming tissues, including the bone marrow and lymphatic system.</p>
                  </div>
                  <div>
                    <span className="font-bold text-[var(--case-red)] border-b border-[var(--case-red)] font-oswald tracking-wide uppercase">PATHOLOGY:</span>
                    <p className="mt-2 text-lg">Bone marrow produces an excessive amount of abnormal white blood cells, which don't function properly.</p>
                  </div>
                  <div className="p-4 border border-[#2C1810]/30 bg-black/5">
                    <span className="font-bold font-oswald tracking-wide uppercase">INVESTIGATOR'S NOTE:</span>
                    <p className="font-ibm-plex-mono text-sm mt-2 leading-relaxed text-[#2C1810]">Swollen lymph nodes and bone pain result from the accumulation of these abnormal cells.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="case-bg p-8 shadow-md">
                <h2 className="font-montserrat font-bold text-3xl mb-6 border-b-2 border-[#2C1810]/20 pb-2 text-[#2C1810] uppercase">Evidence Comparison: Microscopy</h2>
                
                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                  <div>
                    <h3 className="font-ibm-plex-mono font-bold text-center mb-2 text-[#2C1810]">EXHIBIT A: Baseline</h3>
                    <div className="evidence-photo h-64 relative overflow-hidden">
                      <img src="https://horizons-cdn.hostinger.com/8eb78029-3bd2-43aa-aa08-42bf74427044/0d213418ea6da277d2b43da20844d67f.jpg" alt="Leukemia baseline" className="w-full h-full object-cover sepia-[0.2] contrast-125" />
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <defs>
                          <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#D32F2F" />
                          </marker>
                        </defs>
                        <circle cx="50%" cy="50%" r="25" fill="none" stroke="#D32F2F" strokeWidth="2" />
                        <line x1="50%" y1="20%" x2="50%" y2="40%" stroke="#D32F2F" strokeWidth="2" markerEnd="url(#arrowhead2)" />
                        <rect x="30%" y="5%" width="40%" height="12%" fill="rgba(255,255,255,0.8)" rx="4" />
                        <text x="50%" y="12%" fill="#D32F2F" fontSize="12" fontWeight="bold" textAnchor="middle">Multi-lobed Nucleus</text>
                      </svg>
                    </div>
                    <div className="text-center text-xs text-gray-500 mt-1 font-roboto">© 2005-2026. T. Clark Brelje and Robert L. Sorenson</div>
                    <div className="mt-4 text-center font-roboto font-medium text-lg text-[#2C1810]">
                      Few, mature white blood cells.
                    </div>
                  </div>
                  <div>
                    <h3 className="font-ibm-plex-mono font-bold text-center mb-2 text-[var(--case-red)]">EXHIBIT B: Subject Smear</h3>
                    <div className="evidence-photo h-64 relative overflow-hidden">
                      <img src="https://horizons-cdn.hostinger.com/8eb78029-3bd2-43aa-aa08-42bf74427044/4db5d8a66c8c74bb826d4c7d17bbf5af.jpg" alt="Leukemia cells" className="w-full h-full object-cover sepia-[0.2] contrast-125" />
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <circle cx="45%" cy="45%" r="35" fill="none" stroke="#D32F2F" strokeWidth="3" strokeDasharray="4" />
                        <line x1="20%" y1="20%" x2="35%" y2="35%" stroke="#D32F2F" strokeWidth="2" markerEnd="url(#arrowhead2)" />
                        <rect x="5%" y="5%" width="40%" height="12%" fill="rgba(255,255,255,0.8)" rx="4" />
                        <text x="25%" y="12%" fill="#D32F2F" fontSize="12" fontWeight="bold" textAnchor="middle">Immature Blasts</text>
                      </svg>
                    </div>
                    <div className="text-center text-xs text-gray-500 mt-1 font-roboto">© Kaggle Datasets</div>
                    <div className="mt-4 text-center font-roboto font-medium text-lg text-[var(--case-red)]">
                      Increased WBC count, abnormal cell morphology, immature cells/blasts, nuclear abnormalities.
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 border-2 border-[var(--case-red)] bg-[var(--case-red)]/5">
                  <h3 className="font-bebas-neue text-2xl text-[var(--case-red)] mb-3">EXHIBIT A VS B COMPARISON ANALYSIS</h3>
                  <p className="font-roboto text-lg text-[#2C1810] leading-relaxed">
                    <span className="font-bold">Baseline WBCs</span> show normal morphology with mature cells, while <span className="font-bold">leukemia</span> shows increased immature cells (blasts), abnormal nuclear-to-cytoplasmic ratio, and abnormal granulation patterns. The overcrowding of these non-functional cells is clearly visible in Exhibit B.
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

export default ExplainLeukemiaPage;
