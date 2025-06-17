import type { TimelineProps } from '../types/timeline';
import TimelineItem from './TimelineItem';

export default function Timeline({ items, className = '' }: TimelineProps) {
  // Custom date parsing function for consistent sorting
  const parseDate = (dateString: string): Date => {
    // Handle different date formats in your data
    if (dateString.match(/^\d{4}$/)) {
      // Just year: "2021" -> January 1st of that year
      return new Date(parseInt(dateString), 0, 1);
    } else if (dateString.match(/^[A-Za-z]{3} \d{4}$/)) {
      // Month Year: "Jan 2023" -> parse normally
      return new Date(dateString);
    } else if (dateString.match(/^[A-Za-z]{3,} \d{4}$/)) {
      // Full month name: "December 2023" -> parse normally  
      return new Date(dateString);
    } else {
      // Fallback for other formats
      return new Date(dateString);
    }
  };

  // Sort by start date (most recent first) with consistent date parsing
  const sortedItems = [...items].sort((a, b) => {
    const dateA = parseDate(a.startDate);
    const dateB = parseDate(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className={`relative ${className}`}>
      {/* Timeline line */}
      <div className="absolute left-4 lg:left-6 top-8 lg:top-12 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600" />
      
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