import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill, Img } from 'remotion';
import { fontFamily } from './Fonts';

export const Scene2: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const drop = spring({
		frame,
		fps,
		config: {
			damping: 12,
		},
	});

	const y = interpolate(drop, [0, 1], [-500, 0]);

	const drift = interpolate(frame, [0, 120], [0, 100]);
	
	const imageOpacity = interpolate(frame, [0, 20], [0, 0.4], {
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'transparent',
				transform: `translateX(${-50 + drift}px)`,
			}}
		>
			<Img
				src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80"
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					opacity: imageOpacity,
					filter: 'grayscale(100%) contrast(150%) brightness(50%)',
				}}
			/>
			<div
				style={{
					fontFamily,
					fontSize: 140,
					fontWeight: 800,
					color: '#00F5FF',
					textAlign: 'center',
					transform: `translateY(${y}px)`,
					textShadow: '0 0 30px #00F5FF, 0 0 60px #8A2BE2',
					direction: 'rtl',
					zIndex: 1,
				}}
			>
				10 دقائق = 50 دج
			</div>
			{drop > 0.9 && (
				<div
					style={{
						position: 'absolute',
						width: 400,
						height: 400,
						background: 'radial-gradient(circle, rgba(0, 245, 255, 0.4) 0%, transparent 70%)',
						transform: 'scale(1.5)',
						opacity: interpolate(frame, [10, 30], [1, 0], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				/>
			)}
		</AbsoluteFill>
	);
};
