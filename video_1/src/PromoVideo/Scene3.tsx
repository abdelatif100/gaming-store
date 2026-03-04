import React from 'react';
import { interpolate, useCurrentFrame, AbsoluteFill, Easing, Img } from 'remotion';
import { fontFamily } from './Fonts';

export const Scene3: React.FC = () => {
	const frame = useCurrentFrame();

	const scan = interpolate(frame, [0, 60], [-100, 200], {
		easing: Easing.bezier(0.42, 0, 0.58, 1),
	});

	const tilt = interpolate(frame, [0, 120], [-1, 1]);

	const pulse = interpolate(
		Math.sin(frame / 5),
		[-1, 1],
		[1, 1.05]
	);
	
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
				transform: `rotate(${tilt}deg) scale(${pulse})`,
			}}
		>
			<Img
				src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1920&q=80"
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
					textShadow: '0 0 30px #00F5FF',
					direction: 'rtl',
					position: 'relative',
					overflow: 'hidden',
					padding: '20px 60px',
					zIndex: 1,
				}}
			>
				30 دقيقة = 100 دج
				<div
					style={{
						position: 'absolute',
						top: 0,
						bottom: 0,
						width: 100,
						background: 'linear-gradient(to right, transparent, rgba(0, 245, 255, 0.8), transparent)',
						left: `${scan}%`,
						transform: 'skewX(-30deg)',
					}}
				/>
			</div>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					opacity: interpolate(Math.sin(frame / 5), [-1, 1], [0.1, 0.3]),
					backgroundColor: '#8A2BE2',
					pointerEvents: 'none',
				}}
			/>
		</AbsoluteFill>
	);
};
