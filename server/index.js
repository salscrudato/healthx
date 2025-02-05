import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import webPush from 'web-push';

// 1. Express App Configuration
const app = express();
app.use(cors());
app.use(express.json());

// 2. OpenAI Configuration (Your "gpt-3.5-turbo-instruct" usage)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 3. Completions Endpoint (/api/ask)
app.post('/api/ask', async (req, res) => {
  try {
    const userPrompt = req.body.message?.trim() || "Write a 1-sentence poem about the color purple.";

    console.log("User Prompt:", userPrompt);

    // A short “role-like” preamble to steer the model
    const formattedPrompt = `You are a helpful, friendly assistant. Respond to the following in plain English:\n\n${userPrompt}\n\nAnswer:`;

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct", // Using instruct variant
      prompt: formattedPrompt,
      max_tokens: 50,
      temperature: 0.7,
    });

    console.log("OpenAI API Response:", JSON.stringify(response, null, 2));

    const resultText = response.choices?.[0]?.text?.trim() || "(No output)";
    res.json({ message: resultText });
  } catch (error) {
    console.error('Error in OpenAI API call:', error);
    res.status(500).json({ error: error.toString() });
  }
});

// 4. web-push Setup with VAPID Keys
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || '';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || '';

webPush.setVapidDetails(
  'mailto:you@example.com', // replace with your email
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

// Store push subscriptions (in-memory for MVP)
let subscriptions = [];

// 4A. Subscribe Route
app.post('/api/subscribe', (req, res) => {
  try {
    const subscription = req.body;
    // In production, store this in a DB keyed by user ID
    subscriptions.push(subscription);
    console.log('New subscription added:', subscription.endpoint);
    res.status(201).json({ message: 'Subscription stored' });
  } catch (error) {
    console.error('Error saving subscription:', error);
    res.status(500).json({ error: error.toString() });
  }
});

/**
 * Notify all subscribers that a new photo has been added.
 */
function notifyNewPhoto(filename) {
  const payload = JSON.stringify({
    title: 'New Photo Uploaded',
    body: 'A new memory was just added to the ScrapBook!',
    icon: '/icons/icon-192.png', // or a fallback icon path
    filename,
  });

  console.log(`Sending push to ${subscriptions.length} subscribers...`);

  subscriptions.forEach((sub) => {
    webPush.sendNotification(sub, payload).catch((err) => {
      console.error('Push error:', err);
    });
  });
}

// 5. ScrapBook Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// In-memory store for scrapbook entries
let scrapbook = [];

// 5A. Upload Endpoint
app.post('/api/scrapbook', upload.single('photo'), (req, res) => {
  try {
    const { comment } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const entry = {
      comment: comment || '',
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`,
      timestamp: new Date().toISOString(),
    };
    scrapbook.push(entry);

    // After adding the photo, send push notifications
    notifyNewPhoto(req.file.filename);

    res.json({
      message: 'Photo uploaded successfully!',
      entry,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.toString() });
  }
});

// 5B. Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 5C. Get ScrapBook Entries
app.get('/api/scrapbook', (req, res) => {
  res.json(scrapbook);
});

// 6. Start the Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import multer from 'multer';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import OpenAI from 'openai';

// // 1. Express App Configuration
// const app = express();
// app.use(cors());
// app.use(express.json());

// // 2. OpenAI Configuration (Your "gpt-3.5-turbo-instruct" usage)
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // 3. Completions Endpoint (/api/ask)
// //    We’ll explicitly craft the prompt to reduce random code outputs.
// app.post('/api/ask', async (req, res) => {
//   try {
//     const userPrompt = req.body.message?.trim() || "Write a 1-sentence poem about the color purple.";

//     console.log("User Prompt:", userPrompt);

//     // Provide a short “role-like” preamble in the prompt to steer the model
//     const formattedPrompt = `You are a helpful, friendly assistant. Respond to the following in plain English:\n\n${userPrompt}\n\nAnswer:`;

//     const response = await openai.completions.create({
//       model: "gpt-3.5-turbo-instruct", // Using the instruct variant
//       prompt: formattedPrompt,
//       max_tokens: 50,
//       temperature: 0.7,
//     });

//     console.log("OpenAI API Response:", JSON.stringify(response, null, 2));

//     const resultText = response.choices?.[0]?.text?.trim() || "(No output)";
//     res.json({ message: resultText });
//   } catch (error) {
//     console.error('Error in OpenAI API call:', error);
//     res.status(500).json({ error: error.toString() });
//   }
// });

// // 4. ScrapBook Setup
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, 'uploads'));
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + '-' + file.originalname;
//     cb(null, uniqueName);
//   }
// });
// const upload = multer({ storage });

// // In-memory store for scrapbook entries
// let scrapbook = [];

// // 4A. Upload Endpoint
// app.post('/api/scrapbook', upload.single('photo'), (req, res) => {
//   try {
//     const { comment } = req.body;
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded.' });
//     }

//     const entry = {
//       comment: comment || '',
//       filename: req.file.filename,
//       url: `/uploads/${req.file.filename}`,
//     };
//     scrapbook.push(entry);

//     res.json({
//       message: 'Photo uploaded successfully!',
//       entry,
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ error: error.toString() });
//   }
// });

// // 4B. Serve uploads folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // 4C. Get ScrapBook Entries
// app.get('/api/scrapbook', (req, res) => {
//   res.json(scrapbook);
// });

// // 5. Start the Server
// const PORT = process.env.PORT || 5050;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });