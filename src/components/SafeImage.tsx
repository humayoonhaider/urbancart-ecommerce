import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackText?: string;
  containerClassName?: string;
}

// Reliable high quality default fallbacks by category or general
const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Product image',
  className = '',
  containerClassName = '',
  fallbackSrc = DEFAULT_FALLBACK,
  fallbackText,
  loading = 'lazy',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    }
  };

  const imageSrc = hasError ? fallbackSrc : (src || fallbackSrc);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-neutral-200/80 dark:bg-neutral-800 animate-pulse flex items-center justify-center z-0">
          <ImageIcon className="w-6 h-6 text-neutral-400/50 dark:text-neutral-600/50" />
        </div>
      )}

      {/* Image */}
      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />

      {/* Fallback Graphic if both primary and fallback fail */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 flex flex-col items-center justify-center p-4 text-center">
          <ImageIcon className="w-8 h-8 text-neutral-400 dark:text-neutral-500 mb-2" />
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            {fallbackText || alt || 'UrbanCart'}
          </span>
        </div>
      )}
    </div>
  );
};
