import { headers } from 'next/headers'
import SubheadingTitle from "@/components/Headings/SubheadingTitle";
import getUserSettings from '@/app/services/getUserSettings';
import Image from "next/image";
import { MdEdit } from "react-icons/md"
import Link from 'next/link';
import EditProfilePicModal from '@/components/Modals/EditProfilePicModal';


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
            />
            <SubheadingTitle title="Settings" />
            <section className='flex justify-center items-center bg-[var(--paper-color)] p-[20px] relative w-fit mx-auto rounded-md custom-low-lifted-shadow'>
                <div className='relative mr-5'>
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
                        className='rounded-[50px]'
                    />
                </div>
                <div>
                    <p className='bg-white px-[10px] py-[5px] rounded-md border-2 border-[var(--gray-300)]'>{userSettings!.name}</p>
                    <p className='bg-white px-[10px] py-[5px] rounded-md border-2 border-[var(--gray-300)] mt-3'>{userSettings!.email}</p>
                </div>
            </section>

            <section className='flex justify-center items-center bg-[var(--paper-color)] p-[20px] relative w-fit mx-auto rounded-md custom-low-lifted-shadow mt-[30px]'>

                <p>hey there!</p>
            </section>
        </main>
    )
}
