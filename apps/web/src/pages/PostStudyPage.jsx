
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar.jsx';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const PostStudyPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Debriefing - Case Files</title>
      </Helmet>

      <div className="min-h-screen board-bg pb-20">
        <NavigationBar />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="font-bebas-neue text-5xl text-white mb-6 tracking-widest">INVESTIGATOR DEBRIEFING</h1>
          <p className="text-xl text-white/90 mb-12 font-roboto bg-black/40 p-4 inline-block rounded-sm">
            Your session has been recorded and completed.
          </p>

          <div className="mt-16">
            <div className="case-stamp case-stamp-green mb-8 text-3xl">
              THANK YOU FOR YOUR SERVICE
            </div>
            <br />
            <Button variant="outline" size="lg" onClick={() => navigate('/')} className="font-ibm-plex-mono font-bold bg-[var(--case-paper)] text-[#2C1810] hover:bg-[#E8D7C3] border-2 border-[#2C1810]">
              <Home className="w-5 h-5 mr-2" /> Return to Headquarters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostStudyPage;
