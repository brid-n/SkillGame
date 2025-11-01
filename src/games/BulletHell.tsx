import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Maximize2, Minimize2, ArrowLeft, RotateCcw } from "lucide-react";

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
}

export default function BulletHell() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);
  const navigate = useNavigate();

  // Player
  const player = useRef({ x: 640, y: 360, r: 10, speed: 4 });
  const keys = useRef<Record<string, boolean>>({});

  // Bullets + patterns
  const bullets = useRef<Bullet[]>([]);
  const lastSpawn = useRef(0);
  const currentPattern = useRef(0);
  const nextPattern = useRef(Math.floor(Math.random() * 10));
  const patternStart = useRef(0);
  const waitingForClear = useRef(false);

  // Keyboard
  useEffect(() => {
    const down = (e: KeyboardEvent) => (keys.current[e.key] = true);
    const up = (e: KeyboardEvent) => (keys.current[e.key] = false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Restart
  const restartGame = () => {
    player.current = { x: 640, y: 360, r: 10, speed: 4 };
    bullets.current = [];
    setIsGameOver(false);
    patternStart.current = performance.now();
    waitingForClear.current = false;
  };

  // Spawn patterns
  const spawnPattern = (ctx: CanvasRenderingContext2D, time: number) => {
    if (waitingForClear.current) return;

    if (time - patternStart.current > 10000) {
      waitingForClear.current = true;
      return;
    }

    if (time - lastSpawn.current < 200) return;
    lastSpawn.current = time;

    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const colors = ["#ff4d4d", "#ffcc00", "#66ff66", "#00eaff"];

    switch (currentPattern.current) {
      case 0: // Rain down (ngẫu nhiên, di chuyển trái phải)
        for (let i = 0; i < 6; i++) {
          const sway = Math.sin(time / 300 + i) * 1.5;
          bullets.current.push({
            x: Math.random() * w,
            y: -10,
            vx: sway,
            vy: 3.5,
            r: 6,
            color: "#00eaff",
          });
        }
        break;

      case 1: // Rise up
        for (let i = 0; i < 5; i++) {
          bullets.current.push({
            x: Math.random() * w,
            y: h + 10,
            vx: 0,
            vy: -3,
            r: 6,
            color: "#ffcc00",
          });
        }
        break;

      case 2: // Left to right
        for (let i = 0; i < 5; i++) {
          bullets.current.push({
            x: -10,
            y: Math.random() * h,
            vx: 3,
            vy: 0,
            r: 6,
            color: "#66ff66",
          });
        }
        break;

      case 3: // Right to left
        for (let i = 0; i < 5; i++) {
          bullets.current.push({
            x: w + 10,
            y: Math.random() * h,
            vx: -3,
            vy: 0,
            r: 6,
            color: "#ff4d4d",
          });
        }
        break;

      case 4: // Circle around player
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          bullets.current.push({
            x: player.current.x,
            y: player.current.y,
            vx: Math.cos(angle) * 2.5,
            vy: Math.sin(angle) * 2.5,
            r: 6,
            color: "#ff4d4d",
          });
        }
        break;

      case 5: // Radial from center
        for (let i = 0; i < 16; i++) {
          const angle = (i / 16) * Math.PI * 2;
          bullets.current.push({
            x: w / 2,
            y: h / 2,
            vx: Math.cos(angle) * 3,
            vy: Math.sin(angle) * 3,
            r: 6,
            color: "#ffcc00",
          });
        }
        break;

      case 6: // Spiral (tăng tốc độ xoay)
        const angle = (time / 100) % (Math.PI * 2);
        bullets.current.push({
          x: w / 2,
          y: h / 2,
          vx: Math.cos(angle) * 3.5,
          vy: Math.sin(angle) * 3.5,
          r: 6,
          color: "#66ff66",
        });
        break;

      case 7: // Zigzag
        bullets.current.push({
          x: -10,
          y: (Math.sin(time / 100) + 1) * h * 0.5,
          vx: 4,
          vy: Math.sin(time / 200) * 3,
          r: 6,
          color: "#00eaff",
        });
        break;

      case 8: // Wave
        for (let i = 0; i < 8; i++) {
          bullets.current.push({
            x: i * 160,
            y: -10,
            vx: 0,
            vy: 3 + Math.sin(time / 200) * 2,
            r: 6,
            color: "#ff4d4d",
          });
        }
        break;

      case 9: // Chaos
        for (let i = 0; i < 8; i++) {
          const side = Math.floor(Math.random() * 4);
          let x = 0,
            y = 0,
            vx = 0,
            vy = 0;
          switch (side) {
            case 0:
              x = Math.random() * w;
              y = -10;
              vy = 3;
              break;
            case 1:
              x = Math.random() * w;
              y = h + 10;
              vy = -3;
              break;
            case 2:
              x = -10;
              y = Math.random() * h;
              vx = 3;
              break;
            case 3:
              x = w + 10;
              y = Math.random() * h;
              vx = -3;
              break;
          }
          bullets.current.push({
            x,
            y,
            vx,
            vy,
            r: 6,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
        break;
    }
  };

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    patternStart.current = performance.now();
    currentPattern.current = Math.floor(Math.random() * 10);

    const loop = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0f2027");
      gradient.addColorStop(0.5, "#203a43");
      gradient.addColorStop(1, "#2c5364");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (isGameOver) {
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("💀 GAME OVER 💀", canvas.width / 2, canvas.height / 2);
        return;
      }

      // Move player
      if (keys.current["w"]) player.current.y -= player.current.speed;
      if (keys.current["s"]) player.current.y += player.current.speed;
      if (keys.current["a"]) player.current.x -= player.current.speed;
      if (keys.current["d"]) player.current.x += player.current.speed;

      // Keep inside
      player.current.x = Math.max(
        player.current.r,
        Math.min(canvas.width - player.current.r, player.current.x)
      );
      player.current.y = Math.max(
        player.current.r,
        Math.min(canvas.height - player.current.r, player.current.y)
      );

      spawnPattern(ctx, time);

      // Update bullets
      bullets.current.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
      });
      bullets.current = bullets.current.filter(
        (b) =>
          b.x > -20 &&
          b.y > -20 &&
          b.x < canvas.width + 20 &&
          b.y < canvas.height + 20
      );

      // Nếu hết đạn và đang chờ clear → cảnh báo pattern mới
      if (waitingForClear.current && bullets.current.length === 0) {
        waitingForClear.current = false;

        const patternNames = [
          "💧 Rain Down",
          "🔥 Rise Up",
          "➡️ Left Wave",
          "⬅️ Right Wave",
          "⭕ Circle",
          "🌟 Radial",
          "🌀 Spiral",
          "⚡ Zigzag",
          "🌊 Wave",
          "💥 Chaos",
        ];

        currentPattern.current = nextPattern.current;
        nextPattern.current = Math.floor(Math.random() * 10);
        setWarning(`⚠️ Incoming Pattern: ${patternNames[currentPattern.current]}`);

        setTimeout(() => {
          setWarning(null);
          patternStart.current = performance.now();
        }, 2000);
      }

      // Collision
      for (let b of bullets.current) {
        const dx = b.x - player.current.x;
        const dy = b.y - player.current.y;
        if (Math.sqrt(dx * dx + dy * dy) < b.r + player.current.r) {
          setIsGameOver(true);
          return;
        }
      }

      // Draw bullets
      bullets.current.forEach((b) => {
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw player
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#00eaff";
      ctx.fillStyle = "#00eaff";
      ctx.beginPath();
      ctx.arc(player.current.x, player.current.y, player.current.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }, [isGameOver]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden"
    >
      {warning && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        text-yellow-300 text-3xl font-bold bg-black/70 px-6 py-3 rounded-xl 
                        shadow-lg animate-pulse z-20">
          {warning}
        </div>
      )}

      <canvas ref={canvasRef} className="rounded-lg" />

      {isGameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/50">
          <button
            onClick={restartGame}
            className="bg-white text-black px-6 py-2 rounded-lg shadow hover:bg-gray-200"
          >
            <RotateCcw className="inline-block mr-2" /> Restart
          </button>
          <button
            onClick={() => navigate("/games")}
            className="bg-white text-black px-6 py-2 rounded-lg shadow hover:bg-gray-200"
          >
            <ArrowLeft className="inline-block mr-2" /> Back to Menu
          </button>
        </div>
      )}

      {!isGameOver && (
        <button
          onClick={() => navigate("/games")}
          className="absolute bottom-6 left-6 bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-200 transition"
          title="Back to Game Menu"
        >
          <ArrowLeft size={22} />
        </button>
      )}

      <button
        onClick={toggleFullscreen}
        className="absolute bottom-6 right-6 bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-200 transition"
        title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
      >
        {isFullscreen ? <Minimize2 size={22} /> : <Maximize2 size={22} />}
      </button>
    </div>
  );
}
