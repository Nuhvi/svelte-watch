import { writable, derived } from 'svelte/store';
import { collectionData } from 'rxfire/firestore';
import { startWith } from 'rxjs/operators';
import db from './Firebase';

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
  if (!libraries || !selectedTags) return null;

  if (!selectedTags || selectedTags.size === 0) return libraries;
  return libraries.filter((lib) => {
    for (let tag of lib.tags) {
      if (selectedTags.has(tag)) return true;
    }
    return false;
  });
};

const filterLibrariesBySearchInput = (libraries, searchInput) => {
  if (!libraries || !searchInput || searchInput.length === 0) return libraries;

  return libraries.filter((lib) => {
    return JSON.stringify(lib).indexOf(searchInput) > 0;
  });
};

const queries = {
  libraries: db.collection('libraries'),
};
// Stores
export const libraries = collectionData(queries.libraries).pipe(
  startWith(null),
);
export const allTags = derived(libraries, ($libraries) =>
  tagsFromLibraries($libraries || []),
);
export const selectedTags = writable(new Set());
export const searchInput = writable('');

// Selectors
export const filteredLibraries = derived(
  [libraries, selectedTags, searchInput],
  ([$libraries, $selectedTags, $searchInput]) =>
    filterLibrariesBySearchInput(
      filterLibrariesByTags($libraries, $selectedTags),
      $searchInput,
    ),
);

export const filteredLibrariesCount = derived(
  filteredLibraries,
  ($filteredLibraries) => $filteredLibraries.length,
);
