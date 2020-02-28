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
      return selectedTags.has(tag);
    }
  });
};

// Stores
export const libraries = writable(librariesJson);
export const tags = writable(tagsFromLibraries(librariesJson));
export const selectedTags = writable(new Set());

// Selectors
export const filteredLibraries = derived(
  [libraries, selectedTags],
  ([$libraries, $selectedTags]) =>
    filterLibrariesByTags($libraries, $selectedTags),
);

export const notSelectedTags = derived(
  [tags, selectedTags],
  ([$tags, $selectedTags]) => $tags.filter((tag) => !$selectedTags.has(tag)),
);

export const sortedSelectedTags = derived(selectedTags, ($selectedTags) =>
  Array.from($selectedTags).sort(),
);
