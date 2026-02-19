'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Video } from './ExploreVideoGrid';
import { Heart, Share2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoModalWithNavigationProps {
  videos: Video[];
  initialVideoId: string;
  onClose: () => void;
  onLike: (videoId: string) => void;
  onShare: (videoId: string) => void;
}

const VideoModalWithNavigation: React.FC<VideoModalWithNavigationProps> = ({ 
  videos, 
  initialVideoId, 
  onClose, 
  onLike, 
  onShare 
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentIndex, setCurrentIndex] = useState(
    videos.findIndex(v => v.id === initialVideoId) || 0
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const currentVideo = videos[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < videos.length - 1;

  useEffect(() => {
    const newIndex = videos.findIndex(v => v.id === initialVideoId);
    if (newIndex !== -1) {
      setCurrentIndex(newIndex);
    }
  }, [initialVideoId, videos]);

  useEffect(() => {
    if (currentVideo) {
      setIsLiked(currentVideo.isLiked || false);
      setLikes(currentVideo.likes || 0);
    }
  }, [currentIndex, currentVideo]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(err => console.log('Video play error:', err));
      }
    }, 100);

    return () => {
      document.body.style.overflow = 'unset';
      clearTimeout(timer);
    };
  }, [currentIndex]);

  const updateUrl = (video: Video) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('video', video.videoUrl);
    router.replace(`${pathname}?${current.toString()}`, { scroll: false });
  };

  const goToPrevious = () => {
    if (hasPrevious) updateUrl(videos[currentIndex - 1]);
  };

  const goToNext = () => {
    if (hasNext) updateUrl(videos[currentIndex + 1]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && hasPrevious) goToPrevious();
      else if (e.key === 'ArrowRight' && hasNext) goToNext();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, hasPrevious, hasNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0 && hasNext) goToNext();
      else if (swipeDistance < 0 && hasPrevious) goToPrevious();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    onLike(currentVideo.id);
  };

  const showToast = () => {
    setShowCopiedToast(true);
    setTimeout(() => setShowCopiedToast(false), 2500);
  };

  const handleShareClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare(currentVideo.id);
    
    // EXPLICIT URL CONSTRUCTION: 
    // This ensures we generate a clean, correct URL for sharing
    // instead of relying on the browser's current address bar state.
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('video', currentVideo.videoUrl);
    const shareUrl = url.toString();

    if (navigator.share) {
      try {
        await navigator.share({
          title: currentVideo.title,
          text: `Check out this video: ${currentVideo.title}`,
          url: shareUrl,
        });
        showToast();
      } catch (error: any) {
        if (error.name !== 'AbortError') copyToClipboard(shareUrl);
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => showToast())
        .catch(() => fallbackCopyToClipboard(text));
    } else {
      fallbackCopyToClipboard(text);
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
      showToast();
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(textArea);
  };

  if (!currentVideo) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-0 md:p-5 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-5 md:right-5 z-50 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
      >
        <X className="h-6 w-6" />
      </button>

      {hasPrevious && (
        <button
          onClick={goToPrevious}
          className="hidden md:flex absolute left-5 z-50 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white items-center justify-center transition-colors"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={goToNext}
          className="hidden md:flex absolute right-5 z-50 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white items-center justify-center transition-colors"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}

      {showCopiedToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-top-5 duration-300">
          <Share2 className="w-5 h-5 text-green-500" />
          <span className="font-medium">Link copied to clipboard!</span>
        </div>
      )}

      <div 
        className="relative w-full h-full md:w-auto md:h-[80vh] md:aspect-[9/16] bg-black md:rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <video
          key={currentVideo.id}
          ref={videoRef}
          className="w-full h-full object-cover"
          src={currentVideo.videoUrl}
          loop
          playsInline
          controls={false}
          preload="auto"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20 pb-6 px-5">
          <h3 className="text-white text-base font-semibold mb-14 drop-shadow-lg leading-tight">
            {currentVideo.title}
          </h3>

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
                  isLiked ? "fill-red-500 text-red-500" : "text-white hover:scale-110"
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
              <Share2 className="w-7 h-7 text-white -translate-y-2.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VideoModalWithNavigation;