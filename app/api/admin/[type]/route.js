import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken, COOKIE_NAME } from '../../../../lib/auth';
import { listItems, createItem, updateItem, deleteItem } from '../../../../lib/db';

const VALID = ['news', 'articles', 'videos', 'streams'];

function authed() {
  const token = cookies().get(COOKIE_NAME)?.value;
  return verifyToken(token);
}

function guard(type) {
  if (!authed()) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  if (!VALID.includes(type)) return NextResponse.json({ error: 'نوع غير صالح' }, { status: 400 });
  return null;
}

export async function GET(req, { params }) {
  const err = guard(params.type);
  if (err) return err;
  return NextResponse.json({ items: await listItems(params.type) });
}

export async function POST(req, { params }) {
  const err = guard(params.type);
  if (err) return err;
  const body = await req.json().catch(() => ({}));
  try {
    const item = await createItem(params.type, body);
    return NextResponse.json({ ok: true, item });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const err = guard(params.type);
  if (err) return err;
  const body = await req.json().catch(() => ({}));
  if (!body.id) return NextResponse.json({ error: 'id مطلوب' }, { status: 400 });
  try {
    const item = await updateItem(params.type, body.id, body);
    return NextResponse.json({ ok: true, item });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const err = guard(params.type);
  if (err) return err;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id مطلوب' }, { status: 400 });
  try {
    const r = await deleteItem(params.type, id);
    return NextResponse.json({ ok: true, ...r });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
