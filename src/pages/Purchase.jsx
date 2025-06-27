import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useLoadingState } from '../hooks/useLoadingState';
import { Loader } from '../components/Loader';
import { vehicleList } from '../data/vehicleData';
import axios from 'axios';

export const Purchase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, withLoading } = useLoadingState();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const vehicle = vehicleList.find(v => v.id === id);

  if (isLoading) return <Loader />;
  if (!vehicle) return <p className="text-center text-red-600">Véhicule introuvable.</p>;

  const onSubmit = async (data) => {
    await withLoading(async () => {
      try {
        const order = {
          ...data,
          vehicle,
        };

        await axios.post('http://localhost:4000/commandes', order);

        toast.success('Votre commande a été enregistrée avec succès');
        navigate('/purchase/confirmation');
      } catch (error) {
        console.error(error);
        toast.error("Une erreur est survenue lors de l'enregistrement");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0a192f] mb-8">Réservation du véhicule</h1>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center space-x-4 mb-8">
              <img
                src={vehicle.images?.[0] || vehicle.image}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div>
                <h2 className="text-xl font-bold text-[#0a192f]">
                  {vehicle.brand} {vehicle.model}
                </h2>
                <p className="text-gray-600">{vehicle.year}</p>
                <p className="text-lg font-bold text-[#0a192f]">
                  {vehicle.price.toLocaleString('fr-FR')} €
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="customerName"
                  {...register('customerName', { required: 'Ce champ est requis' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ffd700] focus:border-transparent"
                />
                {errors.customerName && (
                  <p className="text-red-600 text-sm mt-1">{errors.customerName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Ce champ est requis',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Adresse email invalide',
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ffd700] focus:border-transparent"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone', { required: 'Ce champ est requis' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ffd700] focus:border-transparent"
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse complète
                </label>
                <textarea
                  id="address"
                  {...register('address', { required: 'Ce champ est requis' })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ffd700] focus:border-transparent"
                />
                {errors.address && (
                  <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (facultatif)
                </label>
                <textarea
                  id="notes"
                  {...register('notes')}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ffd700] focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0a192f] text-white py-4 rounded-lg hover:bg-[#0a192f]/90 transition-colors"
              >
                Confirmer la réservation
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};