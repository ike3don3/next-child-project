'use client'; 
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  
  // 管理機能用の状態追加
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdmin, setShowAdmin] = useState(false);

  const activityLogs = [
    {
      date: '2026.03.01',
      title: '【実証実験報告】会話型AI「メイ」による育児負担分散の試み：Phase 1 成果と課題',
      summary: '東京通信大学のポスターセッションにて実施した初の実証実験ログ解析。定量・定性データと技術的反省を詳述。'
    },
    {
      date: '2026.02.28',
      title: '会話型AI展示実証実験（Phase 1）の実施',
      summary: '新宿コクーンタワーにて「育児負担分散」をテーマにAI「メイ」を用いた対人実験を開始。'
    },
    {
      date: '2026.02.16',
      title: 'プロジェクトロゴ「Next Child」の策定',
      summary: '次世代の育児を支える象徴としてのロゴを決定。プロジェクトの視覚的指針を確立。'
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

  useEffect(() => { fetchMessages(); }, []);

  const handleSubmit = async () => {
    if (!name || !content) return alert('入力してください');
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, content }),
    });
    if (res.ok) {
      setName(''); setContent(''); fetchMessages();
      alert('メッセージが公開されました');
    }
  };

  // メッセージ削除用の関数
  const handleDelete = async (id: number) => {
    if (!confirm('本当にこのメッセージを削除しますか？')) return;
    
    const res = await fetch('/api/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password: adminPassword }),
    });

    if (res.ok) {
      fetchMessages();
      alert('削除完了しました');
    } else {
      alert('削除に失敗しました（パスワードが違う可能性があります）');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans leading-relaxed">
      {/* ヘッダー */}
      <header className="py-16 px-6 text-center bg-slate-900 border-b border-slate-700 shadow-lg">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-white uppercase">Next Child Project</h1>
        <p className="text-xl text-slate-300">「責任共有社会」の実現へ。</p>
      </header>

      <main className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 py-12 px-6">
        {/* 左側：活動ログリスト */}
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

        {/* 右側：メインコンテンツ */}
        <section className="lg:w-3/4 space-y-12 order-1 lg:order-2">
          {/* 最新の活動報告書（中略なし） */}
          <article className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-slate-100">
            <header className="mb-10">
              <time className="text-blue-600 font-bold block mb-2">{activityLogs[0].date}</time>
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                {activityLogs[0].title}
              </h2>
            </header>
            
            <div className="prose prose-slate max-w-none text-slate-700 space-y-8 text-md leading-relaxed">
              <section>
                <h3 className="text-xl font-bold border-l-4 border-slate-900 pl-4 mb-4">1. はじめに：プロジェクトの背景と目的</h3>
                <p>現代社会において、育児に伴う「感情労働」の負担は依然として特定の養育者に一極集中しており、これが少子化加速やQOL低下の構造的要因となっています。本プロジェクト「責任共有社会」では、AIを親の代替（Replacement）としてではなく、家庭環境の一部（Environment）として再定義し、子供の軽微な情緒的ニーズを一時的に受け止めることで、親の精神的・時間的余裕（Slack）を創出する設計を提唱しています。</p>
                <p>今回、東京通信大学のポスターセッションにおいて、会話型AI「メイ」のプロトタイプを用いた初の対人実証実験（Phase 1）を実施しました。本稿では、そのログ解析から得られた定量・定性データ、および現場での技術的反省を報告します。</p>
              </section>

              <section>
                <h3 className="text-xl font-bold border-l-4 border-slate-900 pl-4 mb-4">2. システム構成と実証環境</h3>
                <p>実証に使用した「メイ」は、Jetson Nanoをメイン機、M5Stack（スタックちゃん）をインターフェース機とするエッジAI構成です。</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>コアエンジン:</strong> Qwen2.5-3B-Instruct (GGUF版) をLlama.cppで駆動。</li>
                  <li><strong>知識ベース (RAG):</strong> poster_data.json および poster_kb.txt による構造化データ参照。</li>
                  <li><strong>意図判定ルーティング:</strong> ユーザーの発話を「統計」「体験」「安全」「検証」などのカテゴリに分類し、適切なテンプレートとLLM生成を組み合わせるハイブリッド方式を採用。</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold border-l-4 border-slate-900 pl-4 mb-4">3. 実証結果：データが示すユーザーの関心</h3>
                <h4 className="font-bold mt-4">① 驚異的な対話継続時間</h4>
                <p>1セッションあたりの平均継続時間は<strong>270.4秒（約4分半）</strong>に達しました。一般的な展示デモが1〜2分で終了することを考慮すると、本コンセプトに対する来場者の関心は極めて高く、AIとの対話を通じて自身の育児観や技術への期待を深掘りする行動が見られました。</p>
                
                <h4 className="font-bold mt-4">② インテント分布：機能よりも「安全」への問い</h4>
                <p>特筆すべきは、来場者が選択したトピックの偏りです。対話フローの確認（demo）が8件だったのに対し、安全設計や倫理に関する問い（safety）は38件と、約4.8倍にのぼりました。ユーザーは「AIで何ができるか」という利便性以上に、以下の点に極めて敏感であることが示唆されました。</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>心理得過依存への懸念：子供がAIに依存し、親との対話が疎かにならないか。</li>
                  <li>データ・プライバシー：家庭内の発話がどこまで保存・共有されるのか。</li>
                  <li>教育的安全性：LLMが不適切な回答や嘘（ハルシネーション）を伝えないか。</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold border-l-4 border-slate-900 pl-4 mb-4">4. 現場での反省と技術的課題：ノイズ誤爆の壁</h3>
                <p>今回の実証実験で最も大きな反省点となったのが、<strong>「会場ノイズによる意図判定の誤作動」</strong>です。ログには、隣接するブースの発表音声やガヤをメイが自身の質問として拾い上げ、それに対して「安全説明」を連発してしまう事象が記録されていました。</p>
                <p><strong>反省点1：環境音としきい値の設定</strong><br />当初の energy_threshold = 300 は静かな室内を想定しており、騒音下では敏感すぎました。会話が成立していない状態でもAIが話し続けてしまう「空回り」が発生しました。</p>
                <p><strong>反省点2：意図判定の脆弱性</strong><br />キーワードベースの意図判定が、ノイズに含まれる単語の断片に反応しすぎた点も課題です。文脈を無視した「安全説明」が繰り返されました。</p>
              </section>

              <section>
                <h3 className="text-xl font-bold border-l-4 border-slate-900 pl-4 mb-4">5. 今後の展望とPhase 2への改善</h3>
                <p>今回のPhase 1で得られた知見をもとに、以下の改善を実施します。</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>音声認識の堅牢化:</strong> マイク感度の動的調整および、特定話者分離（声紋認証）の導入。</li>
                  <li><strong>安全設計の可視化:</strong> 「依存回避」と「プライバシー保護」について、説明パネルやUI上での進捗表示を強化。</li>
                  <li><strong>満足度評価の粒度向上:</strong> WINDOW_SIZE を3に短縮し、より短いセッションでも確実にユーザー評価を回収する。</li>
                </ul>
                <p className="mt-6">本実験を通じて、育児AIにおける最大の付加価値は「高度な機能」ではなく、親が安心して子供を預けられる「信頼の設計」にあることが確信に変わりました。この学びを糧に、2026年内に予定している短期試用（Phase 2）へと歩みを進めます。</p>
              </section>
            </div>
          </article>

          {/* 掲示板 */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <span className="mr-2">💬</span>メッセージを送る・読む
              </h2>
              {/* 管理者ログインボタン */}
              <button 
                onClick={() => setShowAdmin(!showAdmin)}
                className="text-xs text-slate-400 hover:text-slate-900 transition-colors"
              >
                {showAdmin ? '管理を閉じる' : '管理者ログイン'}
              </button>
            </div>

            {/* 管理者用パスワード入力欄 */}
            {showAdmin && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg animate-in fade-in duration-300">
                <p className="text-xs font-bold text-yellow-700 mb-2">管理者モード</p>
                <input 
                  type="password" 
                  placeholder="管理パスワードを入力" 
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="p-2 border border-slate-300 rounded text-sm w-full md:w-64 outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            )}

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
                <button onClick={handleSubmit} className="bg-slate-900 text-white font-bold py-3 rounded shadow-md">
                  メッセージを公開する
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold border-l-4 border-slate-900 pl-3 mb-4">届いたメッセージ</h3>
              <div className="max-h-[500px] overflow-y-auto pr-2">
                {messages.map((m) => (
                  <div key={m.id} className="border-b border-slate-100 py-4 last:border-0 text-sm flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-bold text-slate-800">{m.name} さん</span>
                        <span className="text-slate-400">{new Date(m.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{m.content}</p>
                    </div>

                    {/* パスワードが一致している時だけ削除ボタンを表示 */}
                    {adminPassword === 'admin123' && (
                      <button 
                        onClick={() => handleDelete(m.id)}
                        className="ml-4 px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors shadow-sm"
                      >
                        削除
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="bg-slate-900 text-slate-300 py-16 px-6 mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm">
          <div>
            <p className="font-bold text-white text-lg mb-2 uppercase tracking-widest">Next Child Project</p>
            <p className="text-slate-400">東京通信大学 情報マネジメント学部 6期生</p>
            <p className="text-white mt-1">川上 武蔵</p>
          </div>
          <div className="md:text-right">
            <p>Email: kawakami.musashi@smile2525.mobi</p>
            <p className="text-xs mt-4 text-slate-500">&copy; 2026 Next Child Project. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}