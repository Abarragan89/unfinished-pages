import { prisma } from "../../../utils/prisma";

export default async function getBlogData(blogId: string) {
    try {
        // Get Data if above checks don't fail
        const blogData = await prisma.blog.findUnique({
            where: { id: blogId },
            select: {
                id: true,
                title: true,
                description: true,
                tags: true,
                coverPhotoUrl: true,
                coverPhotoAlt: true,
                likes: true,
                likeCount: true,
                updatedAt: true,
                categories: {
                    select: { name: true, displayName: true }
                },
                isPublished: true,
                readDuration: true,
                publishedDate: true,
                _count: {
                    select: { comments: true }
                },
                user: {
                    select: {
                        name: true,
                        image: true
                    }
                },
                content: {
                    orderBy: { orderNumber: 'asc' },
                    select: {
                        type: true,
                        videoUrl: true,
                        image: {
                            select: {
                                id: true,
                                alt: true,
                                width: true,
                                height: true,
                                url: true,
                                isBlogCover: true
                            }
                        },
                        children: {
                            select: {
                                text: true,
                                bold: true,
                                italic: true,
                                underline: true,
                                type: true,
                                url: true,
                                children: {
                                    select: {
                                        text: true,
                                        bold: true,
                                        underline: true,
                                        italic: true,
                                        type: true,
                                        url: true,
                                        children: {
                                            select: {
                                                text: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                },
                comments: {
                    // only get top level comments but populate their replies
                    where: { parentId: null },
                    orderBy: { likeCount: 'desc' },
                    select: {
                        id: true,
                        text: true,
                        likeCount: true,
                        likes: {
                            select: {
                                id: true,
                                userId: true,
                            }
                        },
                        createdAt: true,
                        user: {
                            select: {
                                name: true,
                                image: true,
                                id: true
                            }
                        },
                        replies: {
                            orderBy: { likeCount: 'desc' },
                            select: {
                                id: true,
                                text: true,
                                likeCount: true,
                                likes: {
                                    select: {
                                        id: true,
                                        userId: true,
                                    }
                                },
                                createdAt: true,
                                user: {
                                    select: {
                                        id: true,
                                        name: true,
                                        image: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
        })
        return blogData;
    } catch (error) {
        console.log('error getting blog data', error)
    }

}
