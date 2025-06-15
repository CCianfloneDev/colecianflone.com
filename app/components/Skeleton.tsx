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
      className={`bg-gray-300 dark:bg-gray-700 rounded ${className}`}
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
        return "rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6";
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
      <div className={`${containerClass} ${className}`}>
        <div className={getVariantClasses()}>
          <div className="space-y-3">
            <SkeletonItem className="aspect-w-16 aspect-h-9 mb-4" height="12rem" />
            <SkeletonItem width="75%" height="1.5rem" />
            <SkeletonItem width="25%" height="1rem" />
            <div className="space-y-2">
              <SkeletonItem height="1rem" />
              <SkeletonItem width="83%" height="1rem" />
            </div>
            <SkeletonItem width="8rem" height="1rem" />
          </div>
        </div>
      </div>
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
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} variant="card" />
      ))}
    </div>
  );
}

export function BlogPostSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Skeleton width="8rem" height="1.5rem" />
      </div>
      <div className="space-y-4">
        <Skeleton width="75%" height="2rem" />
        <Skeleton width="25%" height="1rem" />
      </div>
      <div className="space-y-3">
        <Skeleton lines={3} />
        <Skeleton width="80%" />
      </div>
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton width="25%" height="2rem" />
      <Skeleton width="75%" lines={2} />
    </div>
  );
}