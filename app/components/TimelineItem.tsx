import React from 'react';
import type { TimelineItemProps } from '../types/timeline';
import Button from './Button';

export default function TimelineItem({ item, isLast }: TimelineItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString + '-01'); // Add day for parsing
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getTypeIcon = () => {
    switch (item.type) {
      case 'work':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2H10a2 2 0 00-2-2V6m8 0h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2" />
          </svg>
        );
      case 'education':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        );
      case 'certification':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
    }
  };

  const getTypeColor = () => {
    switch (item.type) {
      case 'work': return 'bg-blue-500 dark:bg-blue-400';
      case 'education': return 'bg-green-500 dark:bg-green-400';
      case 'certification': return 'bg-purple-500 dark:bg-purple-400';
      default: return 'bg-gray-500 dark:bg-gray-400';
    }
  };

  return (
    <div className="relative flex items-start group">
      {/* Timeline node */}
      <div className={`relative z-10 flex items-center justify-center w-8 h-8 lg:w-12 lg:h-12 rounded-full ${getTypeColor()} text-white shadow-lg group-hover:scale-110 transition-transform duration-200`}>
        {getTypeIcon()}
      </div>

      {/* Content card */}
      <div className="ml-6 lg:ml-8 flex-1">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 lg:p-6 hover:shadow-xl transition-shadow duration-200">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <img 
                  src={item.image.url} 
                  alt={item.image.alt}
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded object-contain"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm lg:text-base font-medium text-blue-600 dark:text-blue-400">
                    {item.company || item.institution || item.issuer}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {item.location}
              </p>
            </div>
            
            {/* Date range and current badge */}
            <div className="flex flex-col items-start lg:items-end gap-2">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {formatDate(item.startDate)} - {item.current ? 'Present' : formatDate(item.endDate!)}
              </div>
              {item.current && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Current
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            {item.description}
          </p>

          {/* Achievements */}
          {item.achievements && item.achievements.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Key Achievements:
              </h4>
              <ul className="space-y-1">
                {item.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-green-500 mt-1 flex-shrink-0">•</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          {item.skills && item.skills.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Skills & Technologies:
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Website link */}
          {item.website && (
            <div className="flex justify-end">
              <Button
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                className="text-sm"
              >
                Learn More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}