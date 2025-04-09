module.exports = {
    default: [
      '--require @babel/register',
      '--require src/frontend/components/**/*.steps.js',
      '--require src/frontend/pages/**/*.steps.js',
      '--require src/blockchain/migrations/**/*.steps.js',
      '--require src/blockchain/scripts/**/*.steps.js',
      'src/**/*.feature',
      '--format progress'
    ].join(' ')
  };
  