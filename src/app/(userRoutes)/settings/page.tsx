import { headers } from 'next/headers'
import SubheadingTitle from "@/components/Headings/SubheadingTitle";
import getUserSettings from '@/app/services/getUserSettings';
import Image from "next/image";
import { MdEdit } from "react-icons/md"
import Link from 'next/link';
import EditProfilePicModal from '@/components/Modals/EditProfilePicModal';
import UserSettingSwitches from '@/components/FormInputs/UserSettingSwitches';


export default async function page() {
    const headersList = headers()
    const userId = headersList.get('x-user-id')

    if (!userId) {
        throw new Error('No authorized to see this page')
    }

    const userSettings = await getUserSettings(userId)

    return (
        <main className="min-h-[100vh] mt-[25px]">
            <EditProfilePicModal
                userImage={userSettings!.image as string}
                userId={userId}
            />
            <SubheadingTitle title="Settings" />

            <div className='flex flex-col items-center justify-center w-[90%] max-w-[500px] mx-auto'>
                <section className='flex flex-wrap justify-between items-center bg-[var(--paper-color)] p-[20px] relative w-full mx-auto rounded-md custom-low-lifted-shadow'>
                    <div className='relative mr-5 mb-2'>
                        <Link
                            href={'?showModal=editProfilePic'}
                            className='absolute top-[-10px] right-[-10px]'
                        >
                            <MdEdit
                                size={20}
                                className='text-[var(--off-black)] hover:text-[var(--brown-300)]'
                            />
                        </Link>
                        <Image
                            src={userSettings!.image as string}
                            width={75}
                            height={75}
                            alt='User profile image'
                            className='rounded-[50px] border border-[var(--gray-500)]'
                        />
                    </div>
                    <div>
                        <p className='bg-[var(--off-white)] px-[10px] py-[5px] rounded-md border-2 border-[var(--gray-300)] text-[.95rem]'>{userSettings!.name}</p>
                        <p className='bg-[var(--off-white)] px-[10px] py-[5px] rounded-md border-2 border-[var(--gray-300)] mt-3 text-[.95rem]'>{userSettings!.email}</p>
                    </div>
                </section>

                <UserSettingSwitches 
                    isNotificationsOn={userSettings?.isNotificationsOn as boolean}
                />
            </div>
        </main>
    )
}
