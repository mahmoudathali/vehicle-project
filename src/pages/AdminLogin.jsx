import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'AZERTY21') {
      sessionStorage.setItem('isAdminAuthenticated', 'true'); // Changé pour sessionStorage
      navigate('/admin');
    } else {
      alert('Identifiants invalides');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md space-y-4 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center">Connexion Admin</h2>

        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />

        <button type="submit" className="w-full bg-[#0a192f] text-white py-2 rounded hover:bg-[#0a192f]/90">
          Se connecter
        </button>
      </form>
    </div>
  );
};