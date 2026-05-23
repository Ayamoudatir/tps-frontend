import AddProjectForm from './AddProjectForm';
import { deleteProject } from '../actions/projects';

interface Project {
  id: string;
  name: string;
  color: string;
}

export default async function DashboardPage() {
  const res = await fetch('http://localhost:3000/api/projects', {
    cache: 'no-store',
  });
  const projects: Project[] = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <AddProjectForm />
      <p>{projects.length} projets</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {projects.map((p) => (
          <li key={p.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <span style={{
              display: 'inline-block', width: 12, height: 12,
              borderRadius: '50%', background: p.color,
            }} />
            <a href={`/projects/${p.id}`}>{p.name}</a>
            <form action={deleteProject} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={p.id} />
              <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                🗑
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
