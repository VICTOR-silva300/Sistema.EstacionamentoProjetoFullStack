console.log("App.js funcionando"); 

const API = "http://localhost:3000/lerveiculos";
const APIPagamento = "http://localhost:3000/atualizarpagamento";
const APIDeletar = "http://localhost:3000/deletar";

async function carregar() {
    const res = await fetch(API);
    const dados = await res.json();

    const tabela = document.getElementById("tabela-veiculos"); 
    tabela.innerHTML = "";

    dados.forEach((carro) => {
        tabela.innerHTML += `
            <tr>
                <td>${carro.id}</td>
                <td>${carro.placa}</td>
                <td>${carro.modelo}</td>
                <td>${carro.pago ? "✅ Sim" : "❌ Não"}</td>
                <td>
                    <button onclick="pagar(${carro.id}, ${carro.pago})">
                        ${carro.pago ? "Cancelar" : "Pagar"}
                    </button>

                    <button onclick="Deletar(${carro.id})" style="color:red;">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

async function pagar(id, pagoAtual) {
    await fetch(`${APIPagamento}/${id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ pago: !pagoAtual })
    });

    carregar();
}

async function Deletar(id) {
    await fetch(`${APIDeletar}/${id}`, {
        method: "DELETE"
    });

    carregar();
}

carregar();
