import { useState, useEffect, useCallback } from 'react';
import { APP_CONFIG } from '../config/app.config';

export const useSearch = (items, searchFields) => {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    if (!query.trim() || query.length < APP_CONFIG.search.minLength) {
      setFilteredItems(items);
      return;
    }

    const searchLower = query.toLowerCase();
    const filtered = items.filter((item) => {
      return searchFields.some((field) => {
        const value = field.split('.').reduce((obj, key) => obj?.[key], item);
        return value?.toString().toLowerCase().includes(searchLower);
      });
    });

    setFilteredItems(filtered);
  }, [query, items, searchFields]);

  const handleSearch = useCallback((newQuery) => {
    setQuery(newQuery);
  }, []);

  return {
    query,
    filteredItems,
    handleSearch,
    resultCount: filteredItems.length,
  };
};