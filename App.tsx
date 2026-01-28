import React from 'react';
import Header from './components/Header';
import RhythmSidebar from './components/RhythmSidebar';
import MainStage from './components/MainStage';
import { PlayerStats } from './types';

const playerStats: PlayerStats = {
  username: "SnowTear",
  level: 42,
  gold: 124500,
  diamonds: 850,
  server: "NEON_TOKYO"
};

const App: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen font-body overflow-hidden select-none relative">
      {/* Scanline Overlay */}
      <div className="scanlines"></div>

      {/* Background Layers */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Main Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity duration-1000" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfLbPAczpPohk-M27-XJ_jNl4tc2w0bVwUsJyxcFWSDFZFZT17xdxYwewHeoHUMvJ3_N1Ofxado7SbLHu_55cbZzjExr9EqEdb-64qZ6-b5lBpVx-9aRKzdu13j9XLc0lBOcP-vjRaKlBkxDArxrQ8yatdF08V6JGgPZssv3fQ-sVx3dvQoedBeit7r_LARJq5njt3Bgj4z33VRAnIBig9ySFd3qEfrwWaSBEBd0SonCfZM_jQyPrsiFD18Jv0xpzERytjnhRU8SY')" }}
        ></div>
        
        {/* Decorative Floating Polaroids */}
        <div className="absolute top-20 right-20 w-32 h-48 bg-black/50 border border-white/20 transform rotate-6 shadow-xl overflow-hidden hidden lg:block">
          <img className="w-full h-full object-cover opacity-70 grayscale hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvqMkAmWNKj_xQoSAi3yvq5mCHTiRM08qZ14JIfoDxM8xC2LQYY4or3v3IsISZrGpKFEKUkRFAFSF9nFp2AKS_w7CFWLRc3_b5rKozBO1H2aRlmFIPzysRxzdtK6q5YypBdZD6wJVOB8_eHMMQnzfhwXsVYceG98Lvo25F48OKsSO_Hz8-2MVY_mlfELc3W6u4z1jYkS0iNTvc73CERMqjNP4GEeD-igmqT3GrUrjoL_xz7cLI0u01lSOQrei1SF-rsKlO4KU3_6k" alt="memory-1" />
        </div>
        <div className="absolute top-40 left-1/4 w-40 h-56 bg-black/50 border border-white/20 transform -rotate-3 shadow-xl overflow-hidden hidden lg:block">
          <img className="w-full h-full object-cover opacity-70 grayscale hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT2LEo44y94BHqF9vbyTxXtrv77KBE2_lxyb0JVDHfGXWs7bFysetK6qmRX9qU4nycF7KV-iyRVWDSM_TF4rJTGnzleMAdBkUaKMOo--sOcHQse_o-eavm1M6VYSrSErZl1jR76zZ1Qje4o278RL4C_s42Xtk5BYp_3om8SctMKMaexy2UVuzGTLGkbZY8-Y-9JJhTLnlOUtfWxS8Gx8tJuCsIadh3vKUXlN0iS4IP2KHr4DGcg3aKNjyTEBYGNLOPZXF3UP9ZcMw" alt="memory-2" />
        </div>

        {/* Decorative Speakers Bottom */}
        <div className="absolute bottom-20 left-[20%] w-32 h-64 bg-zinc-800 border-4 border-zinc-600 shadow-2xl flex flex-col items-center justify-around py-4 opacity-80 hidden lg:flex">
          <div className="w-20 h-20 rounded-full bg-zinc-900 border-2 border-zinc-700 shadow-inner"></div>
          <div className="w-24 h-24 rounded-full bg-zinc-900 border-2 border-zinc-700 shadow-inner"></div>
        </div>
        <div className="absolute bottom-20 right-[20%] w-32 h-64 bg-zinc-800 border-4 border-zinc-600 shadow-2xl flex flex-col items-center justify-around py-4 opacity-80 hidden lg:flex">
          <div className="w-20 h-20 rounded-full bg-zinc-900 border-2 border-zinc-700 shadow-inner"></div>
          <div className="w-24 h-24 rounded-full bg-zinc-900 border-2 border-zinc-700 shadow-inner"></div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col h-screen overflow-hidden">
        <Header stats={playerStats} />
        
        <main className="flex-1 relative flex">
          <RhythmSidebar />
          <MainStage />
        </main>

        {/* Footer Chat */}
        <footer className="absolute bottom-0 left-0 md:left-64 right-0 h-8 bg-black/90 border-t border-white/10 flex items-center px-4 z-40">
          <span className="material-symbols-outlined text-sm text-gray-500 mr-2">chat</span>
          <input 
            className="bg-transparent border-none text-xs text-gray-300 w-full focus:outline-none placeholder-gray-600 font-mono" 
            placeholder="Press ENTER to chat..." 
          />
        </footer>
      </div>
    </div>
  );
};

export default App;