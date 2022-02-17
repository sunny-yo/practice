import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

class AuthService {
  constructor() {
    this.googleProvider = new GoogleAuthProvider();
    this.firebaseAuth = getAuth();
  }

  login = (providerName) => {
    const authProvider = this.getProvider(providerName);
    return signInWithPopup(this.firebaseAuth, authProvider);
  };

  logout = () => {
    return signOut(this.firebaseAuth);
  };

  onAuthChange = (onUserChanged) => {
    onAuthStateChanged(this.firebaseAuth, (user) => {
      onUserChanged(user);
    });
  };

  getProvider = (providerName) => {
    switch (providerName) {
      case 'Google':
        return this.googleProvider;
      default:
        throw Error(`unexpected provider : ${providerName}`);
    }
  };
}

export default AuthService;
