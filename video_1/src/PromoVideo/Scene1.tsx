import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion';
import { fontFamily } from './Fonts';

export const Scene1: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const scale = spring({
		frame,
		fps,
		config: {
			damping: 100,
			stiffness: 10,
		},
	});

	const animatedScale = interpolate(scale, [0, 1], [1, 1.2]);

	const flicker = interpolate(
		Math.sin(frame * 0.8) * Math.cos(frame * 0.3),
		[-1, 1],
		[0.8, 1]
	);

	const blur = interpolate(frame, [0, 20], [40, 0], {
		extrapolateRight: 'clamp',
	});

	const sweepX = interpolate(frame, [0, 45], [-150, 250]);

	return (
		<AbsoluteFill
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'transparent',
				transform: `scale(${animatedScale})`,
			}}
		>
			<div
				style={{
					fontFamily,
					fontSize: 160,
					fontWeight: 900,
					color: '#00F5FF',
					textAlign: 'center',
					filter: `blur(${blur}px) drop-shadow(0 0 20px #00F5FF)`,
					opacity: flicker,
					textShadow: '0 0 30px #8A2BE2, 0 0 60px #8A2BE2',
					direction: 'rtl',
					letterSpacing: '2px',
				}}
			>
				جاهز للعب؟
			</div>
			<div
				style={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					width: 200,
					background: 'linear-gradient(to right, transparent, rgba(138, 43, 226, 0.4), transparent)',
					left: `${sweepX}%`,
					transform: 'skewX(-20deg)',
				}}
			/>
		</AbsoluteFill>
	);
};
