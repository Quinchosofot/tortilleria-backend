import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

let pedidos = [];
let tortillasPorQuetzal = 4;

app.use(cors());
app.use(express.json());

// Endpoint principal para Alexa
app.post('/', (req, res) => {
  const body = req.body;

  if (body.request?.type === 'IntentRequest' &&
      body.request.intent?.name === 'PedirTortillasIntent') {

    const nombre = body.request.intent.slots.nombre?.value;
    const quetzales = parseInt(body.request.intent.slots.monto?.value);

    if (!nombre || isNaN(quetzales)) {
      return res.json({
        version: "1.0",
        response: {
          outputSpeech: {
            type: "PlainText",
            text: "Faltan datos. Por favor, decime tu nombre y cuántos quetzales quieres gastar."
          },
          shouldEndSession: true
        }
      });
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

    return res.json({
      version: "1.0",
      response: {
        outputSpeech: {
          type: "PlainText",
          text: `Pedido recibido para ${nombre} por ${quetzales} quetzales.`
        },
        shouldEndSession: true
      }
    });
  }

  // Para cualquier otro tipo de request no reconocido
  res.json({
    version: "1.0",
    response: {
      outputSpeech: {
        type: "PlainText",
        text: "No entendí tu pedido, por favor repítelo."
      },
      shouldEndSession: true
    }
  });
});

// Ver todos los pedidos
app.get('/pedidos', (req, res) => {
  res.json(pedidos);
});

// Ruta de depuración
app.get('/debug', (req, res) => {
  res.json(pedidos);
});

// Recibir pedidos desde curl o Postman
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

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
