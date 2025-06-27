import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export const PurchaseConfirmation = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-[#0a192f] mb-4">
            Votre réservation est confirmée !
          </h1>
          <p className="text-gray-600 mb-8">
            Merci pour votre confiance. Notre équipe vous contactera dans les plus brefs délais pour
            finaliser votre commande.
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Pour toute question, n'hésitez pas à nous contacter :
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Tél : <a href="tel:+49123456789" className="text-[#0a192f]">+49 123 456 789</a>
              </p>
              <p className="text-sm text-gray-500">
                Email :{' '}
                <a href="mailto:contact@unterm-schloss.de" className="text-[#0a192f]">
                  contact@unterm-schloss.de
                </a>
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-block bg-[#0a192f] text-white px-8 py-3 rounded-lg hover:bg-[#0a192f]/90 transition-colors"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};