const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

async function optimizeImages() {
  const imgDir = path.join(__dirname, '../img');
  
  try {
    // Create optimized directory if it doesn't exist
    const optimizedDir = path.join(__dirname, '../img/optimized');
    await fs.mkdir(optimizedDir, { recursive: true });

    // Get all image files
    const files = await fs.readdir(imgDir, { recursive: true });
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif)$/i.test(file) && 
      !file.includes('optimized')
    );

    console.log(`Found ${imageFiles.length} images to optimize`);

    for (const file of imageFiles) {
      const inputPath = path.join(imgDir, file);
      const outputPath = path.join(optimizedDir, file);
      
      // Create output directory if needed
      await fs.mkdir(path.dirname(outputPath), { recursive: true });

      try {
        // Optimize with sharp for better quality
        await sharp(inputPath)
          .resize(1920, null, { withoutEnlargement: true })
          .jpeg({ quality: 85, progressive: true })
          .png({ quality: 85, progressive: true })
          .toFile(outputPath);

        console.log(`Optimized: ${file}`);
      } catch (error) {
        console.error(`Error optimizing ${file}:`, error.message);
      }
    }

    // Generate WebP versions
    const optimizedFiles = await fs.readdir(optimizedDir, { recursive: true });
    const filesToConvert = optimizedFiles.filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file)
    );

    for (const file of filesToConvert) {
      const inputPath = path.join(optimizedDir, file);
      const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      try {
        await sharp(inputPath)
          .webp({ quality: 85 })
          .toFile(outputPath);
        
        console.log(`Generated WebP: ${file.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`);
      } catch (error) {
        console.error(`Error converting ${file} to WebP:`, error.message);
      }
    }

    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error during image optimization:', error);
  }
}

optimizeImages(); 