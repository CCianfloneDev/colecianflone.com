import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  target?: string;
  rel?: string;
  'aria-label'?: string;
}

export default function Button({ 
  variant = 'primary', 
  size = 'md',
  children, 
  onClick, 
  href,
  className = '',
  target,
  rel,
  'aria-label': ariaLabel
}: ButtonProps) {
  const baseClasses = "font-medium transition-colors cursor-pointer inline-flex items-center gap-2";
  
  const variants = {
    primary: "link-primary",
    secondary: "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
  };
  
  const sizes = {
    sm: "text-sm lg:text-base",
    md: "text-base lg:text-lg", 
    lg: "text-responsive-lg"
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a 
        href={href} 
        className={classes}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}