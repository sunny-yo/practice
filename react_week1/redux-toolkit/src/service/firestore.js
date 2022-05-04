import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import { app } from './firebase';

class Firestore {
  constructor() {
    this.db = getFirestore(app);
  }

  async loadWords() {
    const wordData = await getDocs(collection(this.db, 'words'));
    const wordlist = [];
    wordData.forEach((doc) => {
      wordlist.push({ id: doc.id, ...doc.data() });
    });
    return wordlist;
  }

  async createWord(wordObj) {
    return await addDoc(collection(this.db, 'words'), wordObj);
  }

  async updateWord(wordObj) {
    const docRef = doc(this.db, 'words', wordObj.id);
    await updateDoc(docRef, wordObj);
  }

  async removeWord(wordId) {
    const docRef = doc(this.db, 'words', wordId);
    await deleteDoc(docRef);
  }
}

export default Firestore;
