// /pages/api/products/index.js

export default async function handler(req, res) {
    if (req.method === 'GET') {
      // Contoh data (dummy). Nanti sambungkan ke database
      const products = [{ id: 1, name: 'Product A', price: 100 }];
      res.status(200).json(products);
    } else if (req.method === 'POST') {
      const { name, price } = req.body;
      const newProduct = { id: Date.now(), name, price };
      // Simulasi save data
      res.status(201).json(newProduct);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  