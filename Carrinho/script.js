// document.addEventListener("DOMContentLoaded", function () {
//   // Recupera o carrinho do localStorage
//   const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

//   // Elemento onde a lista será exibida
//   const listaElement = document.getElementById("lista");

//   // Elemento para exibir o total em preço
//   const totalElement = document.getElementById("total");

//   // Função para exibir o carrinho
//   function exibirCarrinho() {
//     // Limpa o conteúdo atual da lista
//     listaElement.innerHTML = "";

//     // Variável para calcular o total em preço
//     let totalPreco = 0;

//     // Itera sobre os itens do carrinho
//     carrinho.forEach((item, index) => {
//       // Cria um elemento de lista para cada item
//       const listItem = document.createElement("li");
//       listItem.textContent = `${item.descricao} - Preço: $${item.preco.toFixed(
//         2
//       )}`;

//       // Cria um botão de remoção
//       const removeButton = document.createElement("button");
//       removeButton.textContent = "❌";
//       removeButton.style.marginLeft = "10px";
//       removeButton.addEventListener("click", function () {
//         removerItemDoCarrinho(index);
//       });

//       // Adiciona o botão à lista
//       listItem.appendChild(removeButton);

//       // Adiciona o item à lista
//       listaElement.appendChild(listItem);

//       // Adiciona o preço do item ao total
//       totalPreco += item.preco;
//     });

//     // Exibe o total em preço no elemento totalElement
//     totalElement.textContent = `Total: $${totalPreco.toFixed(2)}`;
//   }

//   // Função para remover um item do carrinho
//   function removerItemDoCarrinho(index) {
//     carrinho.splice(index, 1);
//     localStorage.setItem("carrinho", JSON.stringify(carrinho));
//     exibirCarrinho();
//   }

//   // Chama a função para exibir o carrinho
//   exibirCarrinho();
// });

$(document).ready(function () {
  // Recupera o carrinho do localStorage
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Elemento onde a lista será exibida
  const listaElement = $("#lista");

  // Elemento para exibir o total em preço
  const totalElement = $("#total");

  // Função para exibir o carrinho
  function exibirCarrinho() {
    // Limpa o conteúdo atual da lista
    listaElement.empty();

    // Variável para calcular o total em preço
    let totalPreco = 0;

    // Objeto para contar itens repetidos
    const contadorItens = {};

    // Percorre o carrinho e contabiliza os itens repetidos
    carrinho.forEach((item) => {
      const chave = `${item.descricao}-${item.preco}-${item.imagem}`; // Identificador único incluindo imagem
      if (contadorItens[chave]) {
        contadorItens[chave].quantidade++;
      } else {
        contadorItens[chave] = { ...item, quantidade: 1 };
      }
    });

    // Itera sobre os itens agrupados e os exibe
    Object.values(contadorItens).forEach((item, index) => {
      // Criando o elemento da lista
      const listItem = $("<li>").css({
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
      });

      // Adicionando a imagem pequena
      const imagem = $("<img>")
        .attr("src", item.imagem)
        .attr("alt", item.descricao)
        .css({
          width: "40px",
          height: "40px",
          marginRight: "10px",
          borderRadius: "5px",
        });

      // Adicionando o texto com quantidade, descrição e preço
      const texto = $("<span>").text(
        `${item.quantidade}x - ${item.descricao} - $${item.preco.toFixed(2)}`
      );

      // Criando o botão de remoção
      const removeButton = $("<button>")
        .text("❌")
        .css({
          marginLeft: "10px",
          cursor: "pointer",
        })
        .click(function () {
          removerItemDoCarrinho(index);
        });

      // Montando a estrutura do item na lista
      listItem.append(imagem, texto, removeButton);

      // Adicionando o item na lista
      listaElement.append(listItem);

      // Adicionando o preço total do item ao valor final
      totalPreco += item.preco * item.quantidade;
    });

    // Exibe o total em preço no elemento totalElement
    totalElement.text(`Total: $${totalPreco.toFixed(2)}`);
  }

  // Função para remover um item do carrinho (remove um único item)
  function removerItemDoCarrinho(index) {
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    exibirCarrinho();
  }

  // Chama a função para exibir o carrinho
  exibirCarrinho();
});

function gerarDocumentoWord() {
  const listaElement = document.getElementById("lista");
  const totalElement = document.getElementById("total");

  // Clona a lista para evitar a modificação direta na lista original
  const listaClone = listaElement.cloneNode(true);

  // Remove os botões de remoção da lista clonada
  $(listaClone).find("button").remove();

  const listaHtml = listaClone.innerHTML;
  const totalHtml = totalElement.innerHTML;

  const conteudoHtml = `
    <html>
      <head>
        <meta charset="UTF-8" />
      </head>
      <body>
        <h1>Pedido confirmado</h1>
        <h3>Agradecemos sua preferencia</h3>
        ${listaHtml}
        <br>
        <br>
        ${totalHtml}
      </body>
    </html>
  `;

  const blob = new Blob([conteudoHtml], { type: "application/msword" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "carrinho.doc";
  link.click();
  document.getElementById("pedido").style.display = "block";
}

function successClose() {
  document.getElementById("pedido").style.display = "none";
}
