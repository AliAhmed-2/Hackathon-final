import { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { UploadReport } from './components/UploadReport';
import { AISummary } from './components/AISummary';
import { ManualVitals } from './components/ManualVitals';
import { Timeline } from './components/Timeline';
import { Profile } from './components/Profile';
import { Toaster } from './components/small packets/sonner';

export type Language = 'en' | 'ur';

export type Report = {
  id: string;
  name: string;
  type: string;
  date: string;
  thumbnail?: string;
  summary?: {
    keyFindings: string[];
    questions: string[];
    foodTips: string[];
  };
};

export type Vital = {
  id: string;
  date: string;
  bp?: string;
  sugar?: number;
  weight?: number;
  notes?: string;
};

export type User = {
  name: string;
  email: string;
};

export default function App() {
  const [screen, setScreen] = useState<'onboarding' | 'login' | 'dashboard' | 'upload' | 'summary' | 'vitals' | 'timeline' | 'profile'>('onboarding');
  const [language, setLanguage] = useState<Language>('en');
  const [user, setUser] = useState<User | null>(null);
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      name: 'Blood Test Report.pdf',
      type: 'Blood Test',
      date: '2025-10-12',
      summary: {
        keyFindings: ['Hemoglobin: 13.2 g/dL (Normal)', 'Blood Sugar: 115 mg/dL (Slightly High)', 'Cholesterol: 180 mg/dL (Normal)'],
        questions: ['Should I be concerned about the sugar level?', 'Do I need to change my diet?', 'When should I retest?'],
        foodTips: ['Reduce sugar intake', 'Drink more water', 'Add more vegetables to meals', 'Avoid processed foods']
      }
    }
  ]);
  const [vitals, setVitals] = useState<Vital[]>([
    {
      id: '1',
      date: '2025-10-15',
      bp: '120/80',
      sugar: 95,
      weight: 72,
      notes: 'Feeling good'
    },
    {
      id: '2',
      date: '2025-10-10',
      bp: '125/82',
      sugar: 105,
      weight: 73
    }
  ]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleLogin = (email: string, password: string, name?: string) => {
    setUser({ name: name || 'Ali', email });
    setScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setScreen('onboarding');
  };

  const handleUploadReport = (file: File, type: string) => {
    const newReport: Report = {
      id: Date.now().toString(),
      name: file.name,
      type,
      date: new Date().toISOString().split('T')[0],
      summary: {
        keyFindings: ['Analysis in progress...'],
        questions: [],
        foodTips: []
      }
    };
    
    // Simulate AI analysis
    setTimeout(() => {
      newReport.summary = {
        keyFindings: ['All values within normal range', 'No immediate concerns detected', 'Healthy indicators overall'],
        questions: ['What lifestyle changes can improve my health?', 'How often should I get tested?'],
        foodTips: ['Maintain balanced diet', 'Stay hydrated', 'Regular exercise recommended']
      };
      setReports([newReport, ...reports]);
      setSelectedReport(newReport);
      setScreen('summary');
    }, 2000);
  };

  const handleAddVital = (vital: Omit<Vital, 'id'>) => {
    const newVital: Vital = {
      ...vital,
      id: Date.now().toString()
    };
    setVitals([newVital, ...vitals]);
    setScreen('dashboard');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'onboarding':
        return <Onboarding onContinue={() => setScreen('login')} language={language} />;
      case 'login':
        return <Login onLogin={handleLogin} language={language} />;
      case 'dashboard':
        return (
          <Dashboard
            user={user!}
            reports={reports}
            vitals={vitals}
            onNavigate={setScreen}
            onViewReport={(report) => {
              setSelectedReport(report);
              setScreen('summary');
            }}
            language={language}
            onLogout={handleLogout}
          />
        );
      case 'upload':
        return (
          <UploadReport
            onUpload={handleUploadReport}
            onBack={() => setScreen('dashboard')}
            language={language}
            userName={user?.name}
            onLogout={handleLogout}
          />
        );
      case 'summary':
        return (
          <AISummary
            report={selectedReport!}
            onBack={() => setScreen('dashboard')}
            language={language}
          />
        );
      case 'vitals':
        return (
          <ManualVitals
            onSave={handleAddVital}
            onBack={() => setScreen('dashboard')}
            vitals={vitals}
            language={language}
            userName={user?.name}
            onLogout={handleLogout}
          />
        );
      case 'timeline':
        return (
          <Timeline
            reports={reports}
            vitals={vitals}
            onNavigate={setScreen}
            onViewReport={(report) => {
              setSelectedReport(report);
              setScreen('summary');
            }}
            language={language}
            userName={user?.name}
            onLogout={handleLogout}
          />
        );
      case 'profile':
        return (
          <Profile
            user={user!}
            language={language}
            onLanguageChange={setLanguage}
            onLogout={handleLogout}
            onBack={() => setScreen('dashboard')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}
      <Toaster />
    </div>
  );
}
