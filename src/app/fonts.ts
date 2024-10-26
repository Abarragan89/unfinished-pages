import { Changa, Roboto } from 'next/font/google'


export const titleFont = Changa({
    subsets: ['latin'],
    display: 'swap',
    weight: ['700']
})

export const bodyFont = Roboto({
    subsets: ['latin'],
    display: 'swap',
    weight: ['300', '500', '700']
})