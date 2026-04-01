import { useState, useEffect, useRef } from 'react';
import { Loader2, ImageOff } from 'lucide-react';

// Image Skeleton Loader
export function ImageSkeleton({ className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-gray-800 animate-pulse ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-700" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gray-600 animate-spin" />
      </div>
    </div>
  );
}

// Lazy Image Component with loading state
export function LazyImage({ 
  src, 
  alt, 
  onClick, 
  className = '',
  aspectRatio = 'aspect-video',
  showHoverOverlay = true,
  hoverIcon: HoverIcon,
  objectFit = 'object-cover'
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative overflow-hidden bg-gray-800 ${aspectRatio} ${className}`}>
      {isLoading && !hasError && (
        <ImageSkeleton className="absolute inset-0" />
      )}
      
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800">
          <ImageOff className="w-6 h-6 text-gray-600 mb-1" />
          <span className="text-gray-500 text-xs">Failed to load</span>
        </div>
      ) : (
        isVisible && (
          <img
            src={src}
            alt={alt}
            onClick={onClick}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            className={`w-full h-full ${objectFit} transition-all duration-500 ${
              onClick ? 'cursor-pointer' : ''
            } ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            loading="lazy"
            decoding="async"
          />
        )
      )}
      
      {/* Hover Overlay */}
      {showHoverOverlay && !hasError && HoverIcon && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-10 h-10 bg-primary/90 rounded-full flex items-center justify-center sm:w-12 sm:h-12">
              <HoverIcon className="w-5 h-5 text-white sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple Loading Spinner for pages
export function LoadingSpinner({ text = "Loading...", subtext }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <div className="relative">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-gray-700 border-t-primary rounded-full animate-spin" />
        <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-transparent border-t-secondary rounded-full animate-spin" style={{ animationDuration: '1.5s' }} />
      </div>
      <p className="text-gray-400 mt-4 text-sm animate-pulse text-center px-4">{text}</p>
      {subtext && (
        <p className="text-gray-600 mt-2 text-xs text-center px-4">{subtext}</p>
      )}
      <div className="mt-6 flex gap-2">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}
