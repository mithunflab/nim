
import { useState } from "react";
import { HelpCircle, Plus, Edit, Trash2, Play, BarChart3, Users, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

type QuestionType = "multiple-choice" | "true-false" | "short-answer";

interface QuizQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  slideNumber?: number;
  points: number;
}

interface QuizResult {
  id: string;
  participantName: string;
  score: number;
  totalPoints: number;
  answers: Record<string, string>;
  completedAt: Date;
}

interface PresentationQuizProps {
  presentationId: string;
}

export function PresentationQuiz({ presentationId }: PresentationQuizProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: "1",
      question: "What percentage of companies adopted remote work policies in 2023?",
      type: "multiple-choice",
      options: ["45%", "62%", "78%", "89%"],
      correctAnswer: "78%",
      explanation: "According to the latest industry survey, 78% of companies implemented remote work policies.",
      slideNumber: 3,
      points: 10
    },
    {
      id: "2",
      question: "Remote work increases productivity for most employees.",
      type: "true-false",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Studies show that 65% of employees report increased productivity when working remotely.",
      slideNumber: 7,
      points: 5
    },
    {
      id: "3",
      question: "Name three key benefits of remote work mentioned in the presentation.",
      type: "short-answer",
      correctAnswer: ["flexibility", "productivity", "work-life balance"],
      slideNumber: 12,
      points: 15
    }
  ]);

  const [results, setResults] = useState<QuizResult[]>([
    {
      id: "1",
      participantName: "John Doe",
      score: 25,
      totalPoints: 30,
      answers: {
        "1": "78%",
        "2": "True",
        "3": "flexibility, better productivity, improved work-life balance"
      },
      completedAt: new Date("2024-01-15T14:30:00")
    },
    {
      id: "2",
      participantName: "Jane Smith",
      score: 20,
      totalPoints: 30,
      answers: {
        "1": "62%",
        "2": "True",
        "3": "flexibility, cost savings, productivity"
      },
      completedAt: new Date("2024-01-15T15:00:00")
    }
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    type: "multiple-choice" as QuestionType,
    options: ["", "", "", ""],
    correctAnswer: "",
    explanation: "",
    slideNumber: "",
    points: 10
  });

  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    if (!formData.question.trim()) return;

    const newQuestion: QuizQuestion = {
      id: editingQuestion?.id || Date.now().toString(),
      question: formData.question,
      type: formData.type,
      options: formData.type !== "short-answer" ? formData.options.filter(o => o.trim()) : undefined,
      correctAnswer: formData.correctAnswer,
      explanation: formData.explanation,
      slideNumber: formData.slideNumber ? parseInt(formData.slideNumber) : undefined,
      points: formData.points
    };

    if (editingQuestion) {
      setQuestions(questions.map(q => q.id === editingQuestion.id ? newQuestion : q));
    } else {
      setQuestions([...questions, newQuestion]);
    }

    resetForm();
    setDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      question: "",
      type: "multiple-choice",
      options: ["", "", "", ""],
      correctAnswer: "",
      explanation: "",
      slideNumber: "",
      points: 10
    });
    setEditingQuestion(null);
  };

  const handleEdit = (question: QuizQuestion) => {
    setEditingQuestion(question);
    setFormData({
      question: question.question,
      type: question.type,
      options: question.options || ["", "", "", ""],
      correctAnswer: Array.isArray(question.correctAnswer) ? question.correctAnswer.join(", ") : question.correctAnswer,
      explanation: question.explanation || "",
      slideNumber: question.slideNumber?.toString() || "",
      points: question.points
    });
    setDialogOpen(true);
  };

  const handleDelete = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const startQuiz = () => {
    setIsQuizActive(true);
    setCurrentQuestion(0);
    setUserAnswers({});
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    let score = 0;

    questions.forEach(question => {
      const userAnswer = userAnswers[question.id];
      if (userAnswer === question.correctAnswer) {
        score += question.points;
      }
    });

    const newResult: QuizResult = {
      id: Date.now().toString(),
      participantName: "Current User",
      score,
      totalPoints,
      answers: userAnswers,
      completedAt: new Date()
    };

    setResults([...results, newResult]);
    setIsQuizActive(false);
  };

  const averageScore = results.length > 0 
    ? results.reduce((sum, r) => sum + (r.score / r.totalPoints) * 100, 0) / results.length 
    : 0;

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Interactive Quiz
              </CardTitle>
              <CardDescription>
                Create and manage quizzes for your presentation
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {questions.length > 0 && (
                <Button variant="outline" onClick={startQuiz}>
                  <Play className="h-4 w-4 mr-2" />
                  Start Quiz
                </Button>
              )}
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>
                      {editingQuestion ? "Edit Question" : "Add New Question"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Question</label>
                      <Textarea
                        value={formData.question}
                        onChange={(e) => setFormData({...formData, question: e.target.value})}
                        placeholder="Enter your question"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Type</label>
                        <Select value={formData.type} onValueChange={(value: QuestionType) => setFormData({...formData, type: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                            <SelectItem value="true-false">True/False</SelectItem>
                            <SelectItem value="short-answer">Short Answer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Points</label>
                        <Input
                          type="number"
                          value={formData.points}
                          onChange={(e) => setFormData({...formData, points: parseInt(e.target.value) || 0})}
                          min="1"
                          max="100"
                        />
                      </div>
                    </div>

                    {formData.type === "multiple-choice" && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">Options</label>
                        <div className="space-y-2">
                          {formData.options.map((option, index) => (
                            <Input
                              key={index}
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...formData.options];
                                newOptions[index] = e.target.value;
                                setFormData({...formData, options: newOptions});
                              }}
                              placeholder={`Option ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.type === "true-false" && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">Correct Answer</label>
                        <Select value={formData.correctAnswer} onValueChange={(value) => setFormData({...formData, correctAnswer: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="True">True</SelectItem>
                            <SelectItem value="False">False</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {formData.type === "multiple-choice" && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">Correct Answer</label>
                        <Select value={formData.correctAnswer} onValueChange={(value) => setFormData({...formData, correctAnswer: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {formData.options.filter(o => o.trim()).map((option, index) => (
                              <SelectItem key={index} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {formData.type === "short-answer" && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">Correct Answer (keywords)</label>
                        <Input
                          value={formData.correctAnswer}
                          onChange={(e) => setFormData({...formData, correctAnswer: e.target.value})}
                          placeholder="Enter keywords separated by commas"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Slide Number</label>
                        <Input
                          type="number"
                          value={formData.slideNumber}
                          onChange={(e) => setFormData({...formData, slideNumber: e.target.value})}
                          placeholder="Optional"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Explanation</label>
                        <Textarea
                          value={formData.explanation}
                          onChange={(e) => setFormData({...formData, explanation: e.target.value})}
                          placeholder="Optional explanation"
                          rows={2}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit}>
                        {editingQuestion ? "Update Question" : "Add Question"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!isQuizActive ? (
            <div className="space-y-6">
              {/* Quiz Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Total Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{questions.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Total Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalPoints}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Participants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{results.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Average Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{averageScore.toFixed(1)}%</div>
                  </CardContent>
                </Card>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Questions</h3>
                {questions.map((question, index) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">Q{index + 1}.</span>
                          <Badge variant="outline">{question.type}</Badge>
                          <Badge variant="secondary">{question.points} pts</Badge>
                          {question.slideNumber && (
                            <Badge variant="outline">Slide {question.slideNumber}</Badge>
                          )}
                        </div>
                        <p className="text-sm mb-2">{question.question}</p>
                        {question.options && (
                          <div className="text-sm text-muted-foreground">
                            Options: {question.options.join(", ")}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(question)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(question.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Results */}
              {results.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recent Results</h3>
                  <div className="space-y-2">
                    {results.map((result) => (
                      <div key={result.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <span className="font-medium">{result.participantName}</span>
                          <div className="text-sm text-muted-foreground">
                            {result.completedAt.toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-medium">{result.score}/{result.totalPoints}</div>
                            <div className="text-sm text-muted-foreground">
                              {Math.round((result.score / result.totalPoints) * 100)}%
                            </div>
                          </div>
                          <Progress 
                            value={(result.score / result.totalPoints) * 100} 
                            className="w-20"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Interface */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Question {currentQuestion + 1} of {questions.length}
                </h3>
                <Progress value={((currentQuestion + 1) / questions.length) * 100} className="w-32" />
              </div>

              <div className="space-y-4">
                <div className="p-6 border rounded-lg">
                  <p className="text-lg mb-4">{questions[currentQuestion].question}</p>
                  
                  {questions[currentQuestion].type === "multiple-choice" && (
                    <div className="space-y-2">
                      {questions[currentQuestion].options?.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswer(questions[currentQuestion].id, option)}
                          className={`w-full p-3 text-left border rounded-lg transition-colors ${
                            userAnswers[questions[currentQuestion].id] === option
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}

                  {questions[currentQuestion].type === "true-false" && (
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleAnswer(questions[currentQuestion].id, "True")}
                        className={`flex-1 p-3 border rounded-lg transition-colors ${
                          userAnswers[questions[currentQuestion].id] === "True"
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        True
                      </button>
                      <button
                        onClick={() => handleAnswer(questions[currentQuestion].id, "False")}
                        className={`flex-1 p-3 border rounded-lg transition-colors ${
                          userAnswers[questions[currentQuestion].id] === "False"
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        False
                      </button>
                    </div>
                  )}

                  {questions[currentQuestion].type === "short-answer" && (
                    <Textarea
                      value={userAnswers[questions[currentQuestion].id] || ""}
                      onChange={(e) => handleAnswer(questions[currentQuestion].id, e.target.value)}
                      placeholder="Enter your answer"
                      rows={4}
                    />
                  )}
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={nextQuestion}
                    disabled={!userAnswers[questions[currentQuestion].id]}
                  >
                    {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
