import React, { ReactNode, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface BottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  showHandle?: boolean;
  showCloseButton?: boolean;
  height?: string;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  closeOnOverlayClick?: boolean;
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  isOpen,
  onClose,
  children,
  title,
  showHandle = true,
  showCloseButton = true,
  height = '50vh',
  className = '',
  overlayClassName = '',
  contentClassName = '',
  closeOnOverlayClick = true,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Disable background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Prevent scroll propagation from drawer to body
  const handleWheel = (e: React.WheelEvent) => {
    const el = contentRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const delta = e.deltaY;

    if (
      (delta > 0 && scrollTop + clientHeight >= scrollHeight) ||
      (delta < 0 && scrollTop <= 0)
    ) {
      e.preventDefault(); // Stop scrolling beyond content
    }
  };

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={handleOverlayClick}
          className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${overlayClassName}`}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } ${className}`}
        style={{ height }}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Handle */}
          {showHandle && (
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>
          )}

          {/* Close Button */}
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              aria-label="Close drawer"
            >
              <X size={24} className="text-gray-600" />
            </button>
          )}

          {/* Title */}
          {title && (
            <div className="px-6 pt-4 pb-2 shrink-0">
              <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            </div>
          )}

          {/* Drawer Content (Scrollable) */}
          <div
            ref={contentRef}
            onWheel={handleWheel}
            className={`flex-1 px-6 py-4 overflow-y-auto pb-8 ${contentClassName}`}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomDrawer;
