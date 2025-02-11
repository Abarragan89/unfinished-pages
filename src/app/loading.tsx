"use client"
import { ScaleLoader } from "react-spinners"

export default function loading() {
    return (
        <main className="min-h-[100vh] flex items-center justify-center bg-[var(--paper-color)]">
            <div className="flex flex-col items-start justify-center">
                <ScaleLoader
                    width={10}
                    height={20}
                    color="rgb(118, 117, 117)"
                />
                <h1 className="text-center text-[1.1rem]">Loading...</h1>
            </div>
        </main>
    )
}