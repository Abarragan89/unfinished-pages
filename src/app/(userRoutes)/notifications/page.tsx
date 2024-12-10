import getUserNotifications from "@/app/services/getUserNotifications"
import { headers } from 'next/headers'
import Link from "next/link";
import { Notification } from "../../../../types/notification";
import { formatDate } from "../../../../utils/formatDate";
import SubheadingTitle from "@/components/Headings/SubheadingTitle";

export default async function page() {
    const headersList = headers()
    const userId = headersList.get('x-user-id')

    if (!userId) {
        throw new Error('No authorized to see this page')
    }

    const { notifications } = (await getUserNotifications(userId)) ?? { notifications: [] };


    console.log('user notificaiton ', notifications)

    return (
        <main className="h-[100vh] mt-[25px]">
            <SubheadingTitle title="Notifications" />
            {notifications && notifications.map((notification: Notification) => (
                <Link
                    href={`/blog/${notification.url}`}
                    key={notification.id}
                    className="bg-[var(--off-white)] my-5 border border-[var(--gray-500)] py-[5px] px-[10px] max-w-[600px] mx-auto relative block rounded-sm custom-hover-shadow-lift"
                >
                    <p className="absolute top-[5px] right-[10px] text-[.875rem] text-[var(--brown-300)]">{formatDate(notification.createdAt)}</p>
                    <p className="text-center pt-5 text-[var(--off-black)]">{notification.message.replace(/-/g, ' ')}</p>
                    <p className="text-[.875rem] text-center text-[var(--gray-600)] mt-1">(Click to view)</p>
                </Link>
            ))}
        </main>
    )
}
