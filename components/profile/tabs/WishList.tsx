"use client";

import React, { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ExploreVideoGrid from "@/components/video/ExploreVideoGrid";
import InstaCard from "../InstaCard";

export default function SavedGallery() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // 1. Get the current active tag
    const activeTag = searchParams.get('saved');

    const sampleVideos = [
        {
            id: '1',
            thumbnailUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400',
            videoUrl: 'https://filesamples.com/samples/video/mp4/sample_640x360.mp4',
            title: 'Amazing sunset timelapse in the mountains',
            likes: 12500,
            isLiked: false,
            saved: ['Nature', 'Scenery', 'Moodboard']
        },
        {
            id: '2',
            thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
            videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
            title: 'Cooking the perfect pasta carbonara',
            likes: 8900,
            isLiked: false,
            saved: ['Recipes', 'Foodie']
        },
        {
            id: '3',
            thumbnailUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
            videoUrl: 'https://filesamples.com/samples/video/mp4/sample_1280x720.mp4',
            title: 'Street photography in Tokyo',
            likes: 15600,
            isLiked: true,
            saved: ['Photography', 'Travel', 'Inspiration']
        },
        {
            id: '4',
            thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
            videoUrl: 'https://sample-videos.com/video123/mp4/240/big_buck_bunny_480p_1mb.mp4',
            title: 'Dance performance at the studio',
            likes: 23400,
            isLiked: false,
            saved: ['Dance', 'Art']
        },
        {
            id: '5',
            thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
            videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4',
            title: 'Behind the scenes of a photoshoot',
            likes: 9800,
            isLiked: false,
            saved: ['Jewelry', 'Fashion', 'Moodboard']
        },
        {
            id: '6',
            thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
            videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-20s.mp4',
            title: 'Morning yoga routine for beginners',
            likes: 11200,
            isLiked: false,
            saved: ['Wellness', 'Health']
        },
        {
            id: '7',
            thumbnailUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
            title: 'Coffee brewing techniques',
            likes: 7600,
            isLiked: false,
            saved: ['Coffee', 'Lifestyle']
        },
        {
            id: '8',
            thumbnailUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
            title: 'Urban exploration adventure',
            likes: 18900,
            isLiked: false,
            saved: ['Adventure', 'Travel']
        },
        {
            id: '9',
            thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
            title: 'DIY home decor ideas',
            likes: 14200,
            isLiked: false,
            saved: ['DIY', 'Home', 'Moodboard']
        },
    ];

    // 2. Updated navigation to PRESERVE existing parameters
    const updateSavedParam = (tagName: string | null) => {
        // Create a copy of current params
        const params = new URLSearchParams(searchParams.toString());

        if (tagName) {
            params.set('saved', tagName); // Adds/Updates 'saved' without touching others
        } else {
            params.delete('saved'); // Removes 'saved' to go back
        }

        router.push(`?${params.toString()}`, { scroll: false });
    };

    const filteredVideos = useMemo(() => {
        if (!activeTag) return [];
        return sampleVideos.filter(video => 
            video.saved.some(tag => tag.toLowerCase() === activeTag.toLowerCase())
        );
    }, [activeTag, sampleVideos]);

    const allTags = Array.from(new Set(sampleVideos.flatMap(v => v.saved)));

    return (
        <div className="min-h-screen dark:bg-zinc-950 py-0 text-white xl:px-[20%]">
            
            {!activeTag ? (
                /* VIEW 1: THE FOLDERS */
                <div className="animate-in fade-in duration-300">
                    <div className="mb-4 px-2">
                        <h2 className="text-2xl text-black">{"Your Collections".toUpperCase()}</h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
                        {allTags.map(tag => (
                            <div key={tag} onClick={() => updateSavedParam(tag)}>
                                <InstaCard 
                                    title={tag} 
                                    id={tag} 
                                    thumbnailUrl={sampleVideos.find(v => v.saved.includes(tag))?.thumbnailUrl}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                /* VIEW 2: THE FILTERED VIDEOS */
                <div className="animate-in slide-in-from-right-4 duration-300">
                    <div className="flex items-center gap-4 mb-4">
                        <div>
                            <h2 className="text-2xl text-black">{activeTag.toUpperCase()}</h2>
                        </div>
                    </div>

                </div>
            )}
            <ExploreVideoGrid videos={filteredVideos} />
        </div>
    );
}