import { Home, Upload, Heart, User, Activity, LogOut } from 'lucide-react';
import { Language } from '../App';
import { Avatar, AvatarFallback } from './small packets/avatar';

type SidebarProps = {
  active: 'home' | 'upload' | 'vitals' | 'timeline' | 'profile';
  onNavigate: (screen: 'dashboard' | 'upload' | 'vitals' | 'timeline' | 'profile') => void;
  language: Language;
  userName?: string;
  onLogout?: () => void;
};

export function Sidebar({ active, onNavigate, language, userName, onLogout }: SidebarProps) {
  const text = {
    en: {
      home: 'Home',
      upload: 'Upload',
      vitals: 'Vitals',
      timeline: 'Timeline',
      profile: 'Profile',
      logout: 'Logout'
    },
    ur: {
      home: 'Home',
      upload: 'Upload',
      vitals: 'Vitals',
      timeline: 'Timeline',
      profile: 'Profile',
      logout: 'Logout'
    }
  };

  const t = text[language];

  const navItems = [
    { id: 'home' as const, icon: Home, label: t.home, screen: 'dashboard' as const },
    { id: 'upload' as const, icon: Upload, label: t.upload, screen: 'upload' as const },
    { id: 'vitals' as const, icon: Heart, label: t.vitals, screen: 'vitals' as const },
    { id: 'timeline' as const, icon: Activity, label: t.timeline, screen: 'timeline' as const },
    { id: 'profile' as const, icon: User, label: t.profile, screen: 'profile' as const }
  ];

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-white lg:border-r lg:border-gray-200">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-200">
          <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-md">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-green-600">HealthMate</p>
            <p className="text-xs text-gray-500">Sehat ka Smart Dost</p>
          </div>
        </div>

        {/* User Info */}
        {userName && (
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3 bg-green-50 rounded-2xl p-3">
              <Avatar className="w-10 h-10 bg-green-500">
                <AvatarFallback className="bg-green-500 text-white">
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 truncate">{userName}</p>
                <p className="text-xs text-gray-500">
                  {language === 'en' ? 'Welcome back!' : 'Khush Aamdeed!'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.screen)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? '' : 'opacity-70'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        {onLogout && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>{t.logout}</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
