"use client"
import ModalWrapper from "./ModalWrapper";
import React from 'react'
import { useState } from 'react'
import Cropper from 'react-easy-crop';
import getCroppedImg, { PixelCrop } from "../../../utils/cropImage";
import Slider from 'rc-slider';
import PulseLoader from "react-spinners/PulseLoader";
import 'rc-slider/assets/index.css';
import axios from "axios";
import { useRouter } from "next/navigation";

export default function EditProfilePicModal({ userImage, userId }: { userImage: string, userId: string }) {

    const router = useRouter();

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(null)
    const [currentImage, setCurrentImage] = useState<string>(userImage);
    const [message, setMessage] = useState<string>('');
    const [isUpLoading, setIsUploading] = useState<boolean>(false);

    // @ts-expect-error: ignoring first argument in onCropComplete
    const onCropComplete = (__, croppedAreaPixels: PixelCrop) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    async function blobToFile(blobUrl: string, fileName: string) {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        return new File([blob], fileName, { type: blob.type });
    };

    const showCroppedImage = async () => {
        setIsUploading(true)
        try {
            const croppedImage = await getCroppedImg(currentImage, croppedAreaPixels as PixelCrop) as string;

            // Convert Blob to Buffer
            const photoFile = await blobToFile(croppedImage, `user-${userId}-profile-pic.jpeg`);

            const formData = new FormData();
            formData.append('file', photoFile);
            formData.append('imageHeight', '50');
            formData.append('imageWidth', '50');
            formData.append('imageAlt', 'profile-pic')
            formData.append('isCoverImage', 'true')

            //   Post to the S3 Bucket
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

            // Set the users profile pic in database
            await axios.put('/api/userRoutes/settings/profilePicture', {
                pictureURL,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            // delete from s3 bucket if from amazon (There is validation in route)
            await axios.delete('/api/userRoutes/s3Upload', {
                data: { imageUrl: userImage },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setCurrentImage(pictureURL);
            router.back();
        } catch (e) {
            console.error('Error processing cropped image:', e);
        } finally {
            setIsUploading(false)

        }
    }

    const handleSliderChange = (value: number | number[]) => {
        if (typeof value === 'number') {
            setZoom(value / 30);
        }
    };

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
            // 2. Check image dimensions
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {

                URL.revokeObjectURL(img.src); // Clean up
                const reader = new FileReader();
                reader.onload = () => setCurrentImage(reader.result as string); // Set the image preview source
                reader.readAsDataURL(file); // Read file as Data URL

            };
            img.onerror = () => {
                setMessage("Invalid image file.");
                event.target.value = ""; // Reset the input
            };
        }
    };

    return (
        <ModalWrapper
            title="Edit Profile Picture"
            urlParam="editProfilePic"
        >
            <div>
                <div className="relative min-w-[380px] h-[300px]">
                    <Cropper
                        image={currentImage}
                        crop={crop}
                        cropShape="round"
                        zoom={zoom}
                        aspect={2 / 2}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>
                <div className="flex w-full justify-center items-center my-1">
                    <p className="mr-3 text-[.9rem] text-[var(--brown-500)]">Zoom</p>
                    <div className="my-3 w-[200px]">
                        <Slider
                            onChange={handleSliderChange}
                            min={30}
                            handleStyle={{
                                borderColor: 'black',
                                backgroundColor: 'black',
                                boxShadow: '0 0 5px 2px rgba(179, 170, 229, 0.5)', // Glow effect
                            }}
                            trackStyle={{
                                backgroundColor: '#ce7c3d'
                            }}
                            railStyle={{
                                backgroundColor: '#4e2b10'
                            }}
                            dotStyle={{
                                background: '#85491b'
                            }}
                            activeDotStyle={{
                                backgroundColor: 'red'
                            }}
                            className="w-[100px] p-2"
                        />
                    </div>
                </div>
                {/* Button Div  */}
                <div className="flex justify-around mt-4">
                    <label
                        className={`block w-[90%] w-fit px-4 mx-auto custom-small-btn bg-[var(--off-black)]`}
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
                            'Upload new photo'
                        }
                        <input
                            id="cover-image-upload"
                            type="file"
                            className="hidden"
                            accept="image/jpeg, image/png, image/webp"
                            onChange={(e) => handleFileChange(e)}
                        />
                    </label>
                    <button
                        onClick={showCroppedImage}
                        className="custom-small-btn bg-[var(--success)] mx-auto block"
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
                            'Set Profile Picture'
                        }
                    </button>
                </div>
            </div>

        </ModalWrapper>
    )
}
