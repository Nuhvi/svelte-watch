export const tagsFromLibraries = (librares) => {
  const tags = new Set();

  librares.forEach((lib) => {
    lib.tags.forEach((tag) => {
      tags.add(tag);
    });
  });

  return Array.from(tags).sort();
};

export const filterLibrariesByTags = (libraries, selectedTags) => {
  if (!libraries || !selectedTags) return libraries;

  if (!selectedTags || selectedTags.size === 0) return libraries;
  return libraries.filter((lib) => {
    for (let tag of lib.tags) {
      if (selectedTags.has(tag)) return true;
    }
    return false;
  });
};

export const filterLibrariesBySearchInput = (libraries, searchInput) => {
  if (!libraries || !searchInput || searchInput.length === 0) return libraries;

  return libraries.filter((lib) => {
    return JSON.stringify(lib).indexOf(searchInput) > 0;
  });
};
