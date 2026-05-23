import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

function readDB() {
  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  return data;
}

function writeDB(data: unknown) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = readDB();
  const project = db.projects.find((p: { id: string }) => p.id === id);
  if (!project) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const db = readDB();
  const index = db.projects.findIndex((p: { id: string }) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }
  db.projects[index] = { ...db.projects[index], ...body };
  writeDB(db);
  return NextResponse.json(db.projects[index]);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = readDB();
  const index = db.projects.findIndex((p: { id: string }) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }
  db.projects.splice(index, 1);
  writeDB(db);
  return NextResponse.json({ success: true });
}
