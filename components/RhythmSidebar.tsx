import React, { useEffect, useRef, useState } from 'react';

// --- DJMAX STYLE CONFIGURATION ---
const LANE_COLORS = ['#FF0055', '#00E5FF', '#00E676', '#FFEA00']; // Pink, Cyan, Green, Yellow
const KEY_MAP: { [key: string]: number } = { 'd': 0, 'f': 1, 'j': 2, 'k': 3 };
const JUDGEMENT = {
  PERFECT: 0.040, // Tight timing for DJMAX feel
  GREAT: 0.090,
  GOOD: 0.140,
};

// Initial Data
const BASE_NOTE_DATA = [
  { time: 1.0, lane: 0 }, { time: 1.2, lane: 1 }, { time: 1.4, lane: 2 }, { time: 1.6, lane: 3 },
  { time: 2.0, lane: 0 }, { time: 2.0, lane: 3 }, 
  { time: 2.5, lane: 1 }, { time: 2.5, lane: 2 },
  { time: 3.5, lane: 0 }, { time: 3.7, lane: 1 }, { time: 3.9, lane: 2 }, { time: 4.1, lane: 3 },
  { time: 5.0, lane: 0 }, { time: 5.0, lane: 1 }, { time: 5.2, lane: 2 }, { time: 5.2, lane: 3 },
];

// Generate Pattern
const GENERATED_NOTES = [...BASE_NOTE_DATA];
for(let i=0; i<300; i++) {
   const baseTime = 6.0 + (i * 0.25);
   GENERATED_NOTES.push({ time: baseTime, lane: Math.floor(Math.random() * 4) });
   if (i % 8 === 0) GENERATED_NOTES.push({ time: baseTime, lane: (Math.floor(Math.random() * 4) + 2) % 4 });
}

interface Note {
  time: number;
  lane: number;
  hit: boolean;
  missed: boolean;
}

interface VisualEffect {
  id: number;
  time: number;
  lane: number;
  type: 'HIT' | 'MISS' | 'HOLD';
  variant?: string; // PERFECT, GREAT, etc.
}

const RhythmSidebar: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [judgement, setJudgement] = useState<string>("");
  const [activeKeys, setActiveKeys] = useState<boolean[]>([false, false, false, false]);

  // Engine Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const startTimeRef = useRef<number>(0);
  const notesRef = useRef<Note[]>([]);
  const requestRef = useRef<number>(0);
  
  // Visuals
  const effectsRef = useRef<VisualEffect[]>([]);
  const effectIdCounter = useRef(0);

  const initGame = () => {
    setScore(0);
    setCombo(0);
    setJudgement("");
    notesRef.current = JSON.parse(JSON.stringify(GENERATED_NOTES));
    effectsRef.current = [];
    
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    audioCtxRef.current = new AudioContext();
    startTimeRef.current = audioCtxRef.current.currentTime;
    
    setIsPlaying(true);
  };

  const spawnEffect = (lane: number, type: 'HIT' | 'MISS', variant: string = '') => {
    effectsRef.current.push({
      id: effectIdCounter.current++,
      time: performance.now(),
      lane,
      type,
      variant
    });
  };

  const checkInput = (lane: number) => {
    if (!audioCtxRef.current) return;
    const currentTime = audioCtxRef.current.currentTime - startTimeRef.current;
    
    const note = notesRef.current.find(n => n.lane === lane && !n.hit && !n.missed);
    
    if (note) {
      const diff = Math.abs(currentTime - note.time);
      if (diff <= JUDGEMENT.GOOD) {
        note.hit = true;
        let result = "GOOD";
        let scoreAdd = 20;
        
        if (diff <= JUDGEMENT.GREAT) { result = "GREAT"; scoreAdd = 50; }
        if (diff <= JUDGEMENT.PERFECT) { result = "PERFECT"; scoreAdd = 100; }
        
        setScore(prev => prev + scoreAdd);
        setCombo(prev => prev + 1);
        setJudgement(result);
        
        spawnEffect(lane, 'HIT', result);
        return;
      }
    }
  };

  // Input Handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      const key = e.key.toLowerCase();
      if (KEY_MAP.hasOwnProperty(key)) {
        const lane = KEY_MAP[key];
        setActiveKeys(prev => {
            if (prev[lane]) return prev;
            const newKeys = [...prev];
            newKeys[lane] = true;
            return newKeys;
        });
        checkInput(lane);
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        if (KEY_MAP.hasOwnProperty(key)) {
            const lane = KEY_MAP[key];
            setActiveKeys(prev => {
                const newKeys = [...prev];
                newKeys[lane] = false;
                return newKeys;
            });
        }
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying]);

  // Render Loop
  useEffect(() => {
    if (!isPlaying || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // High DPI setup
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const laneWidth = rect.width / 4;
    const noteSpeed = 600; // Fast speed for DJMAX feel
    const hitY = rect.height - 100;

    const render = () => {
       if (!audioCtxRef.current) return;
       const currentTime = audioCtxRef.current.currentTime - startTimeRef.current;

       // 1. Background (Dark Grid)
       ctx.fillStyle = '#050505';
       ctx.fillRect(0, 0, rect.width, rect.height);
       
       // Vertical Grid Lines
       ctx.lineWidth = 1;
       for(let i=0; i<=4; i++) {
           ctx.beginPath();
           ctx.strokeStyle = i === 0 || i === 4 ? '#444' : '#222';
           ctx.moveTo(i * laneWidth, 0);
           ctx.lineTo(i * laneWidth, rect.height);
           ctx.stroke();
       }

       // 2. Key Beams (Additive Blending for light effect)
       ctx.globalCompositeOperation = 'screen';
       for(let i=0; i<4; i++) {
           if (activeKeys[i]) {
               const x = i * laneWidth;
               // Beam Gradient
               const g = ctx.createLinearGradient(0, hitY, 0, 0);
               g.addColorStop(0, `${LANE_COLORS[i]}AA`);
               g.addColorStop(1, `${LANE_COLORS[i]}00`);
               ctx.fillStyle = g;
               ctx.fillRect(x, 0, laneWidth, hitY);
               
               // Hit Line Flash
               ctx.fillStyle = '#FFFFFF';
               ctx.fillRect(x, hitY - 2, laneWidth, 4);
           }
       }
       ctx.globalCompositeOperation = 'source-over';

       // 3. Judgement Line
       ctx.beginPath();
       ctx.strokeStyle = '#FFFFFF';
       ctx.lineWidth = 2;
       ctx.moveTo(0, hitY);
       ctx.lineTo(rect.width, hitY);
       ctx.shadowColor = 'white';
       ctx.shadowBlur = 10;
       ctx.stroke();
       ctx.shadowBlur = 0;

       // 4. Notes (Glossy Spheres)
       notesRef.current.forEach(note => {
           if (note.hit) return;
           
           const y = hitY - (note.time - currentTime) * noteSpeed;
           
           // Miss Check
           if (!note.missed && y > rect.height) {
               note.missed = true;
               setCombo(0);
               setJudgement("MISS");
               spawnEffect(note.lane, 'MISS');
           }

           if (y > -50 && y < rect.height + 50 && !note.missed) {
               const x = note.lane * laneWidth + laneWidth/2;
               
               // Outer Glow
               ctx.shadowColor = LANE_COLORS[note.lane];
               ctx.shadowBlur = 15;
               
               // Base Note
               ctx.beginPath();
               ctx.arc(x, y, laneWidth * 0.35, 0, Math.PI*2);
               ctx.fillStyle = LANE_COLORS[note.lane];
               ctx.fill();
               ctx.shadowBlur = 0;
               
               // Glossy Highlight (Top Left)
               ctx.beginPath();
               ctx.arc(x - laneWidth*0.1, y - laneWidth*0.1, laneWidth * 0.15, 0, Math.PI*2);
               ctx.fillStyle = 'rgba(255,255,255,0.6)';
               ctx.fill();
               
               // Inner Rim Light (Bottom Right)
               ctx.beginPath();
               ctx.arc(x, y, laneWidth * 0.35, 0, Math.PI*2);
               ctx.strokeStyle = 'rgba(0,0,0,0.3)';
               ctx.lineWidth = 2;
               ctx.stroke();
               
               // White Border
               ctx.beginPath();
               ctx.arc(x, y, laneWidth * 0.35, 0, Math.PI*2);
               ctx.strokeStyle = 'white';
               ctx.lineWidth = 2;
               ctx.stroke();
           }
       });

       // 5. Effects (Explosions & Text)
       const now = performance.now();
       effectsRef.current = effectsRef.current.filter(e => now - e.time < 500);

       effectsRef.current.forEach(e => {
           const age = now - e.time;
           const x = e.lane * laneWidth + laneWidth/2;

           if (e.type === 'HIT') {
               // Flash
               if (age < 100) {
                   ctx.globalCompositeOperation = 'lighter';
                   const alpha = 1 - (age / 100);
                   ctx.beginPath();
                   ctx.arc(x, hitY, laneWidth * 0.6, 0, Math.PI*2);
                   ctx.fillStyle = `rgba(255,255,255,${alpha})`;
                   ctx.fill();
                   ctx.globalCompositeOperation = 'source-over';
               }
               
               // Shockwave
               const scale = 1 + (age / 200);
               const alpha = 1 - (age / 300);
               if (alpha > 0) {
                   ctx.beginPath();
                   ctx.arc(x, hitY, laneWidth * 0.4 * scale, 0, Math.PI*2);
                   ctx.strokeStyle = `${LANE_COLORS[e.lane]}`;
                   ctx.globalAlpha = alpha;
                   ctx.lineWidth = 4;
                   ctx.stroke();
                   ctx.globalAlpha = 1;
               }
           }
           
           if (e.type === 'MISS') {
               // Floating MISS Text
               const yOffset = age * 0.1;
               const alpha = 1 - (age / 500);
               ctx.save();
               ctx.font = 'bold 20px "Orbitron"';
               ctx.textAlign = 'center';
               ctx.fillStyle = `rgba(150, 150, 150, ${alpha})`;
               ctx.fillText("MISS", x, hitY + 20 + yOffset);
               ctx.restore();
           }
       });

       requestRef.current = requestAnimationFrame(render);
    };
    
    render();
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, activeKeys]);

  return (
    <aside className="w-72 h-full relative border-r-4 border-zinc-700 bg-black flex flex-col items-center shadow-2xl z-20 hidden md:flex">
      {/* Top Header */}
      <div className="w-full h-20 bg-[#1a1a1a] border-b border-zinc-600 flex justify-center items-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-50"></div>
        <div className={`w-12 h-12 rounded-full border-2 border-gray-500 bg-black flex items-center justify-center transition-all duration-100 ${isPlaying ? 'shadow-[0_0_15px_#FF0055]' : ''}`}>
          <span className="material-symbols-outlined text-2xl text-white">album</span>
        </div>
      </div>

      {/* Game Canvas Container */}
      <div className="flex-1 w-full relative bg-black cursor-pointer group" onClick={!isPlaying ? initGame : undefined}>
        <canvas ref={canvasRef} className="w-full h-full block" />
        
        {/* Start Overlay */}
        {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm group-hover:bg-black/60 transition-colors">
                <div className="text-center animate-pulse">
                    <span className="material-symbols-outlined text-6xl text-primary mb-4 block filter drop-shadow-[0_0_10px_rgba(255,0,85,0.8)]">play_circle_filled</span>
                    <div className="font-display font-black text-2xl text-white tracking-widest">START GAME</div>
                    <div className="font-mono text-xs text-secondary mt-2">KEYS: D F J K</div>
                </div>
            </div>
        )}

        {/* HUD Overlay (Score/Combo) */}
        {isPlaying && (
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full pointer-events-none px-4">
                {/* Judgement Text */}
                {judgement && (
                     <div key={`${score}`} className="flex flex-col items-center animate-pop">
                        <div className={`font-display font-black text-4xl italic tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]
                            ${judgement === 'PERFECT' ? 'text-[#FF0055] scale-110' : 
                              judgement === 'GREAT' ? 'text-[#00E5FF]' : 
                              judgement === 'GOOD' ? 'text-[#00E676]' : 'text-gray-500'}`}>
                            {judgement}
                        </div>
                        {combo > 0 && (
                            <div className="text-white font-display font-bold text-xl mt-1 tracking-widest">
                                {combo} <span className="text-sm text-gray-400">COMBO</span>
                            </div>
                        )}
                     </div>
                )}
            </div>
        )}
      </div>

      {/* Bottom Panel */}
      <div className="w-full bg-[#111] p-3 border-t-2 border-zinc-600 shrink-0">
        <div className="flex justify-between items-end mb-1">
            <span className="font-display text-[10px] text-gray-500">SCORE</span>
            <span className="font-display font-bold text-2xl text-white tracking-widest">{score.toString().padStart(6, '0')}</span>
        </div>
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-secondary w-full" style={{ width: `${Math.min(combo, 100)}%` }}></div>
        </div>
      </div>
    </aside>
  );
};

export default RhythmSidebar;