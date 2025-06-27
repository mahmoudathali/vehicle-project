// VehicleDetail.tsx (Mis à jour)
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Star } from 'lucide-react';
import { useLoadingState } from '../hooks/useLoadingState';
import { Loader } from '../components/Loader';
import { vehicleList } from '../data/vehicleData';

export const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, withLoading } = useLoadingState();

  const vehicle = vehicleList.find(v => v.id === id);

  if (isLoading || !vehicle) {
    return <Loader />;
  }

  const handlePurchase = () => {
    withLoading(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate(`/purchase/${vehicle.id}`);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/vehicles')}
          className="flex items-center text-[#0a192f] mb-8 hover:text-[#ffd700] transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Retour aux véhicules
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div>
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={vehicle.images?.[0] || vehicle.image}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="grid grid-cols-3 gap-4 mt-4">
                {vehicle.images?.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                  />
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-[#0a192f] mb-4">
                {vehicle.brand} {vehicle.model}
              </h1>
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#ffd700] fill-current" />
                ))}
                <span className="ml-2 text-gray-600">5.0 (12 avis)</span>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-3xl font-bold text-[#0a192f]">
                  {vehicle.price.toLocaleString('fr-FR')} €
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Année</p>
                    <p className="font-semibold">{vehicle.year}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Kilométrage</p>
                    <p className="font-semibold">{vehicle.mileage.toLocaleString('fr-FR')} km</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Carburant</p>
                    <p className="font-semibold">{vehicle.fuel}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Transmission</p>
                    <p className="font-semibold">{vehicle.transmission}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-[#0a192f] mb-4">Équipements</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {vehicle.features?.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-[#ffd700] rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handlePurchase}
                className="w-full bg-[#0a192f] text-white py-4 rounded-lg hover:bg-[#0a192f]/90 transition-colors"
              >
                Réserver ce véhicule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
