import { useState } from 'react';

export default function G1LandingPage() {
  const [videoUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ');
  const [meetingUrl] = useState('https://calendly.com/your-link');

  return (
    <div className="min-h-screen bg-stone-100" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 bg-stone-800 text-stone-100 relative overflow-hidden">
        <div className="max-w-4xl">
          <p className="text-stone-400 text-sm tracking-widest mb-6">HUMANOID ROBOT FOR CONSTRUCTION</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-8" style={{ letterSpacing: '-0.02em' }}>
            建築現場の未来を、<br />
            ロボットとつくる。
          </h1>
          <p className="text-stone-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            足場の組み立て、資材の運搬、点検作業。<br />
            職人の負担を減らし、現場の立ち上げを加速する。
          </p>
          <div className="flex items-center gap-2 text-stone-500">
            <span className="text-sm">Scroll</span>
            <div className="w-8 h-px bg-stone-500"></div>
          </div>
        </div>
        
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </section>

      {/* What We Can Do Section */}
      <section className="px-8 md:px-16 lg:px-24 py-24 bg-stone-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-stone-500 text-sm tracking-widest mb-4">WHAT WE DEMONSTRATE</p>
          <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-16" style={{ letterSpacing: '-0.01em' }}>
            建築現場で、何ができるか。
          </h2>
          
          <div className="space-y-20">
            {/* Demo 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="aspect-video bg-stone-300 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" 
                  alt="足場の組み立て"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-stone-400 text-sm">01</span>
                <h3 className="text-2xl font-light text-stone-800 mt-2 mb-4">足場の組み立て</h3>
                <p className="text-stone-600 leading-relaxed">
                  職人技を必要としない単調な作業をロボットが担当。家全体を囲う足場を事前に組み立て、大工さんが現場に来る前に準備を完了させます。
                </p>
              </div>
            </div>

            {/* Demo 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <span className="text-stone-400 text-sm">02</span>
                <h3 className="text-2xl font-light text-stone-800 mt-2 mb-4">足場の階段を登る</h3>
                <p className="text-stone-600 leading-relaxed">
                  狭い足場の階段を自在に移動。資材運搬や高所作業の際も、人間と同じ動線で作業エリアにアクセスできます。
                </p>
              </div>
              <div className="aspect-video bg-stone-300 relative overflow-hidden order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80" 
                  alt="足場の階段"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Demo 3 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="aspect-video bg-stone-300 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" 
                  alt="資材運搬"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-stone-400 text-sm">03</span>
                <h3 className="text-2xl font-light text-stone-800 mt-2 mb-4">人と一緒に資材を運搬</h3>
                <p className="text-stone-600 leading-relaxed">
                  重い資材も、人間とロボットの協働で安全に運搬。足場の外から内部まで、木材や建材を効率よく移動させます。
                </p>
              </div>
            </div>

            {/* Demo 4 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <span className="text-stone-400 text-sm">04</span>
                <h3 className="text-2xl font-light text-stone-800 mt-2 mb-4">清掃・点検作業</h3>
                <p className="text-stone-600 leading-relaxed">
                  スマートフォンで木材のネジ打ち部分を撮影するなど、細かな点検作業も実施。現場の品質管理をサポートします。
                </p>
              </div>
              <div className="aspect-video bg-stone-300 relative overflow-hidden order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80" 
                  alt="清掃点検"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teleoperation Section */}
      <section className="px-8 md:px-16 lg:px-24 py-24 bg-stone-200">
        <div className="max-w-4xl mx-auto">
          <p className="text-stone-500 text-sm tracking-widest mb-4">HOW IT WORKS</p>
          <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-8" style={{ letterSpacing: '-0.01em' }}>
            テレオペレーション
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed mb-8">
            VRゴーグルとコントローラーを装着した人間の動きを、リアルタイムでロボットに伝送。遠隔地から直感的にロボットを操作できます。
          </p>
          <p className="text-stone-600 leading-relaxed">
            同じ動作を繰り返し学習させることで、将来的には完全自動化も可能に。様々な建築現場で経験を積むことで、どんな環境でも柔軟に対応できるロボットへと成長します。
          </p>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="px-8 md:px-16 lg:px-24 py-24 bg-stone-800">
        <div className="max-w-5xl mx-auto">
          <p className="text-stone-500 text-sm tracking-widest mb-4">DEMO VIDEO</p>
          <h2 className="text-3xl md:text-4xl font-light text-stone-100 mb-12" style={{ letterSpacing: '-0.01em' }}>
            デモ動画
          </h2>
          
          <div className="aspect-video bg-stone-900 relative overflow-hidden">
            {/* Video placeholder - replace src with actual video URL */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-stone-500 mb-4">動画をここに埋め込み</p>
                <p className="text-stone-600 text-sm">YouTube URLを設定してください</p>
              </div>
            </div>
            {/* Uncomment below to use actual video embed */}
            {/*
            <iframe
              src={videoUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 md:px-16 lg:px-24 py-32 bg-stone-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-6" style={{ letterSpacing: '-0.01em' }}>
            デモを見てみませんか？
          </h2>
          <p className="text-stone-600 text-lg mb-12">
            ロボットの動作デモや、導入についてのご相談を承ります。
          </p>
          <a 
            href={meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-4 bg-stone-800 text-stone-100 text-lg tracking-wide hover:bg-stone-700 transition-colors"
          >
            ミーティングを予約する
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 md:px-16 lg:px-24 py-12 bg-stone-800 text-stone-500 text-sm">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2025 G1 Construction Demo</p>
          <p>Powered by Unitree G1</p>
        </div>
      </footer>
    </div>
  );
}
