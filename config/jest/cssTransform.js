// This is a custom Jest transformer turning style imports into empty objects.
module.exports = {
  process() {
    return 'module.exports = {};';
  },
  getCacheKey() {
    // The output is always stay the same.
    return 'cssTransform';
  },
};
