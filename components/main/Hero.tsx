"use client";

import React from 'react';
import { motion } from 'framer-motion';

const SparklesSVG = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#c084fc" />
        <path d="M19 14L19.75 17.25L23 18L19.75 18.75L19 22L18.25 18.75L15 18L18.25 17.25L19 14Z" fill="#c084fc" opacity="0.6" />
        <path d="M5 3L5.5 5.5L8 6L5.5 6.5L5 9L4.5 6.5L2 6L4.5 5.5L5 3Z" fill="#c084fc" opacity="0.6" />
    </svg>
);

const ArrowRightSVG = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const PlaySVG = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="10" fill="#FF0000" opacity="0.9" />
        <path d="M19 14L34 24L19 34V14Z" fill="white" />
    </svg>
);

const ThumbnailPreview = () => (
    <div className="relative w-full max-w-md mx-auto mt-12">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            className="relative rounded-xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-900/40"
        >
            {/* 썸네일 미리보기 카드 */}
            <div className="bg-gradient-to-br from-gray-900 to-black aspect-video flex items-center justify-center relative">
                {/* 배경 그라데이션 효과 */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-red-900/20" />

                {/* 썸네일 텍스트 요소 */}
                <div className="relative z-10 text-center px-6">
                    <div className="text-xs text-purple-400 font-semibold tracking-widest uppercase mb-2">AI Generated</div>
                    <div className="text-white font-black text-2xl leading-tight drop-shadow-lg">
                        10분만에 배우는
                        <br />
                        <span className="text-yellow-400">유튜브 성공 전략</span>
                    </div>
                </div>

                {/* 재생 버튼 */}
                <div className="absolute bottom-3 right-3 opacity-80">
                    <PlaySVG />
                </div>

                {/* 생성 중 표시 */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                    </span>
                    <span className="text-xs text-gray-300">Generating...</span>
                </div>
            </div>
        </motion.div>

        {/* 하단 스타일 태그들 */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex gap-2 justify-center mt-4 flex-wrap"
        >
            {['Bold Typography', 'High Contrast', 'Click-bait Optimized'].map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300">
                    {tag}
                </span>
            ))}
        </motion.div>
    </div>
);

const NailArtHero = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const mouse = { x: null as number | null, y: null as number | null, radius: 200 };

        class Particle {
            x: number;
            y: number;
            directionX: number;
            directionY: number;
            size: number;
            color: string;

            constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx!.fillStyle = this.color;
                ctx!.fill();
            }

            update() {
                if (this.x > canvas!.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas!.height || this.y < 0) this.directionY = -this.directionY;

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius + this.size) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.x -= forceDirectionX * force * 5;
                        this.y -= forceDirectionY * force * 5;
                    }
                }

                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particles = [];
            const numberOfParticles = (canvas!.height * canvas!.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                const size = Math.random() * 2 + 1;
                const x = Math.random() * (canvas!.width - size * 4) + size * 2;
                const y = Math.random() * (canvas!.height - size * 4) + size * 2;
                const directionX = Math.random() * 0.4 - 0.2;
                const directionY = Math.random() * 0.4 - 0.2;
                particles.push(new Particle(x, y, directionX, directionY, size, 'rgba(191, 128, 255, 0.8)'));
            }
        }

        const resizeCanvas = () => {
            canvas!.width = window.innerWidth;
            canvas!.height = window.innerHeight;
            init();
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const connect = () => {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const distance =
                        (particles[a].x - particles[b].x) ** 2 +
                        (particles[a].y - particles[b].y) ** 2;

                    if (distance < (canvas!.width / 7) * (canvas!.height / 7)) {
                        const opacityValue = 1 - distance / 20000;
                        const dx = particles[a].x - (mouse.x ?? 0);
                        const dy = particles[a].y - (mouse.y ?? 0);
                        const distanceMouse = Math.sqrt(dx * dx + dy * dy);

                        ctx!.strokeStyle =
                            mouse.x && distanceMouse < mouse.radius
                                ? `rgba(255, 255, 255, ${opacityValue})`
                                : `rgba(200, 150, 255, ${opacityValue})`;
                        ctx!.lineWidth = 1;
                        ctx!.beginPath();
                        ctx!.moveTo(particles[a].x, particles[a].y);
                        ctx!.lineTo(particles[b].x, particles[b].y);
                        ctx!.stroke();
                    }
                }
            }
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            ctx!.fillStyle = 'black';
            ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
            particles.forEach(p => p.update());
            connect();
        };

        const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
        const handleMouseOut = () => { mouse.x = null; mouse.y = null; };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2 + 0.5, duration: 0.8, ease: "easeInOut" },
        }),
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-20">
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                {/* 배지 */}
                <motion.div
                    custom={0}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6 backdrop-blur-sm"
                >
                    <SparklesSVG />
                    <span className="text-sm font-medium text-gray-200">AI-Powered Thumbnail Generator</span>
                </motion.div>

                {/* 메인 타이틀 */}
                <motion.h1
                    custom={1}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 font-[family-name:var(--font-indie-flower)]"
                >
                    NailArt
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                        AI
                    </span>
                </motion.h1>

                {/* 서브 타이틀 */}
                <motion.p
                    custom={2}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-2xl mx-auto text-lg text-gray-400 mb-4"
                >
                    클릭을 부르는 유튜브 썸네일을 AI가 단 몇 초 만에 완성합니다.
                    <br />
                    <span className="text-gray-500 text-base">텍스트만 입력하세요. 나머지는 NailArt AI가 처리합니다.</span>
                </motion.p>

                {/* CTA 버튼 */}
                <motion.div
                    custom={3}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center justify-center gap-4 mt-8"
                >
                    <button className="px-8 py-4 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition-colors duration-300 flex items-center gap-2">
                        무료로 시작하기
                        <ArrowRightSVG />
                    </button>
                    <button className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border border-white/20 hover:border-white/40 transition-colors duration-300 backdrop-blur-sm">
                        예시 보기
                    </button>
                </motion.div>

                {/* 통계 */}
                <motion.div
                    custom={4}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center justify-center gap-8 mt-10 text-sm text-gray-500"
                >
                    {[
                        { value: '50,000+', label: '생성된 썸네일' },
                        { value: '3.2×', label: '평균 CTR 향상' },
                        { value: '10초', label: '평균 생성 시간' },
                    ].map(({ value, label }) => (
                        <div key={label} className="text-center">
                            <div className="text-white font-bold text-lg">{value}</div>
                            <div>{label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* 썸네일 미리보기 */}
                <ThumbnailPreview />
            </div>
        </div>
    );
};

export default NailArtHero;
