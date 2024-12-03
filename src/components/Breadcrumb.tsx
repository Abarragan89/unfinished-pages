'use client'
import { useState, useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'


interface BreadCrumbLink {
    label: string;
    href: string;
}

const Breadcrumb = () => {

    const [breadCrumbLinks, setBreadCrumbLinks] = useState<BreadCrumbLink[]>([])
    const paths = usePathname()
    const pathNames = useMemo(() => paths.split('/').filter(Boolean), [paths]);

    useEffect(() => {
        const links = []
        if (pathNames) {
            switch (pathNames[0]) {
                case 'myBlogs':
                    links.push({ label: 'Home', href: '/' })
                    links.push({ label: 'My Blogs', href: '/myBlogs' })
                    break;
                case 'editBlog':
                    links.push({ label: 'Home', href: '/' })
                    links.push({ label: 'My Blogs', href: '/myBlogs' })
                    links.push({ label: 'Edit Blog', href: `/editBlog/${pathNames[1]}` })
                    break;
                case 'previewBlog':
                    links.push({ label: 'Home', href: '/' })
                    links.push({ label: 'My Blogs', href: '/myBlogs' })
                    links.push({ label: 'Edit Blog', href: `/editBlog/${pathNames[1]}` })
                    links.push({ label: 'Preview Blog', href: `/previewBlog/${pathNames[1]}` })
                    break;
            }
        }
        setBreadCrumbLinks(links)
    }, [pathNames])

    const listItemElStyles = 'border-l px-2 border-[var(--gray-500)] text-[.95rem] first:border-l-0 tracking-wide hover:text-[var(--brown-300)]'
    const nonActiveListItemStyles = 'text-[var(--brown-500)]'
    const activeListItemStyles = 'underline text-[var(--brown-300)] pointer-events-none'

    return (
        <>
            <ul className='flex absolute left-[2.5%] top-[75px] z-10'>
                {breadCrumbLinks && breadCrumbLinks.map((linkData, index) => (
                    <li
                        key={index}
                        className={`${listItemElStyles} ${pathNames[0].toLowerCase() === linkData.label.toLowerCase().replace(/ /g, '') ? activeListItemStyles : nonActiveListItemStyles}`}
                    >

                        <Link
                            href={linkData.href}
                        >
                            {linkData.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Breadcrumb