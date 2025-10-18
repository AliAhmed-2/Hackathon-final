import { Activity, Droplet, Weight } from 'lucide-react';
import { Language, Vital } from '../App';

type VitalsCardProps = {
  vital: Vital;
  language: Language;
};

export function VitalsCard({ vital, language }: VitalsCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const text = {
    en: {
      bp: 'Blood Pressure',
      sugar: 'Sugar',
      weight: 'Weight',
      lastUpdated: 'Last updated'
    },
    ur: {
      bp: 'Blood Pressure',
      sugar: 'Sugar',
      weight: 'Weight',
      lastUpdated: 'Aakhri update'
    }
  };

  const t = text[language];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {vital.bp && (
          <div className="bg-red-50 rounded-2xl p-4 text-center">
            <Activity className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <p className="text-xs text-gray-600 mb-1">{t.bp}</p>
            <p className="text-red-600">{vital.bp}</p>
          </div>
        )}

        {vital.sugar && (
          <div className="bg-blue-50 rounded-2xl p-4 text-center">
            <Droplet className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-xs text-gray-600 mb-1">{t.sugar}</p>
            <p className="text-blue-600">{vital.sugar} mg/dL</p>
          </div>
        )}

        {vital.weight && (
          <div className="bg-purple-50 rounded-2xl p-4 text-center">
            <Weight className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-xs text-gray-600 mb-1">{t.weight}</p>
            <p className="text-purple-600">{vital.weight} kg</p>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center">
        {t.lastUpdated}: {formatDate(vital.date)}
      </p>
    </div>
  );
}
