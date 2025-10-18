import { FileText, Activity, Clock, Upload, Home, Heart, User, TrendingUp, Calendar } from 'lucide-react';
import { Button } from './small packets/button';
import { Card } from './small packets/card';
import { ReportCard } from './ReportCard';
import { VitalsCard } from './VitalsCard';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Language, Report, Vital, User as UserType } from '../App';

type DashboardProps = {
  user: UserType;
  reports: Report[];
  vitals: Vital[];
  onNavigate: (screen: 'dashboard' | 'upload' | 'vitals' | 'timeline' | 'profile') => void;
  onViewReport: (report: Report) => void;
  language: Language;
  onLogout?: () => void;
};

export function Dashboard({ user, reports, vitals, onNavigate, onViewReport, language, onLogout }: DashboardProps) {
  const latestVital = vitals[0];

  const text = {
    en: {
      greeting: `Hi, ${user.name} 👋`,
      subtitle: 'Your health companion is ready',
      myReports: 'My Reports',
      myVitals: 'My Vitals',
      uploadNew: 'Upload New',
      addReading: 'Add Reading',
      viewAll: 'View All',
      viewTimeline: 'View Timeline',
      noReports: 'No reports yet',
      uploadFirst: 'Upload your first medical report',
      quickStats: 'Quick Stats',
      totalReports: 'Total Reports',
      recentVitals: 'Recent Vitals',
      bp: 'Blood Pressure',
      sugar: 'Sugar',
      weight: 'Weight',
      lastUpdated: 'Last updated'
    },
    ur: {
      greeting: `Assalam o Alaikum, ${user.name} 👋`,
      subtitle: 'Aapka sehat ka dost tayar hai',
      myReports: 'Meri Reports',
      myVitals: 'Meri Vitals',
      uploadNew: 'Naya Upload Karen',
      addReading: 'Reading Add Karen',
      viewAll: 'Sab Dekhen',
      viewTimeline: 'Timeline Dekhen',
      noReports: 'Koi report nahi',
      uploadFirst: 'Apni pehli medical report upload karen',
      quickStats: 'Quick Stats',
      totalReports: 'Total Reports',
      recentVitals: 'Recent Vitals',
      bp: 'Blood Pressure',
      sugar: 'Sugar',
      weight: 'Weight',
      lastUpdated: 'Aakhri update'
    }
  };

  const t = text[language];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <Sidebar active="home" onNavigate={onNavigate} language={language} userName={user.name} onLogout={onLogout} />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 lg:p-8 lg:rounded-none rounded-b-3xl shadow-lg">
          <div className="max-w-7xl mx-auto">
            <h1 className="mb-2">{t.greeting}</h1>
            <p className="text-green-100">{t.subtitle}</p>
          </div>
        </div>

        <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto pb-24 lg:pb-8">
          {/* Quick Stats - Desktop Only */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            <Card className="rounded-3xl shadow-md border-0 p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 mb-1">{t.totalReports}</p>
                  <h2 className="text-white">{reports.length}</h2>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <FileText className="w-7 h-7" />
                </div>
              </div>
            </Card>

            <Card className="rounded-3xl shadow-md border-0 p-6 bg-gradient-to-br from-red-500 to-red-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 mb-1">{t.recentVitals}</p>
                  <h2 className="text-white">{vitals.length}</h2>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Heart className="w-7 h-7" />
                </div>
              </div>
            </Card>

            <Card className="rounded-3xl shadow-md border-0 p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 mb-1">{language === 'en' ? 'This Month' : 'Is Mahine'}</p>
                  <h2 className="text-white">{reports.length + vitals.length}</h2>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Calendar className="w-7 h-7" />
                </div>
              </div>
            </Card>
          </div>

          {/* Cards Grid - Responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* My Reports Card */}
            <Card className="rounded-3xl shadow-md border-0 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <h2 className="text-gray-800">{t.myReports}</h2>
                  </div>
                  <Button
                    onClick={() => onNavigate('upload')}
                    className="bg-green-500 hover:bg-green-600 text-white rounded-full"
                    size="sm"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">{t.uploadNew}</span>
                    <span className="sm:hidden">Upload</span>
                  </Button>
                </div>

                <div className="space-y-3">
                  {reports.length > 0 ? (
                    <>
                      {reports.slice(0, 3).map((report) => (
                        <ReportCard
                          key={report.id}
                          report={report}
                          onClick={() => onViewReport(report)}
                          language={language}
                        />
                      ))}
                      {reports.length > 3 && (
                        <Button
                          onClick={() => onNavigate('timeline')}
                          variant="ghost"
                          className="w-full text-green-600 hover:text-green-700 hover:bg-green-50 rounded-xl"
                        >
                          {t.viewAll}
                        </Button>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>{t.noReports}</p>
                      <p className="text-sm">{t.uploadFirst}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* My Vitals Card */}
            <Card className="rounded-3xl shadow-md border-0 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-red-500" />
                    </div>
                    <h2 className="text-gray-800">{t.myVitals}</h2>
                  </div>
                  <Button
                    onClick={() => onNavigate('vitals')}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full"
                    size="sm"
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">{t.addReading}</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                </div>

                {latestVital ? (
                  <VitalsCard vital={latestVital} language={language} />
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>
                      {language === 'en' ? 'No vitals recorded yet' : 'Abhi tak koi vitals nahi'}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Timeline CTA - Desktop */}
          <Card className="hidden lg:block rounded-3xl shadow-md border-0 overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <div className="p-8 flex items-center justify-between">
              <div>
                <h2 className="text-white mb-2">{t.viewTimeline}</h2>
                <p className="text-purple-100">
                  {language === 'en' 
                    ? 'See your complete health journey in one place' 
                    : 'Apni puri sehat ka safar ek jagah dekhen'}
                </p>
              </div>
              <Button
                onClick={() => onNavigate('timeline')}
                className="bg-white text-purple-600 hover:bg-purple-50 rounded-full shadow-lg"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                {language === 'en' ? 'View Timeline' : 'Timeline Dekhen'}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <Navbar active="home" onNavigate={onNavigate} language={language} />
      </div>
    </div>
  );
}
