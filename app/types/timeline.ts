export interface TimelineItem {
  id: string;
  type: 'work' | 'education' | 'certification' | 'project';
  
  // Common fields
  title: string;
  location: string;
  startDate: string; // YYYY-MM format
  endDate: string | null; // null if current
  current: boolean;
  description: string;
  skills: string[];
  image: {
    url: string;
    alt: string;
  };
  website?: string | undefined;
  
  // Work-specific fields
  company?: string | undefined;
  achievements?: string[] | undefined;
  
  // Education-specific fields  
  institution?: string | undefined;
  degree?: string | undefined;
  gpa?: string | undefined;
  
  // Certification-specific fields
  issuer?: string | undefined;
  credentialId?: string | undefined;
  
  // Project-specific fields
  technologies?: string[] | undefined;
  repository?: string | undefined;
  demo?: string | undefined;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string | undefined;
}

export interface TimelineItemProps {
  item: TimelineItem;
  isLast: boolean;
}