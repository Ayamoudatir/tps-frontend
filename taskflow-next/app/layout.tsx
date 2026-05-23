import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import './globals.css';
import LogoutButton from './components/LogoutButton';

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'Gestion de projets collaboratifs',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  let user = null;
  try {
    user = session ? JSON.parse(session.value) : null;
  } catch {
    user = null;
  }

  return (
    <html lang="fr">
      <body>
        <header style={{
          background: '#1B8C3E', color: 'white',
          padding: '1rem 2rem', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, fontWeight: 700 }}>TaskFlow</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <nav style={{ display: 'flex', gap: '1rem' }}>
              <a href="/dashboard" style={{ color: 'white' }}>Dashboard</a>
            </nav>
            {user && <span style={{ color: 'white' }}>{user.name}</span>}
            {user && <LogoutButton />}
            {!user && <a href="/login" style={{ color: 'white' }}>Login</a>}
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
