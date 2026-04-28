"use client";
import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import { API_URL, IMAGE_PATH } from "@/constant";
import { Star } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [movies, setmovies] = useState<IMovie[]>([]);
  const [searchterm, setsearchterm] = useState("");
  const fetchmovies = async (query = "") => {
    try {
      const response = await fetch(query ? `${API_URL}/search/movie?query=${encodeURIComponent(query)}` :
        `${API_URL}/discover/movie`, {
        headers: {
          accept: `application/json`,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        }
      })
      const data = await response.json();
      setmovies(data.results || [])
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchmovies();
  }, [])
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchmovies(searchterm)
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [searchterm])
  return (
    <>
      <HeroSection movies={movies.slice(0, 5)} searchterm={searchterm} setsearchterm={setsearchterm} />
      <div className="flex flex-col m-10 mt-0">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-alabaster mb-3">
            {searchterm ? `Results for ${searchterm}` : "Popular Right Now"}
          </h2>
          <p className="text-lg text-santa-gray">Explore What Everyone Is Watching</p>
        </div>

        <div className="grid grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="group">
              <div className="relative overflow-hidden cursor-pointer group rounded-xl">
                <Image className="group-hover:scale-110 duration-500 h-full width-full
              object-cover"
                  src={movie.poster_path ? `${IMAGE_PATH}${movie.poster_path}`
                    : "/movie-1.jpg"}
                  width={250}
                  height={250}
                  alt={movie.title}
                />
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-xl
              bg-black/70 px-2.5 py-1 backdrop-blur-sm">
                  <Star className="h-3.5 w-3.5 text-saffron fill-saffron" />
                  <span className="text-sm font-semibold font-white">
                    {movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40
             to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                </div>
                <div className="absolute bottom-0 left-0 px-4 opacity-0 group-hover:opacity-100">
                  <p className="line-clamp-4 text-sm text-white/90 text-center">{movie.overview}</p>
                </div>
              </div>
              <div className="mt-3 px-1">
                <h3 className="transition-colors group-hover:text-red-500">{movie.title}</h3>
                <p className="text-sm text-santas-gray">{movie.release_date?.split("-")[0]}</p>
              </div>
            </div>

          ))}
        </div>
      </div>
    </>
  )
}




















































