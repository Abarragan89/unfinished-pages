import SubheadingTitle from "@/components/Headings/SubheadingTitle";
import { prisma } from "../../../../utils/prisma";
import AuthorRequestCard from "@/components/Cards/AuthorRequestCard";

export default async function page() {

    const requests = await prisma.authorRequest.findMany(
        {
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                aboutText: true,
                whyBlogText: true,
                topicsText: true,
                userId: true,
                status: true,
                createdAt: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                        id: true,
                    }
                }
            }

        },
    )

    return (
        <main className="pt-[50px] min-h-[100vh]">
            <SubheadingTitle
                title="Review Requests"
            />

            {requests.length > 0 ? requests.map((request) => {
                if (request.status === 'pending') {
                    return (
                        <AuthorRequestCard
                            key={request.id}
                            request={request}
                        />
                    )
                }
            })
                :
                <p className="text-center text-[1.1rem]">No requests to review</p>
            }

        </main>
    )
}
