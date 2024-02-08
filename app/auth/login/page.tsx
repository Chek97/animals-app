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
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h1 className="">Iniciar Sesion</h1>
          <input
            type="email"
            placeholder='Correo electronico'
            name='email'
            onChange={handleChange}
            value={email}
          />
          <input
            type="password"
            placeholder='Contraseña'
            name='password'
            onChange={handleChange}
            value={password}
          />
          <button type="submit">Iniciar Sesion</button>
          <div>
            <Link href={"/auth/register"}>Crear Cuenta de Usuario</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;

