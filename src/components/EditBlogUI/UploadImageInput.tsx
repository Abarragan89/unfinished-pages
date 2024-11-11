"use client";

import { useState, ChangeEvent } from "react";

export default function UploadImageInput() {
    const [message, setMessage] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
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
                if (img.width === 700 && img.height === 394) {
                    setMessage("Image uploaded successfully!");
                    setImagePreview(img.src); // Optionally set a preview
                } else {
                    setMessage("Image must be 700x394 pixels.");
                    event.target.value = ""; // Reset the input
                }
                URL.revokeObjectURL(img.src); // Clean up
            };

            img.onerror = () => {
                setMessage("Invalid image file.");
                event.target.value = ""; // Reset the input
            };
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/jpeg, image/png, image/webp"
                onChange={handleImageChange}
            />
            <p>{message}</p>
            {imagePreview && (
                <img
                    src={'/images/topicCardImgs/education.jpg'}
                    alt="Preview"
                    style={{ width: "350px", height: "210px" }}
                />
            )}
        </div>
    );
}
