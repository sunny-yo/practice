import { getFirestore } from 'firebase/firestore';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import firebaseApp from './firebase.js';

class Firestore {
  constructor() {
    this.db = getFirestore(firebaseApp);
  }

  async getPost({ size, next }) {
    const postlist = [];
    let q;
    const docRef = collection(this.db, 'post');
    if (!next) {
      q = query(docRef, orderBy('createdAt', 'desc'), limit(size + 1));
    } else {
      q = query(
        docRef,
        orderBy('createdAt', 'desc'),
        startAfter(next),
        limit(size + 1)
      );
    }
    const documentSnapshots = await getDocs(q);
    let lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    documentSnapshots.forEach(doc => {
      postlist.push({ boardId: doc.id, ...doc.data() });
    });
    return { postlist, lastVisible };
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
