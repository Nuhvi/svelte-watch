import { writable, derived } from 'svelte/store';
import librariesJson from './libraries.json';

const tagsFromLibraries = (librares) => {
  const tags = {};

  librares.forEach((library) => {
    library.tags.forEach((tag) => {
      tags[tag] = { isSelected: false };
    });
  });

  return tags;
};

export const libraries = writable(librariesJson);
export const tags = derived(libraries, ($libraries) =>
  tagsFromLibraries($libraries),
);
