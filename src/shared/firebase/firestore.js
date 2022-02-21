import { getFirestore } from 'firebase/firestore';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import firebaseApp from './firebase.js';

class Firestore {
  constructor() {
    this.db = getFirestore(firebaseApp);
  }

  async getPost() {
    const postData = await getDocs(collection(this.db, 'post'));
    const postlist = [];
    postData.forEach((doc) =>
      postlist.push({ boardId: doc.id, ...doc.data() })
    );
    return postlist;
  }

  async addPost(newPostData) {
    return await addDoc(collection(this.db, 'post'), newPostData);
  }

  async deletePost(boardId) {
    const docRef = doc(this.db, 'post', boardId);
    await deleteDoc(docRef);
  }

  async updatePost(postData) {
    const docRef = doc(this.db, 'post', postData.boardId);
    await updateDoc(docRef, postData);
  }
}

export default Firestore;
