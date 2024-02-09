'use client'

import axios from "axios";
import jwt from "jsonwebtoken";
import { useState } from "react";

const CreatePage = () => {

    const [form, setForm] = useState({
        name: '',
        category: '',
        behavior: '',
        description: '',
        user_id: null
    });


    const { name, category, behavior, description } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.name === "" || form.category === "" || form.behavior === "" || form.description === "") {
            return;
        }

        const token = localStorage.getItem("user");
        const payload = jwt.decode(token, { complete: true });

        const newData = {
            ...form,
            user_id: payload.payload.id
        }


        try {
            const response = await axios.post("http://localhost:3000/api/animals", JSON.stringify(newData), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.status === "ok") {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className="bg-blue-950 w-full min-h-screen text-white">
            <div className="w-full min-h-screen flex justify-center items-center">
                <form onSubmit={handleSubmit} className="border-2 border-blue-400 p-10 rounded-2xl">
                    <header className="text-center py-2">
                        <h1 className="text-3xl font-bold">Registro de animal</h1>
                    </header>
                    <input
                        type="text"
                        placeholder='Nombre'
                        name='name'
                        onChange={handleChange}
                        value={name}
                        className="p-2 w-full mb-5 mt-2 rounded text-black"
                    />
                    <input
                        type="text"
                        placeholder='Categoria'
                        name='category'
                        onChange={handleChange}
                        value={category}
                        className="p-2 w-full mb-5 mt-2 rounded text-black"
                    />
                    <input
                        type="text"
                        placeholder='Comportamiento'
                        name='behavior'
                        onChange={handleChange}
                        value={behavior}
                        className="p-2 w-full mb-5 mt-2 rounded text-black"
                    />
                    <input
                        type="text"
                        placeholder='Descripcion'
                        name='description'
                        onChange={handleChange}
                        value={description}
                        className="p-2 w-full mb-5 mt-2 rounded text-black"
                    />
                    <div className="text-center">
                    <button type='submit' className="bg-blue-600 w-full p-2 rounded hover:bg-blue-400">Crear Animal</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePage