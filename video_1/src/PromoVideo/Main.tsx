import React from 'react';
import { Sequence, AbsoluteFill } from 'remotion';
import { Background } from './Background';
import { Scene1 } from './Scene1';
import { Scene2 } from './Scene2';
import { Scene3 } from './Scene3';
import { Scene4 } from './Scene4';
import { Scene5 } from './Scene5';

export const PromoVideo: React.FC = () => {
	return (
		<AbsoluteFill>
			<Background />
			<Sequence durationInFrames={120}>
				<Scene1 />
			</Sequence>
			<Sequence from={120} durationInFrames={120}>
				<Scene2 />
			</Sequence>
			<Sequence from={240} durationInFrames={120}>
				<Scene3 />
			</Sequence>
			<Sequence from={360} durationInFrames={150}>
				<Scene4 />
			</Sequence>
			<Sequence from={510} durationInFrames={150}>
				<Scene5 />
			</Sequence>
		</AbsoluteFill>
	);
};
