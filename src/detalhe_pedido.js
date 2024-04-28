    

/*
  --------------------------------------------------------------------------------------
  Função para obter o total da lista carrinho do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/

const getTotal = async () => {

  var session = getSessao();
  //alert(session);

  if (session != null)
  {
    let url = 'http://127.0.0.1:5000/total_carrinho/' + session;
    fetch(url, {
      method: 'get',
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.total_itens != null)
      {
        var total = 0;
        document.getElementById("total_compra").innerHTML = data.total_itens;
      }
      else{
        alert('Não existem itens no carrinho');
      }
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para obter a argumentos do id_pedido
  --------------------------------------------------------------------------------------
*/
//https://www.sitepoint.com/get-url-parameters-with-javascript/
const getArgsPageLoad = () => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id_pedido = urlParams.get('id_pedido');
  document.getElementById('lbl_id_pedido').innerHTML = 'Pedido nº ' + id_pedido;
  return id_pedido;
}


/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/

const getDetalhePedido = async (id_pedido) => {

  var user_guid = getUserGuid();
  if (user_guid != null)
  {
    let url = 'http://127.0.0.1:5000/listar_detalhe_pedido?user_guid=' + user_guid + '&pedido_id=' + id_pedido;
    fetch(url, {
      method: 'get',
    })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("nome_cliente").value = data.nome_cliente;
      document.getElementById("cep").value = data.cep;
      document.getElementById("logradouro").value = data.logradouro;
      document.getElementById("complemento").value = data.complemento;
      document.getElementById("bairro").value = data.bairro;
      document.getElementById("estado").value = data.estado;
      document.getElementById("forma_pagamento").value = data.forma_pagamento;
      document.getElementById("data_insercao").value = data.data_insercao;

      if (data.itens.length > 0)
      {
        data.itens.forEach(item => insertListaConcluidos(item.codigo_produto, item.titulo, item.quantidade ,item.preco))
        var total = 0;
        data.itens.forEach(item => total += item.quantidade * item.preco)
        document.getElementById("total_compra").innerHTML = Math.round(total * 100)/100 ;
      }
      else{
        alert('Não existem itens no carrinho');
      }
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
  }
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
//Ajusta itens menus para situação login/logout        
menu_login_logout();

var id_pedido = getArgsPageLoad()


getDetalhePedido(id_pedido);


//Preenche o usuário logado
document.getElementById('username').value = getUserName()


/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertListaConcluidos = (codigo,descricao,quantidade,valor) => {  // date
  var item = [codigo,descricao,quantidade,valor]
  var table = document.getElementById('itens_concluido');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
    if (i > 1 )
    cel.className = 'col_direita';
  }
}