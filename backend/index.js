// server.js
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let pedidos = [];
let tortillasPorQuetzal = 4; // Puedes cambiarlo si luego cambia el precio
let contadorPedidos = 1; // Correlativo para las órdenes

// Crear un nuevo pedido
app.post('/crearPedido', (req, res) => {
  const { quetzales } = req.body;

  if (!quetzales || quetzales <= 0) {
    return res.status(400).json({ error: 'Cantidad inválida' });
  }

  const cantidadTortillas = quetzales * tortillasPorQuetzal;

  const nuevoPedido = {
    idCola: pedidos.length + 1, // posición en la cola
    numeroOrden: `Orden ${contadorPedidos.toString().padStart(3, '0')}`,
    cantidadQuetzales: quetzales,
    totalTortillas: cantidadTortillas
  };

  pedidos.push(nuevoPedido);
  contadorPedidos++;

  res.json(nuevoPedido);
});

// Obtener todos los pedidos
app.get('/pedidos', (req, res) => {
  res.json(pedidos);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
