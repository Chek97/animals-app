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

    const handleDelete = async(id: string) => {
        try {
            const token = localStorage.getItem("user");
            const response = await axios.delete(`http://localhost:3000/api/animals/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            if(response.data.status === "ok"){
                console.log("Peticion compeletada");
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    
    useEffect(() => {
        const user = localStorage.getItem("user");
        if(user === null){
            redirect("/auth/login");
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        const getData = async() => {
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

    if(loading){
        return <p>Loaging...</p>
    }
  
    return (
    <div>
        Dashboard
        <button onClick={handleLogout}>Salir</button>
        {
            animalLoading ? <p>Cargando...</p>
            : animals.map(animal => (
                <div key={animal.id}>
                    <h4>{animal.name}</h4>
                    <p>{animal.category}</p>
                    <p>{animal.behavior}</p>
                    <p>{animal.description}</p>
                    <Link href={`/dashboard/update/${animal.id}`}>Actualizar</Link>
                    <button onClick={() => handleDelete(animal.id)} className="bg-red-400 p-1 mx-3">Borrar</button>
                </div>
            ))
        }
        <div className="my-3">
            <Link href={"/dashboard/create"} className="bg-blue-400 p-3">Nuevo Animal</Link>
        </div>
    </div>
  )
}

export default Dashboard