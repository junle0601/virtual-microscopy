import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { usePhase } from '@/contexts/PhaseContext.jsx';
import pb from '@/lib/apiClient';
import NavigationBar from '@/components/NavigationBar.jsx';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const questions = [
  {
    id: 1,
    text: 'Which blood component is primarily responsible for transporting oxygen?',
    options: ['White Blood Cells', 'Platelets', 'Red Blood Cells', 'Plasma'],
    correct: 2
  },
  {
    id: 2,
    text: 'What is the normal shape of a healthy red blood cell?',
    options: ['Spherical with a large nucleus', 'Biconcave disc without a nucleus', 'Irregular fragment', 'Star-shaped'],
    correct: 1
  },
  {
    id: 3,
    text: 'Which component is crucial for blood clotting?',
    options: ['Erythrocytes', 'Leucocytes', 'Plasma', 'Thrombocytes (Platelets)'],
    correct: 3
  },
  {
    id: 4,
    text: 'What is the primary function of White Blood Cells?',
    options: ['Carrying nutrients', 'Fighting infections', 'Stopping bleeding', 'Regulating temperature'],
    correct: 1
  },
  {
    id: 5,
    text: 'Which component makes up the largest percentage of total blood volume?',
    options: ['Red Blood Cells', 'White Blood Cells', 'Platelets', 'Plasma'],
    correct: 3
  }
];

const ExploreQuizPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { sessionId, completePhase, unlockAllCases } = usePhase();
  
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (qId, optIdx) => {
    if (!submitted) {
      setAnswers(prev => ({ ...prev, [qId]: optIdx }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) correctCount++;
    });
    
    const finalScore = (correctCount / questions.length) * 100;
    setScore(finalScore);
    setSubmitted(true);

    try {
      await pb.collection('student_responses').create({
        sessionId,
        phase: 'explore',
        responses: answers,
        score: finalScore,
        totalQuestions: questions.length,
        correctAnswers: correctCount
      }, { $autoCancel: false });

      completePhase('explore');
      unlockAllCases(); 
      
      toast({
        title: 'Assessment Filed',
        description: `Verdict recorded. Pathological cases unlocked.`,
      });
    } catch (error) {
      console.error('Error saving quiz:', error);
      toast({ title: 'Filing Error', description: 'Failed to record assessment.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <>
      <Helmet>
        <title>Investigation Assessment - Case Files</title>
      </Helmet>

      <div className="min-h-screen board-bg pb-20">
        <NavigationBar />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="case-bg p-8 md:p-12 shadow-xl relative">
            <div className="text-center mb-12 relative z-10 border-b-2 border-[#2C1810]/20 pb-8">
              <div className="case-stamp font-bebas-neue text-5xl mb-6">INVESTIGATION ASSESSMENT</div>
              <p className="font-roboto text-lg text-[#2C1810]">Verify understanding of normal parameters before proceeding to pathology.</p>
            </div>

            <div className="space-y-10 relative z-10">
              {questions.map((q, idx) => (
                <div key={q.id} className="relative">
                  <h3 className="font-roboto font-bold text-lg mb-4 text-[#2C1810]">
                    <span className="font-oswald text-[var(--case-red)] text-2xl mr-2">Q{idx + 1}.</span>
                    {q.text}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4 pl-8">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = answers[q.id] === optIdx;
                      const isCorrect = q.correct === optIdx;
                      
                      let btnClass = "w-full justify-start text-left h-auto py-3 px-4 border-2 font-roboto transition-all bg-white/40 text-[#2C1810] ";
                      if (!submitted) {
                        btnClass += isSelected ? "border-[var(--case-red)] shadow-sm" : "border-[#2C1810]/20 hover:border-[#2C1810]/50";
                      } else {
                        if (isCorrect) btnClass += "border-[var(--case-green)] bg-[var(--case-green)]/10";
                        else if (isSelected && !isCorrect) btnClass += "border-[var(--case-red)] bg-[var(--case-red)]/10";
                        else btnClass += "border-[#2C1810]/10 opacity-50";
                      }

                      return (
                        <button
                          key={optIdx}
                          className={btnClass}
                          onClick={() => handleSelect(q.id, optIdx)}
                          disabled={submitted}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span>{opt}</span>
                            {submitted && isCorrect && (
                              <svg className="w-6 h-6 text-[var(--case-green)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <motion.path d="M20 6L9 17l-5-5" className="animate-checkmark" />
                              </svg>
                            )}
                            {submitted && isSelected && !isCorrect && (
                              <span className="font-oswald font-bold text-[var(--case-red)] text-xl leading-none">X</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {submitted && (
                    <div className="mt-4 ml-8">
                      <span className={`font-oswald font-bold text-xl uppercase tracking-wide ${answers[q.id] === q.correct ? 'text-[var(--case-green)]' : 'text-[var(--case-red)]'}`}>
                        {answers[q.id] === q.correct ? 'Verified.' : 'Incorrect finding.'}
                      </span>
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-12 text-center pt-8 border-t-2 border-[#2C1810]/20">
                {!submitted ? (
                  <Button size="lg" onClick={handleSubmit} disabled={!allAnswered || isSubmitting} className="px-10 font-ibm-plex-mono font-bold bg-[#2C1810] text-[#F5E6D3] hover:bg-[#3E2723] text-lg py-6">
                    {isSubmitting ? 'Filing Report...' : 'Submit Assessment'}
                  </Button>
                ) : (
                  <div className="space-y-8 flex flex-col items-center">
                    <div className="case-stamp font-bebas-neue text-5xl animate-stamp">
                      VERDICT: {score}% ACCURACY
                    </div>
                    <p className="font-roboto font-medium text-[#2C1810] text-xl">Pathology case files have been unlocked on the board.</p>
                    <Button size="lg" onClick={() => navigate('/explain')} className="px-10 font-ibm-plex-mono font-bold bg-[#D32F2F] text-white hover:bg-[#C62828] text-lg py-6">
                      Proceed to Pathology Cases <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExploreQuizPage;