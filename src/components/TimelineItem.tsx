import { FileText, Activity, Droplet, Weight } from 'lucide-react';
import { Language, Report, Vital } from '../App';

type TimelineEntry = {
  id: string;
  date: string;
  type: 'report' | 'vital';
  data: Report | Vital;
};

type TimelineItemProps = {
  entry: TimelineEntry;
  onViewReport: (report: Report) => void;
  language: Language;
};

export function TimelineItem({ entry, onViewReport, language }: TimelineItemProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.toLocaleDateString('en-US', { day: 'numeric' }),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.toLocaleDateString('en-US', { year: 'numeric' })
    };
  };

  const date = formatDate(entry.date);

  if (entry.type === 'report') {
    const report = entry.data as Report;
    return (
      <div className="flex gap-4">
        {/* Date Circle */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-12 h-12 bg-green-500 rounded-full flex flex-col items-center justify-center text-white shadow-lg z-10">
            <span className="text-xs">{date.day}</span>
            <span className="text-xs">{date.month}</span>
          </div>
        </div>

        {/* Content Card */}
        <button
          onClick={() => onViewReport(report)}
          className="flex-1 bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all mb-6 text-left"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-800 mb-1 truncate">{report.name}</p>
              <p className="text-sm text-gray-500">{report.type}</p>
              {report.summary?.keyFindings && report.summary.keyFindings[0] && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {report.summary.keyFindings[0]}
                </p>
              )}
            </div>
          </div>
        </button>
      </div>
    );
  } else {
    const vital = entry.data as Vital;
    return (
      <div className="flex gap-4">
        {/* Date Circle */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-12 h-12 bg-red-500 rounded-full flex flex-col items-center justify-center text-white shadow-lg z-10">
            <span className="text-xs">{date.day}</span>
            <span className="text-xs">{date.month}</span>
          </div>
        </div>

        {/* Content Card */}
        <div className="flex-1 bg-white rounded-2xl p-4 shadow-md mb-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Activity className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 mb-1">
                {language === 'en' ? 'Vitals Reading' : 'Vitals Reading'}
              </p>
              <p className="text-sm text-gray-500">{date.year}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {vital.bp && (
              <div className="bg-red-50 rounded-xl p-2 text-center">
                <Activity className="w-4 h-4 text-red-500 mx-auto mb-1" />
                <p className="text-xs text-gray-600">BP</p>
                <p className="text-sm text-red-600">{vital.bp}</p>
              </div>
            )}
            {vital.sugar && (
              <div className="bg-blue-50 rounded-xl p-2 text-center">
                <Droplet className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Sugar</p>
                <p className="text-sm text-blue-600">{vital.sugar}</p>
              </div>
            )}
            {vital.weight && (
              <div className="bg-purple-50 rounded-xl p-2 text-center">
                <Weight className="w-4 h-4 text-purple-500 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Weight</p>
                <p className="text-sm text-purple-600">{vital.weight}</p>
              </div>
            )}
          </div>

          {vital.notes && (
            <p className="text-sm text-gray-600 mt-3 italic">"{vital.notes}"</p>
          )}
        </div>
      </div>
    );
  }
}
