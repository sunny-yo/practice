import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  projectId: 'my-dictionary-657a3',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
