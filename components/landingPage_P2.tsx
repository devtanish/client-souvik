import React, { useState } from 'react';
import BottomDrawer from './subCompo/BottomDrawer';

interface Selections {
  'jewelry-type': string[];
  recipient: string;
  trait: string;
}

type PanelId = keyof Selections;

const JewelryCustomizer: React.FC = () => {
  const [activePanel, setActivePanel] = useState<PanelId | null>(null);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [showLeoDrawer, setShowLeoDrawer] = useState(false);
  const [selections, setSelections] = useState<Selections>({
    'jewelry-type': ['Ring'],
    recipient: 'Myself',
    trait: 'Leo'
  });

  const config = {
    'jewelry-type': {
      options: ['Ring', 'Earring', 'Necklace', 'Bracelet', 'Charm', 'Pendant'],
      type: 'checkbox' as const
    },
    recipient: {
      options: ['Myself', 'My Partner', 'My Mother', 'My Father', 'My Best Friend', 'A Couple'],
      type: 'radio' as const
    },
    trait: {
      options: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'],
      type: 'radio' as const
    }
  };

  const togglePanel = (panelId: PanelId) => {
    setActivePanel(prev => prev === panelId ? null : panelId);
  };

  const handleSelection = (key: PanelId, value: string, checked?: boolean) => {
    setSelections(prev => {
      if (key === 'jewelry-type' && checked !== undefined) {
        return {
          ...prev,
          [key]: checked 
            ? [...prev[key], value]
            : prev[key].filter(item => item !== value)
        };
      }
      return {
        ...prev,
        [key]: key === 'jewelry-type' ? [value] : value
      };
    });

    // Open drawer when Leo is selected
    if (key === 'trait' && value === 'Leo') {
      setTimeout(() => {
        setShowLeoDrawer(true);
      }, 100);
    }
  };

  const getDisplayText = (key: PanelId): string => {
    return key === 'jewelry-type' 
      ? selections[key].join(', ') 
      : selections[key] as string;
  };

  const isSelected = (key: PanelId, value: string): boolean => {
    return key === 'jewelry-type'
      ? selections[key].includes(value)
      : selections[key] === value;
  };

  function DrawerContent(){
    return (
      <>
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-6xl mb-4 block">♌</span>
            <h3 className="text-3xl font-bold text-amber-800 mb-2">Leo</h3>
            <p className="text-sm text-gray-600 tracking-wide">July 23 - August 22</p>
          </div>

          <div className="bg-amber-100/50 p-4 rounded-lg">
            <h4 className="font-bold text-amber-900 mb-2">Key Traits</h4>
            <div className="flex flex-wrap gap-2">
              {['Confident', 'Bold', 'Creative', 'Generous', 'Loyal', 'Passionate'].map(trait => (
                <span key={trait} className="bg-amber-200 text-amber-900 px-3 py-1 rounded-full text-sm">
                  {trait}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-2">Perfect Jewelry Style</h4>
            <p className="text-gray-600 leading-relaxed">
              Leos love to shine and express their bold personality. Choose statement pieces with 
              warm gold tones, sun motifs, and bold designs that capture their radiant energy and 
              natural confidence.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-700">Element</p>
              <p className="text-gray-600">Fire 🔥</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Ruling Planet</p>
              <p className="text-gray-600">Sun ☀️</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Lucky Gem</p>
              <p className="text-gray-600">Ruby</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Metal</p>
              <p className="text-gray-600">Gold</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-[#eaebe5] flex justify-center items-center font-sans text-gray-800">
      {/* Message Box Modal */}
      {showMessageBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm" 
            onClick={() => setShowMessageBox(false)}
          />
          <div className="relative bg-[#eaebe5] p-8 shadow-2xl text-center max-w-xl mx-4 rounded-xl border-2 border-amber-800/20 animate-in fade-in zoom-in duration-300">
            <h3 className="font-serif text-amber-800 text-2xl mb-4 font-bold">Finding Inspiration...</h3>
            <p className="leading-relaxed mb-6 text-gray-700">
              Finding inspiration for a <strong className="text-amber-900">{getDisplayText('jewelry-type')}</strong> for{' '}
              <strong className="text-amber-900">{selections.recipient}</strong> who is a proud <strong className="text-amber-900">{selections.trait}</strong>!
            </p>
            <button
              onClick={() => setShowMessageBox(false)}
              className="bg-amber-800 text-white px-6 py-3 rounded transition-all hover:bg-amber-900 hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Leo Bottom Drawer */}
      <BottomDrawer
        isOpen={showLeoDrawer}
        onClose={() => setShowLeoDrawer(false)}
        title="Leo Information"
        height="70vh"
        className="bg-gradient-to-b from-amber-50 to-white"
      >
        {DrawerContent()}
      </BottomDrawer>

      {/* Main Container */}
      <div className={`bg-[#eaebe5] p-4 md:p-12 text-center max-w-2xl w-full rounded-xl transition-all ${activePanel ? "pt-24" : ""}`}>
        <h2 className="font-serif text-2xl md:text-4xl leading-relaxed font-normal text-gray-800 w-full flex flex-wrap items-baseline justify-start md:justify-center">
          <div className='justify-start md:justify-center flex flex-wrap max-w-3xl text-3xl'>
            <span className="mr-2">Help me pick a</span>
            
            {/* Jewelry Type Trigger */}
            <span
              className={`italic font-bold cursor-pointer pb-0.5 transition-all whitespace-nowrap mr-2 ${
                activePanel === 'jewelry-type'
                  ? 'text-[#eaebe5] bg-[#925c40] px-2.5 rounded scale-105' 
                  : 'text-[#925c40] hover:text-amber-900 hover:scale-105 relative'
              }`}
              onClick={() => togglePanel('jewelry-type')}
            >
              {getDisplayText('jewelry-type') ? getDisplayText('jewelry-type') : 'Jewelry'}
              {activePanel !== 'jewelry-type' && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-amber-800 transition-transform origin-left hover:scale-x-0" />
              )}
            </span>
            
            {/* Jewelry Type Panel */}
            <div className={`w-full md:w-[100vh] transition-all duration-500 bg-[#eaebe5] rounded-xl mt-4 shadow-lg origin-top ${
              activePanel === 'jewelry-type'
                ? 'opacity-100 scale-y-100' 
                : 'max-h-0 opacity-0 scale-y-90 -translate-y-4 overflow-hidden'
            }`}>
              <div 
                className={`flex flex-col w-full px-3 md:px-5 py-4 text-left space-y-2 max-h-80 overflow-y-auto ${
                  activePanel === 'jewelry-type' ? 'opacity-100 delay-150' : 'opacity-0'
                }`}
                onWheel={(e) => e.stopPropagation()}
              >
                {config['jewelry-type'].options.map((option, i) => (
                  <label 
                    key={option} 
                    className="flex text-xl md:text-2xl items-center cursor-pointer py-1.5 md:p-2.5 rounded-lg transition-all hover:bg-white/80 hover:translate-x-2"
                    style={{ 
                      transitionDelay: activePanel === 'jewelry-type' ? `${i * 50}ms` : '0ms',
                      transform: activePanel === 'jewelry-type' ? 'translateX(0)' : 'translateX(-20px)'
                    }}
                  >
                    <input
                      type="checkbox"
                      value={option}
                      checked={selections['jewelry-type'].includes(option)}
                      onChange={(e) => handleSelection('jewelry-type', option, e.target.checked)}
                      className="hidden"
                    />
                    <span className={`w-5 h-5 border-2 border-amber-800 mr-3 rounded transition-all ${
                      isSelected('jewelry-type', option)
                        ? 'bg-[#925c40] scale-110'
                        : 'bg-white hover:border-amber-900'
                    }`}>
                      {isSelected('jewelry-type', option) && (
                        <span className="flex items-center justify-center text-white text-xs h-full">✓</span>
                      )}
                    </span>
                    <span>{option}</span>
                  </label>
                ))}
                <button
                  onClick={() => setActivePanel(null)}
                  className="mt-4 border-2 bg-[#925c40] text-white px-4 py-2 text-sm rounded transition-all hover:bg-amber-800 hover:scale-105 self-start"
                >
                  Done
                </button>
              </div>
            </div>
            
            <span className="mr-2">for</span>
            
            {/* Recipient Trigger */}
            <span
              className={`italic font-bold cursor-pointer pb-0.5 transition-all whitespace-nowrap mr-2 ${
                activePanel === 'recipient'
                  ? 'text-[#eaebe5] bg-[#925c40] px-2.5 rounded scale-105' 
                  : 'text-[#925c40] hover:text-amber-900 hover:scale-105 relative'
              }`}
              onClick={() => togglePanel('recipient')}
            >
              {selections.recipient}
              {activePanel !== 'recipient' && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-amber-800 transition-transform origin-left hover:scale-x-0" />
              )}
            </span>
            
            {/* Recipient Panel */}
            <div className={`w-full md:w-[100vh] transition-all duration-500 bg-[#eaebe5] rounded-xl mt-4 shadow-lg origin-top ${
              activePanel === 'recipient'
                ? 'opacity-100 scale-y-100' 
                : 'max-h-0 opacity-0 scale-y-90 -translate-y-4 overflow-hidden'
            }`}>
              <div 
                className={`flex flex-col w-full px-3 md:px-5 py-4 text-left space-y-2 max-h-80 overflow-y-auto ${
                  activePanel === 'recipient' ? 'opacity-100 delay-150' : 'opacity-0'
                }`}
                onWheel={(e) => e.stopPropagation()}
              >
                {config.recipient.options.map((option, i) => (
                  <label 
                    key={option} 
                    className="flex text-xl md:text-2xl items-center cursor-pointer py-1.5 md:p-2.5 rounded-lg transition-all hover:bg-white/80 hover:translate-x-2"
                    style={{ 
                      transitionDelay: activePanel === 'recipient' ? `${i * 50}ms` : '0ms',
                      transform: activePanel === 'recipient' ? 'translateX(0)' : 'translateX(-20px)'
                    }}
                  >
                    <input
                      type="radio"
                      name="recipient"
                      value={option}
                      checked={selections.recipient === option}
                      onChange={() => handleSelection('recipient', option)}
                      className="hidden"
                    />
                    <span className={`w-5 h-5 border-2 border-amber-800 mr-3 rounded-full transition-all ${
                      isSelected('recipient', option)
                        ? 'bg-[#925c40] scale-110'
                        : 'bg-white hover:border-amber-900'
                    }`}>
                      {isSelected('recipient', option) && (
                        <span className="block w-2.5 h-2.5 bg-white rounded-full m-auto mt-1" />
                      )}
                    </span>
                    <span>{option}</span>
                  </label>
                ))}
                <button
                  onClick={() => setActivePanel(null)}
                  className="mt-4 border-2 bg-[#925c40] text-white px-4 py-2 text-sm rounded transition-all hover:bg-amber-800 hover:scale-105 self-start"
                >
                  Done
                </button>
              </div>
            </div>
            
            <div className="flex justify-center space-y-2">
              <span className="mr-2">inspired by</span>
              
              {/* Trait Trigger */}
              <span
                className={`italic font-bold cursor-pointer pb-0.5 transition-all whitespace-nowrap mr-2 ${
                  activePanel === 'trait'
                    ? 'text-[#eaebe5] bg-[#925c40] px-2.5 rounded scale-105' 
                    : 'text-[#925c40] hover:text-amber-900 hover:scale-105 relative'
                }`}
                onClick={() => {
                  if (selections.trait === 'Leo' && activePanel !== 'trait') {
                    setTimeout(() => setShowLeoDrawer(true), 300);
                  }
                }}
              >
                {selections.trait}
                {activePanel !== 'trait' && (
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-amber-800 transition-transform origin-left hover:scale-x-0" />
                )}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowMessageBox(true)}
            className="block mt-8 mx-auto font-medium text-lg px-8 md:px-8 py-2 bg-[#925c40] text-white rounded shadow-lg transition-all hover:bg-[#b0947f] hover:-translate-y-1 hover:shadow-2xl hover:scale-105 uppercase tracking-wider"
          >
            Show Me My Inspiration
          </button>
        </h2>

        <p className="mt-8 text-sm text-gray-600">
          ...or,{' '}
          <a href="#" className="text-amber-800 font-semibold transition-all hover:underline hover:text-amber-900">
            speak to us
          </a>{' '}
          and share your inspiration so our team can get back to you with a mood board.
        </p>
      </div>
    </div>
  );
};

export default JewelryCustomizer;