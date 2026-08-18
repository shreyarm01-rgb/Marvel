const fs = require('fs');
const path = require('path');

// Read JPG files and check their headers/dimensions and look for white letterboxes/borders
const filesToCheck = [
  "public/images/Phase 2/Iron Man 3.jpg",
  "public/images/Phase 2/Thor Dark World.jpg",
  "public/images/Phase 3/Dr Strange.jpg",
  "public/images/Phase 4/No Way Home.jpg",
  "public/images/Phase 5/Agatha All Along.jpg",
  "public/images/Phase 5/Daredevil Born Again S1.jpg",
  "public/images/Daredevil.jpg",
  "public/images/Phase 5/Ant Man and Wasp Kang.jpg"
];

for (const relPath of filesToCheck) {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log("NOT FOUND:", relPath);
    continue;
  }
  const buffer = fs.readFileSync(fullPath);
  console.log("EXISTS:", relPath, "size:", buffer.length);
}
