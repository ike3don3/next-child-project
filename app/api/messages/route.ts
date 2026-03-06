import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

async function openDb() {
  return open({
    filename: '/var/www/next-child/data/messages.db',
    driver: sqlite3.Database,
  });
}

export async function GET() {
  try {
    const db = await openDb();
    const messages = await db.all('SELECT * FROM messages ORDER BY created_at DESC');
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: '取得失敗' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  console.log('★★★★★ 投稿リクエストを受信しました ★★★★★');
  try {
    const { name, content } = await request.json();
    const db = await openDb();
    await db.run('INSERT INTO messages (name, content) VALUES (?, ?)', [name, content]);
    console.log('★ DB保存完了');

    // メール設定
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kawakami.musashi@smile2525.mobi', 
        pass: process.env.GMAIL_APP_PASSWORD 
      },
    });

    // 重要：失敗を検知するために await を使い、エラーを投げられるようにします
    try {
      console.log('★ メール送信を試行中...');
      await transporter.sendMail({
        from: `"Next Child Project" <kawakami.musashi@smile2525.mobi>`,
        to: 'kawakami.musashi@smile2525.mobi',
        subject: `【新着】${name}様より投稿`,
        text: `お名前: ${name}\n内容:\n${content}\n\nhttps://touconnect.jp`,
      });
      console.log('★★★★★ メール送信成功！ ★★★★★');
    } catch (mailError: any) {
      console.error('★★★★★ メール送信失敗！ ★★★★★');
      console.error('詳細:', mailError.message);
      // ここでエラーを投げることで、下の catch に飛ばします
      throw new Error(`メール送信エラー: ${mailError.message}`);
    }
    
    return NextResponse.json({ message: '送信完了' });
  } catch (error: any) {
    console.error('★ POST全体エラー:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id, password } = await request.json();
    const correctPassword = process.env.ADMIN_PASSWORD || 'k634k634';
    if (password !== correctPassword) return NextResponse.json({ error: '認証失敗' }, { status: 401 });
    const db = await openDb();
    await db.run('DELETE FROM messages WHERE id = ?', id);
    return NextResponse.json({ message: '削除完了' });
  } catch (error) {
    return NextResponse.json({ error: '削除失敗' }, { status: 500 });
  }
}