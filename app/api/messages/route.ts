import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// データベースへの接続設定
async function openDb() {
  return open({
    // サーバー上の絶対パスを「文字列」として直接指定します
    filename: '/var/www/next-child/data/messages.db',
    driver: sqlite3.Database,
  });
}

// メッセージ取得用 (GET)
export async function GET() {
  try {
    const db = await openDb();
    // 最新の投稿が上にくるように取得
    const messages = await db.all('SELECT * FROM messages ORDER BY created_at DESC');
    return NextResponse.json(messages);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: '取得に失敗しました' }, { status: 500 });
  }
}

// メッセージ送信用 (POST)
export async function POST(request: Request) {
  try {
    const { name, content } = await request.json();
    
    if (!name || !content) {
      return NextResponse.json({ error: '名前と内容を入力してください' }, { status: 400 });
    }

    const db = await openDb();
    await db.run(
      'INSERT INTO messages (name, content) VALUES (?, ?)',
      [name, content]
    );
    
    return NextResponse.json({ message: '送信完了' });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: '保存に失敗しました' }, { status: 500 });
  }
}