'use client'
import React, { useEffect } from 'react';
import { FaRotateRight } from 'react-icons/fa6';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
            <div className="flex flex-col items-center justify-center">
                {/* TV Frame */}
                <div className="relative w-[300px] h-[200px] bg-black border-[10px] border-[#333] rounded-[10px] shadow-[0_0_20px_rgba(0,0,0,0.8),inset_0_0_50px_rgba(255,255,255,0.2)] overflow-hidden">
                    {/* TV Static Screen */}
                    <div
                        className="absolute inset-0 z-1 opacity-70 animate-pulse"
                        style={{
                            background: `repeating-linear-gradient(0deg, #000, #000 1px, #111 1px, #fff 1px, #333 2px)`,
                        }}
                    />
                    {/* Error Text inside TV */}
                    <div className="absolute inset-0 flex items-center justify-center z-2 px-4 text-center">
                        <span className="text-red-500 font-bold text-base tracking-widest drop-shadow-[2px_2px_5px_black] line-clamp-3">
                            {error.message || 'Something went wrong!'}
                        </span>
                    </div>
                </div>

                {/* TV Stand */}
                <div className="w-[150px] h-[10px] bg-[#333] mt-2.5 rounded-[5px] shadow-[0_5px_10px_rgba(0,0,0,0.7)]" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-500 text-sm mb-6 max-w-md text-center">
                An unexpected error occurred while loading this page. You can try again or return home.
            </p>

            <div className="flex gap-4 items-center">
                <button
                    onClick={() => reset()}
                    className="cursor-pointer flex items-center gap-2 px-6 py-2.5 bg-[#7f5539] hover:bg-[#5b3d29] text-white font-medium text-sm rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                    <FaRotateRight className="text-xs" />
                    Try Again
                </button>
            </div>
        </div>
    );
}
