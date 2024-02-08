'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import './globals.css'

const Home = () => {

    const router = useRouter();

    return (
        <div>
            <div>
                <button onClick={() => router.push("/auth/login")}>Iniciar Session</button>
            </div>
        </div>
    )
}

export default Home