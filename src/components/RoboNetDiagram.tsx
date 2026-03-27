import { useEffect, useRef } from 'react';

export function RoboNetDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;

    canvas.width = rect.width;
    canvas.height = rect.height;

    // Animation loop
    let animationId: number;
    let time = 0;

    const draw = () => {
      time += 0.01;

      // Clear canvas
      ctx.fillStyle = '#1c1917'; // stone-900
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2.2; // Shift up for title space
      const radius = Math.min(canvas.width, canvas.height) * 0.25;

      // Draw central intelligence node
      ctx.fillStyle = '#f97316'; // orange-500
      ctx.beginPath();
      ctx.arc(centerX, centerY, 28, 0, Math.PI * 2);
      ctx.fill();

      // Draw central glow
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 28 + Math.sin(time) * 12, 0, Math.PI * 2);
      ctx.stroke();

      // Robot nodes (sites)
      const robotCount = 6;
      const robots = Array.from({ length: robotCount }, (_, i) => {
        const angle = (i / robotCount) * Math.PI * 2 + time * 0.3;
        return {
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          angle,
        };
      });

      // Draw connections and data flow
      robots.forEach((robot, i) => {
        // Draw line to center
        ctx.strokeStyle = 'rgba(249, 115, 22, 0.3)'; // orange-500 with opacity
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(robot.x, robot.y);
        ctx.lineTo(centerX, centerY);
        ctx.stroke();

        // Draw animated data flow (moving dots)
        const flowProgress = (time * 0.5 + i * 0.15) % 1;
        const flowX = robot.x + (centerX - robot.x) * flowProgress;
        const flowY = robot.y + (centerY - robot.y) * flowProgress;

        ctx.fillStyle = '#fb923c'; // orange-400
        ctx.beginPath();
        ctx.arc(flowX, flowY, 5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw robot nodes
      robots.forEach((robot) => {
        ctx.fillStyle = '#ea580c'; // orange-600
        ctx.beginPath();
        ctx.arc(robot.x, robot.y, 16, 0, Math.PI * 2);
        ctx.fill();

        // Robot glow
        ctx.strokeStyle = 'rgba(234, 88, 12, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(robot.x, robot.y, 16 + Math.sin(time + robot.angle) * 6, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw connections between robots (knowledge sharing)
      for (let i = 0; i < robots.length; i++) {
        for (let j = i + 1; j < robots.length; j++) {
          if (j - i <= 2 || i === 0) {
            ctx.strokeStyle = 'rgba(96, 165, 250, 0.1)';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(robots[i].x, robots[i].y);
            ctx.lineTo(robots[j].x, robots[j].y);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }

      // Draw title and labels
      ctx.fillStyle = '#e2e8f0'; // slate-200
      ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('RoboNet', centerX, 40);

      ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#cbd5e1'; // slate-300
      ctx.fillText('Shared Intelligence Network', centerX, 65);

      // Legend
      ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#cbd5e1';

      // Central node label
      ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('💡 Model', centerX + radius + 30, centerY - 15);
      ctx.fillText('Training', centerX + radius + 30, centerY + 10);

      // Robot label
      const legendY = canvas.height - 80;
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(40, legendY, 12, 12);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('Robot Site', 60, legendY + 10);

      // Data flow label
      ctx.fillStyle = '#fb923c';
      ctx.fillRect(40, legendY + 30, 12, 12);
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText('Experience Data Flow', 60, legendY + 40);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="w-full bg-stone-900 rounded-2xl overflow-hidden border border-stone-700">
      <canvas
        ref={canvasRef}
        className="w-full block"
        style={{ display: 'block', height: '500px' }}
      />
    </div>
  );
}
