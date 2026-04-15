export interface Project {
	title: string;
	tags: string[];
	description?: string;
	note?: string;
	image?: string;
}

export interface Experience {
	company: string;
	role: string;
	period: string;
}

export interface SocialLink {
	label: string;
	url: string;
	category: string;
}

export const projects: Project[] = [
	{
		title: 'Project Alpha',
		tags: ['Branding', 'Web Design', 'Development'],
		description: 'A complete brand identity and web platform for a SaaS startup.',
	},
	{
		title: 'Momentum',
		tags: ['Web Design', 'Illustrations', 'Development'],
		description: 'Product landing page with custom illustrations and micro-interactions.',
	},
	{
		title: 'Vantage',
		tags: ['Web Design', 'Development'],
		description: 'Dashboard interface for a data analytics platform.',
	},
	{
		title: 'Horizon',
		tags: ['Web Design', 'Illustrations'],
		description: 'Marketing website with a bold visual direction.',
	},
	{
		title: 'Nexus',
		tags: ['Branding', 'Product Refresh', 'Web Design'],
		description: 'Complete brand refresh and website redesign for a growing fintech.',
	},
	{
		title: 'Prism',
		tags: ['Branding', 'Illustrations'],
		description: 'Visual identity system with custom iconography.',
	},
];

export const experiences: Experience[] = [
	{
		company: 'Company One',
		role: 'Frontend Developer',
		period: '2023 — Present',
	},
	{
		company: 'Company Two',
		role: 'Web Developer',
		period: '2022 — 2023',
	},
	{
		company: 'Company Three',
		role: 'Junior Developer',
		period: '2021 — 2022',
	},
	{
		company: 'Freelance',
		role: 'Designer & Developer',
		period: '2020 — 2021',
	},
];

export const socialLinks: SocialLink[] = [
	{ label: 'GitHub', url: 'https://github.com', category: 'Code' },
	{ label: 'LinkedIn', url: 'https://linkedin.com', category: 'Social' },
	{ label: 'Twitter', url: 'https://x.com', category: 'Insights' },
	{ label: 'Dribbble', url: 'https://dribbble.com', category: 'Design' },
];

export const navLinks = [
	{ label: 'Work', href: '#work' },
	{ label: 'Story', href: '#story' },
	{ label: 'Process', href: '#process' },
	{ label: 'Connect', href: '#connect' },
];
