import React from 'react';
import { interpolate, useCurrentFrame, AbsoluteFill } from 'remotion';
import { fontFamily } from './Fonts';

export const Scene5: React.FC = () => {
	const frame = useCurrentFrame();

	const scale = interpolate(frame, [0, 150], [1.2, 1], {
		extrapolateRight: 'clamp',
	});

	const sweepX = interpolate(frame, [120, 150], [-100, 200]);

	return (
		<AbsoluteFill
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'transparent',
				transform: `scale(${scale})`,
			}}
		>
			<div
				style={{
					fontFamily,
					fontSize: 140,
					fontWeight: 900,
					color: '#FFFFFF',
					textAlign: 'center',
					textShadow: '0 0 30px #00F5FF, 0 0 60px #8A2BE2',
					direction: 'rtl',
				}}
			>
				ادخل التحدي الآن!
			</div>
			<div
				style={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					width: 400,
					background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.6), transparent)',
					left: `${sweepX}%`,
					transform: 'skewX(-45deg)',
				}}
			/>
		</AbsoluteFill>
	);
};
