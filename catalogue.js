/* A single, shared catalogue builder for the browser and validation. */
(function(root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory;
  else root.COMPASS_CATALOGUE = factory(root.Compass, root.COMPASS_SEEDS, root.COMPASS_ENRICHMENT,
    [root.COMPASS_BROAD_SEEDS, root.COMPASS_MORE_A, root.COMPASS_MORE_B, root.COMPASS_MORE_C, root.COMPASS_DIRECTORY]);
})(globalThis, function(C, original = [], enrichment = {}, groups = []) {
  const combined = original.map(record => {
    const patch = enrichment[record.id] || {};
    return {...record, ...patch, sources: [...(record.sources || []), ...(patch.sources || [])]};
  }).concat(...groups.filter(Array.isArray));
  const seen = new Set();
  return combined.map(record => {
    const clean = C.cleanRecord(record);
    if (seen.has(clean.id)) throw new Error('重复的导师记录 ID：' + clean.id);
    seen.add(clean.id);
    return clean;
  });
});
