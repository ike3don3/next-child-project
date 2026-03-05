'use client'; 
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  const activityLogs = [
    {
      date: '2026.03.01',
      title: '【活動報告】会話型AI展示実証実験（Phase 1）の結果報告',
      summary: '育児における「感情労働」の分散を検証。安全・倫理設計への関心の高さと課題を特定。'
    },
    {
      date: '2026.02.28',
      title: '【実証実験報告】会話型AI「メイ」による育児負担分散の試み：Phase 1',
      summary: '新宿コクーンタワーでの実証実験。AIによる感情労働分散の可能性を検証。'
    },
    {
      date: '2026.02.16',
      title: 'プロジェクトロゴ「Next Child」の策定',
      summary: '次世代の育児を支える象徴としてのロゴを決定。'
    }
  ];

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      if (Array.isArray(data)) setMessages(data);
    } catch (e) {
      console.error("Failed to fetch messages", e);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

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
      fetchMessages();
      alert('メッセージが公開されました');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans leading-relaxed">
      {/* ヘッダー：プロジェクト名のみ */}
      <header className="py-16 px-6 text-center bg-slate-900 border-b border-slate-700 shadow-lg">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-white italic">Next Child Project</h1>
        <p className="text-xl text-slate-300">「責任共有社会」の実現へ。</p>
      </header>

      <main className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 py-12 px-6">
        {/* 左側：活動ログリスト */}
        <aside className="lg:w-1/4 space-y-6">
          <h2 className="text-lg font-bold border-b-2 border-slate-900 pb-2 flex items-center">
            <span className="mr-2">📁</span>活動ログ
          </h2>
          {activityLogs.map((log, i) => (
            <article key={i} className="p-4 bg-white rounded-lg shadow-sm border border-slate-200">
              <time className="text-xs text-blue-600 font-bold">{log.date}</time>
              <h3 className="text-sm font-bold mt-1 mb-2 leading-tight text-slate-800">{log.title}</h3>
              <p className="text-xs text-slate-500 leading-snug">{log.summary}</p>
            </article>
          ))}
        </aside>

        {/* 右側：コンテンツ ＆ 掲示板 */}
        <section className="lg:w-3/4 space-y-12">
          {/* 最新の活動詳細 */}
          <article className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-slate-100">
            <time className="text-blue-600 font-bold">{activityLogs[0].date}</time>
            <h2 className="text-3xl font-extrabold mt-2 mb-6 text-slate-900 leading-tight">
              {activityLogs[0].title}
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-lg">
              <p>新宿コクーンタワーにて実施した会話型AI「メイ」の実証実験（Phase 1）の結果、育児における「感情労働」の分散というテーマに対して、多くの共感とフィードバックをいただきました。</p>
            </div>
          </article>

          {/* 掲示板 */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-6">💬 メッセージを送る・読む</h2>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-10">
              <div className="grid grid-cols-1 gap-4">
                <input 
                  type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="お名前（匿名可）" className="p-2 border border-slate-300 rounded outline-none" 
                />
                <textarea 
                  value={content} onChange={(e) => setContent(e.target.value)}
                  placeholder="メッセージ内容" className="p-2 border border-slate-300 rounded h-28 outline-none"
                ></textarea>
                <button onClick={handleSubmit} className="bg-slate-900 text-white font-bold py-3 rounded shadow-md hover:bg-slate-700 transition-all">
                  メッセージを公開する
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold border-l-4 border-slate-900 pl-3 mb-4 text-xl">届いたメッセージ</h3>
              <div className="max-h-[500px] overflow-y-auto pr-2">
                {messages.length === 0 ? (
                  <p className="text-slate-400 italic">まだメッセージはありません。</p>
                ) : (
                  messages.map((m) => (
                    <div key={m.id} className="border-b border-slate-100 py-6 last:border-0">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-bold text-slate-800 text-lg">{m.name} さん</span>
                        <span className="text-slate-400">{new Date(m.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-slate-600 text-md whitespace-pre-wrap leading-relaxed">{m.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* フッター：個人情報はここだけに集約 */}
      <footer className="bg-slate-900 text-slate-300 py-16 px-6 mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <p className="font-bold text-white text-lg mb-2">Next Child Project</p>
            <p className="text-sm text-slate-400">東京通信大学 情報マネジメント学部 6期生</p>
            <p className="text-sm mt-1">川上 武蔵</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm italic">kawakami.musashi@smile2525.mobi</p>
            <p className="text-xs mt-4 text-slate-500">&copy; 2026 Next Child Project. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}