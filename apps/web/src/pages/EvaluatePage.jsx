
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { usePhase } from '@/contexts/PhaseContext.jsx';
import pb from '@/lib/apiClient';
import NavigationBar from '@/components/NavigationBar.jsx';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const questions = [
  {
    id: 1,
    text: 'What key visual evidence on a blood smear confirms a diagnosis of Sickle Cell Anaemia?',
    options: ['Hypochromic, microcytic cells', 'Presence of sickle-shaped red blood cells', 'Overcrowding of immature blasts', 'Lack of platelets'],
    correct: 1
  },
  {
    id: 2,
    text: 'Which treatment for Sickle Cell Anaemia is an injection therapy that reduces pain crises but may cause side effects like nausea or joint pain?',
    options: ['Crizanlizumab (Adakveo)', 'L-glutamine oral powder', 'Splenectomy', 'Corticosteroids'],
    correct: 0
  },
  {
    id: 3,
    text: 'In the Leukemia case files, what is the defining characteristic of the cells seen in the subject smear compared to baseline?',
    options: ['The cells are unusually small and pale', 'The cells form sickle shapes', 'The abnormal leukemia cells overcrowd the smear', 'The cells are completely absent'],
    correct: 2
  },
  {
    id: 4,
    text: 'For a patient diagnosed with Thrombocytopenia, what would you expect to see on their blood smear compared to the baseline?',
    options: ['Normal amounts of small purple fragments', 'A severe lack or complete absence of platelets', 'Excessive numbers of white blood cells', 'Enlarged red blood cells'],
    correct: 1
  },
  {
    id: 5,
    text: 'Why is Hydroxyurea prescribed for patients with Sickle Cell Anaemia?',
    options: ['To destroy abnormal white blood cells', 'To prevent the immune system from attacking platelets', 'To directly add iron into the blood stream', 'To reduce the frequency of pain crises and hospital stays'],
    correct: 3
  }
];

const EvaluatePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { sessionId, completePhase } = usePhase();
  
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
      await pb.collection('assessment_scores').create({
        sessionId,
        phase: 'evaluate',
        score: finalScore,
        totalQuestions: questions.length
      }, { $autoCancel: false });

      completePhase('evaluate');
      
      toast({
        title: 'Case Closed',
        description: `Final Evaluation Score: ${finalScore}%`,
      });
    } catch (error) {
      console.error('Error saving assessment:', error);
      toast({ title: 'Error', description: 'Failed to save results.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <>
      <Helmet>
        <title>Case Closure Evaluation - Case Files</title>
      </Helmet>

      <div className="min-h-screen board-bg pb-20">
        <NavigationBar />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-4">
            <Button variant="ghost" onClick={() => navigate('/explore')} className="font-ibm-plex-mono font-bold text-white hover:bg-white/10">
              <ChevronLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          </div>

          <div className="case-bg p-8 md:p-12 shadow-md relative">
            <div className="text-center mb-12 relative z-10 border-b-2 border-[#2C1810]/20 pb-8">
              <div className="case-stamp font-bebas-neue text-5xl mb-6">CASE CLOSURE EVALUATION</div>
              <p className="font-roboto text-lg text-[#2C1810]">Final review of overall understanding of blood disorders, diagnostics, and treatments.</p>
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
                            <span className="whitespace-normal">{opt}</span>
                            {submitted && isCorrect && (
                              <svg className="w-6 h-6 text-[var(--case-green)] flex-shrink-0 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <motion.path d="M20 6L9 17l-5-5" className="animate-checkmark" />
                              </svg>
                            )}
                            {submitted && isSelected && !isCorrect && (
                              <span className="font-oswald font-bold text-[var(--case-red)] text-xl leading-none flex-shrink-0 ml-2">X</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="mt-12 text-center pt-8 border-t-2 border-[#2C1810]/20">
                {!submitted ? (
                  <Button size="lg" onClick={handleSubmit} disabled={!allAnswered || isSubmitting} className="px-10 font-ibm-plex-mono font-bold bg-[#2C1810] text-[#F5E6D3] hover:bg-[#3E2723] text-lg py-6">
                    {isSubmitting ? 'Filing Report...' : 'Submit Evaluation'}
                  </Button>
                ) : (
                  <div className="space-y-8 flex flex-col items-center">
                    <div className="p-6 border border-[#2C1810]/30 bg-black/5 max-w-md w-full text-left">
                      <h2 className="font-montserrat font-bold text-2xl mb-2 text-[#2C1810] uppercase">CASE RESOLUTION</h2>
                      <p className="font-roboto text-lg leading-tight text-[#2C1810]">
                        {score >= 80 ? 'Excellent work, Investigator. You have demonstrated a strong grasp of blood diagnostics.' : 'Adequate effort. Review the case files to strengthen your diagnostic accuracy.'}
                      </p>
                    </div>
                    <div className="font-montserrat font-bold text-3xl text-[#2C1810] uppercase">
                      INVESTIGATION VERDICT: <span className="font-ibm-plex-mono text-[var(--case-red)]">{score}%</span>
                    </div>
                    <Button size="lg" onClick={() => navigate('/conclusion')} className="px-10 font-ibm-plex-mono font-bold bg-[#D32F2F] text-white hover:bg-[#C62828] text-lg py-6">
                      View Final Report <ArrowRight className="w-5 h-5 ml-2" />
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

export default EvaluatePage;
