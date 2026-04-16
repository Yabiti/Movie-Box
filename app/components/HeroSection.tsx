"use client"
import { IMAGE_PATH } from "@/constant";
import { Popcorn, Search } from "lucide-react";
import Image from "next/image";

interface IHeroSectionProps {
    movies: IMovie[],
    searchterm: string,
    setsearchterm: (value: string) => void;
}
export default function HeroSection({ movies, searchterm, setsearchterm }: IHeroSectionProps) {
    return (
        <header className="relative h-[70vh]">
            <div className="w-5/12 z-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <div className="flex justify-center items-center flex-col mb-4 gap-4">
                    <div className="flex items-center justify-center rounded-xl bg-red-500 w-14 h-14
                 shadow-lg mb-4">
                        <Popcorn className="w-7 h-7" />
                    </div>
                    <h1 className="text-7x1 font-black tracking-tight">Movie Box</h1>
                    <p className="text-2x1 tracking-tight font-light mb-4 text-santas-gray">
                        Discover The Most Popular Trending Movies Right Now
                    </p>
                </div>
                <div className="relative h-12">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-santas-gray" />
                    <input className="mb-10 w-full h-full rounded-xl pl-10 pr-10 outline-none border-none
                    bg-dark-black"
                        placeholder="Search Movies..."
                        value={searchterm}
                        onChange={(e) => setsearchterm(e.target.value)} />
                </div>
            </div>
            <div className="grid grid-cols-5 gap-1 opacity-60 absolute inset-0">
                {movies.length >= 5
                    ? movies.map((movie) => (
                        <div key={movie.id}>
                            <Image
                                className="h-full w-full object-cover"
                                width={250}
                                height={250}
                                alt={movie.title}
                                unoptimized={true}
                                priority={true}
                                sizes="20vw"
                                src={
                                    movie.poster_path
                                        ? `${IMAGE_PATH}${movie.poster_path}`
                                        : "/movie-1.jpg"
                                }
                            />
                        </div>
                    ))
                    : Array(5)
                        .fill(0)
                        .map((_, index) => (
                            <div key={index}>
                                <Image
                                    src={`/movie-${index + 1}.jpg`}
                                    className="w-full h-full object-cover"
                                    width={250}
                                    height={250}
                                    alt="placeholder"
                                />
                            </div>
                        ))}
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-woodsmoke via-woodsmoke/80
             to-transparent"></div>
            <div className="absolute inset-0 bg-linear-to-t from-woodsmoke/90 
             via-transparent to-transparent"></div>
        </header>
    )
}