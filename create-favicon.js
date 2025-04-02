const fs = require('fs');
const { createCanvas } = require('canvas');

// Create a 16x16 canvas (standard favicon size)
const canvas = createCanvas(16, 16);
const ctx = canvas.getContext('2d');

// Draw a simple apple-like shape
ctx.fillStyle = 'rgba(0, 0, 0, 0)'; // transparent background
ctx.fillRect(0, 0, 16, 16);

// Draw the apple silhouette
ctx.fillStyle = 'rgb(0, 0, 0)'; // black
ctx.beginPath();
ctx.arc(8, 8, 7, 0, Math.PI * 2); // Draw a circle
ctx.fill();

// Convert to PNG buffer
const buffer = canvas.toBuffer('image/png');

// Save the PNG as favicon.ico (browsers will accept PNG files with .ico extension)
fs.writeFileSync('public/favicon.ico', buffer);
console.log('Favicon created successfully!'); 