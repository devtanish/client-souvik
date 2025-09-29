import React, { useState } from 'react';

interface Selections {
  'jewelry-type': string[];
  'recipient': string;
  'trait': string;
}

interface CustomTriggerProps {
  panelId: keyof Selections;
  text: string;
  isActive: boolean;
  onClick: () => void;
}

interface SelectionPanelProps {
  panelId: keyof Selections;
  isActive: boolean;
  options: string[];
  type: 'checkbox' | 'radio';
  currentValue: string | string[];
  onClose: () => void;
}

const JewelryCustomizer: React.FC = () => {
  const [activePanel, setActivePanel] = useState<keyof Selections | null>(null);
  const [showMessageBox, setShowMessageBox] = useState<boolean>(false);
  const [selections, setSelections] = useState<Selections>({
    'jewelry-type': ['Ring'],
    'recipient': 'Myself',
    'trait': 'Leo'
  });

  const jewelryOptions = ['Ring', 'Earring', 'Necklace', 'Bracelet', 'Charm', 'Pendant'];
  const recipientOptions = ['Myself', 'My Partner', 'My Mother', 'My Father', 'My Best Friend', 'A Couple'];
  const traitOptions = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  const handleTriggerClick = (panelId: keyof Selections): void => {
    setActivePanel(activePanel === panelId ? null : panelId);
  };

  const handleCheckboxChange = (value: string, checked: boolean): void => {
    setSelections(prev => ({
      ...prev,
      'jewelry-type': checked 
        ? [...prev['jewelry-type'], value]
        : prev['jewelry-type'].filter(item => item !== value)
    }));
  };

  const handleRadioChange = (key: keyof Selections, value: string): void => {
    setSelections(prev => {
      if (key === 'jewelry-type') {
        return {
          ...prev,
          [key]: [value]
        };
      } else {
        return {
          ...prev,
          [key]: value
        };
      }
    });
  };

  const closePanel = (): void => {
    setActivePanel(null);
  };

  const showInspiration = (): void => {
    setShowMessageBox(true);
  };

  const closeMessageBox = (): void => {
    setShowMessageBox(false);
  };

  const getDisplayText = (key: keyof Selections): string => {
    if (key === 'jewelry-type') {
      return selections[key].join(', ') || 'Ring';
    }
    return selections[key] as string;
  };

  const CustomTrigger: React.FC<CustomTriggerProps> = ({ panelId, text, isActive, onClick }) => (
    <span
      className={`italic font-bold cursor-pointer relative pb-0.5 transition-all duration-300 ease-out whitespace-nowrap mr-2 transform ${
        isActive 
          ? 'text-[#eaebe5] bg-[#925c40] px-2.5 rounded scale-105' 
          : 'text-[#925c40] hover:text-amber-900 hover:scale-105'
      }`}
      onClick={onClick}
    >
      {text}
      {!isActive && (
        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-amber-800 transition-all duration-300 origin-left scale-x-100 hover:scale-x-0"></span>
      )}
    </span>
  );

  const SelectionPanel: React.FC<SelectionPanelProps> = ({ panelId, isActive, options, type, currentValue, onClose }) => (
    <div className={`w-full md:w-[50vh] transition-all duration-500 ease-in-out bg-[#eaebe5] rounded-xl mt-4 transform origin-top shadow-lg ${
      isActive 
        ? 'opacity-100 scale-y-100 translate-y-0' 
        : 'max-h-0 opacity-0 scale-y-90 -translate-y-4 pointer-events-none overflow-hidden'
    }`}>
      <div 
        className={`flex flex-col w-full px-3 md:px-5 py-4 text-left space-y-2 overflow-y-auto transition-all duration-300 ${
          isActive ? 'opacity-100 delay-150 max-h-80' : 'opacity-0 max-h-0'
        }`} 
        // style={{ scrollbarWidth: 'thin' }}
        onWheel={(e) => e.stopPropagation()}
      >
        {options.map((option, index) => (
          <label 
            key={option} 
            className={`flex text-[20px] md:text-[25px] items-center cursor-pointer md:p-2.5 py-1.5 rounded-lg transition-all duration-300 ease-out hover:bg-white/80 hover:translate-x-2 hover:shadow-md md:m-0 transform ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              transitionDelay: isActive ? `${index * 50}ms` : '0ms',
              transform: isActive ? 'translateX(0)' : 'translateX(-20px)'
            }}
          >
            <input
              type={type}
              name={panelId}
              value={option}
              checked={type === 'checkbox' ? (currentValue as string[]).includes(option) : currentValue === option}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (type === 'checkbox') {
                  handleCheckboxChange(option, e.target.checked);
                } else {
                  handleRadioChange(panelId, option);
                }
              }}
              className="hidden"
            />
            <span className={`w-5 h-5 border-2 border-amber-800 mr-3 inline-block relative transition-all duration-300 ease-out transform ${
              type === 'radio' ? 'rounded-full' : 'rounded'
            } ${
              (type === 'checkbox' ? (currentValue as string[]).includes(option) : currentValue === option)
                ? 'bg-[#925c40] border-amber-800 scale-110'
                : 'bg-white hover:border-amber-900'
            }`}>
              {(type === 'checkbox' ? (currentValue as string[]).includes(option) : currentValue === option) && (
                <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-out scale-0 ${
                  (type === 'checkbox' ? (currentValue as string[]).includes(option) : currentValue === option) ? 'scale-100' : ''
                } ${
                  type === 'radio' ? 'w-2.5 h-2.5 bg-white rounded-full' : 'text-white text-xs'
                }`}>
                  {type === 'checkbox' && '✓'}
                </span>
              )}
            </span>
            <span className="transition-transform duration-200">{option}</span>
          </label>
        ))}
        <button
          onClick={onClose}
          className="mt-4 border-2 bg-[#925c40] text-white px-4 py-2 text-sm cursor-pointer transition-all duration-300 ease-out hover:bg-amber-800 hover:text-white hover:scale-105 hover:shadow-lg self-start rounded transform"
        >
          Done
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-[100vh] bg-[#eaebe5] flex justify-center items-center p-4 font-sans text-gray-800 transition-colors duration-300">
      {/* Message Box Modal */}
      {showMessageBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-out">
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300" 
            onClick={closeMessageBox}
          ></div>
          <div className={`relative bg-[#eaebe5] p-8 shadow-2xl text-center max-w-xl mx-4 rounded-xl border-2 border-amber-800/20 transform transition-all duration-400 ease-out ${
            showMessageBox ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 -translate-y-4'
          }`}>
            <h3 className="font-serif text-amber-800 text-2xl mb-4 font-bold">Finding Inspiration...</h3>
            <p className="leading-relaxed mb-6 text-gray-700">
              Finding inspiration for a <strong className="text-amber-900">{getDisplayText('jewelry-type')}</strong> for{' '}
              <strong className="text-amber-900">{selections.recipient}</strong> who is a proud <strong className="text-amber-900">{selections.trait}</strong>!
            </p>
            <button
              onClick={closeMessageBox}
              className="bg-amber-800 text-white px-6 py-3 cursor-pointer transition-all duration-300 ease-out hover:bg-amber-900 hover:scale-105 hover:shadow-lg rounded transform"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div
        className={`bg-[#eaebe5] p-2 md:p-12 text-center max-w-2xl w-full rounded-xl  transition-all duration-300 ${
          activePanel ? "pt-[100px]" : ""
        }`}
      >
      {/* <div className='h-50vh'> hello</div> */}

        <h2 className="font-serif text-2xl md:text-4xl leading-relaxed font-normal text-gray-800 w-full flex flex-wrap items-baseline justify-start md:justify-center gap-y-2">
          <span className="mr-2">Customize my</span>
          
          <CustomTrigger
            panelId="jewelry-type"
            text={getDisplayText('jewelry-type')}
            isActive={activePanel === 'jewelry-type'}
            onClick={() => handleTriggerClick('jewelry-type')}
          />
          
          <SelectionPanel
            panelId="jewelry-type"
            isActive={activePanel === 'jewelry-type'}
            options={jewelryOptions}
            type="checkbox"
            currentValue={selections['jewelry-type']}
            onClose={closePanel}
          />
          
          <span className="mr-2">which I want to gift to</span>
          
          <CustomTrigger
            panelId="recipient"
            text={selections.recipient}
            isActive={activePanel === 'recipient'}
            onClick={() => handleTriggerClick('recipient')}
          />
          
          <SelectionPanel
            panelId="recipient"
            isActive={activePanel === 'recipient'}
            options={recipientOptions}
            type="radio"
            currentValue={selections.recipient}
            onClose={closePanel}
          />
          
          <span className="mr-2">because I&apos;m a proud</span>
          
          <CustomTrigger
            panelId="trait"
            text={selections.trait}
            isActive={activePanel === 'trait'}
            onClick={() => handleTriggerClick('trait')}
          />
          
          <SelectionPanel
            panelId="trait"
            isActive={activePanel === 'trait'}
            options={traitOptions}
            type="radio"
            currentValue={selections.trait}
            onClose={closePanel}
          />
          
          <button
            onClick={showInspiration}
            className="block mt-8 mx-auto font-medium text-lg font-sans px-8 py-4 bg-[#925c40] text-white border-none cursor-pointer transition-all duration-300 ease-out shadow-lg hover:bg-[#b0947f] hover:-translate-y-1 hover:shadow-2xl hover:scale-105 uppercase tracking-wider rounded transform"
          >
            Show Me My Inspiration
          </button>
        </h2>

        <p className="mt-8 text-sm text-gray-600">
          ...or,{' '}
          <a href="#" className="text-amber-800 no-underline font-semibold transition-all duration-300 ease-out hover:underline hover:text-amber-900">
            speak to us
          </a>{' '}
          and share your inspiration so our team can get back to you with a mood board.
        </p>
      </div>
    </div>
  );
};

export default JewelryCustomizer;
