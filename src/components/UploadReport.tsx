import { useState } from 'react';
import { ArrowLeft, Upload, FileText, Loader2 } from 'lucide-react';
import { Button } from './small packets/button';
import { Label } from './small packets/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './small packets/select';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Language } from '../App';
import { Toaster, toast } from "sonner";

type UploadReportProps = {
  onUpload: (file: File, type: string) => void;
  onBack: () => void;
  language: Language;
  userName?: string;
  onLogout?: () => void;
};

export function UploadReport({ onUpload, onBack, language, userName, onLogout }: UploadReportProps) {
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (!file) {
      toast.error(language === 'en' ? 'Please select a file' : 'File select karen');
      return;
    }
    if (!type) {
      toast.error(language === 'en' ? 'Please select report type' : 'Report type select karen');
      return;
    }

    setIsAnalyzing(true);
    toast.success(language === 'en' ? 'Analyzing report...' : 'Report analyze ho rahi hai...');
    
    setTimeout(() => {
      onUpload(file, type);
      setIsAnalyzing(false);
    }, 2000);
  };

  const text = {
    en: {
      title: 'Upload Report',
      uploadZone: 'Upload your report (PDF/Image)',
      dragDrop: 'Drag & drop your file here, or click to browse',
      selected: 'Selected file',
      reportType: 'Report Type',
      selectType: 'Select report type',
      analyze: 'Analyze with AI 🤖',
      analyzing: 'Gemini AI is reading your report...',
      subtitle: 'AI apki report samajh kar simple shabdon mein explain karega.'
    },
    ur: {
      title: 'Report Upload Karen',
      uploadZone: 'Apni report upload karen (PDF/Image)',
      dragDrop: 'File yahan drag & drop karen, ya browse karen',
      selected: 'File select hui',
      reportType: 'Report Ki Type',
      selectType: 'Report type select karen',
      analyze: 'AI se Analyze Karen 🤖',
      analyzing: 'Gemini AI aapki report parh rahi hai...',
      subtitle: 'AI apki report samajh kar simple shabdon mein explain karega.'
    }
  };

  const t = text[language];

  const reportTypes = [
    { value: 'blood-test', label: 'Blood Test / Blood Test' },
    { value: 'xray', label: 'X-Ray / X-Ray' },
    { value: 'ultrasound', label: 'Ultrasound / Ultrasound' },
    { value: 'mri', label: 'MRI / MRI' },
    { value: 'prescription', label: 'Prescription / Prescription' },
    { value: 'other', label: 'Other / Doosra' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <Sidebar active="upload" onNavigate={onBack as any} language={language} userName={userName} onLogout={onLogout} />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6 lg:p-8 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="rounded-full lg:hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-gray-800">{t.title}</h1>
          </div>
        </div>

      <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6 pb-24 lg:pb-8">
        {/* Upload Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all ${
            dragActive
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 bg-white hover:border-green-400'
          }`}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf,image/*"
            onChange={handleFileChange}
          />
          
          {file ? (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-gray-700 mb-1">{t.selected}:</p>
                <p className="text-green-600">{file.name}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <Button
                onClick={() => document.getElementById('file-upload')?.click()}
                variant="outline"
                className="rounded-full"
              >
                {language === 'en' ? 'Change File' : 'File Badlen'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <p className="text-gray-700 mb-2">{t.uploadZone}</p>
                <p className="text-sm text-gray-500">{t.dragDrop}</p>
              </div>
              <Button
                onClick={() => document.getElementById('file-upload')?.click()}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full"
              >
                {language === 'en' ? 'Browse Files' : 'Files Browse Karen'}
              </Button>
            </div>
          )}
        </div>

        {/* Report Type Selection */}
        {file && (
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <Label className="text-gray-700 mb-2 block">{t.reportType}</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="rounded-xl border-gray-200">
                <SelectValue placeholder={t.selectType} />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((rt) => (
                  <SelectItem key={rt.value} value={rt.value}>
                    {rt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Analyze Button */}
        {file && type && (
          <div className="space-y-4">
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full py-6 shadow-lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t.analyzing}
                </>
              ) : (
                t.analyze
              )}
            </Button>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <p className="text-sm text-blue-800 text-center">{t.subtitle}</p>
            </div>
          </div>
        )}
      </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <Navbar active="upload" onNavigate={onBack as any} language={language} />
      </div>
    </div>
  );
}
