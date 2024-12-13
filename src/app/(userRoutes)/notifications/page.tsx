import getUserNotifications from "@/app/services/getUserNotifications"
import { headers } from 'next/headers'
import SubheadingTitle from "@/components/Headings/SubheadingTitle";
import updateNotificationsAsRead from "@/app/services/updateNotificationsAsRead";
import UserNotifications from "@/components/Buttons/UserNotifications";

export default async function page() {
    const headersList = headers()
    const userId = headersList.get('x-user-id')

    if (!userId) {
        throw new Error('No authorized to see this page')
    }

    // get all user notifications
    const { notifications } = (await getUserNotifications(userId)) ?? { notifications: [] };

    // mark all notifications as read
    await updateNotificationsAsRead(userId)

    return (
        <main className="min-h-[100vh] mt-[25px]">
            <SubheadingTitle title="Notifications" />

            <UserNotifications
                userId={userId}
                allNotifications={notifications}
            />
        </main>
    )
}
