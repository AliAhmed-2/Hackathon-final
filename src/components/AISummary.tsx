import { ArrowLeft, Brain, HelpCircle, Apple, AlertCircle } from 'lucide-react';
import { Button } from './small packets/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './small packets/tabs';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Language, Report } from '../App';

type AISummaryProps = {
  report: Report;
  onBack: () => void;
  language: Language;
  userName?: string;
  onLogout?: () => void;
};

export function AISummary({ report, onBack, language, userName, onLogout }: AISummaryProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const text = {
    en: {
      summary: 'AI Summary',
      englishTab: 'English',
      urduTab: 'Roman Urdu',
      keyFindings: 'Key Findings',
      questions: 'Questions for Doctor',
      foodTips: 'Food Tips & Home Remedies',
      disclaimer: 'AI is for understanding only — not for medical advice.',
      normal: 'Normal',
      attention: 'Needs Attention'
    },
    ur: {
      summary: 'AI Summary',
      englishTab: 'English',
      urduTab: 'Roman Urdu',
      keyFindings: 'Ahm Baten',
      questions: 'Doctor Se Puchne Ke Sawal',
      foodTips: 'Khane Ki Tips & Gharelu Totke',
      disclaimer: 'Yeh AI sirf samajhne ke liye hai, ilaaj ke liye nahi.',
      normal: 'Normal',
      attention: 'Tawajju Chahiye'
    }
  };

  const t = text[language];

  // Translate content based on language
  const translateFindings = (findings: string[]) => {
    if (language === 'ur') {
      return findings.map(f => {
        if (f.includes('Normal')) return f.replace('Normal', 'Normal hai');
        if (f.includes('Slightly High')) return f.replace('Slightly High', 'Thoda Zyada hai');
        return f;
      });
    }
    return findings;
  };

  const translateQuestions = (questions: string[]) => {
    if (language === 'ur') {
      const urduQuestions = [
        'Kya mujhe sugar level ki fikar karni chahiye?',
        'Kya mujhe apni diet badalni chahiye?',
        'Mujhe dubara test kab karwana chahiye?'
      ];
      return urduQuestions.slice(0, questions.length);
    }
    return questions;
  };

  const translateTips = (tips: string[]) => {
    if (language === 'ur') {
      const urduTips = [
        'Cheeni kam khayein',
        'Zyada pani piyein',
        'Sabziyan zyada khayein',
        'Processed khana avoid karein'
      ];
      return urduTips.slice(0, tips.length);
    }
    return tips;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-b from-green-500 to-green-600 text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={onBack}
            variant="ghost"
            size="icon"
            className="rounded-full text-white hover:bg-green-600 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="mb-2">{report.name}</h1>
          <p className="text-green-100">{formatDate(report.date)}</p>
        </div>
      </div>

      <div className="px-6 max-w-2xl mx-auto">
        {/* Language Tabs */}
        <Tabs defaultValue="en" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white rounded-2xl p-1 shadow-md">
            <TabsTrigger value="en" className="rounded-xl">
              {t.englishTab}
            </TabsTrigger>
            <TabsTrigger value="ur" className="rounded-xl">
              {t.urduTab}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="en" className="space-y-6">
            {/* Key Findings */}
            <div className="bg-white rounded-3xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-gray-800">{t.keyFindings}</h2>
              </div>
              <ul className="space-y-3">
                {report.summary?.keyFindings.map((finding, index) => (
                  <li key={index} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      finding.toLowerCase().includes('normal') ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                    <span className="text-gray-700">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Questions for Doctor */}
            {report.summary?.questions && report.summary.questions.length > 0 && (
              <div className="bg-white rounded-3xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-gray-800">{t.questions}</h2>
                </div>
                <ul className="space-y-3">
                  {report.summary.questions.map((question, index) => (
                    <li key={index} className="flex items-start gap-3 bg-blue-50 rounded-xl p-3">
                      <span className="text-blue-600 flex-shrink-0">Q{index + 1}.</span>
                      <span className="text-gray-700">{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Food Tips */}
            {report.summary?.foodTips && report.summary.foodTips.length > 0 && (
              <div className="bg-white rounded-3xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Apple className="w-5 h-5 text-orange-600" />
                  </div>
                  <h2 className="text-gray-800">{t.foodTips}</h2>
                </div>
                <ul className="space-y-3">
                  {report.summary.foodTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3 bg-orange-50 rounded-xl p-3">
                      <span className="text-orange-500 flex-shrink-0">•</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>

          <TabsContent value="ur" className="space-y-6">
            {/* Key Findings - Urdu */}
            <div className="bg-white rounded-3xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-gray-800">{t.keyFindings}</h2>
              </div>
              <ul className="space-y-3">
                {translateFindings(report.summary?.keyFindings || []).map((finding, index) => (
                  <li key={index} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      finding.toLowerCase().includes('normal') ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                    <span className="text-gray-700">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Questions for Doctor - Urdu */}
            {report.summary?.questions && report.summary.questions.length > 0 && (
              <div className="bg-white rounded-3xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-gray-800">{t.questions}</h2>
                </div>
                <ul className="space-y-3">
                  {translateQuestions(report.summary.questions).map((question, index) => (
                    <li key={index} className="flex items-start gap-3 bg-blue-50 rounded-xl p-3">
                      <span className="text-blue-600 flex-shrink-0">S{index + 1}.</span>
                      <span className="text-gray-700">{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Food Tips - Urdu */}
            {report.summary?.foodTips && report.summary.foodTips.length > 0 && (
              <div className="bg-white rounded-3xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Apple className="w-5 h-5 text-orange-600" />
                  </div>
                  <h2 className="text-gray-800">{t.foodTips}</h2>
                </div>
                <ul className="space-y-3">
                  {translateTips(report.summary.foodTips).map((tip, index) => (
                    <li key={index} className="flex items-start gap-3 bg-orange-50 rounded-xl p-3">
                      <span className="text-orange-500 flex-shrink-0">•</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm text-yellow-800">{t.disclaimer}</p>
              {language === 'en' && (
                <p className="text-sm text-yellow-700 italic">
                  Yeh AI sirf samajhne ke liye hai, ilaaj ke liye nahi.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
