'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Video } from './ExploreVideoGrid';
import { Heart, Share2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoModalProps {
  video: Video;
  onClose: () => void;
  onLike: (videoId: string) => void;
  onShare: (videoId: string) => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose, onLike, onShare }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLiked, setIsLiked] = useState(video.isLiked || false);
  const [likes, setLikes] = useState(video.likes);

  useEffect(() => {
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Play video after a short delay
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(err => {
          console.log('Video play error:', err);
        });
      }
    }, 100);

    return () => {
      document.body.style.overflow = 'unset';
      clearTimeout(timer);
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    onLike(video.id);
  };

  const handleShareClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare(video.id);
    
    // Try native share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: `Check out this video: ${video.title}`,
          url: window.location.href,
        });
        console.log('Shared successfully');
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled or failed:', error);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?video=${video.id}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => alert('Link copied to clipboard! 📋'))
        .catch((err) => {
          console.error('Failed to copy:', err);
          fallbackCopyToClipboard(shareUrl);
        });
    } else {
      fallbackCopyToClipboard(shareUrl);
    }
  };

  const fallbackCopyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      alert('Link copied to clipboard! 📋');
    } catch (err) {
      console.error('Fallback copy failed:', err);
      alert('Could not copy link. URL: ' + text);
    }
    
    document.body.removeChild(textArea);
  };

  return (
    /* FIX APPLIED HERE:
       1. Changed z-50 to z-[9999]
       2. Added w-screen and h-[100dvh] to force viewport sizing
    */
    <div 
      className="fixed inset-0 z-[9999] w-screen h-[100dvh] bg-black/95 flex items-center justify-center p-0 md:p-5 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      {/* Close Button - Increased z-index just in case */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-5 md:right-5 z-[10000] w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Video Container */}
      <div 
        className="relative w-full h-full md:w-auto md:h-[80vh] md:aspect-[9/16] bg-black md:rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={video.videoUrl}
          loop
          playsInline
          controls={false}
          preload="auto"
        />

        {/* Video Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20 pb-6 px-5">
          <h3 className="text-white text-base font-semibold mb-14 drop-shadow-lg leading-tight">
            {video.title}
          </h3>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLikeClick}
              className={cn(
                "flex flex-col items-center gap-1 p-2 transition-transform active:scale-95",
                isLiked && "animate-in zoom-in-50 duration-300"
              )}
            >
              <Heart 
                className={cn(
                  "w-7 h-7 transition-all",
                  isLiked 
                    ? "fill-red-500 text-red-500" 
                    : "text-white hover:scale-110"
                )}
              />
              <span className="text-white text-xs font-semibold drop-shadow-md">
                {likes.toLocaleString()}
              </span>
            </button>

            <button
              onClick={handleShareClick}
              className="flex flex-col items-center gap-1 p-2 transition-transform hover:scale-110 active:scale-95"
            >
              <Share2 className="w-7 h-7 -translate-y-2.5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;