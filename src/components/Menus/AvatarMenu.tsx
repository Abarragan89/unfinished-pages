import { useSession } from "next-auth/react"
import { Session } from '../../../types/users';
import AvatarLoggedIn from "./AvatarLoggedIn"
import AvatarNotLoggedIn from "./AvatarNotLoggedIn"

export default function AvatarMenu({ onClose }: { onClose: () => void }) {
    const session: Session = useSession();
    return (
        <div
            className="absolute animate-slideInFromRight z-10 top-[45px] right-[-20px] min-w-fit p-[15px_20px_10px_20px] w-fit rounded-bl-md border-l custom-avatar-menu-shadow bg-[var(--off-white)]"
        >
            {session.status === 'unauthenticated' ?
                <AvatarNotLoggedIn onClose={onClose} />
                :
                <AvatarLoggedIn onClose={onClose} sessionData={session} />
            }

        </div>
    )
}
