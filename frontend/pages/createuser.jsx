// components/RegisterForm.js
import axios from 'axios';
import { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    birthdate: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '', // Novo campo de estado para a confirmação da senha
  });

  const [showPassword, setShowPassword] = useState(false); // Novo campo de estado para a visibilidade da senha

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error('As senhas não coincidem');
      return;
    }
    try {
      const response = await axios.post('http://localhost:4356/user', formData);
      console.log('Cadastro realizado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
    console.log('Dados enviados:', formData);
  };

  return (
    <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstname">Nome:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="lastname">Sobrenome:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="birthdate">Data de Nascimento:</label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="phone">Telefone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Cadastrar
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
