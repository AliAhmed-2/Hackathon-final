import { ArrowLeft, User as UserIcon, Mail, Globe, Shield, FileText, LogOut } from 'lucide-react';
import { Button } from './small packets/button';
import { Avatar, AvatarFallback } from './small packets/avatar';
import { Switch } from './small packets/switch';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Language, User } from '../App';

type ProfileProps = {
  user: User;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onLogout: () => void;
  onBack: () => void;
};

export function Profile({ user, language, onLanguageChange, onLogout, onBack }: ProfileProps) {
  const text = {
    en: {
      title: 'Profile & Settings',
      subtitle: 'Manage your account',
      accountInfo: 'Account Information',
      name: 'Name',
      email: 'Email',
      preferences: 'Preferences',
      languageToggle: 'Roman Urdu',
      languageDesc: 'Show content in Roman Urdu',
      about: 'About',
      manageAccount: 'Manage Account',
      privacy: 'Privacy Policy',
      logout: 'Logout'
    },
    ur: {
      title: 'Profile & Settings',
      subtitle: 'Apna account manage karen',
      accountInfo: 'Account Ki Maloomat',
      name: 'Naam',
      email: 'Email',
      preferences: 'Pasand',
      languageToggle: 'Roman Urdu',
      languageDesc: 'Roman Urdu mein content dikhayein',
      about: 'Hmare Bare Mein',
      manageAccount: 'Account Manage Karen',
      privacy: 'Privacy Policy',
      logout: 'Logout Karen'
    }
  };

  const t = text[language];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <Sidebar active="profile" onNavigate={onBack as any} language={language} userName={user.name} onLogout={onLogout} />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 lg:p-8 lg:rounded-none rounded-b-3xl shadow-lg mb-6">
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-green-600 mb-4 lg:hidden"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="mb-2">{t.title}</h1>
            <p className="text-green-100">{t.subtitle}</p>
          </div>
        </div>

      <div className="px-4 lg:px-8 max-w-4xl mx-auto pb-24 lg:pb-8 space-y-6">
        {/* User Info Card */}
        <div className="bg-white rounded-3xl shadow-md p-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-20 h-20 bg-green-500">
              <AvatarFallback className="bg-green-500 text-white text-xl">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-gray-800">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t.name}</p>
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                <UserIcon className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{user.name}</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">{t.email}</p>
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{user.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Card */}
        <div className="bg-white rounded-3xl shadow-md p-6">
          <h3 className="text-gray-800 mb-4">{t.preferences}</h3>

          <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3 flex-1">
              <Globe className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-gray-700">{t.languageToggle}</p>
                <p className="text-sm text-gray-500">{t.languageDesc}</p>
              </div>
            </div>
            <Switch
  checked={language === "ur"}
  onCheckedChange={(checked: boolean) => onLanguageChange(checked ? "ur" : "en")}
  className="data-[state=checked]:bg-green-500"
/>

            
          </div>
        </div>

        {/* About Card */}
        <div className="bg-white rounded-3xl shadow-md p-6 space-y-3">
          <h3 className="text-gray-800 mb-4">{t.about}</h3>

          <button className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-all">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">{t.privacy}</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>

          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <p className="text-sm text-green-800 mb-2">
              <strong>HealthMate - Sehat ka Smart Dost 💚</strong>
            </p>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'Your personal health companion for managing reports and vitals'
                : 'Aapka apna sehat ka saathi jo reports aur vitals manage karta hai'}
            </p>
          </div>
        </div>

        {/* Logout Button - Mobile Only */}
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full lg:hidden rounded-full py-6 border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
        >
          <LogOut className="w-5 h-5 mr-2" />
          {t.logout}
        </Button>
      </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <Navbar active="profile" onNavigate={onBack as any} language={language} />
      </div>
    </div>
  );
}
