import { FileText, ChevronRight } from 'lucide-react';
import { Language, Report } from '../App';

type ReportCardProps = {
  report: Report;
  onClick: () => void;
  language: Language;
};

export function ReportCard({ report, onClick, language }: ReportCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const text = {
    en: {
      viewSummary: 'View Summary'
    },
    ur: {
      viewSummary: 'Summary Dekhen'
    }
  };

  const t = text[language];

  return (
    <button
      onClick={onClick}
      className="w-full bg-gray-50 hover:bg-gray-100 rounded-2xl p-4 flex items-center gap-4 transition-all border border-gray-100"
    >
      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
        <FileText className="w-6 h-6 text-green-600" />
      </div>
      
      <div className="flex-1 text-left min-w-0">
        <p className="text-gray-800 truncate">{report.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-500">{report.type}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500">{formatDate(report.date)}</span>
        </div>
      </div>

      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
    </button>
  );
}
