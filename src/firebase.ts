import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDocFromServer, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { Match, NewsArticle } from './types';
import { INITIAL_MATCHES, NEWS_ARTICLES } from './data/mockData';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); /* CRITICAL: The app will break without this line */
export const auth = getAuth();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validation validation runner
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

/**
 * Seed Firestore with initial high-quality sports data.
 * This runs automatically if collections are empty, or can be triggered.
 */
export async function seedFirestoreIfNeeded(force: boolean = false) {
  const matchesPath = 'matches';
  const newsPath = 'news';

  try {
    // Check matches
    const matchesCol = collection(db, matchesPath);
    const matchesSnap = await getDocs(matchesCol);
    
    if (force || matchesSnap.empty) {
      console.log('Seeding matches collection...');
      for (const match of INITIAL_MATCHES) {
        await setDoc(doc(db, matchesPath, match.id), match);
      }
    }

    // Check news articles
    const newsCol = collection(db, newsPath);
    const newsSnap = await getDocs(newsCol);
    
    if (force || newsSnap.empty) {
      console.log('Seeding news collection...');
      for (const article of NEWS_ARTICLES) {
        await setDoc(doc(db, newsPath, article.id), article);
      }
    }
  } catch (error) {
    console.error('Seeding Firestore failed:', error);
  }
}
