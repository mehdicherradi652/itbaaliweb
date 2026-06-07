import React from 'react';

interface PlaceholderProps {
  width?: number;
  height?: number;
  title?: string;
  category?: string;
  className?: string;
}

export function ImagePlaceholder({
  width = 800,
  height = 600,
  title = "Add Your Image Here",
  category = "Image",
  className = ""
}: PlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border-2 border-dashed border-gray-300 ${className}`}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-gray-600 font-semibold mb-1">{title}</p>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="text-xs text-gray-400 mt-2">{width}x{height}</p>
      </div>
    </div>
  );
}
