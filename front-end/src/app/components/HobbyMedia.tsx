import { forwardRef } from 'react';
import type { HobbyAsset } from '../data';

type Mode = 'cover' | 'slide';

interface HobbyMediaProps {
	asset: HobbyAsset;
	mode: Mode;
	alt: string;
}

const HobbyMedia = forwardRef<HTMLVideoElement, HobbyMediaProps>(
	({ asset, mode, alt }, videoRef) => {
		if (asset.kind === 'image') {
			return (
				<img
					src={asset.src}
					alt={alt}
					className={
						mode === 'slide'
							? 'absolute inset-0 w-full h-full object-cover'
							: 'absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
					}
				/>
			);
		}

		if (mode === 'slide') {
			return (
				<video
					ref={videoRef}
					src={asset.src}
					poster={asset.poster}
					controls
					autoPlay
					muted
					playsInline
					preload="metadata"
					aria-label={alt}
					className="absolute inset-0 w-full h-full object-contain bg-black"
				/>
			);
		}

		return (
			<video
				src={asset.src}
				poster={asset.poster}
				autoPlay
				loop
				muted
				playsInline
				preload="metadata"
				aria-label={alt}
				className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
			/>
		);
	}
);

HobbyMedia.displayName = 'HobbyMedia';

export default HobbyMedia;
