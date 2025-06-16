type BaseSchema<T> = T & {
  "@context": "https://schema.org";
};

// For nested use without @context
export type PersonType = {
  "@type": "Person";
  name: string;
  url: string;
  jobTitle?: string;
  sameAs?: string[];
  worksFor?: {
    "@type": "Organization";
    name: string;
  };
  alumniOf?: Array<{
    "@type": "EducationalOrganization";
    name: string;
  }>;
};

// For root-level use with @context
export type PersonSchema = BaseSchema<PersonType>;

export type BlogPostType = {
  "@type": "BlogPosting";
  headline: string;
  description?: string;
  datePublished: string;
  url: string;
  image?: string[];
  author: PersonType;
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
};

export type BlogPostSchema = BaseSchema<BlogPostType>;

export type WebSiteSchema = BaseSchema<{
  "@type": "WebSite";
  name: string;
  url: string;
  description?: string;
  author: PersonType;
}>;

export type CollectionPageSchema = BaseSchema<{
  "@type": "CollectionPage";
  name: string;
  description: string;
  url: string;
  author: PersonType;
  about?: {
    "@type": "CreativeWork";
    name: string;
    description: string;
  };
  hasPart?: BlogPostType[];
}>;

export type ContactPageSchema = BaseSchema<{
  "@type": "ContactPage";
  name: string;
  description: string;
  url: string;
  mainEntity: {
    "@type": "Person";
    name: string;
    email: string;
    url: string;
  };
}>;