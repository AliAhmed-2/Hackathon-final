import { useState } from 'react';
import { Activity } from 'lucide-react';
import { Button } from './small packets/button';
import { Input } from './small packets/input';
import { Label } from './small packets/label';
import { Language } from '../App';

type LoginProps = {
  onLogin: (email: string, password: string, name?: string) => void;
  language: Language;
};

export function Login({ onLogin, language }: LoginProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password, isRegister ? name : undefined);
  };

  const text = {
    en: {
      title: isRegister ? 'Create Account' : 'Welcome Back',
      subtitle: isRegister ? 'Apna account banaen aur sehat manage karen.' : 'Login to continue managing your health',
      name: 'Full Name',
      namePlaceholder: 'Enter your name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      password: 'Password',
      passwordPlaceholder: 'Enter password',
      submit: isRegister ? 'Create Account' : 'Login',
      toggle: isRegister ? 'Already have an account?' : 'New here?',
      toggleLink: isRegister ? 'Login' : 'Register'
    },
    ur: {
      title: isRegister ? 'Account Banaen' : 'Khush Aamdeed',
      subtitle: isRegister ? 'Apna account banaen aur sehat manage karen.' : 'Apni sehat manage karne ke liye login karen',
      name: 'Pura Naam',
      namePlaceholder: 'Apna naam likhen',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      password: 'Password',
      passwordPlaceholder: 'Password likhen',
      submit: isRegister ? 'Account Banaen' : 'Login Karen',
      toggle: isRegister ? 'Pehle se account hai?' : 'Naye hain?',
      toggleLink: isRegister ? 'Login Karen' : 'Register Karen'
    }
  };

  const t = text[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-green-600 mb-1">HealthMate</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <h2 className="text-gray-800 mb-2">{t.title}</h2>
          <p className="text-gray-500 mb-6">{t.subtitle}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <Label htmlFor="name" className="text-gray-700">{t.name}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-gray-700">{t.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700">{t.password}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full py-6 shadow-lg mt-6"
            >
              {t.submit}
            </Button>
          </form>
        </div>

        {/* Toggle Login/Register */}
        <div className="text-center">
          <span className="text-gray-600">{t.toggle} </span>
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-green-600"
          >
            {t.toggleLink}
          </button>
        </div>
      </div>
    </div>
  );
}
