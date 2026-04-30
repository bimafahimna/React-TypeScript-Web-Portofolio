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
	location?: string;
}

export interface FormalEducation {
	institution: string;
	degree: string;
	field: string;
	period: string;
	gpa?: string;
	location?: string;
}

export interface NonformalEducation {
	title: string;
	provider: string;
	period: string;
	credential?: string;
	location?: string;
}

export interface Hobby {
	title: string;
	description: string;
	/** Cover + default when `images` is omitted */
	image?: string;
	/** Multiple photos; first item is used as the grid cover. Carousel only when length > 1. */
	images?: string[];
	span?: 'tall' | 'wide';
}

export interface SocialLink {
	label: string;
	url: string;
	category: string;
}

export const projects: Project[] = [
	{
		title: "SaaS Analytic Dashboard",
		tags:["React","TypeScript","Next.JS", "PostgreSQL","Prisma"],
		image:"/project/SaaS_dashboard.png",
		description: "A modern SaaS Analytics Dashboard built using React and Next.js, featuring interactive data visualization, user-friendly UI, and customizable widgets to help businesses monitor and analyze key metrics effectively.",
		note:"Still a work in progress"
	},
];

export const experiences: Experience[] = [
	{
		company: 'Tiket.com',
		role: 'Backend Engineer',
		period: '2024 — Present',
		location: 'Jakarta, Indonesia',
	},
	{
		company: 'Shopee',
		role: 'Full-Stack Engineer Intern',
		period: '2024',
		location: 'Jakarta, Indonesia',
	},
];

export const formalEducation: FormalEducation[] = [
	{
		institution: 'Bandung Institute of Technology',
		degree: 'Bachelor of Science',
		field: 'Oceanography',
		period: '2019 — 2023',
		gpa: '3.21 / 4.00',
		location: 'Bandung, Indonesia',
	},
];

export const informalEducation: NonformalEducation[] = [
	{
		title: 'Full-Stack Web Development Course',
		provider: 'Sanberhub',
		period: '2023 - 2024',
		location: 'Bandung, Indonesia',
	},
];

export const hobbies: Hobby[] = [
	{
		title: 'Diving',
		description: 'Exploring the ocean’s depths and discovering marine life through scuba diving.',
		images: ['/hobby/underwater_temple.JPG', '/hobby/uw_selfie.png'],
		span: 'wide',
	},
];

export const socialLinks: SocialLink[] = [
	{ label: 'GitHub', url: 'https://github.com', category: 'Code' },
	{ label: 'LinkedIn', url: 'https://linkedin.com', category: 'Social' },
	{ label: 'WhatsApp', url: 'https://wa.me/6282110201566', category: 'WhatsApp' },
];

export const navLinks = [
	{ label: 'Work', href: '#work' },
	{ label: 'Story', href: '#story' },
	{ label: 'Academic', href: '#academic' },
	{ label: 'Hobbies', href: '#hobbies' },
	{ label: 'Process', href: '#process' },
	{ label: 'Connect', href: '#connect' },
];
