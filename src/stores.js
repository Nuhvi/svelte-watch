import { writable, derived } from 'svelte/store';
import getData from './utils/getData';
import {
  tagsFromLibraries,
  filterLibrariesByTags,
  filterLibrariesBySearchInput,
} from './utils/storeHelpers';

// Stores
export let libraries = writable(null);
getData().then((storageData) => {
  libraries.set(storageData);
});

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
