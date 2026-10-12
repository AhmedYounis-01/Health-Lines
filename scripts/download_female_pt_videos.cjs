const fs = require('fs');
const path = require('path');

const femaleVideos = [
  {
    name: 'pt-hero-clinic.mp4',
    url: 'https://assets.mixkit.co/videos/33001/33001-720.mp4',
    title: "Woman receiving relaxing therapeutic massage in clinic suite"
  },
  {
    name: 'pt-therapy-spine.mp4',
    url: 'https://assets.mixkit.co/videos/13064/13064-720.mp4',
    title: "Female Physiotherapist working on a woman's back pain and spine"
  },
  {
    name: 'pt-velashape-contour.mp4',
    url: 'https://assets.mixkit.co/videos/52154/52154-720.mp4',
    title: "Skilled female therapist using advanced body contouring device"
  },
  {
    name: 'pt-lymphatic-drainage.mp4',
    url: 'https://assets.mixkit.co/videos/27918/27918-720.mp4',
    title: "Woman having gentle restorative lymphatic body massage"
  },
  {
    name: 'pt-body-science.mp4',
    url: 'https://assets.mixkit.co/videos/13061/13061-720.mp4',
    title: "Physiotherapeutic rehabilitation massage for young woman"
  }
];

const destDir = path.resolve(__dirname, '../public/videos');

async function downloadAll() {
  console.log('Downloading 100% female-only physical therapy videos...');
  for (const item of femaleVideos) {
    const destPath = path.join(destDir, item.name);
    console.log(`Starting ${item.name} (${item.title})...`);
    try {
      const res = await fetch(item.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(destPath, buffer);
      console.log(`✓ Saved ${item.name} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
    } catch (e) {
      console.error(`✕ Failed ${item.name}:`, e.message);
    }
  }
  console.log('ALL FEMALE PHYSICAL THERAPY VIDEOS COMPLETED!');
}

downloadAll();
