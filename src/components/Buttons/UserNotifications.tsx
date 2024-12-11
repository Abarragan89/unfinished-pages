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
        <section className='max-w-[600px] mx-auto'>
            <form
                className='text-right'
                onSubmit={(e) => deleteAllNotificationsHandler(e)}>
                <SubmitButton
                    isLoading={isLoading}
                    isSubmittable={true}
                    color='red'
                >
                    Clear
                </SubmitButton>
            </form>
            {
                userNotifications && userNotifications.map((notification: Notification) => (
                    <Link
                        href={`/blog/${notification.url}`}
                        key={notification.id}
                        className="bg-[var(--off-white)] my-5 border border-[var(--gray-500)] py-[5px] px-[10px] max-w-[600px] mx-auto relative block rounded-sm custom-hover-shadow-lift"
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
                        <p className="absolute top-[5px] right-[10px] text-[.875rem] text-[var(--brown-300)]">{formatDate(notification.createdAt)}</p>
                        <p className="text-center pt-5 text-[var(--off-black)]">{notification.message.replace(/-/g, ' ')}</p>
                        <p className="text-[.875rem] text-center text-[var(--gray-600)] mt-1">(Click to view)</p>
                    </Link>
                ))
            }
        </section>
    )
}
