"use client"
import ModalWrapper from "./ModalWrapper";
import React from 'react'
import { useState } from 'react'
import Cropper from 'react-easy-crop';
import getCroppedImg, { PixelCrop } from "../../../utils/cropImage";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from "axios";

export default function EditProfilePicModal({ userImage, userId }: { userImage: string, userId: string }) {

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(null)
    const [currentImage, setCurrentImage] = useState<string>('https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000')

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

            // delete the old on from s3 bucket

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

        } catch (e) {
            console.error('Error processing cropped image:', e);
        }
    }

    const handleSliderChange = (value: number | number[]) => {
        if (typeof value === 'number') {
            setZoom(value / 30); // Assuming zoom is scaled between 0 and 5
        }
    };

    // async function handleSubmit(e: FormEvent) {
    //     e.preventDefault();
    //     if (!croppedImage) return;

    //     const formData = new FormData();
    //     formData.append('file', file);
    //     formData.append('imageHeight', imageHeight);
    //     formData.append('imageWidth', imageWidth);
    //     formData.append('imageAlt', imageAlt)
    //     formData.append('isCoverImage', 'true')

    //     try {
    //         // Post to the S3 Bucket
    //         const { data } = await axios.post(
    //             `/api/authorRoutes/s3Upload`,
    //             formData,
    //             {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //             }
    //         );

    //         // Get the pictureURL
    //         const { pictureURL } = data;

    //         // Save image to Database for Blog
    //         await axios.put(
    //             `/api/authorRoutes/blog/${blogId}/blogCoverImage`,
    //             { coverPhotoUrl: pictureURL, coverPhotoAlt: imageAlt.trim() }
    //         )

    //     } catch (error) {
    //         console.error('Error uploading blog cover image:', error);
    //     }
    // }

    console.log('user image ', userImage)
    return (
        <ModalWrapper
            title="Edit Profile Picture"
            urlParam="editProfilePic"
        >
            <div>
                <div className="relative min-w-[380px] h-[300px]">
                    <Cropper
                        // image={'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'}
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

                <button
                    onClick={showCroppedImage}
                    className="custom-small-btn bg-[var(--off-black)] mx-auto block"
                >
                    Crop Image
                </button>
            </div>

        </ModalWrapper>
    )
}
