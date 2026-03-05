'use client'; 
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  // 過去の履歴から特定した3つの活動ログデータ
  const activityLogs = [
    {
      date: '2026.03.01',
      title: '【活動報告】会話型AI展示実証実験（Phase 1）の結果報告',
      summary: '育児における「感情労働」の分散を検証し、安全・倫理設計への関心が高いこと、ノイズ耐性の課題が判明しました。'
    },
    {
      date: '2026.02.28',
      title: '【実証実験報告】会話型AI「メイ」による育児負担分散の試み：Phase 1',
      summary: '新宿コクーンタワーでの初の実証実験。ノイズ混入による「安全説明」誤爆から得られた改善点を含む。'
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
      {/* ヘッダー */}
      <header className="py-12 px-6 text-center bg-slate-900 border-b border-slate-700 shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Next Child Project</h1>
        <p className="text-xl text-slate-300">「責任共有社会」の実現へ。</p>
        <p className="text-md text-slate-400 mt-2">東京通信大学 情報マネジメント学部 6期生 川上 武蔵</p>
      </header>

      {/* 3カラム/2カラムレイアウトへの調整 */}
      <main className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 py-12 px-6">
        
        {/* 左側：活動ログ（3つ全て表示） */}
        <aside className="lg:w-1/4 space-y-6 order-2 lg:order-1">
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

        {/* 中央・右：詳細報告書 ＆ 掲示板 */}
        <section className="lg:w-3/4 space-y-12 order-1 lg:order-2">
          
          {/* 最新の活動内容（1000字程度のメイン記事エリア） */}
          <article className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-slate-100">
            <div className="mb-6">
              <time className="text-blue-600 font-bold">{activityLogs[0].date}</time>
              <h2 className="text-3xl font-extrabold mt-2 text-slate-900 leading-tight">
                {activityLogs[0].title}
              </h2>
            </div>
            
            <div className="prose prose-slate max-w-none text-slate-700 space-y-4">
              <p>
                新宿コクーンタワーにて実施した会話型AI「メイ」の実証実験（Phase 1）の結果、育児における「感情労働」の分散というテーマに対して、来場者から多くの共感とフィードバックをいただきました。
              </p>
              <p>
                本実験の目的は、AIが母親やケアギバーの精神的な負担をどのように肩代わりできるかを検証することにありました。アンケート結果からは、AIによる「安全・倫理設計」への関心が非常に高いことが判明しました。
              </p>
              <p>
                一方で、会場特有の騒音問題により、AIが音声を正しく認識できず、説明プロセスにノイズが混入するという課題も明確になりました。今後はノイズキャンセル技術の向上や、文脈理解の深化を通じ、より実用的な「育児支援AI」としての完成度を高めていく必要があります。
              </p>
              {/* ここに詳細な内容をさらに追記できます */}
            </div>
          </article>

          {/* メッセージ掲示板（報告内容の下に配置） */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-2">💬</span>メッセージを送る・読む
            </h2>
            
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-10">
              <div className="grid grid-cols-1 gap-4">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="お名前（匿名可）" 
                  className="p-2 border border-slate-300 rounded focus:ring-2 focus:ring-slate-400 outline-none" 
                />
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="メッセージ内容" 
                  className="p-2 border border-slate-300 rounded h-28 focus:ring-2 focus:ring-slate-400 outline-none"
                ></textarea>
                <button 
                  onClick={handleSubmit}
                  className="bg-slate-900 text-white font-bold py-3 rounded hover:bg-slate-700 transition-all shadow-md"
                >
                  メッセージを公開する
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold border-l-4 border-slate-900 pl-3 mb-4">届いたメッセージ</h3>
              <div className="max-h-[500px] overflow-y-auto pr-2">
                {messages.length === 0 ? (
                  <p className="text-slate-400 text-sm italic">まだメッセージはありません。</p>
                ) : (
                  messages.map((m) => (
                    <div key={m.id} className="border-b border-slate-100 py-4 last:border-0">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-bold text-slate-800">{m.name} さん</span>
                        <span className="text-slate-400">{new Date(m.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed">{m.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-300 py-16 px-6 mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="font-bold text-white text-lg mb-4">Next Child Project</p>
            <p className="text-sm">東京通信大学 情報マネジメント学部 6期生 川上 武蔵</p>
            <p className="text-sm mt-1">氏名: {messages.some(m => m.name === '武蔵') ? 'Musashi Kawakami' : '武蔵'}</p>
          </div>
          <div className="md:text-right">
            <p className="text-sm">Email: kawakami.musashi@smile2525.mobi</p>
            <p className="text-xs mt-6 text-slate-500">&copy; 2026 Musashi Kawakami. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
