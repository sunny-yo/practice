import { getDatabase, ref, set } from 'firebase/database';

class DataRepository {
  constructor() {
    this.db = getDatabase();
  }

  saveData = (userId, dateData) => {
    set(ref(this.db, `${userId}/datas/`), dateData);
  };
}

export default DataRepository;
