"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { IoIosCheckboxOutline } from "react-icons/io";
import PulseLoader from "react-spinners/PulseLoader";
import Link from "next/link";
import NextImage from 'next/image';
import axios from "axios";
import InputLabelEl from "../FormInputs/InputLabelEl";


export default function UploadImageInput({ blogId, coverPhotoUrl }: { blogId: string, coverPhotoUrl: string }) {
    const [message, setMessage] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(coverPhotoUrl || null);
    const [imageWidth, setImageWidth] = useState<string>('')
    const [imageHeight, setImageHeight] = useState<string>('')
    const [imageAlt, setImageAlt] = useState<string>('')
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
                // set width and height to be sent to database
                setImageHeight(img.height.toString())
                setImageWidth(img.width.toString())
                const aspectRatio = img.width / img.height;
                const targetAspectRatio = 16 / 9;
                const minResolution = { width: 700, height: 394 };

                // Check aspect ratio
                if (Math.abs(aspectRatio - targetAspectRatio) > 0.01) {
                    setFileIsAccepted(false);
                    setMessage("Image must have a 16:9 aspect ratio. Use Canva or other photos processing websites to adjust dimensions.");
                    event.target.value = ""; // Reset the input
                    return
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

                setFileIsAccepted(true);
                setMessage("Add a description and Confirm Upload");

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
        formData.append('imageHeight', imageHeight);
        formData.append('imageWidth', imageWidth);
        formData.append('imageAlt', imageAlt)
        formData.append('isCoverImage', 'true')

        try {
            // Post to the S3 Bucket
            const { data } = await axios.post(
                `/api/userRoutes/s3Upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // Get the pictureURL
            const { pictureURL } = data;

            // Save image to Database for Blog
            await axios.put(
                `/api/authorRoutes/blog/${blogId}/blogCoverImage`,
                { coverPhotoUrl: pictureURL, coverPhotoAlt: imageAlt.trim() }
            )

            setImagePreview(pictureURL);
            setMessage('');
        } catch (error) {
            console.error('Error uploading blog cover image:', error);
            setMessage('Failed to upload the image. Please try again.');
        } finally {
            setIsUploading(false);
            setFile(null);
        }
    }

    return (
        <section>
            {
                imagePreview ?
                    <>
                        <NextImage
                            width={200}
                            height={200}
                            src={imagePreview === null ? '/images/blogs/fillerImg.png' : imagePreview}
                            alt="Preview"
                            className="mx-auto w-auto h-auto"
                        />
                    </>
                    :
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-bold">Cover Photo Requirements</p>
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
            {!file &&
                <label
                    className={`block w-[90%] ${imagePreview ? 'w-fit px-4' : 'max-w-[260px]'} mt-5 mx-auto custom-small-btn bg-[var(--off-black)]`}
                    htmlFor="cover-image-upload"
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
                        imagePreview ?
                            'Change Cover Photo'
                            :
                            'Add Cover Photo'
                    }
                    <input
                        id="cover-image-upload"
                        type="file"
                        className="hidden"
                        accept="image/jpeg, image/png, image/webp"
                        onChange={(e) => handleFileChange(e)}
                    />
                </label>
            }
            <p
                className={`text-[.925rem] ${fileIsAccepted ? 'text-green-700' : 'text-red-700'} text-center mt-3 italic`}
            >{message}</p>
            {
                file &&
                <>
                    <div className="flex flex-col max-w-[270px] w-[90%] mx-auto mt-2">

                        <InputLabelEl
                            userText={imageAlt}
                            handleStateChange={setImageAlt}
                            labelText="Photo Description"
                            characterLimit={100}
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className={`custom-small-btn bg-[var(--off-black)] mx-auto block w-fit mt-4 ${imageAlt ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}
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
                            'Confirm Upload'
                        }
                    </button>
                </>
            }
        </section>
    );
}
