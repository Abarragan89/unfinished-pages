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
                coverPhotoUrl: true,
                coverPhotoAlt: true,
                likes: true,
                likeCount: true,
                updatedAt: true,
                isPublished: true,
                readDuration: true,
                publishedDate: true,
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
                    where: { parentId: null },
                    orderBy: { likeCount: 'desc' },
                    select: {
                        id: true,
                        text: true,
                        likeCount: true,
                        likes: {
                            select: {
                                id: true,
                            }
                        },
                        createdAt: true,
                        user: {
                            select: {
                                name: true,
                                image: true,
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
                                        id: true
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
