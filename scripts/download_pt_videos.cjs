const fs = require('fs');
const path = require('path');

const ptVideos = [
  {
    name: 'pt-hero-clinic.webm',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Massage_Therapy_Swedish_%28Preparation_before_the_massage-_Warm_up%29_%28TESDA%29.webm',
  },
  {
    name: 'pt-therapy-spine.webm',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Massage_Therapy_Swedish_%28Pre-massage-_Client_Assessment_-_Range_of_Motion%29_%28TESDA%29.webm',
  },
  {
    name: 'pt-velashape-contour.webm',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Massage_Therapy_Swedish_%28Basic_Stroke-_Vibration%29_%28TESDA%29.webm',
  },
  {
    name: 'pt-lymphatic-drainage.webm',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Massage_Therapy_Swedish_%28Supine_Position_-_Trunk%29_%28TESDA%29.webm',
  },
  {
    name: 'pt-body-science.webm',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Massage_Therapy_Swedish_%28Pre-massage-_Client_Assessment_-_Palpation_assessment%29_%28TESDA%29.webm',
  },
];

const destDir = path.resolve(__dirname, '../public/videos');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

async function downloadPTVideos() {
  for (const item of ptVideos) {
    const destPath = path.join(destDir, item.name);
    console.log(`Downloading physical therapy video ${item.name}...`);
    try {
      const res = await fetch(item.url, {
        headers: {
          'User-Agent': 'HealthLinesCenter/1.0 (https://healthlinescenter.com; info@healthlinescenter.com)',
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(destPath, buffer);
      console.log(`Saved ${item.name} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
    } catch (err) {
      console.error(`Failed ${item.name}:`, err.message);
    }
  }
  console.log('ALL PHYSICAL THERAPY VIDEOS DOWNLOADED SUCCESS!');
}

downloadPTVideos();
