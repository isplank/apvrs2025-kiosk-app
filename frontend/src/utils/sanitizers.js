import DOMPurify from 'dompurify';

export const sanitizers = {
  sanitizeHTML: (dirty) => {
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
      ALLOWED_ATTR: [],
    });
  },

  sanitizeInput: (input) => {
    if (typeof input !== 'string') return input;
    return input
      .trim()
      .replace(/[<>]/g, '')
      .substring(0, 1000); // Limit length
  },

  sanitizeSearchQuery: (query) => {
    if (typeof query !== 'string') return '';
    return query
      .trim()
      .replace(/[^\w\s-]/gi, '')
      .substring(0, 100);
  },
};