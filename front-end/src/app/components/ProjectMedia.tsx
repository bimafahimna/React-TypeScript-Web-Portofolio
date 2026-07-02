import { forwardRef } from 'react';
import type { ProjectMedia as ProjectMediaData } from '../data';

type Mode = 'thumb' | 'full';

interface ProjectMediaProps {
	media: ProjectMediaData | undefined;
	mode: Mode;
	fallbackIndex: number;
	title: string;
}

const youtubeThumbnail = (videoId: string) =>
	`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

const NumberedPlaceholder = ({
	index,
	large,
}: {
	index: number;
	large: boolean;
}) => (
	<>
		<div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-muted/10 group-hover:from-accent/20 group-hover:to-accent-muted/20 transition-all duration-500" />
		<div className="absolute inset-0 flex items-center justify-center">
			<span
				className={`font-syne font-bold text-text/10 group-hover:text-text/20 transition-colors duration-500 select-none ${
					large ? 'text-6xl' : 'text-4xl md:text-5xl'
				}`}
			>
				{String(index + 1).padStart(2, '0')}
			</span>
		</div>
	</>
);

const YoutubeBadge = () => (
	<span className="absolute bottom-3 left-3 z-10 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-text bg-black/60 backdrop-blur-sm rounded-pill">
		YouTube
	</span>
);

const ProjectMedia = forwardRef<HTMLVideoElement, ProjectMediaProps>(
	({ media, mode, fallbackIndex, title }, videoRef) => {
		if (!media) {
			return (
				<NumberedPlaceholder index={fallbackIndex} large={mode === 'full'} />
			);
		}

		if (media.kind === 'image') {
			return (
				<img
					src={media.src}
					alt={title}
					className={
						mode === 'full'
							? 'w-full h-full object-cover'
							: 'absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
					}
				/>
			);
		}

		if (media.kind === 'youtube') {
			if (mode === 'full') {
				return (
					<iframe
						src={`https://www.youtube.com/embed/${media.videoId}?autoplay=1&rel=0`}
						title={title}
						allow="autoplay; encrypted-media; picture-in-picture"
						allowFullScreen
						className="w-full h-full border-0"
					/>
				);
			}
			return (
				<>
					<img
						src={media.poster ?? youtubeThumbnail(media.videoId)}
						alt={title}
						className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
					/>
					<YoutubeBadge />
				</>
			);
		}

		if (media.kind === 'video') {
			if (mode === 'full') {
				return (
					<video
						ref={videoRef}
						src={media.src}
						poster={media.poster}
						controls
						autoPlay
						playsInline
						className="w-full h-full object-cover bg-black"
					/>
				);
			}

			const previewSrc = media.src.includes('#')
				? media.src
				: `${media.src}#t=0.1`;

			return (
				<video
					ref={videoRef}
					src={previewSrc}
					poster={media.poster}
					muted
					playsInline
					preload="metadata"
					aria-hidden="true"
					className="absolute inset-0 w-full h-full object-cover"
				/>
			);
		}

		const _exhaustive: never = media;
		return _exhaustive;
	}
);

ProjectMedia.displayName = 'ProjectMedia';

export default ProjectMedia;
