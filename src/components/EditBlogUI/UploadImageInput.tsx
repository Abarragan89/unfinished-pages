"use client";
import { useState, ChangeEvent, FormEvent } from "react";

export default function UploadImageInput() {
    const [message, setMessage] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState<boolean>(false);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setMessage("");

        if (file) {
            // Check file type
            const validTypes = ["image/jpeg", "image/png", "image/webp"];
            if (!validTypes.includes(file.type)) {
                setMessage("Please upload a JPEG, PNG, or WebP image.");
                event.target.value = ""; // Reset the input
                return;
            }
            // Check image dimensions
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const aspectRatio = img.width / img.height;
                const targetAspectRatio = 16 / 9;

                // Allow a small tolerance to account for minor rounding differences
                if (Math.abs(aspectRatio - targetAspectRatio) < 0.01) {
                    setMessage("Image accepted, Add image to confirm upload");
                } else {
                    setMessage("Image must have a 16:9 aspect ratio. Use Canva or other photos processing website");
                    event.target.value = ""; // Reset the input
                }
                URL.revokeObjectURL(img.src); // Clean up


                // if all checks pass, set the state variable to send to post request
                setFile(file);
            };
            img.onerror = () => {
                setMessage("Invalid image file.");
                event.target.value = ""; // Reset the input
            };
        }
    };

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch('/api/authorRoutes/s3Upload', {
                method: 'POST',
                body: formData
            });
            const { imageUrl } = await response.json();

            console.log('data in the front end', imageUrl)
            setImagePreview(imageUrl)
            setMessage("");
            setUploading(false)
        } catch (error) {
            console.log('error uploading file', error)
            setUploading(false)
        }
    }

    return (
        <div>
            <input
                type="file"
                accept="image/jpeg, image/png, image/webp"
                onChange={(e) => handleFileChange(e)}
            />
            <p>{message}</p>

            <img
                src={imagePreview === null ? '/images/blogs/fillerImg.png' : imagePreview}
                alt="Preview"
                style={{ width: "350px", height: "210px" }}
                className="mx-auto mt-5"
            />

            <button
                onClick={handleSubmit}
                className="custom-small-btn mx-auto block w-fit mt-5"
            >Add</button>
        </div>
    );
}
