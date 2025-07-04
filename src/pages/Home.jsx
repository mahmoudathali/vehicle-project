import { motion } from 'framer-motion';
import { ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const featuredVehicles = [
    {
      id: '1',
      brand: 'Mercedes-Benz',
      model: 'S-Class',
      year: 2024,
      price: 125000,
      image: 'https://images.unsplash.com/photo-1661589997089-405a6076fc18?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '2',
      brand: 'BMW',
      model: 'X7',
      year: 2024,
      price: 98000,
      image: 'https://static0.carbuzzimages.com/wordpress/wp-content/uploads/2024/03/1099617-7.jpg',
    },
    {
      id: '3',
      brand: 'Audi',
      model: 'RS e-tron GT',
      year: 2024,
      price: 145000,
      image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=1200',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Salima AHMADOU',
      rating: 5,
      text: 'Un service exceptionnel et des véhicules de première qualité. Je recommande vivement.',
    },
    {
      id: 2,
      name: 'Annick ZHOU',
      rating: 5,
      text: 'L\'équipe est très professionnelle et à l\'écoute. Une expérience d\'achat parfaite.',
    },
    {
      id: 3,
      name: 'Serge MAMBO',
      rating: 5,
      text: 'Des voitures magnifiques et un service client irréprochable.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/90 to-[#0a192f]/60" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              L'élégance au service de votre mobilité
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 mb-8"
            >
              Découvrez notre sélection exclusive de véhicules premium pour une expérience de conduite incomparable.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/vehicles"
                className="inline-flex items-center px-8 py-4 bg-[#ffd700] text-[#0a192f] font-bold rounded-lg hover:bg-[#ffd700]/90 transition-colors"
              >
                Parcourir nos véhicules
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#0a192f] mb-4">Qualité</h3>
              <p className="text-gray-600">
                Des véhicules sélectionnés avec la plus grande attention aux détails et à la performance.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#0a192f] mb-4">Confiance</h3>
              <p className="text-gray-600">
                Une relation transparente et durable avec nos clients depuis plus de 25 ans.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#0a192f] mb-4">Service VIP</h3>
              <p className="text-gray-600">
                Un accompagnement personnalisé et des prestations haut de gamme pour votre satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#0a192f] mb-12 text-center">Véhicules en vedette</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredVehicles.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0a192f] mb-2">
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  <p className="text-gray-600 mb-4">{vehicle.year}</p>
                  <p className="text-2xl font-bold text-[#0a192f] mb-4">
                    {vehicle.price.toLocaleString('fr-FR')} €
                  </p>
                  <Link
                    to={`/vehicles/${vehicle.id}`}
                    className="inline-block w-full text-center py-3 bg-[#0a192f] text-white font-bold rounded-lg hover:bg-[#0a192f]/90 transition-colors"
                  >
                    Voir le véhicule
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#0a192f] mb-12 text-center">Ce que disent nos clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#ffd700] fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <p className="font-bold text-[#0a192f]">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};