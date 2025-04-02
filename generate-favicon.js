const favicons = require('favicons');
const fs = require('fs');
const path = require('path');

// Source image
const source = path.resolve(__dirname, 'public/apple-logo.png');
const configuration = {
  path: '/public', // Path for overriding default icons path
  appName: 'Macbook Simulator', // Your application's name
  icons: {
    // Platform Options:
    // - offset - offset in percentage
    // - background:
    //   * false - transparent
    //   * true - white background
    //
    favicon: true, // Create a browser favicon
    android: false,
    appleIcon: false,
    appleStartup: false,
    windows: false,
    yandex: false,
  },
};

const callback = function (error, response) {
  if (error) {
    console.log(error.message);
    return;
  }

  // Create and write favicon to the public directory
  const favicon = response.images.find(img => img.name === 'favicon.ico');
  if (favicon) {
    fs.writeFileSync(
      path.resolve(__dirname, 'public/favicon.ico'),
      favicon.contents
    );
    console.log('Favicon created successfully!');
  }
};

favicons(source, configuration, callback); 