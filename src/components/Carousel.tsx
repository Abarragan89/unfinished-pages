'use client'
import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function Carousel({ children, heading }: { children: React.ReactNode, heading: string }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, }, [Autoplay({ stopOnInteraction: true })])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <>
            <div className="embla">
                <h3 className="text-center text-3xl rounded-sm custom-title-gradient mb-5">{heading}</h3>
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {/* EACH CHILD MUST HAVE embla__slide CLASSNAME */}
                        {children}
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button className="embla__prev mt-3 text-[2rem] text-[var(--brown-500)]" onClick={scrollPrev}>
                        <IoIosArrowBack />
                    </button>
                    <button className="embla__next mt-3 text-[2rem] text-[var(--brown-500)]" onClick={scrollNext}>
                        <IoIosArrowForward />
                    </button>
                </div>
            </div >
        </>
    )
}
