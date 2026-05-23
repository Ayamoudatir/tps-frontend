'use client';
import { logoutAction } from '../actions/auth';

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit" style={{
        background: 'none', border: '1px solid white', color: 'white',
        padding: '4px 12px', borderRadius: 4, cursor: 'pointer'
      }}>
        Déconnexion
      </button>
    </form>
  );
}
