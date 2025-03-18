const https = require('https');
const fs = require('fs');
const path = require('path');

// URL of a better royalty-free image of Ghanaian children learning to read
const imageUrl = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1122&q=80';

const imagePath = path.join(__dirname, '../public/images/ghanaian-children-reading.jpg');

// Ensure the directory exists
const dir = path.dirname(imagePath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Download the image
https.get(imageUrl, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to download image: ${response.statusCode} ${response.statusMessage}`);
    return;
  }

  const fileStream = fs.createWriteStream(imagePath);
  response.pipe(fileStream);

  fileStream.on('finish', () => {
    fileStream.close();
    console.log(`Image downloaded successfully to ${imagePath}`);
  });
}).on('error', (err) => {
  console.error(`Error downloading image: ${err.message}`);
}); 