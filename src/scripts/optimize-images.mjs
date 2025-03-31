import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../../public');

async function optimizeImages() {
  try {
    // Optimizar logo para OG Image
    await sharp(path.join(publicDir, 'images/logo-camilodev.png'))
      .resize(1200, 630, {
        fit: 'contain',
        background: { r: 10, g: 10, b: 10, alpha: 1 }
      })
      .toFormat('png')
      .toFile(path.join(publicDir, 'images/og-image.png'));

    console.log('✅ Imágenes optimizadas correctamente');
  } catch (error) {
    console.error('❌ Error optimizando imágenes:', error);
  }
}

optimizeImages(); 