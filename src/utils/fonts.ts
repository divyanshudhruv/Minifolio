import { Montserrat, Poppins } from 'next/font/google';

export const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    variable: '--font-montserrat',
});

export const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    variable: '--font-poppins',
});