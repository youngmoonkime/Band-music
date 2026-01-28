import React, { useState } from 'react';
import { SongInfo } from '../types';

interface ControlBarProps {
  song: SongInfo;
}

const ControlBar: React.FC<ControlBarProps> = ({ song }) => {
  const [myVolume, setMyVolume] = useState(50);
  const [bgVolume, setBgVolume] = useState(80);
  const [noteSpeed, setNoteSpeed] = useState(2.0);

  return (
    <div className="absolute bottom-8 right-8 left-8 glossy-bar rounded-lg p-1 flex flex-col z-50 max-w-4xl mx-auto shadow-[0_5px_15px_rgba(0,0,0,0.8)] border border-gray-600">
      
      {/* LCD Display / Player Info */}
      <div className="bg-black border border-gray-700 h-10 flex items-center px-3 justify-between mb-1 relative overflow-hidden">
         {/* LCD Scanline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] pointer-events-none bg-[length:100%_2px,3px_100%] opacity-50"></div>
        
        <div className="flex items-center gap-3 z-10">
          <button className="text-blue-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-xl">play_circle</span>
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-xl">pause_circle</span>
          </button>
          <div className="h-4 w-[1px] bg-gray-600 mx-1"></div>
          <span className="text-xs font-mono text-white whitespace-nowrap">LV.{song.difficulty} {song.title}</span>
          <span className="text-[10px] font-mono text-gray-400 hidden sm:inline">- {song.artist}</span>
        </div>

        <div className="flex items-center gap-4 z-10 text-[10px] font-mono text-blue-300">
          <span className="hidden sm:inline">OST</span>
          <span className="hidden sm:inline">{song.bpm} BPM</span>
          <div className="bg-blue-900/50 px-2 rounded border border-blue-800 text-blue-200">
            {song.current} / {song.duration}
          </div>
        </div>
      </div>

      {/* Knobs and Sliders */}
      <div className="bg-[#2a2a2a] p-2 flex flex-wrap gap-4 items-center justify-between rounded border-t border-white/10">
        <div className="flex items-center gap-6 flex-1 justify-around">
          
          {/* My Volume */}
          <div className="flex flex-col items-center gap-1 w-24">
            <input 
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer" 
              type="range" 
              min="0" 
              max="100" 
              value={myVolume}
              onChange={(e) => setMyVolume(Number(e.target.value))}
            />
            <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider">My Volume</span>
            <div className="flex justify-between w-full text-[8px] text-gray-500 font-mono">
              <span>0%</span><span>100%</span>
            </div>
          </div>

          {/* BG Volume */}
          <div className="flex flex-col items-center gap-1 w-24">
            <input 
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer" 
              type="range" 
              min="0" 
              max="100" 
              value={bgVolume}
              onChange={(e) => setBgVolume(Number(e.target.value))}
            />
            <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider">BG Volume</span>
            <div className="flex justify-between w-full text-[8px] text-gray-500 font-mono">
              <span>0%</span><span>100%</span>
            </div>
          </div>

          {/* Note Speed */}
          <div className="flex flex-col items-center gap-1 w-24">
            <input 
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer" 
              type="range" 
              min="1" 
              max="4" 
              step="0.5"
              value={noteSpeed}
              onChange={(e) => setNoteSpeed(Number(e.target.value))}
            />
            <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider">Note Speed</span>
            <div className="flex justify-between w-full text-[8px] text-gray-500 font-mono">
              <span>x1.0</span><span>x4.0</span>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button className="flex flex-col items-center justify-center gap-0 group hover:brightness-125 transition-all">
          <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-white/50 shadow-lg flex items-center justify-center mb-1 group-active:translate-y-0.5">
            <span className="material-symbols-outlined text-white text-lg font-bold">arrow_back</span>
          </div>
          <span className="text-[9px] font-bold text-white shadow-black drop-shadow-md">BACK</span>
        </button>
      </div>
    </div>
  );
};

export default ControlBar;