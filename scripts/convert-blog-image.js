import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertImage(inputFile, slug) {
  const sizes = [
    { width: 400, suffix: 'small' },
    { width: 800, suffix: 'medium' },
    { width: 1200, suffix: 'large' }
  ];

  const outputDir = path.join(__dirname, '../public/blog-images');
  
  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    await Promise.all(sizes.map(size => {
      const outputFile = path.join(outputDir, `${slug}-${size.suffix}.webp`);
      return sharp(inputFile)
        .resize(size.width)
        .webp({ quality: 80 })
        .toFile(outputFile);
    }));

    console.log(`✅ Converted ${slug} images`);
    return true;
  } catch (error) {
    console.error(`❌ Error converting ${slug}:`, error);
    return false;
  }
}

// Convert all images in .src-images that match blog slugs
async function processAllImages() {
  const srcDir = path.join(__dirname, '../.src-images');
  const blogDir = path.join(__dirname, '../public/blog');
  
  try {
    const blogFiles = fs.readdirSync(blogDir)
      .filter(f => f.endsWith('.md'))
      .map(f => f.replace('.md', ''));

    for (const slug of blogFiles) {
      const possibleExtensions = ['.png', '.jpg', '.jpeg'];
      for (const ext of possibleExtensions) {
        const srcImage = path.join(srcDir, `${slug}${ext}`);
        if (fs.existsSync(srcImage)) {
          await convertImage(srcImage, slug);
          break;
        }
      }
    }
  } catch (error) {
    console.error('Error processing images:', error);
    process.exit(1);
  }
}

processAllImages();