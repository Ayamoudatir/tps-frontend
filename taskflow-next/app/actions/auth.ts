'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(prevState: { error: string } | null, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (email !== 'admin@taskflow.com' || password !== 'password123') {
    return { error: 'Email ou mot de passe incorrect' };
  }

  const cookieStore = await cookies();
  cookieStore.set('session', JSON.stringify({
    email,
    name: 'Admin',
    role: 'admin',
  }), {
    httpOnly: true,
    secure: false,
    maxAge: 3600,
    path: '/',
  });

  redirect('/dashboard');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/login');
}
