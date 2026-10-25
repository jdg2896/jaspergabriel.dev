// Structured data (JSON-LD) for search engines. The Person's `sameAs` is
// what tells Google which profiles across the web belong to this site's
// author, so a search for the name groups them instead of strangers'.

const SITE = 'https://jaspergabriel.dev/';

export const profiles = {
  github: 'https://github.com/jdg2896',
  linkedin: 'https://www.linkedin.com/in/jaspergabriel/',
  devto: 'https://dev.to/jdg2896',
};

export const person = {
  '@type': 'Person',
  '@id': `${SITE}#person`,
  name: 'Jasper Gabriel',
  url: SITE,
  jobTitle: 'Software Engineer',
  description:
    'Software engineer specializing in backend systems and cloud infrastructure, with an interest in cryptography, zero-knowledge proofs, and cybersecurity.',
  sameAs: Object.values(profiles),
};

export const website = {
  '@type': 'WebSite',
  '@id': `${SITE}#website`,
  name: 'Jasper Gabriel',
  url: SITE,
  publisher: { '@id': person['@id'] },
};

interface BlogPostingInput {
  title: string;
  description: string;
  url: string;
  image: string;
  pubDate: Date;
  updatedDate?: Date;
  tags: string[];
}

export function blogPosting(post: BlogPostingInput) {
  return {
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: post.url,
    mainEntityOfPage: post.url,
    image: post.image,
    datePublished: post.pubDate.toISOString(),
    dateModified: (post.updatedDate ?? post.pubDate).toISOString(),
    keywords: post.tags,
    // Google reads author per page, so the name and URL go inline as well
    author: { '@id': person['@id'], '@type': 'Person', name: person.name, url: person.url },
    publisher: { '@id': person['@id'] },
  };
}

// One script per page; `<` is escaped so a title can't close the tag early
export function toJsonLd(...nodes: object[]) {
  const data = { '@context': 'https://schema.org', '@graph': nodes };
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
