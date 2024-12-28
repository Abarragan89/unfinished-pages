"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { MdOutlineArrowBack } from "react-icons/md";
import PulseLoader from "react-spinners/PulseLoader";
import { IoMdClose } from "react-icons/io";
import NextImage from 'next/image';
import axios from "axios";
import { UserImage } from "../../../types/users";
import SearchInput from "../FormInputs/SearchInput";
import { BsThreeDots } from "react-icons/bs";
import CannotDeleteModal from "../Modals/CannotDeleteModal";
import DeletePhotoSubMenu from "./DeletePhotoSubMenu";
import InputLabelEl from "../FormInputs/InputLabelEl";
import imageCompression from 'browser-image-compression';

interface Props {
    onClickHandler: (image: UserImage) => void;
}

export default function SideMenu({ onClickHandler }: Props) {

    const [isUpLoading, setIsUploading] = useState<boolean>(false);
    const [userImages, setUserImages] = useState<UserImage[] | null>(null);
    const [searchedUserImages, setSearchedUserImages] = useState<UserImage[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("");
    const [blogTitlesUsingImage, setBlogTitlesUsingImage] = useState<[]>([]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageWidth, setImageWidth] = useState<string>('')
    const [showDeleteMenu, setShowDeleteMenu] = useState<string>('')
    const [imageHeight, setImageHeight] = useState<string>('')
    const [imageAlt, setImageAlt] = useState<string>('')
    const [file, setFile] = useState<File | null>(null)
    const sideMenuRef = useRef<HTMLLIElement | null>(null);


    const router = useRouter();
    const params = useSearchParams();
    const sideMenu = params.get('sideMenu')
    const pathname = usePathname();

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
                `/api/userRoutes/s3Upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setUserImages(prev => [data.imageData, ...(prev || [])])
            setImagePreview('');
            setIsUploading(false);
            setMessage('');
            setImageAlt('')
        } catch (error) {
            console.log('error uploading photo', error)
        }
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] as File;
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

        setIsUploading(true)
        const options = {
            maxSizeMB: 1.5,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        // compress the file
        const compressedFile = await imageCompression(file, options);
        setIsUploading(false);

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
            setFile(compressedFile);
        };
    }


    async function getUserImages() {
        try {
            const { data } = await axios.get('/api/authorRoutes/blogImages');
            setUserImages(data.userImages)
        } catch (error) {
            console.log('error getting user images', error)
        }
    }

    async function searchUserImages(input: string) {
        setIsSearching(input ? true : false)
        setSearchedUserImages(userImages?.filter(image =>
            image.alt.toLowerCase().includes(input.toLowerCase())
        ) as UserImage[]);
    }

    async function deleteUserImage(imageUrl: string, imageId: string) {
        try {
            const { data } = await axios.delete('/api/authorRoutes/blogImages', {
                data: { imageId }
            });

            // delete blog if not being used in Blog
            if (data.blogs.length === 0) {
                setUserImages((prev) => prev!.filter((img) => img.url !== imageUrl));
                // or else, show modal with blogs title and links to change 
            } else {
                setBlogTitlesUsingImage(data.blogs)
                router.push(`${pathname}?sideMenu=addImage&showModal=cannotDeleteImage`, {
                    scroll: false,
                })
            }

            // delete from s3 bucket if from amazon (There is validation in route)
            await axios.delete('/api/userRoutes/s3Upload', {
                data: { imageUrl },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        } catch (error) {
            console.log('error deleting user Image ', error)
        }
    }

    useEffect(() => {
        if (sideMenu === 'addImage') {
            // get user imags
            getUserImages()
        }
    }, [sideMenu])

    function renderUserImage(image: UserImage) {
        return (
            <div className="relative w-[80%] mx-auto" key={image.id}>
                {
                    showDeleteMenu === image.id &&
                    <DeletePhotoSubMenu
                        closeMenuState={setShowDeleteMenu}
                        photoId={image.id}
                        photoUrl={image.url}
                        onClickHandler={deleteUserImage}
                    />
                }
                <figure className="relative border-x-[15px] border-y-[20px] bg-[var(--gray-300)] rounded-lg my-3 hover:cursor-pointer hover:border-[var(--paper-color)] overflow-hidden">

                    <BsThreeDots
                        size={25}
                        className="absolute top-[5px] right-[7px] w-[30px] opacity-80 bg-[var(--off-black)] text-[var(--off-white)] hover:cursor-pointer rounded-lg transition-transform hover:scale-125 active:scale-100"
                        onClick={() => showDeleteMenu === image.id ? setShowDeleteMenu('') : setShowDeleteMenu(image.id)}
                    />
                    <NextImage
                        onClick={() => {
                            onClickHandler(image);
                            router.back();
                        }}
                        src={image.url}
                        width={image.width}
                        height={image.height}
                        alt={image.alt}
                    />
                </figure>
            </div>
        )
    }

    return (
        <>
            <CannotDeleteModal
                blogsUsingImage={blogTitlesUsingImage}
            />

            {sideMenu === 'addImage'
                &&
                <menu
                    ref={sideMenuRef}
                    className="fixed z-[99] top-0 bottom-0 left-0 border-r border-r-gray-500 bg-[var(--off-white)] w-[350px] animate-slideInFromLeft custom-low-lifted-shadow">
                    <MdOutlineArrowBack
                        onClick={router.back}
                        size={25}
                        className="absolute right-3 top-3 text-[var(--gray-600)] hover:cursor-pointer hover:text-[var(--brown-300)]"
                    />
                    <form
                        onSubmit={(e) => onSubmitHandler(e)}
                        className="flex flex-col items-center mx-4 rounded-md py-3 mt-[30px]"
                    >
                        {
                            imagePreview ?
                                <div className="relative flex flex-col items-center">
                                    <IoMdClose
                                        size={20}
                                        className="absolute top-0 right-0 bg-[var(--brown-500)] text-[var(--off-white)] hover:cursor-pointer hover:text-[var(--brown-100)] rounded-bl-lg"
                                        onClick={() => setImagePreview(null)}
                                    />
                                    <NextImage
                                        width={300}
                                        height={200}
                                        src={imagePreview}
                                        alt="Preview"
                                        className="rounded-sm"
                                    />
                                    <div className="flex flex-col text-[.85rem] text-[var(--brown-500)] mt-3">
                                        <InputLabelEl
                                            userText={imageAlt}
                                            handleStateChange={setImageAlt}
                                            characterLimit={100}
                                            autofocus={true}
                                            labelText="Photo Description"
                                        />
                                    </div>
                                    <button className={`custom-small-btn bg-[var(--off-black)] mx-auto mt-3 ${imageAlt ? 'opacity-100' : 'opacity-50 pointer-events-none'} ${isUpLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                                        {isUpLoading ?
                                            <PulseLoader
                                                loading={isUpLoading}
                                                size={7}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                                className="text-[var(--off-white)]"
                                            />
                                            :
                                            'Upload'
                                        }
                                    </button>
                                </div>
                                :
                                <>
                                    <SearchInput
                                        placeholder="Search By Description"
                                        inputWidth="full"
                                        onChangeHandler={searchUserImages}
                                    />
                                    {/*  conditional error message */}
                                    {message &&
                                        <p
                                            className="text-center text-red-600 text-[.95rem]"
                                        >{message}</p>
                                    }

                                    <label
                                        className={`block w-[80%] mx-auto border border-[var(--brown-500)] text-center py-1 bg-[var(--brown-500)] text-white rounded-md hover:cursor-pointer`}
                                        htmlFor="image-upload"
                                    >
                                        {isUpLoading ?
                                            <PulseLoader
                                                loading={isUpLoading}
                                                size={7}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                                className="text-[var(--off-white)]"
                                            />
                                            :
                                            'Upload'
                                        }
                                        <input
                                            id="image-upload"
                                            type="file"
                                            className="hidden"
                                            accept="image/jpeg, image/png, image/webp"
                                            onChange={(e) => handleFileChange(e)}
                                        />
                                    </label>
                                </>
                        }
                    </form>


                    {/* users images */}
                    {userImages && userImages.length === 0 ?
                        <h4 className="text-center text-[1.1rem] border-[var(--gray-300)] italic border-t w-[80%] mx-auto pt-2 mt-4 text-[var(--brown-500)]">No photos uploaded</h4>
                        :
                        <h4 className="text-center text-[1.15rem] tracking-wider border-t w-[80%] mx-auto pt-2 mt-4 text-[var(--brown-500)]">Photo Collection</h4>
                    }
                    <section className="overflow-y-scroll pb-[200px] h-[90vh] flex flex-wrap py-5mx-auto">
                        {userImages && !isSearching ? userImages?.map((image: UserImage) => (
                            renderUserImage(image)
                        ))
                            :
                            searchedUserImages?.map((image: UserImage) => (
                                renderUserImage(image)
                            ))
                        }
                    </section>

                </menu>
            }
        </>
    )
}
