const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
  {
    id: 'cian_clarke',
    url: 'https://github.com/cianclarke.png',
    filename: 'cian_clarke.png',
  },
];

const outputDir = path.join(__dirname, '..', 'src', 'images', 'people');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const downloadFile = (url, destination) =>
  new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      if (response.statusCode !== 200) {
        response.resume();
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(destination);
      response.pipe(fileStream);
      fileStream.on('finish', () => fileStream.close(resolve));
    });
    request.on('error', reject);
  });

const run = async () => {
  ensureDir(outputDir);
  for (const image of images) {
    const outputPath = path.join(outputDir, image.filename);
    if (fs.existsSync(outputPath)) {
      console.log(`Profile image exists, skipping: ${image.id}`);
      continue;
    }
    console.log(`Downloading profile image: ${image.id}`);
    try {
      await downloadFile(image.url, outputPath);
    } catch (error) {
      console.warn(`Unable to download ${image.id}, skipping.`, error);
    }
  }
};

run();
