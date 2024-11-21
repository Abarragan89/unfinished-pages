"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { MdOutlineArrowBack } from "react-icons/md";
import PulseLoader from "react-spinners/PulseLoader";
import { IoMdClose } from "react-icons/io";
import NextImage from 'next/image';
import axios from "axios";
import { UserImage } from "../../../types/users";


interface Props {
    onClickHandler: (url: string) => void;
    setImageUrl: React.Dispatch<React.SetStateAction<string>>
}

export default function SideMenu({ onClickHandler, setImageUrl }: Props) {

    const [isUpLoading, setIsUploading] = useState<boolean>(false);
    const [userImages, setUserImages] = useState<UserImage[]>([])
    const [message, setMessage] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageWidth, setImageWidth] = useState<string>('')
    const [imageHeight, setImageHeight] = useState<string>('')
    const [imageAlt, setImageAlt] = useState<string>('')
    const [file, setFile] = useState<File | null>(null)
    const sideMenuRef = useRef<HTMLLIElement | null>(null);


    const router = useRouter();
    const params = useSearchParams();
    const sideMenu = params.get('sideMenu')

    async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!file) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('imageHeight', imageHeight);
        formData.append('imageWidth', imageWidth);
        formData.append('imageAlt', imageAlt)
        formData.append('isCoverImage', 'false')
        try {
            // save image to s3 and save it to users images[]
            const { data } = await axios.post(
                `/api/authorRoutes/s3Upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            // Get the pictureURL
            const { pictureURL } = data;

            // save this for the selection of the photo
            setImageUrl(pictureURL)
            // set the url of the image to the Slate Editor
            onClickHandler(pictureURL);
            router.back();
            setImagePreview(pictureURL);
            setMessage('');
        } catch (error) {
            console.log('error uploading photo', error)
        }
    }


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setMessage("");
        if (file) {
            // 1.  Check file type
            const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
            if (!validTypes.includes(file.type)) {
                setMessage("Please upload a JPEG, PNG, or WebP image.");
                event.target.value = ""; // Reset the input
                return;
            }
        }
        // 2. Check image dimensions
        const img = new Image();
        img.src = URL.createObjectURL(file as File);
        img.onload = () => {
            // 3. Set preview using user's file path
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result as string); // Set the image preview source
            reader.readAsDataURL(file as File); // Read file as Data URL

            // 4. Find the images width and height
            setImageHeight(img.height.toString())
            setImageWidth(img.width.toString())
            // 5. If all checks pass, set the state variable to send to post request
            setFile(file as File);
        };
    }

    // Handle clicks outside of the menu to close menu
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                sideMenuRef.current &&
                !sideMenuRef.current.contains(event.target as Node)
            ) {
                router.back();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    async function getUserImages() {
        try {
            const { data } = await axios.get('/api/authorRoutes/blogImages');

            setUserImages(data.userImages)
            console.log('data in fetch ', data)
        } catch (error) {

        }
    }

    useEffect(() => {
        if (sideMenu === 'addImage') {
            // get user imags
            getUserImages()
        }
    }, [sideMenu])


    return (
        <>
            {sideMenu === 'addImage'
                &&
                <menu
                    ref={sideMenuRef}
                    className="fixed z-20 top-0 bottom-0 left-0 border border-r-gray-300 bg-[var(--off-white)] w-[280px] animate-slideInFromLeft custom-low-lifted-shadow">
                    <MdOutlineArrowBack
                        onClick={router.back}
                        size={25}
                        className="absolute right-3 top-3 text-[var(--gray-600)] hover:cursor-pointer hover:text-[var(--brown-300)]"
                    />
                    <form
                        onSubmit={(e) => onSubmitHandler(e)}
                        className="flex flex-col items-center bg-white border border-[var(--gray-300)] mx-4 rounded-md py-5 custom-360-light-shadow mt-[50px]"
                    >
                        {
                            imagePreview ?
                                <div className="relative flex flex-col items-center">
                                    <IoMdClose
                                        size={20}
                                        className="absolute top-0 right-[20px] bg-[var(--gray-500)] hover:cursor-pointer hover:bg-[var(--off-white)]"
                                        onClick={() => setImagePreview(null)}
                                    />
                                    <NextImage
                                        width={320}
                                        height={180}
                                        src={imagePreview === null ? '/images/blogs/fillerImg.png' : imagePreview}
                                        alt="Preview"
                                        className="px-5"
                                    />
                                    <div className="flex flex-col text-[.85rem] text-[var(--brown-500)] mt-3">
                                        <label htmlFor="photoAlt">
                                            Photo Description
                                            <span className="ml-10 text-[.8rem] text-[var(--brown-500)]">{imageAlt.length}/100</span>
                                        </label>
                                        <input type="text"
                                            required
                                            maxLength={100}
                                            onChange={(e) => { setImageAlt(e.target.value) }}
                                            className="input-browser-reset text-[.925rem] w-[190px] py-[3px] px-[8px] border border-[var(--brown-500)] text-[.9rem]"
                                            placeholder="" />
                                    </div>
                                    <button className={`custom-small-btn mx-auto mt-3 ${imageAlt ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                                        Add
                                    </button>
                                </div>
                                :
                                <label
                                    className={`block w-[90%] mx-auto border border-[var(--brown-500)] text-center py-1 bg-[var(--brown-500)] text-white rounded-md hover:cursor-pointer`}
                                    htmlFor="image-upload"
                                >
                                    {isUpLoading ?
                                        <PulseLoader
                                            color={'white'}
                                            loading={isUpLoading}
                                            size={7}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"

                                        />
                                        :
                                        'Add Photo'
                                    }
                                    <input
                                        id="image-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/jpeg, image/png, image/webp"
                                        onChange={(e) => handleFileChange(e)}
                                    />
                                </label>
                        }
                    </form>

                    {/* users images */}
                    <section className="h-[100vh] overflow-y-scroll pb-[200px]">
                        {userImages && userImages?.map((image: UserImage) => (
                            <NextImage
                                src={image.url}
                                width={parseInt(image.width)}
                                height={parseInt(image.height)}
                                alt={image.alt}
                                className="max-w-[80%] m-2 mx-auto"
                            />
                        ))}
                    </section>
                </menu>
            }
        </>
    )
}
