// components/RegisterForm.js
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        birthdate: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "", // Novo campo de estado para a confirmação da senha
    });

    const router = useRouter();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:4356/user", formData);
            router.push("/signupSuccess");
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
        }
        console.log("Dados enviados:", formData);
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="firstname"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Nome:
                    </label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label
                        htmlFor="lastname"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Sobrenome:
                    </label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
            </div>

            <div className="mt-4">
                <label
                    htmlFor="birthdate"
                    className="block text-sm font-medium text-gray-600"
                >
                    Data de Nascimento:
                </label>
                <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <div className="mt-4">
                <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-600"
                >
                    Telefone:
                </label>
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
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600"
                >
                    Email:
                </label>
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
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-600"
                >
                    Senha:
                </label>
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
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                >
                    Cadastrar
                </button>
            </div>
        </div>
    );
};

export default RegisterForm;
