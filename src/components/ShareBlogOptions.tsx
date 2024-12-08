import {
    FacebookShareButton,
    FacebookIcon,
    RedditShareButton,
    RedditIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    PinterestShareButton,
    PinterestIcon,
} from 'next-share'
import { useEffect, useRef, useState } from 'react';
import { VscLink } from "react-icons/vsc";

interface Props {
    blogUrl: string;
    blogDescription: string;
    toggleShareOptionsView: React.Dispatch<React.SetStateAction<boolean>>;
    blogTitle: string;
    blogCoverPhotoUrl: string;
}

export default function ShareBlogOptions({ blogUrl, blogDescription, toggleShareOptionsView, blogTitle, blogCoverPhotoUrl }: Props) {

    const [showSuccessfulCopyText, setShowSuccessfulCopyText] = useState<boolean>(false)
    const shareMenu = useRef<HTMLDivElement | null>(null);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(blogUrl as string);
            setShowSuccessfulCopyText(true)
            setTimeout(() => {
                setShowSuccessfulCopyText(false)
            }, 1000);
        } catch (err) {
            console.error('Failed to copy the link:', err);
        }
    };

    // Handle clicks outside of the menu to close menu
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                shareMenu.current &&
                !shareMenu.current.contains(event.target as Node)
            ) {
                toggleShareOptionsView(false)
            }
        }
        document.addEventListener("mouseup", handleClickOutside);
        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-[var(--off-white)] px-4 pb-4 pt-3 custom-low-lifted-shadow border border-[var(--paper-color)] rounded-sm text-[var(--gray-700)]" ref={shareMenu}>
            <p className='text-[.9rem] mb-2'>Share</p>
            <div className='flex justify-around'>
                <div className='flex flex-col items-center justify-center w-[60px]'>
                    <FacebookShareButton
                        url={blogUrl as string}
                        quote={blogDescription}
                        hashtag={'#unfinishedpage'}
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <p className='text-[.75rem]'>Facebook</p>
                </div>
                <div className='flex flex-col items-center justify-center w-[60px]'>
                    <RedditShareButton
                        url={blogUrl as string}
                        title={blogTitle}
                    >
                        <RedditIcon size={32} round />
                    </RedditShareButton>
                    <p className='text-[.75rem]'>Reddit</p>

                </div>

                <div className='flex flex-col items-center justify-center w-[60px]'>
                    <TwitterShareButton
                        url={blogUrl as string}
                        title={blogTitle}
                    >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <p className='text-[.75rem]'>X</p>
                </div>

                <div className='flex flex-col items-center justify-center w-[60px]'>
                    <PinterestShareButton
                        url={blogUrl}
                        media={blogCoverPhotoUrl as string}
                    >
                        <PinterestIcon size={32} round />
                    </PinterestShareButton>
                    <p className='text-[.75rem]'>Pinterest</p>
                </div>

                <div className='flex flex-col items-center justify-center w-[60px]'>
                    <LinkedinShareButton url={blogUrl as string}>
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    <p className='text-[.75rem]'>Linkedin</p>
                </div>
            </div>
            <hr className='mt-2'></hr>
            <div className='relative'>
                {showSuccessfulCopyText &&
                    <p
                        className='absolute top-[-30px] right-[25px] text-[.875rem] bg-white border border-[var(--gray-300)] rounded-md p-[3px] px-[8px] text-[var(--gray-600)] custom-low-lifted-shadow'
                    >Link Copied!</p>
                }
                <button className='text-[.875rem] flex justify-center items-center block mx-auto mt-2 hover:text-[var(--brown-300)] active:text-[var(--off-black)]' onClick={handleCopy}>
                    Copy Link
                    <VscLink className='ml-1' size={16} />
                </button>
            </div>
        </div>
    )
}
