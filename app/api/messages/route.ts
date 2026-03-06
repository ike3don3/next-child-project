import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

// データベースへの接続設定
async function openDb() {
  return open({
    filename: '/var/www/next-child/data/messages.db',
    driver: sqlite3.Database,
  });
}

// メッセージ取得用 (GET)
export async function GET() {
  try {
    const db = await openDb();
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

    // メール通知処理
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kawakami.musashi@smile2525.mobi', 
        // サーバーの .env.local から取得
        pass: process.env.GMAIL_APP_PASSWORD 
      },
    });

    const mailOptions = {
      from: `"Next Child Project" <kawakami.musashi@smile2525.mobi>`,
      to: 'kawakami.musashi@smile2525.mobi',
      subject: `【新着メッセージ】${name} 様より投稿がありました`,
      text: `掲示板に新しいメッセージが届きました。\n\nお名前: ${name}\n内容:\n${content}\n\nサイトを確認する: https://touconnect.jp`,
    };

    transporter.sendMail(mailOptions).catch(err => {
      console.error('Email notification failed:', err);
    });
    
    return NextResponse.json({ message: '送信完了' });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: '保存に失敗しました' }, { status: 500 });
  }
}

// メッセージ削除用の処理 (DELETE)
export async function DELETE(request: Request) {
  try {
    const { id, password } = await request.json();

    // 修正ポイント：サーバー側の設定(ADMIN_PASSWORD)を優先し、未設定なら 'admin123' を使用
    const correctPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password !== correctPassword) {
      return NextResponse.json({ error: '認証に失敗しました' }, { status: 401 });
    }

    const db = await openDb();
    await db.run('DELETE FROM messages WHERE id = ?', id);
    
    return NextResponse.json({ message: '削除しました' });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: '削除に失敗しました' }, { status: 500 });
  }
}