'use client';
import Switch from "react-switch";
import { useState } from "react";
import axios from "axios";

export default function UserSettingSwitches({ isNotificationsOn }: { isNotificationsOn: boolean }) {

    const [notificationIsChecked, setNotificationIsChecked] = useState<boolean>(isNotificationsOn)

    async function notificationChangeHandler(e: boolean) {
        try {
            await axios.put('/api/userRoutes/settings/notifications', {
                isNotificationsOn: e,
            })
            setNotificationIsChecked(e)
        } catch (error) {
            console.log('error setting notifications off ', error)
        }
    }


    // const toggleDarkMode = () => {
    //     const root = document.documentElement;
    //     if (root.classList.contains('dark')) {
    //         root.classList.remove('dark');
    //         localStorage.setItem('theme', 'light');
    //     } else {
    //         root.classList.add('dark');
    //         localStorage.setItem('theme', 'dark');
    //     }
    // };

    // // Apply the saved theme on page load
    // const savedTheme = localStorage.getItem('theme');
    // if (savedTheme) {
    //     document.documentElement.classList.add(savedTheme);
    // } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //     document.documentElement.classList.add('dark');
    // }

    return (
        <section className='bg-[var(--paper-color)] p-[20px] relative mx-auto rounded-md custom-low-lifted-shadow mt-[30px] w-full'>
            <div className="flex justify-between items-center mb-5">
                <p>Dark Mode</p>
                <p className="text-[var(--gray-500)] italic">using system settings</p>
            </div>
            <div className="flex justify-between items-center">
                <p>Email Notifications</p>
                <label>
                    <Switch
                        offColor="#C31515"
                        onColor="#E19A3C"
                        activeBoxShadow="0 0 2px 3px #4e2b10"
                        onChange={notificationChangeHandler}
                        checked={notificationIsChecked} />
                </label>
            </div>
        </section>
    )
}
