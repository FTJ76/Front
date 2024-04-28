
  

/*
  --------------------------------------------------------------------------------------
  Função para obter a argumentos do id_pedido
  --------------------------------------------------------------------------------------
*/
//https://www.sitepoint.com/get-url-parameters-with-javascript/
const getArgsPageLoad = () => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('user_guid');
  
}

/*
  --------------------------------------------------------------------------------------
  Função para obter o total da lista carrinho do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/

const getTotal = async () => {

  var session = getSessao();

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
        document.getElementById("total_compra").innerHTML = data.total_itens;
        if (data.quantidade_itens != null)
        {
          if (data.quantidade_itens == "0")
          {
            document.getElementById('btn_fim_checkout').style.display = 'none';
            insertVazio();  
          }
        }
      }
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
  }
}
const getListaPedidos = async (token) => {

  var user_guid = getArgsPageLoad();
  //const apiKey = getToken();
  const apiUrl = 'http://127.0.0.1:5000/pedidos?user_guid=' + user_guid;
  //alert(apiKey);
  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  fetch(apiUrl, requestOptions)
    .then(response => {
      if (!response.ok) {
        if (response.status == '401')
        {
          alert('Usuário não autenticado');
        }
        else{
          alert('falha na resposta do servidor');
        }
      }
      return response.json();
    })
    .then(data => {
      alert
      if (data.pedidos != null)
      {
        data.pedidos.forEach(item => insertListaPedidos(item.id, item.data_insercao,item.valor_total));
      }
      else{
        alert('Não existem pedidos cadastrados');
      }
    })
    .catch(error => {
      alert('Erro: ' + error);
    });


}

const verifica_token = () => {
  const token = getToken();
  if (token == '' || token == null)
  {
    alert('Usuário não autenticado');
  }
  else if (isTokenExpired(token))
  {
    alert('Token expirado');
  }
  else{
    getListaPedidos(token);
  }
}

//Ajusta itens menus para situação login/logout        
menu_login_logout();

verifica_token();

//Preenche o usuário logado
document.getElementById('username').value = getUserName()

/*
  --------------------------------------------------------------------------------------
  Função para colocar um pedido na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postPedido = async (id,title,image,price ) => {
  const formData = new FormData();
  formData.append('codigo_produto', id);
  formData.append('descricao', title);
  formData.append('titulo', title);
  formData.append('url_imagem', image); //image
  formData.append('quantidade', '1');
  formData.append('preco', price);

  let url = 'http://127.0.0.1:5000/inserir_pedido';
  let body_json = JSON.stringify(Object.fromEntries(formData));
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },    
    body: body_json
  })
    .then((response) => {
      if(response.ok) {
        alert("Item adicionado!");

      }
      else{
        alert('Resposta:' + response.status);
      }

    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
// const insertButton = (parent) => {
//   let span = document.createElement("span");
//   let txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   parent.appendChild(span);
// }


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
// const removeElement = () => {
//   let close = document.getElementsByClassName("close");
//   let i;
//   var session = getSessao();
//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function () {
//       let div = this.parentElement.parentElement;
//       const codigo_item = div.getElementsByTagName('td')[0].innerHTML;
//       const nome_item = div.getElementsByTagName('td')[1].innerHTML;
//         if (session != null)
//         {
//             div.remove();
//             const formData = new FormData();
//             formData.append('codigo_produto', codigo_item);
//             formData.append('session_id', session);        
//             let url = 'http://127.0.0.1:5000/remover_item_carrinho';
//             let body_json = JSON.stringify(Object.fromEntries(formData));
//             fetch(url, {
//               method: 'DELETE',
//               headers: {
//                 'Content-type': 'application/json; charset=UTF-8'
//               },    
//               body: body_json
//             })
//             .then((response) => {
//               if(response.ok) {
//                 var box = document.getElementById('div_aviso');
//                 box.innerHTML='Item '+ nome_item +' removido com sucesso!'; 
//                 setTimeout(function() {box.innerHTML='';},4000);
//                 getTotal();
//               }
//               else{
//                 alert('Resposta:' + response.status);
//               }
        
//             })
//             .catch((error) => {
//               alert('Erro: Falha na remoção do item. Verifique.');
//               console.error('Error:', error);
//             });                
//       }
//       else{
//         getList();
//       }
//     }
//   }
// }


/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertListaPedidos = (id,data_compra,valor_total) => { 
  var pedido = [id,data_compra,valor_total]
  var table = document.getElementById('pedidos_conta');
  var row = table.insertRow();

  for (var i = 0; i < pedido.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = pedido[i];
    if (i > 1 )
    cel.className = 'col_direita';
  }
  cel_detalhe = row.insertCell();
  cel_detalhe.textContent = '⏩';
  cel_detalhe.className = 'text_center';
  cel_detalhe.onclick = function () { 
    window.location='detalhe_pedido.html?id_pedido='+pedido[0];
    //alert(pedido[0])
  };
}

const insertVazio = () => {  
  var table = document.getElementById('itens_carrinho');
  var row = table.insertRow();
  var cel = row.insertCell();
  cel.textContent = "Não existem pedidos nesta conta.";
  cel.colSpan = 5;
  cel.className = "text_center";
  document.getElementById(text).style.display = 'none';
  document.getElementById('btn_fim_checkout').style.display = 'none';  
}