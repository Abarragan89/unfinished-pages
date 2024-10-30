import { Roboto, Bilbo } from 'next/font/google'


export const bodyFont = Roboto({
    subsets: ['latin'],
    display: 'swap',
    weight: ['300', '400', '500', '700', '900']
})

export const titleFont = Bilbo({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400']
})