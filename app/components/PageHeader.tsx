interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export default function PageHeader({ title, description, className = "" }: PageHeaderProps) {
  return (
    <header className={`mb-12 ${className}`}>
      <h1 className="heading-responsive mb-6">
        {title}
      </h1>
      {description && (
        <p className="text-responsive-lg text-gray-700 dark:text-gray-300">
          {description}
        </p>
      )}
    </header>
  );
}