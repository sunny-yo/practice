import firebaseApp from './firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';

class FirebaseAuth {
  constructor() {
    this.auth = getAuth(firebaseApp);
  }

  async signUp(registerData) {
    const { email, username, password } = registerData;
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((user) => {
        updateProfile(this.auth.currentUser, {
          displayName: username,
        });
        const userData = {
          user_info: {
            userid: user.user.uid,
            username: username,
          },
          is_login: true,
        };
        return userData;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  async signIn(loginData) {
    const { email, password } = loginData;
    return setPersistence(this.auth, browserSessionPersistence).then(() => {
      const response = signInWithEmailAndPassword(this.auth, email, password)
        .then((user) => {
          const userData = {
            user_info: {
              userid: user.user.uid,
              username: user.user.displayName,
            },
            is_login: true,
          };
          return userData;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
      return response;
    });
  }

  async signOut() {
    signOut(this.auth)
      .then(() => {
        // Sign-out successful.
        console.log('로그아웃 성공');
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }

  async getUser() {
    const userData = { is_login: null, user_info: {} };
    const response = new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          userData.user_info = { userid: user.uid, username: user.displayName };
          userData.is_login = true;
          resolve(userData);
        } else {
          userData.user_info = { userid: null, username: null };
          userData.is_login = true;
          resolve(userData);
        }
      });
    });
    return response;
  }
}

export default FirebaseAuth;
