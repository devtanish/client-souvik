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
          [key]: [value] // jewelry-type expects array
        };
      } else {
        return {
          ...prev,
          [key]: value // recipient and trait expect string
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
      className={`italic font-bold cursor-pointer relative pb-0.5 transition-all duration-300 whitespace-nowrap mr-2 ${
        isActive 
          ? 'text-[#eaebe5] bg-[#925c40] px-2.5 rounded' 
          : 'text-[#925c40] hover:text-amber-900'
      }`}
      onClick={onClick}
    >
      {text}
      {!isActive && (
        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-amber-800 transition-all duration-300 hover:w-0"></span>
      )}
    </span>
  );

  const SelectionPanel: React.FC<SelectionPanelProps> = ({ panelId, isActive, options, type, currentValue, onClose }) => (
    <div className={`w-[50vh] transition-all duration-500 ease-in-out bg-[#eaebe5] rounded-xl mt-4  overflow-hidden ${
      isActive ? 'max-h-96 opacity-100 py-0' : 'max-h-0 opacity-0 py-0'
    }`}>
      <div className="flex flex-col w-full px-3 md:px-5 text-left space-y-2 max-h-80 overflow-y-auto">
        {options.map((option) => (
          <label key={option} className="flex text-[20px] md:text-[25px] items-center cursor-pointer md:p-2.5 py-0 md:py-0 rounded-lg transition-colors duration-200 hover:bg-white/80 md:m-0">
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
            <span className={`w-4 h-4 border-2 border-amber-800 mr-2.5 inline-block relative transition-all duration-200 ${
              type === 'radio' ? 'rounded-full' : 'rounded'
            } ${
              (type === 'checkbox' ? (currentValue as string[]).includes(option) : currentValue === option)
                ? 'bg-[#925c40] border-amber-800'
                : 'bg-white'
            }`}>
              {(type === 'checkbox' ? (currentValue as string[]).includes(option) : currentValue === option) && (
                <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                  type === 'radio' ? 'w-2.5 h-2.5 bg-white rounded-full' : 'text-white text-xs'
                }`}>
                  {type === 'checkbox' && '✓'}
                </span>
              )}
            </span>
            {option}
          </label>
        ))}
        <button
          onClick={onClose}
          className="mt-4 border-2 bg-[#925c40] text-white px-4 py-2 text-sm cursor-pointer transition-all duration-300 hover:bg-amber-800 hover:text-white self-start"
        >
          Done
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#eaebe5] flex justify-center items-center p-4 font-sans text-gray-800 transition-colors duration-300">
      {/* Message Box Modal */}
      {showMessageBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/20" onClick={closeMessageBox}></div>
          <div className={`relative bg-[#eaebe5] p-8 shadow-2xl text-center max-w-xl mx-4 transform transition-all duration-300 ${
            showMessageBox ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}>
            <h3 className="font-serif text-amber-800 text-xl mb-3">Finding Inspiration...</h3>
            <p className="leading-relaxed mb-6">
              Finding inspiration for a <strong>{getDisplayText('jewelry-type')}</strong> for{' '}
              <strong>{selections.recipient}</strong> who is a proud <strong>{selections.trait}</strong>!
            </p>
            <button
              onClick={closeMessageBox}
              className="bg-amber-800 text-white px-5 py-2.5 cursor-pointer transition-colors duration-300 hover:bg-amber-900"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="bg-[#eaebe5] p-2 md:p-12  text-center max-w-2xl w-full">
        <h2 className="font-serif text-2xl md:text-4xl leading-relaxed font-normal text-gray-800 w-full flex flex-wrap items-baseline justify-start md:justify-center">
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
            className="block mt-8 mx-auto font-medium text-lg font-sans px-8 py-4 bg-[#925c40] text-white border-none cursor-pointer transition-all duration-300 shadow-lg hover:bg-[#b0947f] hover:-translate-y-0.5 hover:shadow-xl uppercase tracking-wider"
          >
            Show Me My Inspiration
          </button>
        </h2>

        <p className="mt-8 text-sm text-gray-600">
          ...or,{' '}
          <a href="#" className="text-amber-800 no-underline font-semibold transition-all duration-200 hover:underline">
            speak to us
          </a>{' '}
          and share your inspiration so our team can get back to you with a mood board.
        </p>
      </div>
    </div>
  );
};

export default JewelryCustomizer;