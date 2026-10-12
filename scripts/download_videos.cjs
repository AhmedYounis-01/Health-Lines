const fs = require('fs');
const path = require('path');

const videos = [
  { name: 'hero-ambience.mp4', src: 'https://morphowater.com/assets/our-water/sky-calm-720.mp4' },
  { name: 'therapy-flow.mp4', src: 'https://morphowater.com/assets/our-water/water-rocks-720.mp4' },
  { name: 'velashape-pulse.mp4', src: 'https://morphowater.com/assets/our-water/rock-calm-720.mp4' },
  { name: 'lymphatic-water.mp4', src: 'https://morphowater.com/assets/our-water/forest-falls-720.mp4' },
  { name: 'science-droplet.mp4', src: 'https://morphowater.com/assets/our-water/rain-palms-720.mp4' },
];

const destDir = path.resolve(__dirname, '../public/videos');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

async function downloadAll() {
  for (const item of videos) {
    const destPath = path.join(destDir, item.name);
    console.log(`Downloading ${item.name} from ${item.src}...`);
    try {
      const res = await fetch(item.src);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(destPath, buffer);
      console.log(`Saved ${item.name} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
    } catch (err) {
      console.error(`Failed ${item.name}:`, err.message);
    }
  }
  console.log('ALL VIDEOS DOWNLOADED SUCCESS!');
}

downloadAll();
