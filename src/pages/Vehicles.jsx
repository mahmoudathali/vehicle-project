import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader } from '../components/Loader';
import { Search, Star } from 'lucide-react';

const initialVehicles = [
  {
    id: '1',
    brand: 'Mercedes-Benz',
    model: 'AMG GT Black Series',
    year: 2024,
    price: 468000,
    mileage: 0,
    fuel: 'Essence',
    transmission: 'Automatique',
    color: 'Noir',
    bodyType: 'Coupé',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&h=400&q=80'
  },
  {
    id: '2',
    brand: 'BMW',
    model: 'M8 Competition',
    year: 2024,
    price: 245000,
    mileage: 0,
    fuel: 'Essence',
    transmission: 'Automatique',
    color: 'Bleu',
    bodyType: 'Coupé',
    image: 'https://cdn.motor1.com/images/mgl/NGZB0Y/s1/manhart-mh8-800-limited-01-10.jpg'
  },
  {
    id: '3',
    brand: 'Audi',
    model: 'RS e-tron GT',
    year: 2024,
    price: 147800,
    mileage: 0,
    fuel: 'Électrique',
    transmission: 'Automatique',
    color: 'Gris',
    bodyType: 'Berline',
    image: 'https://cdn.motor1.com/images/mgl/9m4RBp/s3/2025-audi-e-tron-gt.jpg'
  },
  {
    id: '4',
    brand: 'Volkswagen',
    model: 'Polo',
    year: 2024,
    price: 17690,
    mileage: 0,
    fuel: 'Électrique',
    transmission: 'Automatique',
    color: 'Noir',
    bodyType: 'Berline',
    image: 'https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ZyL29yaWdpbmFsL1ZPTEtTV0FHRU4vUE9MTy80MDQ4NV9IQVRDSEJBQ0stNS1ET09SUy92b2xrc3dhZ2VuLXBvbG8tMjAyMS1mcm9udC1zaWRlLTEuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMDI0LCJoZWlnaHQiOm51bGwsImZpdCI6ImNvdmVyIn19fQ=='
  },
  {
    id: '5',
    brand: 'Renault',
    model: 'Clio',
    year: 2024,
    price: 16990,
    mileage: 0,
    fuel: 'Essence',
    transmission: 'Automatique',
    color: 'Gris',
    bodyType: 'Berline',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Renault_Clio_R.S._Line_%28V%29_%E2%80%93_f_17102021.jpg/1200px-Renault_Clio_R.S._Line_%28V%29_%E2%80%93_f_17102021.jpg'
  },
  {
    id: '6',
    brand: 'Peugeot',
    model: '208',
    year: 2024,
    price: 16810,
    mileage: 0,
    fuel: 'Essence',
    transmission: 'Manuelle',
    color: 'Noir',
    bodyType: 'Berline',
    image: 'https://www.peugeot.fr/content/dam/peugeot/master/b2c/our-range/showroom/208/2024-09-october-window-evolution-208-wl/new-208---hybrid-page---wl/PEUGEOT_208_HYBRID_STYLE_2410STYP_001_FR_632x632.jpg?imwidth=768'
  },
  {
    id: '7',
    brand: 'Peugeot',
    model: '208',
    year: 2015,
    price: 6200,
    mileage: 72000,
    fuel: 'Essence',
    transmission: 'Manuelle',
    color: 'Blanc',
    bodyType: 'Berline',
    image: 'https://www.peugeot.fr/content/dam/peugeot/master/b2c/our-range/showroom/208/2024-09-october-window-evolution-208-wl/new-208---hybrid-page---wl/PEUGEOT_208_HYBRID_STYLE_2410STYP_001_FR_632x632.jpg?imwidth=768'
  },
  {
    id: '8',
    brand: 'Citroen',
    model: 'C3',
    year: 2014,
    price: 5600,
    mileage: 80000,
    fuel: 'Essence',
    transmission: 'Manuelle',
    color: 'Bleu',
    bodyType: 'Berline',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn05DxtCnYS4WjSIXnVEbrGCDzn9srT8mkNA&s'
  },
  {
    id: '9',
    brand: 'Ford',
    model: 'Focus',
    year: 2013,
    price: 6000,
    mileage: 90000,
    fuel: 'Essence',
    transmission: 'Manuelle',
    color: 'Rouge',
    bodyType: 'Berline',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI9Mihfh2rdUhRwj_FHQP4BCqgY-z6Ab_ePA&s'
  }
];

const brandLogos = {
  "Toyota": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_logo.png",
  "Mercedes-Benz": "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
  "BMW": "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
  "Audi": "https://uploads.audi-mediacenter.com/system/production/media/116125/images/74022a65b478f7b3a8e0bf8ba70994f66fde5dd7/A231415_web_960.jpg?1698528985",
  "Volkswagen": "https://images.seeklogo.com/logo-png/15/2/volkswagen-logo-png_seeklogo-150527.png",
  "Peugeot": "https://img2.freepng.fr/20180430/age/avdihpzq0.webp",
  "Renault": "https://www.logo-voiture.com/wp-content/uploads/2021/01/Logo-Renault.png",
  "Mercedes-AMG": "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
  "Citroen": "https://seeklogo.com/images/C/citroen-2009-logo-C696A25544-seeklogo.com.png",
  "Ford": "https://www.citypng.com/public/uploads/preview/ford-logo-emblem-hd-png-70175169471401511cpxj0ogw.png"
};

export const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    setVehicles(initialVehicles);
    setLoading(false);
  }, []);

  const brands = Array.from(new Set(vehicles.map(v => v.brand)));

  const filteredVehicles = vehicles.filter((v) => {
    const brandMatch = selectedBrand ? v.brand === selectedBrand : true;
    const searchLower = search.toLowerCase();
    const searchMatch =
      v.model.toLowerCase().includes(searchLower) || v.brand.toLowerCase().includes(searchLower);
    return brandMatch && searchMatch;
  });

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-[#0a192f] mb-12">
          Notre Collection de Véhicules
        </h1>

        {/* Boutons de marques */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand === selectedBrand ? '' : brand)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm transition-all ${
                selectedBrand === brand
                  ? 'bg-[#0a192f] text-white'
                  : 'bg-white text-[#0a192f] border-[#0a192f]'
              } hover:bg-[#ffd700] hover:text-black`}
            >
              {brandLogos[brand] && (
                <img src={brandLogos[brand]} alt={brand} className="w-6 h-6 object-contain" />
              )}
              <span>{brand}</span>
            </button>
          ))}
        </div>

        {/* Barre de recherche */}
        <div className="max-w-xl mx-auto mb-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une marque ou un modèle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ffd700] focus:border-transparent"
          />
        </div>

        {/* Bouton de réinitialisation */}
        {(selectedBrand || search) && (
          <div className="text-center mb-8">
            <button
              onClick={() => {
                setSelectedBrand('');
                setSearch('');
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Résultats filtrés */}
        {filteredVehicles.length === 0 ? (
          <p className="text-center text-gray-500">Aucun véhicule trouvé.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img src={vehicle.image} alt={vehicle.model} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#0a192f] mb-1">
                    {vehicle.brand} {vehicle.model}
                  </h2>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#ffd700] fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {vehicle.year} · {vehicle.fuel} · {vehicle.transmission}
                  </p>
                  <p className="text-[#0a192f] font-bold text-lg mb-4">
                    {vehicle.price.toLocaleString('fr-FR')} €
                  </p>
                  <Link
                    to={`/vehicles/${vehicle.id}`}
                    className="block text-center bg-[#0a192f] text-white py-2 rounded-lg hover:bg-[#0a192f]/90 transition"
                  >
                    Voir le véhicule
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
