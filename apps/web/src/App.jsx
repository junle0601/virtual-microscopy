
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { PhaseContextProvider } from '@/contexts/PhaseContext.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';

import LearningObjectivesPage from '@/pages/LearningObjectivesPage.jsx';
import EngagePage from '@/pages/EngagePage.jsx';
import ExplorePage from '@/pages/ExplorePage.jsx';
import ExploreQuizPage from '@/pages/ExploreQuizPage.jsx';
import ExplainPage from '@/pages/ExplainPage.jsx';
import ExplainAnaemiaPage from '@/pages/ExplainAnaemiaPage.jsx';
import ExplainLeukemiaPage from '@/pages/ExplainLeukemiaPage.jsx';
import ExplainPlateletPage from '@/pages/ExplainPlateletPage.jsx';
import ElaborateAnaemiaPage from '@/pages/ElaborateAnaemiaPage.jsx';
import ElaborateLeukemiaPage from '@/pages/ElaborateLeukemiaPage.jsx';
import ElaboratePlateletPage from '@/pages/ElaboratePlateletPage.jsx';
import ElaborateQuizPage from '@/pages/ElaborateQuizPage.jsx';
import EvaluatePage from '@/pages/EvaluatePage.jsx';
import ConclusionPage from '@/pages/ConclusionPage.jsx';
import PostStudyPage from '@/pages/PostStudyPage.jsx';

function App() {
  return (
    <PhaseContextProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LearningObjectivesPage />} />
          <Route path="/engage" element={<EngagePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/explore/quiz" element={<ExploreQuizPage />} />
          <Route path="/explain" element={<ExplainPage />} />
          <Route path="/explain/anaemia" element={<ExplainAnaemiaPage />} />
          <Route path="/explain/leukemia" element={<ExplainLeukemiaPage />} />
          <Route path="/explain/platelet" element={<ExplainPlateletPage />} />
          <Route path="/elaborate/anaemia" element={<ElaborateAnaemiaPage />} />
          <Route path="/elaborate/leukemia" element={<ElaborateLeukemiaPage />} />
          <Route path="/elaborate/platelet" element={<ElaboratePlateletPage />} />
          <Route path="/elaborate/quiz" element={<ElaborateQuizPage />} />
          <Route path="/evaluate" element={<EvaluatePage />} />
          <Route path="/conclusion" element={<ConclusionPage />} />
          <Route path="/post-study" element={<PostStudyPage />} />
        </Routes>
      </Router>
    </PhaseContextProvider>
  );
}

export default App;
