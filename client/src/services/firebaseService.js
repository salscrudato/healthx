import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, addDoc, doc, deleteDoc, getDocs, query, where
} from 'firebase/firestore';
import {
  getStorage, ref, uploadBytes, getDownloadURL
} from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBlGTt5myR4_UT1sYzhiTR2tedxMT3apxk",
    authDomain: "healthx-test-prod.firebaseapp.com",
    projectId: "healthx-test-prod",
    storageBucket: "healthx-test-prod.firebasestorage.app",
    messagingSenderId: "340098693083",
    appId: "1:340098693083:web:8355fd18f296bd5d3f19fe",
    measurementId: "G-4YSYSSW3GN"
  };

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export async function fetchMemories(scrapbookId) {
  if (!scrapbookId) return [];
  const q = query(collection(db, 'memories'), where('scrapbookId', '==', scrapbookId));
  const snapshot = await getDocs(q);
  const memories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return memories.sort((a, b) => b.timestamp - a.timestamp);
}

export async function saveMemory({ scrapbookId, content, file }) {
  let imageUrl = '';
  if (file) {
    const storageRef = ref(storage, `memories/${scrapbookId}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    imageUrl = await getDownloadURL(storageRef);
  }

  const newMemory = {
    scrapbookId,
    content: content || '',
    imageUrl,
    timestamp: Date.now()
  };

  const docRef = await addDoc(collection(db, 'memories'), newMemory);
  return { id: docRef.id, ...newMemory };
}

export async function deleteMemory(scrapbookId, memoryId) {
  if (!scrapbookId || !memoryId) return;
  await deleteDoc(doc(db, 'memories', memoryId));
}