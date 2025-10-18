import { ArrowLeft, FileText, Activity } from 'lucide-react';
import { Button } from './small packets/button';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { TimelineItem } from './TimelineItem';
import { Language, Report, Vital } from '../App';

type TimelineProps = {
  reports: Report[];
  vitals: Vital[];
  onNavigate: (screen: 'dashboard' | 'upload' | 'vitals' | 'timeline' | 'profile') => void;
  onViewReport: (report: Report) => void;
  language: Language;
  userName?: string;
  onLogout?: () => void;
};

type TimelineEntry = {
  id: string;
  date: string;
  type: 'report' | 'vital';
  data: Report | Vital;
};

export function Timeline({ reports, vitals, onNavigate, onViewReport, language, userName, onLogout }: TimelineProps) {
  // Combine and sort timeline entries
  const timelineEntries: TimelineEntry[] = [
    ...reports.map(r => ({ id: r.id, date: r.date, type: 'report' as const, data: r })),
    ...vitals.map(v => ({ id: v.id, date: v.date, type: 'vital' as const, data: v }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const text = {
    en: {
      title: 'Health Timeline',
      subtitle: 'Your complete health history',
      noEntries: 'No timeline entries yet',
      startTracking: 'Start tracking your health today'
    },
    ur: {
      title: 'Sehat Ka Timeline',
      subtitle: 'Aapki puri sehat ki history',
      noEntries: 'Abhi tak koi entry nahi',
      startTracking: 'Aaj hi apni sehat track karna shuru karen'
    }
  };

  const t = text[language];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <Sidebar active="timeline" onNavigate={onNavigate} language={language} userName={userName} onLogout={onLogout} />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 lg:p-8 lg:rounded-none rounded-b-3xl shadow-lg mb-6">
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={() => onNavigate('dashboard')}
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-green-600 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="mb-2">{t.title}</h1>
            <p className="text-green-100">{t.subtitle}</p>
          </div>
        </div>

      <div className="px-4 lg:px-8 max-w-4xl mx-auto pb-24 lg:pb-8">
        {timelineEntries.length > 0 ? (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
            
            {/* Timeline entries */}
            <div className="space-y-6">
              {timelineEntries.map((entry) => (
                <TimelineItem
                  key={entry.id}
                  entry={entry}
                  onViewReport={onViewReport}
                  language={language}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-2">{t.noEntries}</p>
            <p className="text-sm text-gray-400">{t.startTracking}</p>
          </div>
        )}
      </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <Navbar active="home" onNavigate={onNavigate} language={language} />
      </div>
    </div>
  );
}
