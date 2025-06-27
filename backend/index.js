const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors({
    origin: ['http://localhost:5173', 'http://192.168.0.5:5173'], // ✅ autorise aussi le téléphone
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true
  }));
  
  
app.use(express.json());

// ➕ Créer une commande
app.post('/commandes', async (req, res) => {
  try {
    const { customerName, email, phone, address, notes, vehicle } = req.body;

    const commande = await prisma.commande.create({
      data: {
        customerName,
        email,
        phone,
        address,
        notes,
        vehicleId: vehicle.id,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        price: vehicle.price,
      },
    });

    res.status(201).json(commande);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l’enregistrement de la commande' });
  }
});

// 📄 Récupérer toutes les commandes
app.get('/commandes', async (req, res) => {
  const commandes = await prisma.commande.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json(commandes);
});

// ❌ Supprimer une commande
app.delete('/commandes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.commande.delete({ where: { id } });
    res.json({ message: 'Commande supprimée avec succès' });
  } catch (error) {
    res.status(404).json({ error: 'Commande introuvable' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Backend API en ligne sur http://192.168.0.5:${PORT}`);
  });
  
