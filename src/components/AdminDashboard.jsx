import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Download, LogOut, Trash2, Activity, ShoppingBag } from 'lucide-react';
import { saveAs } from 'file-saver';

export const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/commandes');
      setOrders(response.data);
    } catch (error) {
      toast.error("Erreur lors du chargement des commandes");
    }
  };

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin');
    } else {
      fetchOrders();
    }
  }, [navigate]);

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Supprimer cette commande ?')) {
      try {
        await axios.delete(`http://localhost:4000/commandes/${orderId}`);
        fetchOrders();
        toast.success('Commande supprimée avec succès');
      } catch {
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  const handleExportOrders = () => {
    const blob = new Blob([JSON.stringify(orders, null, 2)], { type: 'application/json' });
    saveAs(blob, `commandes-${format(new Date(), 'yyyy-MM-dd')}.json`);
    toast.success('Export JSON réussi');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
    toast.success('Déconnexion réussie');
  };

  const recentActivity = [...orders].reverse().slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#0a192f]">Tableau de bord</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleExportOrders}
              className="flex items-center px-4 py-2 bg-[#0a192f] text-white rounded-md hover:bg-[#0a192f]/90"
            >
              <Download className="w-4 h-4 mr-2" /> Exporter
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <LogOut className="w-4 h-4 mr-2" /> Déconnexion
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <div className="bg-[#0a192f] p-3 rounded-full">
                <ShoppingBag className="w-6 h-6 text-[#ffd700]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#0a192f]">Total des commandes</h2>
                <p className="text-3xl font-bold text-[#0a192f]">{orders.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-[#0a192f] p-3 rounded-full">
                  <Activity className="w-6 h-6 text-[#ffd700]" />
                </div>
                <h2 className="text-xl font-semibold text-[#0a192f]">Activité récente</h2>
              </div>
              <div className="space-y-2">
                {recentActivity.map((order) => (
                  <div key={order.id} className="text-sm text-gray-600">
                    {format(new Date(order.createdAt), "d MMMM yyyy 'à' HH:mm", { locale: fr })} -{' '}
                    <span className="font-medium">{order.customerName}</span> a commandé une {order.brand} {order.model}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0a192f] text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Client</th>
                  <th className="px-6 py-3 text-left">Contact</th>
                  <th className="px-6 py-3 text-left">Véhicule</th>
                  <th className="px-6 py-3 text-left">Prix</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}</td>
                    <td className="px-6 py-4">{order.customerName}<div className="text-sm text-gray-500">{order.address}</div></td>
                    <td className="px-6 py-4">{order.phone}<div className="text-sm text-gray-500">{order.email}</div></td>
                    <td className="px-6 py-4">{order.brand} {order.model}<div className="text-sm text-gray-500">{order.year}</div></td>
                    <td className="px-6 py-4 font-medium">{order.price.toLocaleString('fr-FR')} €</td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleDeleteOrder(order.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      Aucune commande enregistrée
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};