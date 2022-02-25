import {
  uploadString,
  getStorage,
  ref,
  getDownloadURL,
} from 'firebase/storage';
import firebaseApp from './firebase';

class FBstorage {
  constructor() {
    this.storage = getStorage(firebaseApp);
  }

  async uploadFile(file, userid) {
    const filename = `images/${userid}_${new Date().getTime()}`;
    const storageRef = ref(this.storage, filename);
    return uploadString(storageRef, file, 'data_url')
      .then(() => getDownloadURL(ref(this.storage, filename)))
      .catch(err => console.log('이미지 업로드 에러', err));
  }
}

export default FBstorage;
