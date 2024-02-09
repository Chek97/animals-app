"use client"

import Link from "next/link";
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/navigation";

function Login() {

  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();


  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.email === "" || form.password === "") {
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", JSON.stringify(form));
      if (response.data.status === "ok") {
        console.log(response.data);
        localStorage.setItem("user", response.data.token);
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="border-2 border-blue-400 p-10 w-33 rounded-2xl">
        <header className="text-center py-2">
          <h1 className="text-3xl font-bold">Iniciar Sesion</h1>
        </header>
        <input
          type="email"
          placeholder='Correo electronico'
          name='email'
          onChange={handleChange}
          value={email}
          className="p-2 w-full mb-5 mt-2 rounded text-black"
        />
        <input
          type="password"
          placeholder='Contraseña'
          name='password'
          onChange={handleChange}
          value={password}
          className="p-2 w-full mb-5 rounded rounded text-black"
        />
        <div className="text-center">
          <button type="submit" className="bg-blue-600 w-full p-2 rounded hover:bg-blue-400">Iniciar Sesion</button>
        </div>
        <div className="mt-4">
          <Link href={"/auth/register"} className="hover:text-blue-400">Crear Cuenta de Usuario</Link>
        </div>
      </form>
    </div>
  )
}

export default Login;

