import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// config usando as variáveis de ambiente que criamos
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// iniciando o Firebase --> Singleton pattern
// não esquecer q Singleton pattern é um padrão de projeto criacional q garante q 1 
// classe tenha apenas 1 única instancia
// e se usa no Firebase pq toda vez q 1 componente do projeto precisa do BD, ele abrisse 1 conexão
// isso consumiria memória excessiva
// se não existe a instancia, o code cria, se já existe, utiliza
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Exporta as instâncias tipadas para usar no projeto
export const auth = getAuth(app);
export const db = getFirestore(app);