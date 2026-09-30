import React, { useState } from 'react';

export interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string; // e.g. "aspect-[16/10]" or "aspect-[16/9]"
  priority?: boolean;
  visualLabel?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  aspectRatio = 'aspect-[16/10]',
  priority = false,
  visualLabel = 'IMAGE REFERENCE',
  ...rest
}) => {
  const [hasError, setHasError] = useState(!src);
  const [isLoading, setIsLoading] = useState(Boolean(src));

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#04201A] ${aspectRatio} ${containerClassName}`}
    >
      {/* Fallback Graphic UI when image is missing or failed to load */}
      {hasError ? (
        <div
          role="img"
          aria-label={alt}
          className="w-full h-full p-6 flex flex-col justify-between items-center text-center bg-gradient-to-br from-[#072C24] via-[#05261F] to-[#04201A] border border-[#00DF89]/20"
        >
          {/* Top Label */}
          <div className="flex items-center justify-between w-full">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#00DF89] bg-[#00DF89]/10 px-2.5 py-1 rounded border border-[#00DF89]/30">
              {visualLabel}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8D3CB]/60">
              PORTFOLIO
            </span>
          </div>

          {/* Center Graphic Details */}
          <div className="my-auto py-4">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#00DF89]/10 border border-[#00DF89]/30 flex items-center justify-center text-[#00DF89]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide mb-1">
              Visual study for portfolio presentation
            </h4>
            <p className="text-[11px] text-[#00DF89] font-semibold tracking-widest uppercase">
              FORM · TYPE · TONE
            </p>
          </div>

          {/* Bottom Caption */}
          <div className="w-full pt-2 border-t border-white/5 text-[10px] text-[#B8D3CB]/70 truncate">
            {alt}
          </div>
        </div>
      ) : (
        <>
          {/* Loading Skeleton */}
          {isLoading && (
            <div className="absolute inset-0 bg-[#072C24] animate-pulse motion-reduce:animate-none flex items-center justify-center">
              <span className="text-xs text-[#B8D3CB] font-mono">Đang tải...</span>
            </div>
          )}

          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            className={`${className} transition-opacity duration-300 motion-reduce:transition-none ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            {...rest}
          />
        </>
      )}
    </div>
  );
};

export default SafeImage;
