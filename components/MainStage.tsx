import React from 'react';
import ControlBar from './ControlBar';
import { SongInfo } from '../types';

const currentSong: SongInfo = {
  title: "God Knows...",
  artist: "Hirano Aya",
  bpm: 150,
  difficulty: 11,
  duration: "03:10",
  current: "00:25"
};

const MainStage: React.FC = () => {
  return (
    <section className="flex-1 relative flex items-end justify-center z-10 overflow-hidden">
      
      {/* Main Character Art */}
      <div className="relative h-[90%] w-auto transition-transform duration-300 hover:scale-[1.02] cursor-pointer group flex items-end justify-center">
        {/* Floor glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-20 bg-white/20 blur-xl rounded-[100%] group-hover:bg-secondary/30 transition-colors pointer-events-none"></div>
        
        {/* Character Image */}
        <img 
          alt="Featured Character" 
          className="h-full w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] max-h-[85vh]" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuASCJEv7E3bqwUSl_DZpAFR5tXGOqey-1EwchsWfCuqRMN33iORc9BaWBrqeGyRsudXc7OXywAX50a2YIf0zf29nNaEdrpfJq4NgqnJAuVl8SxQxm_mhI-7l8EQjGKW7sbWzp7k-JvrHfrVM9rQ_7oiwzDnU47eapCySebfunpIFukEzF34Aibuzpd84RmRN1-CZS7ULON8U6M1NSPwnAoWegc_Hj2mf0wuz0mVsyFRjPde5tkjDdlc563kTNNrxPrFzPat6gihGeA"
        />

        {/* Title Badge Floating next to head */}
        <div className="absolute top-20 right-[-60px] md:right-[-40px] bg-black/70 border border-white/30 backdrop-blur-md px-4 py-2 rounded-r-xl transform rotate-[-5deg] animate-pulse">
          <h2 className="text-xl md:text-2xl font-display font-black text-white italic">
            GUITAR<span className="text-primary">HERO</span>
          </h2>
          <p className="text-xs text-gray-300 font-mono">LV. 42 MASTER</p>
        </div>
      </div>

      {/* Right Side Menu Buttons */}
      <div className="absolute right-0 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 w-48 md:w-64 z-40">
        
        {/* Button 1 */}
        <button className="group relative h-16 md:h-20 bg-gradient-to-r from-black/80 to-transparent border-l-4 border-primary hover:border-white transition-all overflow-hidden flex items-center pl-4 pr-2 clip-path-slant">
          <div className="absolute inset-0 bg-primary/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          <div className="relative z-10 text-left">
            <div className="text-[8px] md:text-[10px] text-primary group-hover:text-white tracking-widest font-bold">SOLO MODE</div>
            <div className="text-lg md:text-2xl font-display font-bold italic text-white group-hover:scale-110 origin-left transition-transform">SINGLE PLAY</div>
          </div>
        </button>

        {/* Button 2 */}
        <button className="group relative h-16 md:h-20 bg-gradient-to-r from-black/80 to-transparent border-l-4 border-secondary hover:border-white transition-all overflow-hidden flex items-center pl-4 pr-2">
          <div className="absolute inset-0 bg-secondary/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          <div className="relative z-10 text-left">
            <div className="text-[8px] md:text-[10px] text-secondary group-hover:text-white tracking-widest font-bold">ONLINE BATTLE</div>
            <div className="text-lg md:text-2xl font-display font-bold italic text-white group-hover:scale-110 origin-left transition-transform">MULTI PLAY</div>
          </div>
        </button>

        {/* Button 3 */}
        <button className="group relative h-16 md:h-20 bg-gradient-to-r from-black/80 to-transparent border-l-4 border-tertiary hover:border-white transition-all overflow-hidden flex items-center pl-4 pr-2">
          <div className="absolute inset-0 bg-tertiary/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          <div className="relative z-10 text-left">
            <div className="text-[8px] md:text-[10px] text-tertiary group-hover:text-white tracking-widest font-bold">TRAINING</div>
            <div className="text-lg md:text-2xl font-display font-bold italic text-white group-hover:scale-110 origin-left transition-transform">PRACTICE</div>
          </div>
        </button>
      </div>

      <ControlBar song={currentSong} />
    </section>
  );
};

export default MainStage;