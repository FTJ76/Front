  const inserir_pedido_concluido = (token) => {

    var session = getSessao();
    var user_guid = getUserGuid();
    
    if (session != null)
    {
        var forma_pagamento_el = document.getElementById("select_forma_pagamento");
        var forma_pagamento = forma_pagamento_el.options[forma_pagamento_el.selectedIndex].text;      
        const formData = new FormData();
        formData.append('session_id', session);
        formData.append('username', document.getElementById('username').value);
        formData.append('user_guid', user_guid);
        formData.append('nome_cliente', document.getElementById('nome_cliente').value);
        formData.append('cep', document.getElementById('cep').value);
        formData.append('logradouro', document.getElementById('logradouro').value);
        formData.append('bairro', document.getElementById('bairro').value);
        formData.append('cidade', document.getElementById('cidade').value); 
        formData.append('complemento', document.getElementById('complemento').value);
        formData.append('uf', document.getElementById('uf').value );
        formData.append('forma_pagamento', forma_pagamento);
        formData.append('quantidade_itens', 0);
        formData.append('valor_total', 0);

        let url = 'http://127.0.0.1:5000/inserir_pedido';
        fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData
        })
        .then((response) => response.json())
        .then((data) => {
              window.location='pedido_concluido.html?id_pedido='+data.id_pedido;
            })
        .catch((error) => {
          alert('Erro: ', error);
        });
    }
  }

  const pagina_concluido = () => {
    const token = getToken();
    if (token == '' || token == null)
    {
      var box = document.getElementById('div_aviso');
      box.style.backgroundColor = 'red';
      box.style.color = 'yelllow';
      box.innerHTML='Usuário não autenticado'; 
      setTimeout(function() {box.innerHTML='';},4000);

    }
    else if (isTokenExpired(token))
    {
      var box = document.getElementById('div_aviso');
      box.style.backgroundColor = 'red';
      box.style.color = 'yelllow';
      box.innerHTML='Token expirado'; 
      setTimeout(function() {box.innerHTML='';},4000);
    }
    else{
      inserir_pedido_concluido(token);
    }
  }

/*
  --------------------------------------------------------------------------------------
  Função para obter o total da lista carrinho do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/

const getTotal = async () => {

  var session_id = getSessao();
  //alert(session);

  if (session_id != null)
  {
    let url = 'http://127.0.0.1:5000/total_carrinho/session_id=' + session_id;
    fetch(url, {
      method: 'get'
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
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/

const getListaCheckOut = async () => {

  var session_id = getSessao();
  //alert(session);

  if (session_id != null)
  {
    let url = 'http://127.0.0.1:5000/listar_itens_carrinho?session_id=' + session_id;
    fetch(url, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.itens.length > 0)
      {
        data.itens.forEach(item => insertListaCheckOut(item.codigo_produto, item.titulo, item.quantidade ,item.valor_total_item))//,formatDate(item.data_conclusao)))
        var total = 0;
        data.itens.forEach(item => total += item.valor_total_item)//,formatDate(item.data_conclusao)))
        //alert(total);
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

getListaCheckOut()

//Preenche o usuário logado
document.getElementById('username').value = getUserName()


/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertListaCheckOut = (codigo,descricao,quantidade,valor) => { 
  var item = [codigo,descricao,quantidade,valor]
  var table = document.getElementById('itens_checkout');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
    if (i > 1 )
    cel.className = 'col_direita';
  }
}