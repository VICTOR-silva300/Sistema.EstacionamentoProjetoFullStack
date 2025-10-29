const express = require("express");
const cors = require("cors");
const app = express();
const porta = 3000;

app.use(express.json());
app.use(cors());

let VEICULOS = [
  { id: 1, placa: "CBA-3412", modelo: "URUS", hora_entrada: new Date().toISOString(), pago: true },
  { id: 2, placa: "CBB-1234", modelo: "Porsche", hora_entrada: new Date().toISOString(), pago: false }
];

app.get("/lerveiculos", (req, res) => {
  res.status(200).json(VEICULOS);
});

app.patch("/atualizarpagamento/:id", (req, res) => {
  const id = Number(req.params.id);
  const veiculo = VEICULOS.find(v => v.id === id);
  if (!veiculo) return res.status(404).json({ erro: "Não Achei" });

  const { pago } = req.body;
  if (pago !== undefined) veiculo.pago = pago;

  res.json(veiculo);
});

app.delete("/deletarveiculo/:id", (req, res) => {
  const id = Number(req.params.id);
  const veiculoIndex = VEICULOS.findIndex(v => v.id === id);
  if (veiculoIndex === -1) return res.status(404).json({ erro: "Veículo Deletado" });

  VEICULOS.splice(veiculoIndex, 1);
  res.status(204).send();
});

app.listen(porta, () => {
  console.log(`Servidor rodando no http://localhost:${porta}`);
});
