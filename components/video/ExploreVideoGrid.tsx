'use client';

import React, { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import VideoCard from './VideoCard';
import VideoModalWithNavigation from './Videomodalwithnavigation';

export interface Video {
  id: string;
  thumbnailUrl: string;
  videoUrl: string;
  title: string;
  likes: number;
  isLiked?: boolean;
}

interface ExploreVideoGridProps {
  videos: Video[];
  enableScroll?: boolean;
  enableNavigation?: boolean;
}

const ExploreVideoGrid: React.FC<ExploreVideoGridProps> = ({ 
  videos, 
  enableScroll = false,
  enableNavigation = true 
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Get the current video URL from the query parameter
  const activeVideoUrl = searchParams.get('video');
  
  // 2. ROBUST FIND: Check both exact match and decoded match to handle browser encoding quirks
  const selectedVideoId = activeVideoUrl 
    ? videos.find((v) => {
        // Option A: Exact match
        if (v.videoUrl === activeVideoUrl) return true;
        // Option B: Try decoding the video URL from data (in case data is encoded but param isn't)
        if (decodeURIComponent(v.videoUrl) === activeVideoUrl) return true;
        // Option C: The activeUrl might be encoded differently by the browser
        try {
           return v.videoUrl === decodeURIComponent(activeVideoUrl);
        } catch {
           return false;
        }
    })?.id || null
    : null;

  const handleVideoClick = useCallback((videoId: string) => {
    const video = videos.find((v) => v.id === videoId);
    if (video) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set('video', video.videoUrl);
      router.push(`${pathname}?${current.toString()}`, { scroll: false });
    }
  }, [router, pathname, searchParams, videos]);

  const handleCloseModal = useCallback(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete('video');
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  }, [router, pathname, searchParams]);

  const handleLike = useCallback((videoId: string) => {
    console.log('Liked video:', videoId);
  }, []);

  const handleShare = useCallback((videoId: string) => {
    console.log('Shared video:', videoId);
  }, []);

  if (enableScroll) {
    return (
      <>
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 px-4 pb-4 md:grid md:grid-cols-3 md:gap-1 md:max-w-[935px] md:mx-auto md:px-0">
            {videos.map((video) => (
              <div key={video.id} className="flex-shrink-0 w-[45vw] md:w-auto ">
                <VideoCard
                  video={video}
                  onClick={() => handleVideoClick(video.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {selectedVideoId && enableNavigation && (
          <VideoModalWithNavigation
            videos={videos}
            initialVideoId={selectedVideoId}
            onClose={handleCloseModal}
            onLike={handleLike}
            onShare={handleShare}
          />
        )}

        <style jsx global>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-0.5 md:gap-1 w-full md:max-w-[100%] mx-auto">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => handleVideoClick(video.id)}
          />
        ))}
      </div>

      {selectedVideoId && enableNavigation && (
        <VideoModalWithNavigation
          videos={videos}
          initialVideoId={selectedVideoId}
          onClose={handleCloseModal}
          onLike={handleLike}
          onShare={handleShare}
        />
      )}
    </>
  );
};

export default ExploreVideoGrid;