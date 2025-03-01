// scripts/create-placeholders.js
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Configuration
const sourceDir = "public/images";
const placeholderSuffix = "-placeholder";
const placeholderWidth = 20; // Very small width for initial processing
const blurAmount = 3;
const quality = 60;

// Create placeholders for all images in directory
async function createPlaceholders() {
  try {
    // Get all files in the source directory
    const files = fs.readdirSync(sourceDir);

    // Filter for image files
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
    });

    console.log(`Found ${imageFiles.length} images to process...`);

    // Process each image
    for (const file of imageFiles) {
      // Skip if already a placeholder
      if (file.includes(placeholderSuffix)) continue;

      const filePath = path.join(sourceDir, file);
      const fileExt = path.extname(file);
      const fileName = path.basename(file, fileExt);
      const outputPath = path.join(
        sourceDir,
        `${fileName}${placeholderSuffix}${fileExt}`
      );

      // Skip if placeholder already exists
      if (fs.existsSync(outputPath)) {
        console.log(`Placeholder already exists for ${file}, skipping...`);
        continue;
      }

      console.log(`Creating placeholder for ${file}...`);

      // Get original dimensions
      const metadata = await sharp(filePath).metadata();
      const aspectRatio = metadata.width / metadata.height;
      const targetHeight = Math.round(placeholderWidth / aspectRatio);

      // Create placeholder
      await sharp(filePath)
        .resize(placeholderWidth, targetHeight)
        .blur(blurAmount)
        .resize(metadata.width, metadata.height) // Resize back to original dimensions
        .jpeg({ quality })
        .toFile(outputPath);

      console.log(`Created ${outputPath}`);
    }

    console.log("All placeholders created successfully!");
  } catch (error) {
    console.error("Error creating placeholders:", error);
  }
}

createPlaceholders();
