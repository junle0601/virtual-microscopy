import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { usePhase } from '@/contexts/PhaseContext.jsx';
import pb from '@/lib/apiClient';
import NavigationBar from '@/components/NavigationBar.jsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const matchingItems = [
  { id: 'rbc', name: 'Red Blood Cell', description: 'Carries oxygen throughout the body' },
  { id: 'neutrophil', name: 'Neutrophil', description: 'First responder to bacterial infections' },
  { id: 'lymphocyte', name: 'Lymphocyte', description: 'Produces antibodies for immune response' },
  { id: 'platelet', name: 'Platelet', description: 'Essential for blood clotting' },
];

const multipleChoiceQuestions = [
  {
    id: 1,
    question: 'Which blood cell type is most abundant in a normal blood smear?',
    options: ['White blood cells', 'Red blood cells', 'Platelets', 'Lymphocytes'],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: 'What is the primary function of neutrophils?',
    options: ['Oxygen transport', 'Fighting bacterial infections', 'Blood clotting', 'Producing antibodies'],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: 'Which cell type lacks a nucleus?',
    options: ['Lymphocyte', 'Monocyte', 'Red blood cell', 'Neutrophil'],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: 'What causes the patient\'s fatigue and shortness of breath?',
    options: ['Too many white blood cells', 'Insufficient oxygen-carrying capacity', 'Excessive platelets', 'Viral infection'],
    correctAnswer: 1,
  },
];

const ElaboratePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { completePhase, goToPhase, sessionId } = usePhase();
  
  const [draggedItem, setDraggedItem] = useState(null);
  const [matches, setMatches] = useState({});
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (description) => {
    if (draggedItem) {
      setMatches({ ...matches, [description.id]: draggedItem });
      setDraggedItem(null);
    }
  };

  const handleMcqChange = (questionId, answerIndex) => {
    setMcqAnswers({ ...mcqAnswers, [questionId]: answerIndex });
  };

  const calculateMatchingScore = () => {
    let correct = 0;
    matchingItems.forEach((item) => {
      if (matches[item.id]?.id === item.id) {
        correct++;
      }
    });
    return (correct / matchingItems.length) * 100;
  };

  const calculateMcqScore = () => {
    let correct = 0;
    multipleChoiceQuestions.forEach((q) => {
      if (mcqAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return (correct / multipleChoiceQuestions.length) * 100;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const matchingScore = calculateMatchingScore();
      const mcqScore = calculateMcqScore();
      const activityScore = (matchingScore + mcqScore) / 2;

      await pb.collection('student_responses').create({
        sessionId,
        phase: 'elaborate',
        responses: {
          matching: matches,
          multipleChoice: mcqAnswers,
          matchingScore,
          mcqScore,
          activityScore,
        },
      }, { $autoCancel: false });

      setSubmitted(true);
      toast({
        title: 'Responses Submitted!',
        description: `Your activity score: ${activityScore.toFixed(1)}%`,
      });
    } catch (error) {
      console.error('Error submitting responses:', error);
      toast({
        title: 'Submission Failed',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProceed = () => {
    completePhase('elaborate');
    goToPhase('evaluate');
    navigate('/evaluate');
  };

  const allQuestionsAnswered = 
    Object.keys(matches).length === matchingItems.length &&
    Object.keys(mcqAnswers).length === multipleChoiceQuestions.length;

  return (
    <>
      <Helmet>
        <title>Elaborate - Virtual Microscopy Simulation</title>
        <meta name="description" content="Test your knowledge with interactive activities and scenario-based questions" />
      </Helmet>

      <div className="min-h-screen board-bg pb-20">
        <NavigationBar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-12 bg-[var(--case-paper)] p-6 border-2 border-[#2C1810] shadow-md">
            <h1 className="font-bebas-neue text-5xl text-[#2C1810] mb-2 tracking-wide">
              INTERACTIVE LEARNING ACTIVITIES
            </h1>
            <p className="font-roboto text-xl text-[#2C1810]/80 max-w-3xl mx-auto">
              Apply your knowledge through hands-on activities
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8 case-bg p-4 shadow-sm border border-[#2C1810]/20">
            <div className="flex items-center justify-between text-sm text-[#2C1810] mb-2 font-ibm-plex-mono font-bold">
              <span>PROGRESS</span>
              <span>
                {Object.keys(matches).length + Object.keys(mcqAnswers).length} / {matchingItems.length + multipleChoiceQuestions.length} COMPLETED
              </span>
            </div>
            <div className="w-full bg-[#2C1810]/20 rounded-sm h-2">
              <div
                className="bg-[var(--case-red)] h-2 rounded-sm transition-all duration-300"
                style={{
                  width: `${((Object.keys(matches).length + Object.keys(mcqAnswers).length) / (matchingItems.length + multipleChoiceQuestions.length)) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Matching Game */}
          <Card className="shadow-md mb-8 case-bg border-0 rounded-sm relative">
            <CardHeader className="border-b-2 border-[#2C1810]/20 pb-4">
              <CardTitle className="font-montserrat font-bold text-2xl text-[#2C1810] uppercase">Activity 1: Match Cells to Functions</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="font-roboto text-[#2C1810] mb-6 text-lg">
                Drag each cell type to its correct function description
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Draggable Items */}
                <div>
                  <h3 className="font-ibm-plex-mono font-bold text-[#2C1810] mb-4 uppercase">Cell Types</h3>
                  <div className="space-y-3">
                    {matchingItems.map((item) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={() => handleDragStart(item)}
                        className="bg-[#2C1810] text-[#F5E6D3] px-4 py-3 cursor-move hover:bg-[#3E2723] transition-all shadow-sm font-roboto font-bold"
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Drop Zones */}
                <div>
                  <h3 className="font-ibm-plex-mono font-bold text-[#2C1810] mb-4 uppercase">Functions</h3>
                  <div className="space-y-3">
                    {matchingItems.map((item) => (
                      <div
                        key={item.id}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(item)}
                        className={`border-2 border-dashed p-4 min-h-[60px] transition-all font-roboto ${
                          matches[item.id]
                            ? matches[item.id].id === item.id
                              ? 'border-[var(--case-green)] bg-[var(--case-green)]/10'
                              : 'border-[var(--case-red)] bg-[var(--case-red)]/10'
                            : 'border-[#2C1810]/30 bg-white/30 hover:border-[#2C1810] hover:bg-white/50'
                        }`}
                      >
                        <p className="text-sm text-[#2C1810] mb-2">{item.description}</p>
                        {matches[item.id] && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-[#2C1810]">
                              {matches[item.id].name}
                            </span>
                            {matches[item.id].id === item.id && (
                              <CheckCircle2 className="w-5 h-5 text-[var(--case-green)]" />
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Multiple Choice Questions */}
          <Card className="shadow-md mb-8 case-bg border-0 rounded-sm relative">
            <CardHeader className="border-b-2 border-[#2C1810]/20 pb-4">
              <CardTitle className="font-montserrat font-bold text-2xl text-[#2C1810] uppercase">Activity 2: Knowledge Check</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {multipleChoiceQuestions.map((question, qIndex) => (
                  <div key={question.id} className="border border-[#2C1810]/20 p-6 bg-white/30">
                    <p className="font-roboto font-bold text-[#2C1810] mb-4 text-lg">
                      {qIndex + 1}. {question.question}
                    </p>
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => (
                        <label
                          key={optIndex}
                          className={`flex items-center p-3 border cursor-pointer transition-all font-roboto ${
                            mcqAnswers[question.id] === optIndex
                              ? 'border-[var(--case-red)] bg-[var(--case-red)]/5'
                              : 'border-[#2C1810]/20 hover:border-[#2C1810]/50 hover:bg-white/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            checked={mcqAnswers[question.id] === optIndex}
                            onChange={() => handleMcqChange(question.id, optIndex)}
                            className="mr-3 accent-[var(--case-red)]"
                          />
                          <span className="text-[#2C1810]">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit and Proceed Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!submitted ? (
              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered || isSubmitting}
                className="text-lg px-8 py-6 shadow-md hover:shadow-lg transition-all font-ibm-plex-mono font-bold bg-[#2C1810] text-[#F5E6D3] hover:bg-[#3E2723]"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Responses'}
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={handleProceed}
                className="text-lg px-8 py-6 shadow-md hover:shadow-lg transition-all font-ibm-plex-mono font-bold bg-[#D32F2F] text-white hover:bg-[#C62828]"
              >
                Proceed to Evaluate
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ElaboratePage;