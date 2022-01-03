module.exports = {
  ci: {
    collect: {
      staticDistDir: './public',
      url: ['http://localhost:8000'],
      numberOfRuns: 5
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};