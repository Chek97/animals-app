'use client'

import { useRouter } from "next/navigation"
import Image from 'next/image'

const Home = () => {

    const router = useRouter();

    return (
        <div className="bg-blue-950 text-white w-full min-h-screen flex justify-center items-center">
            <div>
                <header className="p-3 mb-3 text-center">
                    <h1 className="text-3xl font-bold">Animals App</h1>
                </header>
                <div className="mb-3">
                    <Image
                        src={"/cat-image.jpg"}
                        alt="main_image"
                        width={200}
                        height={100}
                        className="object-fill"
                    />
                </div>
                <button
                    onClick={() => router.push("/auth/login")}
                    className="bg-blue-600 p-2 w-full hover:bg-blue-400"
                >
                    Empezar
                </button>
            </div>
        </div>
    )
}

export default Home