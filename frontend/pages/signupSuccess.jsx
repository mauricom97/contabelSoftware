// components/SignupSuccess.js

import { useRouter } from "next/router";

const SignupSuccess = () => {
    const router = useRouter();

    const handleLogin = () => {
        // Redirecionar para a página de login
        router.push("/login");
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Cadastro realizado com sucesso!
                </h2>
                <p className="text-gray-600 mb-8">
                    Bem-vindo ao nosso serviço.
                </p>
                <button
                    onClick={handleLogin}
                    className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                    Fazer Login
                </button>
            </div>
        </div>
    );
};

export default SignupSuccess;
