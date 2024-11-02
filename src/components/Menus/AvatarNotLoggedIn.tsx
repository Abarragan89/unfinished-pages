import LoginForm from '../FormInputs/LoginForm'

export default function AvatarNotLoggedIn({ onClose }: { onClose: () => void }) {
    return (
        <div
            className="absolute animate-slideInFromRight bg-[var(--off-white)] z-10 top-[45px] right-[-20px] min-w-[300px] p-[20px_20px_10px_20px] w-fit rounded-bl-md border-l border-b border-[var(--gray-500)]"
        >
            <p className='text-center text-[1.4rem] text-[var(--brown-500)]'>You're not logged In</p>
            <p className='text-center text-[.85rem] text-[var(--gray-700)] mb-6 tracking-tight'>Sign in to join the community</p>
            <LoginForm />
            <hr className='mt-5 border-[var(--gray-500)]'></hr>
            <p
                className='text-center mt-2 hover:cursor-pointer text-[var(--gray-700)]'
                onClick={onClose}
            >
                Close</p>
        </div>
    )
}
