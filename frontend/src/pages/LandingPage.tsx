import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSpring, animated, useTransition } from '@react-spring/web';

const TASKBAR_HEIGHT = 56; // px

const topics = [
	{
		title: 'AI-Powered Email Categorization',
		description: 'Categorize and label emails with the help of an agent.',
		icon: '📬',
	},
	{
		title: 'Smart Scheduling',
		description: 'Schedule emails, cron jobs, and agent events.',
		icon: '⏰',
	},
	{
		title: 'Full Audit Trail',
		description: 'View a full audit trail of actions.',
		icon: '📝',
	},
	{
		title: 'Real-time Agent Chat',
		description: 'Chat with the agent in real time.',
		icon: '🤖',
	},
	{
		title: 'Google Sheets Automation',
		description: 'Connect agents to Google Sheets for data sync, reporting, and workflow automation.',
		icon: '📊',
	},
	{
		title: 'Writer',
		description: 'Let agents generate, summarize, and edit documents for you.',
		icon: '📝',
	},
	{
		title: 'PDF Processing',
		description: 'Extract, analyze, and process PDF files with AI-powered agents.',
		icon: '📄',
	},
	{
		title: 'Workflows & Automation',
		description: 'Visually build and automate multi-step workflows in Tasks. Drag, connect, and orchestrate agents, validations, and document actions.',
		icon: '🛠️',
	},
	{
		title: 'Calendar Access & Booking',
		description: 'Integrate your calendar, book meetings, and let agents manage your schedule automatically.',
		icon: '📅',
	},
	{
		title: 'Agent Drive Access',
		description: 'Let agents access, organize, and process files in your Drive for seamless document workflows.',
		icon: '🗂️',
	},
	{
		title: 'More Tools Coming Soon!',
		description: 'Stay tuned for even more integrations and agent-powered features.',
		icon: '✨',
	},
];

const svgBackgrounds = [
	(style: any) => (
		<animated.svg
			style={style}
			className="absolute inset-0 w-full h-full pointer-events-none"
			viewBox="0 0 800 600"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<animated.circle
				cx="200"
				cy="200"
				r="120"
				fill="#f0abfc"
				fillOpacity="0.15"
				style={{
					transform: style.xy.to(
						(x, y) => `translate(${x}px,${y}px) scale(1.1)`
					),
				}}
			/>
			<animated.rect
				x="500"
				y="100"
				width="180"
				height="180"
				rx="40"
				fill="#818cf8"
				fillOpacity="0.12"
				style={{
					transform: style.xy.to(
						(x, y) => `translate(${-x}px,${y}px) scale(1.05)`
					),
				}}
			/>
			<animated.ellipse
				cx="650"
				cy="500"
				rx="80"
				ry="40"
				fill="#f472b6"
				fillOpacity="0.1"
				style={{
					transform: style.xy.to(
						(x, y) => `translate(${x / 2}px,${-y / 2}px) scale(1.05)`
					),
				}}
			/>
		</animated.svg>
	),
	(style: any) => (
		<animated.svg
			style={style}
			className="absolute inset-0 w-full h-full pointer-events-none"
			viewBox="0 0 800 600"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<animated.rect
				x="100"
				y="400"
				width="200"
				height="80"
				rx="40"
				fill="#f472b6"
				fillOpacity="0.13"
				style={{
					transform: style.xy.to(
						(x, y) => `translate(${x / 2}px,${-y / 2}px) scale(1.1)`
					),
				}}
			/>
			<animated.circle
				cx="600"
				cy="200"
				r="100"
				fill="#818cf8"
				fillOpacity="0.1"
				style={{
					transform: style.xy.to(
						(x, y) => `translate(${-x / 2}px,${y / 2}px) scale(1.05)`
					),
				}}
			/>
			<animated.ellipse
				cx="400"
				cy="100"
				rx="60"
				ry="30"
				fill="#f0abfc"
				fillOpacity="0.13"
				style={{
					transform: style.xy.to(
						(x, y) => `translate(${x / 3}px,${y / 3}px) scale(1.05)`
					),
				}}
			/>
		</animated.svg>
	),
	(style: any) => (
		<animated.svg
			style={style}
			className="absolute inset-0 w-full h-full pointer-events-none"
			viewBox="0 0 800 600"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<animated.ellipse
				cx="200"
				cy="500"
				rx="90"
				ry="40"
				fill="#818cf8"
				fillOpacity="0.1"
				style={{
					transform: style.xy.to(
						(x, y) => `translate(${-x / 2}px,${y / 2}px) scale(1.1)`
					),
				}}
			/>
			<animated.rect
				x="500"
				y="350"
				width="160"
				height="120"
				rx="40"
				fill="#f0abfc"
				fillOpacity="0.13"
				style={{
					transform: style.xy.to(
						(x, y) => `translate(${x / 2}px,${-y / 2}px) scale(1.05)`
					),
				}}
			/>
			<animated.circle
				cx="400"
				cy="150"
				r="70"
				fill="#f472b6"
				fillOpacity="0.12"
				style={{
					transform: style.xy.to(
						(x, y) => `translate(${-x / 3}px,${y / 3}px) scale(1.05)`
					),
				}}
			/>
		</animated.svg>
	),
	(style: any) => (
		<animated.svg
			style={style}
			className="absolute inset-0 w-full h-full pointer-events-none"
			viewBox="0 0 800 600"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<animated.circle
				cx="700"
				cy="100"
				r="90"
				fill="#f0abfc"
				fillOpacity="0.13"
				style={{
					transform: style.xy.to(
						(x, y) => `translate(${x / 2}px,${-y / 2}px) scale(1.1)`
					),
				}}
			/>
			<animated.ellipse
				cx="200"
				cy="300"
				rx="70"
				ry="30"
				fill="#818cf8"
				fillOpacity="0.1"
				style={{
					transform: style.xy.to(
						(x, y) => `translate(${-x / 2}px,${y / 2}px) scale(1.05)`
					),
				}}
			/>
			<animated.rect
				x="350"
				y="400"
				width="120"
				height="80"
				rx="30"
				fill="#f472b6"
				fillOpacity="0.12"
				style={{
					transform: style.xy.to(
						(x, y) => `translate(${x / 3}px,${y / 3}px) scale(1.05)`
					),
				}}
			/>
		</animated.svg>
	),
];

// Zusätzliche Slide-Infos für die Ecke
const slideDetails = [
	'Our AI automatically detects and sorts important emails for you. No more inbox chaos!',
	'Schedule emails, agent actions, or cron jobs – all in one place, easy and intuitive.',
	'Every action is securely logged. Full transparency for all agent and user activities.',
	'Chat live with your agents, assign tasks, or check status – all in real time.',
	'Connect Ornex Office to Google Sheets: Automate reports, data sync, and workflows.',
	'With the Document Writer, you can draft letters, protocols, or summaries with AI support.',
	'Let agents analyze, extract, or summarize PDFs – perfect for invoices, contracts, and more.',
	'Coming soon: Even more integrations and agent-powered tools for your workflow!',
];

// Helper to get two non-overlapping random indices
function getTwoRandomIndices(length: number, prev: number[] = []): [number, number] {
	let a = Math.floor(Math.random() * length);
	let b;
	do {
		b = Math.floor(Math.random() * length);
	} while (b === a || prev.includes(a) || prev.includes(b));
	return [a, b];
}

const LandingPage: React.FC = () => {
	const [indices, setIndices] = useState<[number, number]>([0, 1]);
	const [progress, setProgress] = useState(0);
	const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight - TASKBAR_HEIGHT);
	const [cycle, setCycle] = useState(0); // how many full cycles

	const SLIDE_TIME = 6000; // ms per pair
	const TOTAL_TIME = Math.ceil(topics.length / 2) * SLIDE_TIME;

	// Animated gradient background
	const gradientSpring = useSpring({
		from: { background: 'linear-gradient(120deg, #f8fafc, #e0e7ff, #f0abfc)' },
		to: async (next) => {
			while (1) {
				await next({ background: 'linear-gradient(120deg, #f8fafc, #e0e7ff, #f0abfc)' });
				await next({ background: 'linear-gradient(120deg, #f0abfc, #e0e7ff, #f8fafc)' });
				await next({ background: 'linear-gradient(120deg, #e0e7ff, #f8fafc, #f0abfc)' });
			}
		},
		config: { duration: 4000 },
		reset: true,
	});
	// Animate SVG shapes
	const svgAnim = useSpring({
		xy: [Math.sin(indices[0] * 1.2 + Date.now() / 1000) * 20, Math.cos(indices[1] * 1.2 + Date.now() / 1000) * 20],
		config: { mass: 2, tension: 80, friction: 30 },
		loop: true,
	});

	// Animation für die Bubbles (pop-in/pop-out)
	const transitions = useTransition(indices, {
		from: { opacity: 0, scale: 0.7, filter: 'blur(8px)' },
		enter: { opacity: 1, scale: 1, filter: 'blur(0px)' },
		leave: { opacity: 0, scale: 1.2, filter: 'blur(12px)' },
		config: { tension: 220, friction: 18 },
		keys: (item) => item,
	});

	// Update windowHeight on resize
	useLayoutEffect(() => {
		function updateHeight() {
			setWindowHeight(window.innerHeight - TASKBAR_HEIGHT);
		}
		window.addEventListener('resize', updateHeight);
		updateHeight();
		return () => window.removeEventListener('resize', updateHeight);
	}, []);

	// Prevent scrolling on body
	useLayoutEffect(() => {
		const original = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => { document.body.style.overflow = original; };
	}, []);

	// Progress bar logic for total cycle
	useEffect(() => {
		let frame: number;
		let start: number | null = null;
		let stopped = false;
		function animateBar(ts: number) {
			if (stopped) return;
			if (!start) start = ts;
			const elapsed = ts - start + cycle * TOTAL_TIME;
			setProgress(Math.min(elapsed / TOTAL_TIME, 1));
			if (elapsed < TOTAL_TIME) {
				frame = requestAnimationFrame(animateBar);
			}
		}
		frame = requestAnimationFrame(animateBar);
		return () => {
			stopped = true;
			cancelAnimationFrame(frame);
		};
	}, [cycle, TOTAL_TIME]);
useEffect(() => {
  let shown: number[][] = [];
  let current = 0;
  let timeout: NodeJS.Timeout | undefined;
  let stopped = false;

  function nextPair() {
    if (stopped) return;
    
    if (shown.length >= Math.ceil(topics.length / 2)) {
      setCycle(c => c + 1);
      shown = [];
      current = 0;
      return;
    }

    let available = Array.from({length: topics.length}, (_, i) => i)
      .filter(i => !shown.flat().includes(i));
      
    if (available.length < 2) {
      available = Array.from({length: topics.length}, (_, i) => i);
      shown = []; // Reset shown array when recycling
    }

    const [a, b] = getTwoRandomIndices(topics.length, shown.flat());
    setIndices([a, b]);
    shown.push([a, b]);
    current++;

    timeout = setTimeout(nextPair, SLIDE_TIME);
  }

  nextPair();

  return () => {
    stopped = true;
    if (timeout) clearTimeout(timeout);
    shown = [];
  };
}, [cycle, SLIDE_TIME, topics.length]);

	// Helper for random offset (no overlap)
	function getRandomOffset(idx: number) {
		const base = idx === 0 ? {top: '40%', left: '25%'} : {top: '55%', left: '60%'};
		return {
			position: 'absolute' as const,
			top: `calc(${base.top} + ${Math.random() * 20 - 10}px)`,
			left: `calc(${base.left} + ${Math.random() * 30 - 15}px)`,
			zIndex: 350,
			width: '420px',
			maxWidth: '90vw',
		};
	}

	return (
		<animated.div
			style={{ height: windowHeight, ...gradientSpring }}
			className="relative flex flex-col items-center justify-center text-center px-4 transition-all duration-1000 overflow-hidden w-full"
		>
			{/* SVGs in the background, z-index 0 */}
			<div className="absolute inset-0 w-full h-full pointer-events-none z-0">
				{svgBackgrounds[indices[0] % svgBackgrounds.length](svgAnim)}
				{svgBackgrounds[indices[1] % svgBackgrounds.length](svgAnim)}
			</div>
			{/* Progress bar for total cycle */}
			<div className="fixed left-0 top-[56px] w-full z-[110] px-0">
				<div className="mx-auto w-full">
					<div className="w-full h-1.5 bg-fuchsia-100 rounded-full overflow-hidden">
						<animated.div
							style={{
								width: progress * 100 + '%',
								background: 'linear-gradient(90deg,#818cf8,#f0abfc)',
								height: '100%',
							}}
							className="rounded-full shadow-fuchsia-200 shadow-inner"
						/>
					</div>
				</div>
			</div>
			{/* Animierte Bubbles (zwei Slides) */}
			{transitions((style, idx, t, i) => {
  const topic = topics[indices[i]];
  if (!topic) return null;
  return (
    <animated.div
      key={indices[i]}
      style={{
        ...getRandomOffset(i),
        ...style,
        transform: style.scale
          .to((s) => `scale(${s})`),
      }}
      className="transition-all duration-700"
    >
      <div
        className="bg-white/80 rounded-full border border-fuchsia-200/60 shadow-lg p-7 mb-6 min-h-[180px] flex flex-col items-center justify-center"
        style={{
          boxShadow: '0 4px 32px 0 rgba(240,171,252,0.10), 0 1.5px 8px 0 rgba(129,140,248,0.08)',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          borderRadius: '9999px',
        }}
      >
        <div className="text-5xl mb-2 animate-pulse">{topic.icon}</div>
        <h2 className="text-2xl font-bold mb-2 text-gmail-gray">{topic.title}</h2>
        <p className="text-lg text-gray-700">{topic.description}</p>
      </div>
    </animated.div>
  );
})}
			{/* Ornex Office Überschrift und by Orchestra Nexus Text oben links, Logo größer */}
			<div className="w-full max-w-xl flex flex-col items-start" style={{ position: 'absolute', top: '5vh', left: '2.5vw', zIndex: 350, transform: 'none' }}>
				<h1 className="text-6xl font-extrabold mb-1 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600 animate-gradient-x">
					Ornex Office
				</h1>
				<span className="block w-full text-xs text-gray-400 mb-6 text-center">by Orchestra Nexus</span>
			</div>
		</animated.div>
	);
};

export default LandingPage;
