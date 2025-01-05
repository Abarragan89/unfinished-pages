'use client';
import { FormEvent, useState } from 'react';
import React from 'react'
import axios from 'axios';
import SubmitButton from './SubmitButton';
import Link from 'next/link';
import { Notification } from '../../../types/notification';
import { formatDate } from '../../../utils/formatDate';

export default function UserNotifications({ userId, allNotifications }: { userId: string, allNotifications: Notification[] }) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [userNotifications, setUserNotifications] = useState<Notification[]>(allNotifications)

    async function deleteAllNotificationsHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setIsLoading(true)
            await axios.delete(`/api/userRoutes/notifications/${userId}`)
            setUserNotifications([])
        } catch (error) {
            console.log('error ', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className='relative max-w-[720px] mx-auto'>
            {
                userNotifications?.length > 0 &&
                <form
                    className='absolute top-[-10px] right-[20px]'
                    onSubmit={(e) => deleteAllNotificationsHandler(e)}>
                    <SubmitButton
                        isLoading={isLoading}
                        isSubmittable={true}
                        color='red'
                    >
                        Clear
                    </SubmitButton>
                </form>}
            <div className='max-w-[720px] mx-auto flex justify-center flex-wrap mb-[50px]'>
                {
                    userNotifications?.length > 0 ? userNotifications.map((notification: Notification) => (
                        <Link
                            href={`/blog/${notification.url}`}
                            key={notification.id}
                            className=" text-center text-[.95rem] bg-[var(--off-white)] mt-8 mx-2 border border-[var(--gray-300)] p-[15px] w-[330px] mx-auto relative block rounded-lg custom-hover-shadow-lift"
                        >
                            {!notification.isRead && <p
                                className="
                                absolute
                                top-[-15px]
                                left-[-20px]
                                bg-[var(--danger)]
                                text-white
                                font-bold
                                uppercase
                                text-sm
                                px-3
                                py-4
                                transform
                                rotate-[340deg]
                                [clip-path:polygon(50%_0%,_65%_15%,_100%_25%,_85%_50%,_100%_75%,_65%_85%,_50%_100%,_35%_85%,_0%_75%,_15%_50%,_0%_25%,_35%_15%)]
                                shadow-lg
                                "
                            >New!</p>}

                            <p className="absolute top-[5px] right-[10px] text-[.95rem] ">{formatDate(notification.createdAt)}</p>
                            <p className='mt-[10px] mb-[5px] font-bold text-[1rem]'>New Comment:</p>
                            <p className="text-[var(--brown-300)]">&rdquo;{notification.commentText}&rdquo;</p>
                            <hr className='mb-2 mt-5'></hr>
                            <p className='italic text-[.95rem] text-[var(--gray-500)] mb-3'>{notification.blog.title}</p>
                            <p className="text-[.95rem] text-[var(--gray-500)] mt-1 mb-[-10px]">(Click to view)</p>
                        </Link>
                    ))
                        :
                        <p className='text-center text-[1.1rem]'>No New Notifications</p>
                }
            </div>
        </section>
    )
}
