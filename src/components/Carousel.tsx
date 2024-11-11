'use client'
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'
import { EmblaCarouselType } from 'embla-carousel'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function Carousel({ children }: { children: React.ReactNode }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, }, [Autoplay({ stopOnInteraction: true, delay: 6500 })])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <>
            <div className="embla">
                <div className="embla__viewport mt-[20px]" ref={emblaRef}>
                    <div className="embla__container">
                        {/* EACH CHILD MUST HAVE embla__slide CLASSNAME */}
                        {children}
                    </div>
                </div>
                <div className='flex justify-between w-[180px] mx-auto'>
                    <button className="embla__prev mt-4 text-[2.2rem] text-[var(--brown-500)]" onClick={scrollPrev}>
                        <IoIosArrowBack />
                    </button>
                    <button className="embla__next mt-4 text-[2.2rem] text-[var(--brown-500)]" onClick={scrollNext}>
                        <IoIosArrowForward />
                    </button>
                </div>
            </div >
        </>
    )
}
