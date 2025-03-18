const https = require('https');
const fs = require('fs');
const path = require('path');

// URL for the image of a black child reading/holding a book
const imageUrl = 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80';

const imagePath = path.join(__dirname, '../public/images/background.jpg');

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
    console.log(`Background image downloaded successfully to ${imagePath}`);
  });
}).on('error', (err) => {
  console.error(`Error downloading image: ${err.message}`);
}); 