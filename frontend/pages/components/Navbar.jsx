// components/Navbar.js

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/">
            <button className="bg-green-500 text-white p-2 rounded hover:bg-green-700">Pagina inicial</button>
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/createuser">
          <button className="bg-green-500 text-white p-2 rounded hover:bg-green-700">Criar usuario</button>
          </Link>
          <Link href="/login">
            <button className="bg-green-500 text-white p-2 rounded hover:bg-green-700">Entrar</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
