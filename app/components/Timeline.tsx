import type { TimelineProps } from '../types/timeline';
import TimelineItem from './TimelineItem';

export default function Timeline({ items, className = '' }: TimelineProps) {
  // More robust date parsing function for consistent cross-device sorting
  const parseDate = (dateString: string): Date => {
    // Month abbreviation mapping for consistent parsing
    const monthMap: { [key: string]: number } = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11,
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };

    // Handle different date formats in your data
    if (dateString.match(/^\d{4}$/)) {
      // Just year: "2021" -> January 1st of that year
      return new Date(parseInt(dateString), 0, 1);
    } else if (dateString.match(/^[A-Za-z]{3,} \d{4}$/)) {
      // Month Year: "Jan 2023" or "April 2022" -> manual parsing
      const [monthStr, yearStr] = dateString.split(' ');
      if (typeof yearStr === 'string') {
        const year = parseInt(yearStr);
        const month = monthStr && typeof monthStr === 'string' ? monthMap[monthStr as keyof typeof monthMap] : undefined;
        
        if (month !== undefined) {
          return new Date(year, month, 1);
        }
      }
    }
    
    // Fallback for other formats - but shouldn't be needed with your data
    return new Date(dateString);
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