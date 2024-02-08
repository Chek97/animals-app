'use client'

import axios from "axios";
import jwt from "jsonwebtoken";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UpdatePage = () => {

    const [form, setForm] = useState({
        name: '',
        category: '',
        behavior: '',
        description: '',
        user_id: null
    });

    const { id } = useParams();

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
        <div>
            <h1>Registro de animal</h1>
            <div>
                <form action="" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder='Nombre'
                        name='name'
                        onChange={handleChange}
                        value={name}
                    />
                    <input
                        type="text"
                        placeholder='Categoria'
                        name='category'
                        onChange={handleChange}
                        value={category}
                    />
                    <input
                        type="text"
                        placeholder='Comportamiento'
                        name='behavior'
                        onChange={handleChange}
                        value={behavior}
                    />
                    <input
                        type="text"
                        placeholder='Descripcion'
                        name='description'
                        onChange={handleChange}
                        value={description}
                    />
                    <button type='submit'>Crear Animal</button>
                </form>
            </div>
        </div>
    )
}

export default UpdatePage