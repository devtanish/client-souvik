import React from 'react';
import Image from 'next/image';

interface SavedCollection {
  id: string;
  title: string;
  thumbnailUrl?: string;
  isMultiImage?: boolean;
  images?: string[]; // For the 2x2 grid preview
}

const InstaCard: React.FC<SavedCollection> = ({ title, thumbnailUrl, images, isMultiImage }) => {
  return (
    <div className="group relative aspect-square w-full cursor-pointer overflow-hidden bg-[#121212] border border-gray-800 rounded-sm">
      {/* Thumbnail Logic */}
      <div className="h-full w-full">
        {isMultiImage && images ? (
          <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-[1px]">
            {images.slice(0, 4).map((img, idx) => (
              <Image 
                key={idx} 
                src={img} 
                alt="preview" 
                className="h-full w-full object-cover" 
              />
            ))}
          </div>
        ) : (
          thumbnailUrl && (
            <img 
              src={thumbnailUrl} 
              alt={title} 
              className="h-full w-full object-cover opacity-80" 
            />
          )
        )}
      </div>

      {/* Label Overlay */}
      <div className="absolute inset-0 flex items-end p-3 bg-black/20">
        <span className="text-white text-sm font-medium tracking-wide">
          {title}
        </span>
      </div>
      
      {/* Subtle Hover Effect */}
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default InstaCard;