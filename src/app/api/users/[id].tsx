import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const product = { id, name: 'Product A', price: 100 };
    res.status(200).json(product);
  } else if (req.method === 'PUT') {
    const { name, price } = req.body;
    const updatedProduct = { id, name, price };
    res.status(200).json(updatedProduct);
  } else if (req.method === 'DELETE') {
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
