

import { auth, db } from "../../lib/firebase"; 
import { FirebaseError } from "firebase/app"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { redirect } from "next/navigation";

export type FormState = {
  error: string | null;
} | null;

export async function handleRegister(prevState: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (!email || !password || !name) {
    return { error: "Preencha todos os campos, incluindo o nome." };
  }

  try {
    // cria o usuário na Autenticação
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // salva os dados no Firestore --> cria a "tabela" users
    await setDoc(doc(db, "users", user.uid), {
      nome: name,
      email: email,
      createdAt: new Date().toISOString(),
      uid: user.uid
    });
    
  } catch (err) {
    if (err instanceof FirebaseError) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          return { error: "Este e-mail já está em uso." };
        default:
          return { error: err.message };
      }
    }
    return { error: "Erro ao salvar dados no banco." };
  }

  redirect("/");
}