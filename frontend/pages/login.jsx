import { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';

const Formulario = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function login() {

    const credentials = {
      email: email,
      password: password
    }

    axios.post('http://localhost:4450/user/userLogin', credentials).then((response) => {
      console.log(response);
    }
    ).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div>
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="w-1/3 bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Login</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">E-mail:</label>
            <input type="text" id="email" onChange={handleEmailChange} name="email" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">E-mail:</label>
            <input type="password" id="password" onChange={handlePasswordChange} name="password" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <button onClick={() => login()} type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Entrar</button>
          </div>

      </div>
    </div>
    </div>
  );
};

export default Formulario;
