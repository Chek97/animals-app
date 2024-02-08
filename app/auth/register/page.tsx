'use client'

import axios from 'axios';
import { useState } from 'react';

const Register = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

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
      const response = await axios.post("http://localhost:3000/api/auth/register", JSON.stringify(form));
      if (response.data.status === "ok") {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <div className='boder-2 text-red-400'>
      <h1>Registro de usuario</h1>
      <div>
        <form action="" onSubmit={handleSubmit}>
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
          <button type='submit'>Crear Usuario</button>
        </form>
      </div>
    </div>
  )
}

export default Register