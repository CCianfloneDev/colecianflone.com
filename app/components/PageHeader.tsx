interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export default function PageHeader({ title, description, className = "" }: PageHeaderProps) {
  return (
    <header className={`mb-8 lg:mb-12 3xl:mb-16 ${className}`}>
      <h1 className="heading-responsive mb-4 lg:mb-6">
        {title}
      </h1>
      {description && (
        <p className="text-responsive-lg text-gray-700 dark:text-gray-300 max-w-3xl">
          {description}
        </p>
      )}
    </header>
  );
}