'use client'

import axios from "axios";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

const Dashboard = () => {

    const [loading, setLoading] = useState(true);
    const [animalLoading, setAnimalLoading] = useState(true);
    const [animals, setAnimals] = useState([]);

    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/auth/login");
    }

    const handleDelete = async (id: string) => {
        try {
            const token = localStorage.getItem("user");
            const response = await axios.delete(`http://localhost:3000/api/animals/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.status === "ok") {
                console.log("Peticion compeletada");
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user === null) {
            redirect("/auth/login");
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                const token = localStorage.getItem("user");
                const response = await axios.get("http://localhost:3000/api/animals", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setAnimals(response.data.animals);
                setAnimalLoading(false);
            } catch (error) {
                setAnimalLoading(false);
                console.log(error);
            }
        }
        getData();
    }, []);

    if (loading) {
        return (
            <div className="bg-blue-950 w-full min-h-screen text-white">
                <p>Loaging...</p>
            </div>
        )
    }

    return (
        <div className='bg-blue-950 w-full min-h-screen text-white'>
            <header className="w-full text-center pt-5">
                <h1 className="text-4xl font-bold">Lista Animales Creados</h1>
            </header>
            <div className="text-right pr-3">
                <button onClick={handleLogout} className="bg-red-400 py-2 px-6 rounded-md hover:bg-red-600">Salir</button>
            </div>
            <div className="m-5">
                <Link href={"/dashboard/create"} className="bg-blue-400 p-3">Nuevo Animal</Link>
            </div>
            {
                animalLoading
                    ? <p>Cargando...</p>
                    : animals.map(animal => (
                        <div key={animal.id} className="mx-5 my-3 bg-white w-64 p-5 text-black rounded">
                            <h4 className="text-xl font-bold text-center mb-2">{animal.name}</h4>
                            <p>Categoria: <span className="italic">{animal.category}</span></p>
                            <p>Comportamiento: <span className="italic">{animal.behavior}</span></p>
                            <p className="italic mb-2">"{animal.description}"</p>
                            <Link href={`/dashboard/update/${animal.id}`} className="bg-green-600 px-2 py-2 mx-3 rounded hover:bg-green-700 text-white">Actualizar</Link>
                            <button onClick={() => handleDelete(animal.id)} className="bg-red-400 px-2 py-1.5 mx-3 rounded hover:bg-red-700 text-white">Borrar</button>
                        </div>
                    ))
            }
        </div>
    )
}

export default Dashboard