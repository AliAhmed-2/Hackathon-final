import { Home, Upload, Heart, User } from 'lucide-react';
import { Language } from '../App';

type NavbarProps = {
  active: 'home' | 'upload' | 'vitals' | 'profile';
  onNavigate: (screen: 'dashboard' | 'upload' | 'vitals' | 'timeline' | 'profile') => void;
  language: Language;
};

export function Navbar({ active, onNavigate, language }: NavbarProps) {
  const text = {
    en: {
      home: 'Home',
      upload: 'Upload',
      vitals: 'Vitals',
      profile: 'Profile'
    },
    ur: {
      home: 'Home',
      upload: 'Upload',
      vitals: 'Vitals',
      profile: 'Profile'
    }
  };

  const t = text[language];

  const navItems = [
    { id: 'home' as const, icon: Home, label: t.home, screen: 'dashboard' as const },
    { id: 'upload' as const, icon: Upload, label: t.upload, screen: 'upload' as const },
    { id: 'vitals' as const, icon: Heart, label: t.vitals, screen: 'vitals' as const },
    { id: 'profile' as const, icon: User, label: t.profile, screen: 'profile' as const }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-2xl mx-auto px-6 py-3">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.screen)}
                className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${
                  isActive
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'fill-green-100' : ''}`} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
