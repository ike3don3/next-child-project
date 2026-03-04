import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans leading-relaxed">
      {/* メインヘッダー */}
      <header className="py-16 px-6 text-center bg-white border-b border-slate-200">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Next Child Project</h1>
        <p className="text-xl text-slate-600">「責任共有社会」の実現へ。</p>
        <p className="text-md text-slate-500 mt-2">親が疲れない子育てを、テクノロジーとコミュニティで支えます。</p>
      </header>

      <main className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 py-12 px-6">
        
        {/* 左側：サイドバー（活動ログ） */}
        <aside className="md:w-1/3 order-2 md:order-1">
          <h2 className="text-lg font-bold border-b-2 border-slate-900 mb-6 pb-2">活動ログ</h2>
          
          {/* 最新の活動 */}
          <article className="mb-8 p-4 bg-white rounded-lg shadow-sm border border-slate-100">
            <time className="text-sm text-blue-600 font-semibold">2026.02.28</time>
            <h3 className="text-md font-bold mt-1 mb-2 leading-snug">
              <a href="#phase1-report" className="hover:text-blue-600 transition-colors">
                【実証実験報告】会話型AI「メイ」による育児負担分散の試み：Phase 1
              </a>
            </h3>
            <p className="text-sm text-slate-600">
              新宿コクーンタワーでの初の実証実験。平均4分半の対話時間と、ノイズ混入による「安全説明」誤爆から得られた改善点。
            </p>
          </article>

          {/* 過去ログ（リスト形式） */}
          <nav>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-4">
                <time className="text-slate-400 shrink-0">2026.02.16</time>
                <span className="text-slate-400">プロジェクトロゴ「Next Child」の策定</span>
              </li>
              <li className="flex gap-4">
                <time className="text-slate-400 shrink-0">2026.01.25</time>
                <span className="text-slate-400">情報処理分野ポスターセッションへの参加決定</span>
              </li>
            </ul>
          </nav>
        </aside>

        {/* 右側：メインコンテンツ（報告書詳細） */}
        <section className="md:w-2/3 order-1 md:order-2 space-y-8 bg-white p-8 rounded-xl shadow-sm" id="phase1-report">
          <header className="border-b border-slate-100 pb-6">
            <h2 className="text-2xl font-bold mb-2">実証実験 Phase 1 成果と課題</h2>
            <p className="text-slate-500">場所：東京通信大学 新宿コクーンタワー</p>
          </header>

          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold text-slate-800">1. はじめに</h3>
            <p>
              育児に伴う「感情労働」をAIという環境側の支えによって分散できるかを探る本プロジェクト。初の対人実証実験を2026年2月28日に実施しました。
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-6">2. 驚異的な関心と「安全」への問い</h3>
            <p>
              1セッション平均<strong>270.4秒</strong>という長い対話時間を記録。ユーザーのインテント（意図）は、デモ希望よりも「安全設計・倫理（safety）」に関する問いが<strong>約4.8倍</strong>多く、技術への信頼が最重要課題であることが判明しました。
            </p>

            <blockquote className="border-l-4 border-amber-400 bg-amber-50 p-4 my-6 italic text-sm text-slate-700">
              <strong>現場の反省：ノイズ誤爆の発生</strong><br />
              「卓球」「キーボード即売会」など、隣接ブースの音声を拾い上げ、AIが自身の質問と誤認して回答を続ける事象が発生。環境音への耐性がPhase 2への最優先課題です。
            </blockquote>

            <h3 className="text-xl font-bold text-slate-800 mt-6">3. メッセージを送信する</h3>
            <p className="text-sm text-slate-500 mb-4">本報告書を読んで感じたこと、ご意見をお寄せください（公開されます）。</p>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <div className="space-y-4">
                <input type="text" placeholder="お名前（匿名可）" className="w-full p-2 border border-slate-300 rounded" />
                <textarea placeholder="メッセージ内容" className="w-full p-2 border border-slate-300 rounded h-24"></textarea>
                <button className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors">
                  メッセージを送信する（準備中）
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* フッター：プロフィール */}
      <footer className="bg-slate-900 text-slate-300 py-12 mt-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-white font-bold mb-4">お問い合わせ・ご連絡</h2>
            <p className="text-sm">
              東京通信大学 情報マネジメント学部 6期生<br />
              <strong>川上 武蔵 (Musashi Kawakami)</strong><br />
              Email: <a href="mailto:kawakami.musashi@smile2525.mobi" className="text-blue-400 hover:underline">kawakami.musashi@smile2525.mobi</a>
            </p>
          </div>
          <div className="text-sm md:text-right flex flex-col justify-end">
            <p>© 2026 Next Child Project / TOU.Connect</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

