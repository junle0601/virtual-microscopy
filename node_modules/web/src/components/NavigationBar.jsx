import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronRight } from 'lucide-react';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const phases = [
    { id: 'engage', label: 'Engage', path: '/engage' },
    { id: 'explore', label: 'Explore', path: '/explore' },
    { id: 'explain', label: 'Explain', path: '/explain/anaemia' },
    { id: 'elaborate', label: 'Elaborate', path: '/elaborate/treatment' },
    { id: 'evaluate', label: 'Evaluate', path: '/evaluate' },
  ];

  const getCurrentPhaseId = () => {
    const path = location.pathname;
    if (path.includes('/engage')) return 'engage';
    if (path.includes('/explore')) return 'explore';
    if (path.includes('/explain')) return 'explain';
    if (path.includes('/elaborate')) return 'elaborate';
    if (path.includes('/evaluate') || path.includes('/conclusion') || path.includes('/post-study')) return 'evaluate';
    return '';
  };

  const currentPhaseId = getCurrentPhaseId();

  return (
    <nav className="bg-[var(--case-paper)] border-b-2 border-[#2C1810]/20 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
            <h2 className="text-xl font-oswald font-bold text-[#2C1810] tracking-wider">VIRTUAL MICROSCOPY</h2>
          </div>

          <div className="hidden md:flex items-center space-x-2 flex-1 max-w-3xl mx-8">
            {phases.map((phase, index) => {
              const isCurrent = phase.id === currentPhaseId;
              return (
                <React.Fragment key={phase.id}>
                  <div
                    className={`flex-1 py-2 px-3 rounded-sm text-sm font-montserrat font-bold text-center transition-all uppercase tracking-wide ${
                      isCurrent
                        ? 'bg-[#2C1810] text-[#F5E6D3] shadow-inner'
                        : 'bg-transparent text-[#2C1810]/60 hover:text-[#2C1810] hover:bg-[#2C1810]/5'
                    }`}
                  >
                    {phase.label}
                  </div>
                  {index < phases.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-[#2C1810]/30 flex-shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-[#2C1810]">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#2C1810]/20">
            <div className="space-y-2">
              {phases.map((phase) => {
                const isCurrent = phase.id === currentPhaseId;
                return (
                  <div
                    key={phase.id}
                    className={`w-full py-3 px-4 rounded-sm text-left font-montserrat font-bold uppercase tracking-wide transition-all ${
                      isCurrent ? 'bg-[#2C1810] text-[#F5E6D3]' : 'bg-transparent text-[#2C1810]/70'
                    }`}
                  >
                    {phase.label}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;