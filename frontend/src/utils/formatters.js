export const formatters = {
  formatAuthors: (entry) => {
    const authors = [];

    if (entry.first_author_first_name && entry.first_author_last_name) {
      authors.push(
        `${entry.first_author_title || ''} ${entry.first_author_first_name} ${
          entry.first_author_last_name
        }`.trim()
      );
    }

    for (let i = 2; i <= 6; i++) {
      const firstName = entry[`author${i}_first_name`];
      const lastName = entry[`author${i}_last_name`];
      if (firstName && lastName) {
        authors.push(
          `${entry[`author${i}_title`] || ''} ${firstName} ${lastName}`.trim()
        );
      }
    }

    return authors.length > 0 ? authors.join(', ') : 'No authors listed';
  },

  formatDate: (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  getMediaUrl: (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return path;
  },
};