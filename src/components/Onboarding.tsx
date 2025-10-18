import { useState } from 'react';
import { ChevronRight, FileText, Brain, Activity } from 'lucide-react';
import { Button } from './small packets/button';
import { Language } from '../App';

type OnboardingProps = {
  onContinue: () => void;
  language: Language;
};

const slides = [
  {
    icon: FileText,
    title: { en: 'Upload Reports Easily', ur: 'Reports Asani Se Upload Karen' },
    description: { en: 'Upload your medical reports as PDFs or images', ur: 'Apni medical reports PDF ya images mein upload karen' }
  },
  {
    icon: Brain,
    title: { en: 'Understand Medical Terms', ur: 'Medical Terms Samjhen' },
    description: { en: 'Get AI-powered summaries in simple language', ur: 'AI ki madad se simple zaban mein samjhen' }
  },
  {
    icon: Activity,
    title: { en: 'Track Your Health', ur: 'Sehat Ko Track Karen' },
    description: { en: 'See your complete health timeline in one place', ur: 'Apni puri sehat ka timeline ek jagah dekhen' }
  }
];

export function Onboarding({ onContinue, language }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onContinue();
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-green-600 mb-2">HealthMate</h1>
          <p className="text-gray-600">
            {language === 'en' ? 'Sehat ka Smart Dost' : 'Your Personal Health Companion'}
          </p>
          <p className="text-green-500 mt-2">💚</p>
        </div>

        {/* Slide Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-center text-gray-800 mb-4">{slide.title[language]}</h2>
          <p className="text-center text-gray-600">{slide.description[language]}</p>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-green-500' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <Button
          onClick={handleNext}
          className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full py-6 shadow-lg"
        >
          {currentSlide < slides.length - 1 ? (
            <>
              {language === 'en' ? 'Next' : 'Aage'}
              <ChevronRight className="ml-2 w-5 h-5" />
            </>
          ) : (
            language === 'en' ? "Let's Get Started" : 'Shuru Karte Hain'
          )}
        </Button>
      </div>
    </div>
  );
}
