import type { TimelineProps } from '../types/timeline';
import TimelineItem from './TimelineItem';

export default function Timeline({ items, className = '' }: TimelineProps) {
  // Sort by start date (most recent first)
  const sortedItems = [...items].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return (
    <div className={`relative ${className}`}>
      {/* Timeline line */}
      <div className="absolute left-4 lg:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600" />
      
      <div className="space-y-8 lg:space-y-12">
        {sortedItems.map((item, index) => (
          <TimelineItem 
            key={item.id} 
            item={item} 
            isLast={index === sortedItems.length - 1}
          />
        ))}
      </div>
    </div>
  );
}