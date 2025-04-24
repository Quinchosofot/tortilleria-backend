import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

let pedidos = [];
let tortillasPorQuetzal = 4;

app.use(cors());
app.use(express.json());

// Ver todos los pedidos
app.get('/pedidos', (req, res) => {
  res.json(pedidos);
});

// Alexa envía un pedido
app.post('/pedido', (req, res) => {
  const { nombre, quetzales } = req.body;

  if (!nombre || !quetzales) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const cantidad = quetzales * tortillasPorQuetzal;
  const nuevoPedido = {
    id: pedidos.length + 1,
    nombre,
    quetzales,
    cantidad,
    restante: cantidad,
    estado: 'En cola',
    horaIngreso: new Date()
  };

  pedidos.push(nuevoPedido);
  res.status(201).json({ mensaje: 'Pedido recibido', pedido: nuevoPedido });
});

// Cambiar configuración de cuántas tortillas por quetzal
app.post('/config', (req, res) => {
  const { valor } = req.body;
  if (!valor || valor <= 0) return res.status(400).json({ error: 'Valor inválido' });
  tortillasPorQuetzal = valor;
  res.json({ mensaje: `Nueva configuración: ${valor} tortillas por quetzal` });
});

// Ruta de depuración para ver los pedidos actuales
app.get('/debug', (req, res) => {
  res.json(pedidos);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
