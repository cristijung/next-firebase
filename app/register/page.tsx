'use client'

import { useActionState } from "react";
import { handleRegister } from "./actions";

export default function RegisterPage() {
   // o useActionState do React 19 substitui o antigo padrão de múltiplos useStates 
  // para gerenciar erro, dados e o estado de carregamento (isPending).
  
  const [state, formAction, isPending] = useActionState(handleRegister, null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Criar Conta</h1>
          <p className="text-gray-500 mt-2">Tutorial Fullstack Node + Firebase</p>
        </header>

        {/* atributo 'action' recebe o formAction do hook useActionState */}
        <form action={formAction} className="space-y-5">
          
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Ex: João Silva"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* btn de submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </span>
            ) : (
              "Finalizar Cadastro"
            )}
          </button>

          {/* alerta de erro vindo da server action */}
          {state?.error && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
              <p className="text-sm text-red-700 font-medium">
                {state.error}
              </p>
            </div>
          )}
        </form>

        <footer className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Já possui uma conta?{" "}
            <a href="/login" className="text-blue-600 font-semibold hover:underline">
              Fazer login
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}