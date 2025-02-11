"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import NextImage from 'next/image';
import axios from "axios";
import InputLabelEl from "../FormInputs/InputLabelEl";
import PhotoRequirements from "../FormInputs/PhotoRequirements";

export default function UploadImageInput({ blogId, coverPhotoUrl }: { blogId: string, coverPhotoUrl: string }) {
    const [message, setMessage] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(coverPhotoUrl || null);
    const [imageWidth, setImageWidth] = useState<string>('')
    const [imageHeight, setImageHeight] = useState<string>('')
    const [imageAlt, setImageAlt] = useState<string>('')
    const [file, setFile] = useState<File | null>(null)
    const [isUpLoading, setIsUploading] = useState<boolean>(false);
    const [fileIsAccepted, setFileIsAccepted] = useState<boolean>(false)


    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
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

            // 2. Check file size (max 3.75MB)
            const maxSizeMB = 3.75;
            if (file.size > maxSizeMB * 1024 * 1024) { // Convert MB to bytes
                setMessage("File size must be less than 3.75MB.");
                event.target.value = ""; // Reset the input
                return;
            }

            // 3. Check image dimensions
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
                    <div className="flex justify-around flex-wrap">
                        {!file &&

                            <PhotoRequirements />
                        }
                        <NextImage
                            width={200}
                            height={200}
                            src={imagePreview === null ? '/images/blogs/fillerImg.png' : imagePreview}
                            alt="Preview"
                            className="w-auto h-auto"
                        />
                    </div>
                    :
                    <PhotoRequirements />
            }
            {/* Button to Upload */}
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
                    <div className="flex flex-col max-w-[285px] w-[90%] mx-auto mt-2">
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
