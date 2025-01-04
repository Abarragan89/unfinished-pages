import { Roboto, Bilbo, Atkinson_Hyperlegible } from 'next/font/google'


export const bodyFont = Atkinson_Hyperlegible({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '700']
})
// export const bodyFont = Roboto({
//     subsets: ['latin'],
//     display: 'swap',
//     weight: ['300', '400', '500', '700', '900']
// })

export const titleFont = Bilbo({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400']
})