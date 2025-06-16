import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "rectangular" | "circular" | "card";
  width?: string | number;
  height?: string | number;
  lines?: number;
  animate?: boolean;
}

interface SkeletonItemProps {
  className?: string;
  width?: string | number | undefined;
  height?: string | number | undefined;
}

// Base skeleton item component
export function SkeletonItem({ className = "", width, height }: SkeletonItemProps) {
  const style = {
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
  };

  return (
    <div
      className={`bg-gray-300 dark:bg-gray-700 rounded animate-pulse ${className}`}
      style={style}
    />
  );
}

// Main skeleton component with presets
export default function Skeleton({ 
  className = "", 
  variant = "text", 
  width, 
  height, 
  lines = 1,
  animate = true 
}: SkeletonProps) {
  const containerClass = animate ? "animate-pulse" : "";

  const getVariantClasses = () => {
    switch (variant) {
      case "circular":
        return "rounded-full";
      case "rectangular":
        return "rounded-lg";
      case "card":
        return "rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800";
      default:
        return "rounded";
    }
  };

  const getDefaultDimensions = () => {
    switch (variant) {
      case "text":
        return { width: width || "100%", height: height || "1rem" };
      case "circular":
        return { width: width || "3rem", height: height || "3rem" };
      case "rectangular":
        return { width: width || "100%", height: height || "12rem" };
      case "card":
        return { width: width || "100%", height: height || "auto" };
      default:
        return { width, height };
    }
  };

  const dimensions = getDefaultDimensions();

  if (variant === "card") {
    return (
      <li className={className}>
        <div className="p-4 lg:p-6 rounded-lg border border-gray-200 dark:border-gray-700 
                       bg-white dark:bg-gray-800 transition-all duration-200">
          <div className="block spacing-responsive">
            {/* Blog post image skeleton - using modern aspect ratio */}
            <div className="aspect-[16/9] mb-3 lg:mb-4 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
              <SkeletonItem className="w-full h-full !animate-none" />
            </div>
            
            {/* Title skeleton - matches text-responsive-xl: text-xl lg:text-2xl */}
            <SkeletonItem className="h-7 lg:h-8 mb-2" width="85%" />
            
            {/* Date skeleton */}
            <SkeletonItem className="h-4 mb-3" width="30%" />
            
            {/* Description and read time in spacing-responsive container */}
            <div className="spacing-responsive">
              {/* Description skeleton */}
              <div className="space-y-2">
                <SkeletonItem className="h-4 lg:h-5" width="100%" />
                <SkeletonItem className="h-4 lg:h-5" width="90%" />
                <SkeletonItem className="h-4 lg:h-5" width="75%" />
              </div>
              
              {/* Read time skeleton */}
              <div className="flex items-center gap-2">
                <SkeletonItem className="h-3 w-3 rounded-full !animate-none" />
                <SkeletonItem className="h-3" width="4rem" />
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }

  if (lines > 1) {
    return (
      <div className={`${containerClass} space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <SkeletonItem
            key={index}
            className={getVariantClasses()}
            width={index === lines - 1 ? "75%" : dimensions.width}
            height={dimensions.height}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`${containerClass} ${className}`}>
      <SkeletonItem
        className={getVariantClasses()}
        width={dimensions.width}
        height={dimensions.height}
      />
    </div>
  );
}

// Preset skeleton layouts
export function BlogListSkeleton() {
  return (
    <ul className="spacing-responsive">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} variant="card" />
      ))}
    </ul>
  );
}

export function BlogPostSkeleton() {
  return (
    <div className="spacing-responsive">
      {/* Back button skeleton - matches Button component */}
      <div className="flex items-center mb-6">
        <SkeletonItem className="h-10 px-4 rounded-md" width="12rem" />
      </div>

      {/* Header skeleton - matches BlogPost header */}
      <div className="mb-8">
        {/* Title skeleton - matches heading-responsive */}
        <SkeletonItem className="h-12 lg:h-16 mb-4" width="80%" />
        {/* Date skeleton - matches text-responsive-lg */}
        <SkeletonItem className="h-6 lg:h-7" width="25%" />
      </div>

      {/* Content skeleton - matches prose layout */}
      <div className="space-y-4">
        <SkeletonItem className="h-5" width="100%" />
        <SkeletonItem className="h-5" width="95%" />
        <SkeletonItem className="h-5" width="88%" />
        <SkeletonItem className="h-5" width="92%" />
        <div className="py-2" />
        <SkeletonItem className="h-5" width="90%" />
        <SkeletonItem className="h-5" width="85%" />
        <SkeletonItem className="h-5" width="78%" />
      </div>
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="mb-8 lg:mb-12">
      {/* Title skeleton - matches heading-responsive */}
      <SkeletonItem className="h-12 lg:h-16 mb-4 lg:mb-6" width="60%" />
      {/* Description skeleton */}
      <div className="space-y-2">
        <SkeletonItem className="h-6 lg:h-7" width="85%" />
        <SkeletonItem className="h-6 lg:h-7" width="65%" />
      </div>
    </div>
  );
}