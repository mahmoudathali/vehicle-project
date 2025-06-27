import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Admin = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = sessionStorage.getItem('isAdminAuthenticated'); // Changé pour sessionStorage
    if (isAuth !== 'true') {
      navigate('/admin/login');
    } else {
      fetchCommandes();
    }
  }, []);

  const fetchCommandes = async () => {
    try {
      const res = await axios.get('http://localhost:4000/commandes');
      setCommandes(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des commandes :', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Confirmer la suppression de cette commande ?')) {
      await axios.delete(`http://localhost:4000/commandes/${id}`);
      setCommandes(commandes.filter(cmd => cmd.id !== id));
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(commandes, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "commandes.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated'); // Changé pour sessionStorage
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#0a192f]">Administration - Commandes</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Déconnexion
          </button>
        </div>

        <div className="flex justify-end mb-4">
          <button onClick={handleExportJSON} className="bg-[#ffd700] text-black px-4 py-2 rounded hover:bg-yellow-400 transition">
            📤 Exporter en JSON
          </button>
        </div>

        {loading ? (
          <p>Chargement des commandes...</p>
        ) : commandes.length === 0 ? (
          <p>Aucune commande trouvée.</p>
        ) : (
          <div className="overflow-auto bg-white rounded shadow">
            <table className="min-w-full table-auto border">
              <thead className="bg-[#0a192f] text-white">
                <tr>
                  <th className="p-2 border">Nom</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Téléphone</th>
                  <th className="p-2 border">Véhicule</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {commandes.map((cmd) => (
                  <tr key={cmd.id} className="text-center">
                    <td className="p-2 border">{cmd.customerName}</td>
                    <td className="p-2 border">{cmd.email}</td>
                    <td className="p-2 border">{cmd.phone}</td>
                    <td className="p-2 border">{cmd.brand} {cmd.model} ({cmd.year})</td>
                    <td className="p-2 border">{new Date(cmd.createdAt).toLocaleString('fr-FR')}</td>
                    <td className="p-2 border">
                      <button onClick={() => handleDelete(cmd.id)} className="text-red-600 hover:underline">
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};