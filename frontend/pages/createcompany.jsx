// pages/CreateCompany.js

import { useState } from "react";
import axios from "axios";

const CreateCompany = () => {
    const [formData, setFormData] = useState({
        sampleName: "",
        registerName: "",
        cnpj: "",
        ie: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
    });

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
            const response = await axios.post(
                "http://localhost:4356/company",
                formData,
            );
            console.log("Empresa criada com sucesso:", response.data);
            // Adicione lógica adicional, como redirecionamento ou mensagem de sucesso.
        } catch (error) {
            console.error("Erro ao criar empresa:", error.response.data);
            // Trate erros, exiba mensagens de erro, etc.
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="registerName">Razão Social:</label>
                    <input
                        type="text"
                        id="registerName"
                        name="registerName"
                        value={formData.registerName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="sampleName">Nome Fantasia:</label>
                    <input
                        type="text"
                        id="sampleName"
                        name="sampleName"
                        value={formData.sampleName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="cnpj">CNPJ:</label>
                    <input
                        type="text"
                        id="cnpj"
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="ie">Inscrição Estadual:</label>
                    <input
                        type="text"
                        id="ie"
                        name="ie"
                        value={formData.ie}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="phone">Telefone:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="address">Endereço:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="city">Cidade:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="state">Estado:</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
                    >
                        Criar Empresa
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCompany;
