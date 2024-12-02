'use client'
import { useState } from 'react'
import { AuthorRequest } from '../../../types/users'
import TextareaLabel from '../FormInputs/TextareaLabel'
import SubmitButton from '../Buttons/SubmitButton'
import { useRouter } from 'next/navigation'
import axios from 'axios'


export default function AuthorRequestCard({ request }: { request: AuthorRequest }) {

    const router = useRouter();
    const [requestResponseText, setRequestResponseText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleRequestResponse(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Cast nativeEvent to SubmitEvent
        const button = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
        const action = button?.value;

        setIsLoading(true);
        try {
            await axios.put('/api/adminRoutes/authorRequest', {
                requestResponseText,
                action,
                requestId: request.id
            })
            router.refresh();
        } catch (error) {
            console.log('error ', error)
        } finally {
            setIsLoading(false)
        }
    }

    const formDiv = 'text-[.95rem] mt-4'
    const formLabel = 'text-[var(--brown-500)]'
    const formText = 'bg-[var(--gray-100)] p-3 border border-[var(--gray-300)] rounded-sm'

    return (
        <section
            className="w-[400px] mx-auto border border-[var(--gray-300)] rounded-sm px-[20px] pb-[20px] pt-[10px] bg-[var(--off-white)] mt-8 custom-low-lifted-shadow"
        >
            <p className='text-[1.2rem] text-center font-bold'>{request.user.name}</p>
            <div className={formDiv}>
                <p className={formLabel}>About Requester</p>
                <p className={formText}>{request.aboutText}</p>
            </div>
            <div className={formDiv}>
                <p className={formLabel}>Why Blog</p>
                <p className={formText}>{request.whyBlogText}</p>
            </div>
            <div className={formDiv}>
                <p className={formLabel}>Topics</p>
                <p className={formText}>{request.topicsText}</p>
            </div>

            <form
                onSubmit={(e) => handleRequestResponse(e)}
            >
                <TextareaLabel
                    handleStateChange={setRequestResponseText}
                    userText={requestResponseText}
                    characterLimit={500}
                    labelText='Comment'
                />
                <div className='flex justify-around mt-4'>
                    <SubmitButton
                        isLoading={isLoading}
                        isSubmittable={true}
                        value="approve"
                        color='green'
                    >
                        Approve
                    </SubmitButton>
                    <SubmitButton
                        isLoading={isLoading}
                        isSubmittable={true}
                        value="decline"
                        color='red'
                    >
                        Decline
                    </SubmitButton>
                </div>

            </form>
        </section>
    )
}
