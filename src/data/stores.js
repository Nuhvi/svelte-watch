import { writable, derived } from 'svelte/store';
import librariesJson from './libraries.json';

const tagsFromLibraries = (librares) => {
  const tags = new Set();

  librares.forEach((lib) => {
    lib.tags.forEach((tag) => {
      tags.add(tag);
    });
  });

  return Array.from(tags).sort();
};

const filterLibrariesByTags = (libraries, selectedTags) => {
  if (!selectedTags || selectedTags.size === 0) return libraries;

  return libraries.filter((lib) => {
    for (let tag of lib.tags) {
      if (selectedTags.has(tag)) return true;
    }
    return false;
  });
};

// Stores
export const libraries = writable(librariesJson);
export const allTags = writable(tagsFromLibraries(librariesJson));
export const selectedTags = writable(new Set());

// Selectors
export const filteredLibraries = derived(
  [libraries, selectedTags],
  ([$libraries, $selectedTags]) =>
    filterLibrariesByTags($libraries, $selectedTags),
);

export const filteredLibrariesCount = derived(
  filteredLibraries,
  ($filteredLibraries) => $filteredLibraries.length,
);
