'use client'; // ブラウザでの動作を有効にする
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  // メッセージ一覧を取得する関数
  const fetchMessages = async () => {
    const res = await fetch('/api/messages');
    const data = await res.json();
    if (Array.isArray(data)) setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // 送信処理
  const handleSubmit = async () => {
    if (!name || !content) return alert('入力してください');
    
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, content }),
    });

    if (res.ok) {
      setName('');
      setContent('');
      fetchMessages(); // 一覧を更新
      alert('メッセージが公開されました');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans leading-relaxed">
      <header className="py-16 px-6 text-center bg-slate-900 border-b border-slate-700 shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Next Child Project</h1>
        <p className="text-xl text-slate-300">「責任共有社会」の実現へ。</p>
        <p className="text-md text-slate-400 mt-2">東京通信大学 情報マネジメント学部 川上武蔵</p>
      </header>

      <main className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 py-12 px-6">
        {/* サイドバー：活動ログ */}
        <aside className="md:w-1/3 order-2 md:order-1">
          <h2 className="text-lg font-bold border-b-2 border-slate-900 mb-6 pb-2">活動ログ</h2>
          <article className="mb-8 p-4 bg-white rounded-lg shadow-sm border border-slate-100">
            <time className="text-sm text-blue-600 font-semibold">2026.02.28</time>
            <h3 className="text-md font-bold mt-1 mb-2 leading-snug">
              【実証実験報告】会話型AI「メイ」による育児負担分散の試み：Phase 1
            </h3>
            <p className="text-sm text-slate-600">
              新宿コクーンタワーでの実証実験。AIによる感情労働分散の可能性を検証しました。
            </p>
          </article>
        </aside>

        {/* メイン：報告書 ＆ メッセージ掲示板 */}
        <section className="md:w-2/3 order-1 md:order-2 space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-6">メッセージを送る・読む</h2>
            
            {/* フォーム */}
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8">
              <div className="space-y-4">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="お名前（匿名可）" 
                  className="w-full p-2 border border-slate-300 rounded" 
                />
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="メッセージ内容" 
                  className="w-full p-2 border border-slate-300 rounded h-24"
                ></textarea>
                <button 
                  onClick={handleSubmit}
                  className="bg-slate-900 text-white px-6 py-2 rounded hover:bg-slate-700 transition-colors w-full"
                >
                  メッセージを公開する
                </button>
              </div>
            </div>

            {/* 掲示板表示 */}
            <div className="space-y-6">
              <h3 className="font-bold border-l-4 border-slate-900 pl-3">届いたメッセージ</h3>
              {messages.map((m) => (
                <div key={m.id} className="border-b border-slate-100 pb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-bold text-slate-700">{m.name} さん</span>
                    <span className="text-slate-400">{new Date(m.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-slate-600 text-sm whitespace-pre-wrap">{m.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12 mt-12 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-bold text-white">お問い合わせ</p>
          <p className="text-sm mt-2">東京通信大学 情報マネジメント学部 6期生 川上 武蔵</p>
          <p className="text-sm mt-1">Email: kawakami.musashi@smile2525.mobi</p>
        </div>
      </footer>
    </div>
  );
}
