const express = require("express");
const cors = require("cors");
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());


let Veiculos = [
  {
    id: 1,
    placa: "CBA-3412",
    modelo: "Urus",
    hora_entrada: new Date().toISOString(),
    pago: true
  },
  {
    id: 2,
    placa: "CBB-1234",
    modelo: "Porsche",
    hora_entrada: new Date().toISOString(),
    pago: true
  },
  {
    id: 3,
    placa: "ABC-3214",
    modelo: "Onix",
    hora_entrada: new Date().toISOString(),
    pago: true
  }
];

app.patch("/atualizarpagamento/:id", (req, res) => {
    const id = req.params.id;
    const dados = req.body;

    res.send("Pagamento atualizado!");
});



app.get("/", (req, res) => {
  res.status(200).json({ msg: "Veiculos" });
});

app.get("/lerveiculos", (req, res) => {
  res.status(200).json(Veiculos);
});

app.get("/lerveiculos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const veiculo = Veiculos.find(v => v.id === id);

  if (!veiculo) {
    return res.status(404).json({ erro: "Veículo não encontrado" });
  }

  res.status(200).json(veiculo);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
