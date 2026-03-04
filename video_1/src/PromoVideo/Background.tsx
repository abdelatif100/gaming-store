import React, { useMemo } from 'react';
import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, random } from 'remotion';
import { noise2D } from '@remotion/noise';

const PARTICLE_COUNT = 40;

const LightRay: React.FC<{ seed: number }> = ({ seed }) => {
	const { width, height } = useVideoConfig();
	const frame = useCurrentFrame();
	
	const initialX = useMemo(() => random(`ray-x-${seed}`) * width, [width, seed]);
	const angle = useMemo(() => -20 + random(`ray-angle-${seed}`) * 40, [seed]);
	const speed = useMemo(() => 2 + random(`ray-speed-${seed}`) * 3, [seed]);
	
	const x = (initialX + frame * speed) % (width * 1.5) - width * 0.25;
	const opacity = interpolate(
		Math.sin(frame * 0.02 + seed),
		[-1, 1],
		[0.05, 0.2]
	);

	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: -height * 0.2,
				width: 150,
				height: height * 1.4,
				background: 'linear-gradient(to right, transparent, rgba(138, 43, 226, 0.3), transparent)',
				transform: `rotate(${angle}deg)`,
				filter: 'blur(40px)',
				opacity,
				pointerEvents: 'none',
			}}
		/>
	);
};

const Particle: React.FC<{ seed: number }> = ({ seed }) => {
	const { width, height, durationInFrames } = useVideoConfig();
	const frame = useCurrentFrame();

	const initialX = useMemo(() => random(`particle-x-${seed}`) * width, [width, seed]);
	const initialY = useMemo(() => random(`particle-y-${seed}`) * height, [height, seed]);
	const driftSpeed = useMemo(() => 0.2 + random(`particle-speed-${seed}`) * 0.3, [seed]);

	const x = initialX + noise2D(seed, frame / 100, 0) * 50;
	const y = initialY - frame * driftSpeed;

	const opacity = interpolate(
		frame % durationInFrames,
		[0, 20, durationInFrames - 20, durationInFrames],
		[0, 0.4, 0.4, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	const scale = useMemo(() => 0.5 + random(`particle-scale-${seed}`) * 2, [seed]);

	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y % height,
				width: scale * 2,
				height: scale * 2,
				backgroundColor: '#00F5FF',
				borderRadius: '50%',
				opacity,
				filter: 'blur(1px) drop-shadow(0 0 5px #00F5FF)',
			}}
		/>
	);
};

export const Background: React.FC = () => {
	return (
		<AbsoluteFill style={{ backgroundColor: '#0D0D0D' }}>
			{Array.from({ length: 5 }).map((_, i) => (
				<LightRay key={`ray-${i}`} seed={i} />
			))}
			{Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
				<Particle key={`particle-${i}`} seed={i} />
			))}
		</AbsoluteFill>
	);
};
