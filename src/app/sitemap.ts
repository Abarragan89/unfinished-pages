import { MetadataRoute } from 'next';
import getAllPublishedBlogs from './services/getAllPublishedBlogs';
import { cleanTitleForURL } from '../../utils/stringManipulation';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const categorySlugs: string[] = [
        'politics-philosophy',
        'education-career',
        'business-technology',
        'health-fitness',
        'short-stories',
        'family-relationships',
        'travel-food',
        'DIY',
        'entertainment-sports',
        'other',
        '3-minute-reads'
    ]

    try {
        // Fetch blog data
        const allBlogs = await getAllPublishedBlogs() || [];

        // Static entries (Homepage)
        const staticEntries: MetadataRoute.Sitemap = [
            {
                url: 'https://unfinishedpages.com',
                lastModified: new Date(),
                changeFrequency: 'yearly',
                priority: 1,
            },
        ];

        // Map blog categories to sitemap
        const blogCategories = categorySlugs!.map((category: string) => ({
            url: `https://unfinishedpages.com/category/${category}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

        // Map blog data to sitemap entries
        const blogEntries = allBlogs.map((blog: { title: string; updatedAt: Date, id: string }) => ({
            url: `https://unfinishedpages.com/blog/${cleanTitleForURL(blog.title)}-${blog.id}`,
            lastModified: new Date(blog.updatedAt),
            changeFrequency: 'weekly' as const,
            priority: 0.5,
        }));

        // Combine static and dynamic entries
        return [...staticEntries, ...blogEntries, ...blogCategories];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return [];
    }
}
