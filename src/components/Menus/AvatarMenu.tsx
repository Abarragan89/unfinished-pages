import AvatarNotLoggedIn from "./AvatarNotLoggedIn"

export default function AvatarMenu({ onClose }: { onClose: () => void }) {
    return (
        <AvatarNotLoggedIn onClose={onClose} />
    )
}
