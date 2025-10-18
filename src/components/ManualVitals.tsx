import { useState } from 'react';
import { ArrowLeft, Activity, Droplet, Weight, Save } from 'lucide-react';
import { Button } from './small packets/button';
import { Input } from './small packets/input';
import { Label } from './small packets/label';
import { Textarea } from './small packets/textarea';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Language, Vital } from '../App';
import { Toaster, toast } from "sonner";


type ManualVitalsProps = {
  onSave: (vital: Omit<Vital, 'id'>) => void;
  onBack: () => void;
  vitals: Vital[];
  language: Language;
  userName?: string;
  onLogout?: () => void;
};

export function ManualVitals({ onSave, onBack, vitals, language, userName, onLogout }: ManualVitalsProps) {
  const [bp, setBp] = useState('');
  const [sugar, setSugar] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!bp && !sugar && !weight) {
      toast.error(language === 'en' ? 'Please enter at least one vital' : 'Kam se kam ek vital enter karen');
      return;
    }

    const vital: Omit<Vital, 'id'> = {
      date: new Date().toISOString().split('T')[0],
      bp: bp || undefined,
      sugar: sugar ? parseFloat(sugar) : undefined,
      weight: weight ? parseFloat(weight) : undefined,
      notes: notes || undefined
    };

    onSave(vital);
    toast.success(language === 'en' ? 'Vitals saved successfully!' : 'Vitals save ho gayi!');
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const text = {
    en: {
      title: 'Manual Vitals',
      subtitle: 'Record your health readings',
      bp: 'Blood Pressure',
      bpPlaceholder: 'e.g., 120/80',
      sugar: 'Sugar (mg/dL)',
      sugarPlaceholder: 'e.g., 95',
      weight: 'Weight (kg)',
      weightPlaceholder: 'e.g., 72',
      notes: 'Notes (Optional)',
      notesPlaceholder: 'How are you feeling today?',
      saveReading: 'Save Reading',
      history: 'Recent History',
      noHistory: 'No vitals recorded yet'
    },
    ur: {
      title: 'Manual Vitals',
      subtitle: 'Apni sehat ke readings record karen',
      bp: 'Blood Pressure',
      bpPlaceholder: 'Misal: 120/80',
      sugar: 'Sugar (mg/dL)',
      sugarPlaceholder: 'Misal: 95',
      weight: 'Weight (kg)',
      weightPlaceholder: 'Misal: 72',
      notes: 'Notes (Ikhtiari)',
      notesPlaceholder: 'Aaj kaise mehsoos kar rahe hain?',
      saveReading: 'Reading Save Karen',
      history: 'Haal Ki History',
      noHistory: 'Abhi tak koi vitals nahi'
    }
  };

  const t = text[language];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <Sidebar active="vitals" onNavigate={onBack as any} language={language} userName={userName} onLogout={onLogout} />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 lg:p-8 lg:rounded-none rounded-b-3xl shadow-lg mb-6">
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-red-600 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="mb-2">{t.title}</h1>
            <p className="text-red-100">{t.subtitle}</p>
          </div>
        </div>

      <div className="px-4 lg:px-8 max-w-4xl mx-auto pb-24 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-md p-6 space-y-5 lg:h-fit">
          {/* Blood Pressure */}
          <div>
            <Label htmlFor="bp" className="text-gray-700 flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-red-500" />
              {t.bp}
            </Label>
            <Input
              id="bp"
              type="text"
              placeholder={t.bpPlaceholder}
              value={bp}
              onChange={(e) => setBp(e.target.value)}
              className="rounded-xl border-gray-200 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          {/* Sugar */}
          <div>
            <Label htmlFor="sugar" className="text-gray-700 flex items-center gap-2 mb-2">
              <Droplet className="w-4 h-4 text-blue-500" />
              {t.sugar}
            </Label>
            <Input
              id="sugar"
              type="number"
              placeholder={t.sugarPlaceholder}
              value={sugar}
              onChange={(e) => setSugar(e.target.value)}
              className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Weight */}
          <div>
            <Label htmlFor="weight" className="text-gray-700 flex items-center gap-2 mb-2">
              <Weight className="w-4 h-4 text-purple-500" />
              {t.weight}
            </Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              placeholder={t.weightPlaceholder}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-gray-700 mb-2 block">
              {t.notes}
            </Label>
            <Textarea
              id="notes"
              placeholder={t.notesPlaceholder}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 min-h-24"
            />
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full py-6 shadow-lg"
          >
            <Save className="w-5 h-5 mr-2" />
            {t.saveReading}
          </Button>
        </div>

        {/* History */}
        <div className="bg-white rounded-3xl shadow-md p-6">
          <h2 className="text-gray-800 mb-4">{t.history}</h2>
          
          {vitals.length > 0 ? (
            <div className="space-y-3">
              {vitals.slice(0, 5).map((vital) => (
                <div key={vital.id} className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-sm text-gray-500 mb-3">{formatDate(vital.date)}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {vital.bp && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500">BP</p>
                        <p className="text-red-600">{vital.bp}</p>
                      </div>
                    )}
                    {vital.sugar && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Sugar</p>
                        <p className="text-blue-600">{vital.sugar}</p>
                      </div>
                    )}
                    {vital.weight && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Weight</p>
                        <p className="text-purple-600">{vital.weight}</p>
                      </div>
                    )}
                  </div>
                  {vital.notes && (
                    <p className="text-sm text-gray-600 mt-3 italic">"{vital.notes}"</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>{t.noHistory}</p>
            </div>
          )}
        </div>
        </div>
      </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <Navbar active="vitals" onNavigate={onBack as any} language={language} />
      </div>
    </div>
  );
}
