"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { IoIosCheckboxOutline } from "react-icons/io";
import PulseLoader from "react-spinners/PulseLoader";
import Link from "next/link";
import NextImage from 'next/image';



export default function UploadImageInput({ blogId, pictureURL }: { blogId: string, pictureURL: string }) {
    const [message, setMessage] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(pictureURL || null);

    const [file, setFile] = useState<File | null>(null)
    const [isUpLoading, setIsUploading] = useState<boolean>(false);
    const [fileIsAccepted, setFileIsAccepted] = useState<boolean>(false)


    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
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
            // 2. Check image dimensions
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const aspectRatio = img.width / img.height;
                const targetAspectRatio = 16 / 9;
                const minResolution = { width: 700, height: 394 };

                // Check aspect ratio
                if (Math.abs(aspectRatio - targetAspectRatio) < 0.01) {
                    setFileIsAccepted(true);
                    setMessage("Image accepted, 'Set Cover Photo' to confirm upload");
                } else {
                    setFileIsAccepted(false);
                    setMessage("Image must have a 16:9 aspect ratio. Use Canva or other photos processing websites to adjust dimensions.");
                    event.target.value = ""; // Reset the input
                }
                URL.revokeObjectURL(img.src); // Clean up

                // Check minimum resolution
                if (img.width < minResolution.width || img.height < minResolution.height) {
                    setFileIsAccepted(false);
                    setMessage(`Image resolution must be at least ${minResolution.width}x${minResolution.height} pixels.`);
                    event.target.value = ""; // Reset the input
                    URL.revokeObjectURL(img.src);
                    return;
                }


                // 3. Set preview using user's file path
                const reader = new FileReader();
                reader.onload = () => setImagePreview(reader.result as string); // Set the image preview source
                reader.readAsDataURL(file); // Read file as Data URL

                // 4. If all checks pass, set the state variable to send to post request
                setFile(file);
            };
            img.onerror = () => {
                setFileIsAccepted(false);
                setMessage("Invalid image file.");
                event.target.value = ""; // Reset the input
            };
        }
    };

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!file) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            // This posts it to the s3 Bucket
            const response = await fetch(`/api/authorRoutes/blog/${blogId}/s3Upload`, {
                method: 'PUT',
                body: formData
            });
            const { pictureURL } = await response.json();
            setImagePreview(pictureURL)
            setMessage("");
            setIsUploading(false)
            setFile(null)
        } catch (error) {
            setIsUploading(false)
            setFile(null)
        }
    }

    return (
        <div className="mt-6">
            {!file &&
                <label
                    className={`block w-[90%] ${imagePreview ? 'w-fit px-4' : 'max-w-[280px]'} mx-auto border border-[var(--brown-500)] text-center py-1 bg-[var(--brown-500)] text-white rounded-md hover:cursor-pointer`}
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
                        imagePreview ?
                            'Change Cover Photo'
                            :
                            'Add Cover Photo'
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
            {
                imagePreview ?
                    <NextImage
                        width={320}
                        height={180}
                        src={imagePreview === null ? '/images/blogs/fillerImg.png' : imagePreview}
                        alt="Preview"
                        className="mx-auto mt-5"
                    />
                    :

                    <div className="flex flex-col justify-center items-center">
                        <p className="font-bold mt-3">Cover Photo Requirements</p>
                        <ul className="text-[.9rem]">
                            <li className="my-1 flex items-center">
                                <IoIosCheckboxOutline size={18} className="text-[var(--green-700)] mr-2" />
                                Format: jpg, png, jpeg, or webp
                            </li>
                            <li className="my-1 flex items-center">
                                <IoIosCheckboxOutline size={18} className="text-[var(--green-700)] mr-2" />
                                Aspect Ratio: 16:9
                            </li>
                            <li className="my-1 flex items-center">
                                <IoIosCheckboxOutline size={18} className="text-[var(--green-700)] mr-2" />
                                Minimum resolution: 700 x 394px
                            </li>
                        </ul>

                        <p className="font-bold mt-2">Tips</p>
                        <ul className="text-[.9rem]">
                            <li className="my-1">Find royalty-free images at
                                <Link href="https://pixabay.com/" target="_blank" rel="noopener noreferrer" className="underline inline-block mx-1 text-blue-700">
                                    Pixabay
                                </Link>
                            </li>

                            <li className="my-1">Resize and format images with
                                <Link href="https://canva.com/" target="_blank" rel="noopener noreferrer" className="underline inline-block mx-1 text-blue-700">
                                    Canva
                                </Link>
                            </li>
                        </ul>
                    </div>
            }
            <p
                className={`text-[.925rem] ${fileIsAccepted ? 'text-green-700' : 'text-red-700'}  text-center mt-3 italic`}
            >{message}</p>
            {
                file &&
                <button
                    onClick={handleSubmit}
                    className="custom-small-btn mx-auto block w-fit mt-3"
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
                        'Set Cover Photo'
                    }
                </button>
            }
        </div>
    );
}
