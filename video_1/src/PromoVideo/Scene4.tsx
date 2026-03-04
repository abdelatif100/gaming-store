import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill, random } from 'remotion';
import { fontFamily } from './Fonts';

export const Scene4: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const slam = spring({
		frame,
		fps,
		config: {
			mass: 3,
			damping: 12,
			stiffness: 150,
		},
	});

	const scale = interpolate(slam, [0, 1], [10, 1]);
	
	// Camera shake on impact
	const shakeX = slam > 0.1 && slam < 0.5 ? random(`shake-x-${frame}`) * 20 - 10 : 0;
	const shakeY = slam > 0.1 && slam < 0.5 ? random(`shake-y-${frame}`) * 20 - 10 : 0;

	const drift = interpolate(frame, [60, 150], [1, 1.15], {
		extrapolateLeft: 'clamp',
	});

	const strobe = frame > 0 && frame < 10 && frame % 2 === 0 ? 1 : 0;

	return (
		<AbsoluteFill
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'transparent',
				transform: `scale(${scale * drift}) translate(${shakeX}px, ${shakeY}px)`,
			}}
		>
			<div
				style={{
					fontFamily,
					fontSize: 120,
					fontWeight: 400,
					color: '#00F5FF',
					textAlign: 'center',
					textShadow: '0 0 20px #00F5FF',
					direction: 'rtl',
					marginBottom: 20,
					opacity: slam,
				}}
			>
				1 ساعة = 200 دج
			</div>
			<div
				style={{
					fontFamily,
					fontSize: 350,
					fontWeight: 900,
					color: '#FFFFFF',
					textAlign: 'center',
					textShadow: '0 0 50px #8A2BE2, 0 0 100px #8A2BE2, 0 0 150px #8A2BE2',
					direction: 'rtl',
					WebkitTextStroke: '3px #8A2BE2',
					background: 'linear-gradient(135deg, #FFF 0%, #AAA 50%, #FFF 100%)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
					filter: 'drop-shadow(0 0 30px rgba(138, 43, 226, 1))',
					transform: `scale(${interpolate(slam, [0.8, 1], [1.5, 1], {extrapolateLeft: 'clamp'})})`,
				}}
			>
				فقط
			</div>
			{strobe === 1 && (
				<AbsoluteFill
					style={{
						backgroundColor: 'white',
						opacity: 0.8,
					}}
				/>
			)}
		</AbsoluteFill>
	);
};
