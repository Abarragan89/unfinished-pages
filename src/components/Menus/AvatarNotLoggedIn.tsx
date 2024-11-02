import LoginForm from '../FormInputs/LoginForm'

export default function AvatarNotLoggedIn({ onClose }: { onClose: () => void }) {
    return (
        <>
            <p className='text-center text-[1.4rem] text-[var(--brown-500)]'>You&apos;re not logged In</p>
            <p className='text-center text-[.85rem] text-[var(--gray-700)] mb-6 tracking-tight'>Sign in to join the community</p>
            <LoginForm />
            <hr className='mt-5 border-[var(--gray-500)]'></hr>
            <p
                className='text-center mt-2 hover:cursor-pointer text-[var(--gray-700)]'
                onClick={onClose}
            >
                Close</p>
        </>
    )
}
