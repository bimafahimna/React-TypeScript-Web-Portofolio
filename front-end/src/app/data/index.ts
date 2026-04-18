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
}

export interface InformalEducation {
	title: string;
	provider: string;
	period: string;
	credential?: string;
}

export interface Hobby {
	title: string;
	description: string;
	image: string;
	span?: 'tall' | 'wide';
}

export interface SocialLink {
	label: string;
	url: string;
	category: string;
}

export const projects: Project[] = [
	// {
	// 	title: 'Medicine E-Commerce',
	// 	tags: ['Front-End', 'Back-End', 'Web Development', 'Next.js', 'Tailwind CSS', 'TypeScript', 'PostgreSQL', 'Prisma', 'Docker', 'AWS', 'CI/CD'],
	// 	description: 'A complete e-commerce platform for a medicine store.',
	// 	note: 'Built at Company X',
	// 	image: '',
	// }
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
	},
];

export const informalEducation: InformalEducation[] = [
	{
		title: 'Web Development Course',
		provider: 'Provider Name',
		period: '2023',
	},
];

export const hobbies: Hobby[] = [
	{
		title: 'Diving',
		description: 'Exploring the ocean’s depths and discovering marine life through scuba diving.',
		image: '../public/hobby/underwater_temple.JPG',
		span: 'wide',
	},
];

export const socialLinks: SocialLink[] = [
	{ label: 'GitHub', url: 'https://github.com', category: 'Code' },
	{ label: 'LinkedIn', url: 'https://linkedin.com', category: 'Social' },
];

export const navLinks = [
	{ label: 'Work', href: '#work' },
	{ label: 'Story', href: '#story' },
	{ label: 'Academic', href: '#academic' },
	{ label: 'Hobbies', href: '#hobbies' },
	{ label: 'Process', href: '#process' },
	{ label: 'Connect', href: '#connect' },
];
