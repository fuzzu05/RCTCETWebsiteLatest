import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { avenuesSlides as slides } from "../data/avenues";

const AboutAvenue = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };
    return (
        <div className="flex flex-col items-center justify-center my-10 mx-2">
            <div className=" w-full max-w-5xl flex max-sm:flex-col justify-center items-center gap-x-4 gap-y-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-yellow">
                    Avenues of Service
                </h1>
                <div className="flex gap-x-2 ">
                    <button onClick={prevSlide} className="bg-primary/10 text-primary p-1 md:p-3 rounded-full hover:bg-primary/20 transition-colors">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button onClick={nextSlide} className="bg-primary/10 text-primary p-1 md:p-3 rounded-full hover:bg-primary/20 transition-colors">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="relative w-full max-w-5xl bg-white/45 dark:bg-card backdrop-blur-md border border-white/60 dark:border-muted rounded-2xl shadow-[0_4px_20px_-4px_rgba(215,25,33,0.06)] dark:shadow-lg overflow-hidden my-5">
                <div className="flex max-sm:flex-col  items-center">
                    <img src={slides[currentIndex].imageUrl} alt={slides[currentIndex].title} className={`${slides[currentIndex].id == 13 ? "" : ""} md:w-1/2 object-cover rounded-lg `} />
                    <div className="p-2 md:p-4 md:w-1/2">
                        <h2 className="text-lg md:text-2xl lg:text-4xl font-bold text-center my-5 md:my-10 text-foreground">{slides[currentIndex].title}</h2>
                        <p className="text-xs md:text-sm lg:text-lg text-justify text-muted">{slides[currentIndex].description}</p>
                    </div>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                    {slides.map((slide, index) => (
                        <button key={slide.id} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-secondary' : 'bg-muted/40'}`}></button>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default AboutAvenue;
