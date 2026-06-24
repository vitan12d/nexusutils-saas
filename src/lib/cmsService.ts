import { 
  collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';

export const cmsService = {
  // Generic collection operations
  async getCollection(colName: string) {
    try {
      const q = query(collection(db, colName), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, colName);
      return [];
    }
  },

  async addDocument(colName: string, data: any) {
    try {
      return await addDoc(collection(db, colName), {
        ...data,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, colName);
    }
  },

  async deleteDocument(colName: string, id: string) {
    try {
      return await deleteDoc(doc(db, colName, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, colName);
    }
  }
};
