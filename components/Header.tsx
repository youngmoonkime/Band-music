import React from 'react';
import { PlayerStats } from '../types';

const Header: React.FC<{ stats: PlayerStats }> = ({ stats }) => {
  return (
    <header className="flex justify-between items-center bg-black/80 border-b border-white/20 px-4 py-2 h-12 backdrop-blur-sm z-50">
      <div className="flex items-center gap-4">
        <h1 className="font-display font-black text-xl tracking-wider text-white italic" style={{ textShadow: "2px 2px 0px #FF0055" }}>
          BAND <span className="text-secondary">MASTER</span>
        </h1>
        <div className="text-[10px] font-pixel text-gray-400 mt-1">VER 2.5</div>
      </div>

      <div className="flex items-center gap-6 text-xs font-mono">
        {/* Server Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 rounded border border-white/10">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-gray-300">SERVER: <span className="text-secondary font-bold">{stats.server}</span></span>
        </div>

        {/* Currency */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-yellow-400 text-sm">monetization_on</span>
            <span className="text-yellow-400 font-bold">{stats.gold.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-secondary text-sm">diamond</span>
            <span className="text-secondary font-bold">{stats.diamonds}</span>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 border-l border-white/20 pl-4">
          <span className="font-bold text-white hidden sm:inline">{stats.username}</span>
          <span className="bg-primary/20 text-primary px-1 rounded text-[10px] border border-primary/50">LV.{stats.level}</span>
          <span className="material-symbols-outlined text-gray-400 hover:text-white cursor-pointer text-lg">settings</span>
        </div>
      </div>
    </header>
  );
};

export default Header;