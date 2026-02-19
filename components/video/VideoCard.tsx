'use client';

import React, { useRef, useState } from 'react';
import { Video } from './ExploreVideoGrid';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="relative w-full aspect-[9/16] lg:aspect-square bg-black cursor-pointer overflow-hidden group rounded-sm"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={video.videoUrl}
        poster={video.thumbnailUrl}
        loop
        muted
        playsInline
      />
      
      <div 
        className={cn(
          "absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-200",
          isHovering ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="flex items-center gap-2 text-white font-semibold text-base drop-shadow-lg">
          <Heart className="w-5 h-5 fill-white" />
          <span className="drop-shadow-md">{video.likes.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;