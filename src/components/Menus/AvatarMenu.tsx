import { useSession } from "next-auth/react"
import { Session } from '../../../types/users';
import AvatarLoggedIn from "./AvatarLoggedIn"
import AvatarNotLoggedIn from "./AvatarNotLoggedIn"

export default function AvatarMenu({ onClose }: { onClose: () => void }) {
    const session: Session = useSession();
    console.log('sessiosn ', session)
    return (
        <div
            className="absolute animate-slideInFromRight bg-[var(--off-white)] z-10 top-[45px] right-[-20px] min-w-fit p-[15px_20px_10px_20px] w-fit rounded-bl-md border-l border-b border-[var(--gray-500)]"
        >
            {session.status === 'unauthenticated' ?
                <AvatarNotLoggedIn onClose={onClose} />
                :
                <AvatarLoggedIn onClose={onClose} sessionData={session} />
            }

        </div>
    )
}
