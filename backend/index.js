// index.js
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

let pedidos = [];
let contadorPedidos = 1;
const tortillasPorQuetzal = 4; // 4 tortillas por cada Q1

app.use(cors());
app.use(express.json());

// Endpoint para listar pedidos
app.get('/pedidos', (req, res) => {
  res.json(pedidos);
});

// Endpoint para crear un nuevo pedido
app.post('/pedidos', (req, res) => {
  const { cantidad } = req.body;

  if (typeof cantidad !== 'number' || cantidad <= 0) {
    return res.status(400).json({ error: 'Cantidad inválida' });
  }

  const nuevoPedido = {
    id: pedidos.length + 1,
    orden: `${String(contadorPedidos).padStart(3, '0')}`,
    quetzales: cantidad,
    tortillas: cantidad * tortillasPorQuetzal,
    restante: cantidad * tortillasPorQuetzal,
    estado: "En cola",
    horaIngreso: new Date(),
    entregaEstimada: null
  };

  pedidos.push(nuevoPedido);
  contadorPedidos++;

  res.json(nuevoPedido);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
