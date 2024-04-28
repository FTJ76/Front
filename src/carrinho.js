
/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton_Remove = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}
const insertButton_Add = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("➕");
  span.className = "addQuantity";
  span.appendChild(txt);
  parent.appendChild(span);
}
const insertButton_Subtract = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("➖");
  span.className = "subtractQuantity";
  span.appendChild(txt);
  parent.appendChild(span);
}


const insertVazio = () => {  
  var table = document.getElementById('itens_carrinho');
  var row = table.insertRow();
  var cel = row.insertCell();
  cel.textContent = "Carrinho Vazio";
  cel.colSpan = 7;
  cel.className = "text_center";
  document.getElementById('btn_fim_checkout').style.display = 'none';  
}  

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/

const getList = async () => {

  var session_id = getSessao();

  if (session_id != null)
  {
  
    let url = 'http://127.0.0.1:5000/listar_itens_carrinho?session_id=' + session_id;
    fetch(url, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.itens != null)
      {
        data.itens.forEach(item => insertListaCarrinho(item.codigo_produto, item.titulo, item.quantidade ,item.preco));
        var total = 0;
        data.itens.forEach(item => total += item.quantidade * item.preco);
        document.getElementById("total_compra").innerHTML = Math.round(total * 100)/100;
        document.getElementById('btn_fim_checkout').style.display = 'block';  

      }
      else{
        insertVazio();
      }
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  var session_id = getSessao();
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const codigo_item = div.getElementsByTagName('td')[0].innerHTML;
      const nome_item = div.getElementsByTagName('td')[1].innerHTML;
        if (session_id != null)
        {
            div.remove();
            const formData = new FormData();
            formData.append('codigo_produto', codigo_item);
            formData.append('session_id', session_id);        
            let url = 'http://127.0.0.1:5000/remover_item_carrinho';
            fetch(url, {
              method: 'DELETE',
              body:formData
            })
            .then((response) => {
              if(response.ok) {
                var box = document.getElementById('div_aviso');
                box.innerHTML='Item '+ nome_item +' removido com sucesso!'; 
                setTimeout(function() {box.innerHTML='';},4000);
                getTotal();
              }
              else{
                alert('Resposta:' + response.status);
              }
        
            })
            .catch((error) => {
              alert('Erro: Falha na remoção do item. Verifique.');
              console.error('Error:', error);
            });                
      }
      else{
        getList();
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar quantidade de um item da lista de acordo com o click no botão Add
  --------------------------------------------------------------------------------------
*/
const addQuantity = () => {
  let close = document.getElementsByClassName("addQuantity");
  let i;
  var session_id = getSessao();
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const codigo_item = div.getElementsByTagName('td')[0].innerHTML;
      const nome_item = div.getElementsByTagName('td')[1].innerHTML;
        if (session_id != null)
        {
            const formData = new FormData();
            formData.append('codigo_produto', codigo_item);
            formData.append('session_id', session_id);        
            let url = 'http://127.0.0.1:5000/add_quantidade_item_carrinho';
            fetch(url, {
              method: 'PUT',
              body:formData
            })
            .then(response => {
              if(response.ok) {
                var box = document.getElementById('div_aviso');
                box.innerHTML='Nova Quantidade do item '+ nome_item +' ajustada!'; 
                setTimeout(function() {box.innerHTML='';},4000);
                getTotal();
                return response.json();
              }
              else{
                alert('Resposta:' + response.status);
              }
            })
            .then(data => {
              div.getElementsByTagName('td')[2].innerHTML = data.nova_quantidade;
              div.getElementsByTagName('td')[4].innerHTML = data.novo_valor_total;
            })
            .catch((error) => {
              alert('Erro: Falha no ajuste da quantidade. Verifique. ' + error);
            });                
      }
      else{
        getList();
      }
    }
  }
}
/*
  --------------------------------------------------------------------------------------
  Função para diminuir a quantidade de um item da lista de acordo com o click no botão Minus
  --------------------------------------------------------------------------------------
*/
const subtractQuantity = () => {
  let close = document.getElementsByClassName("subtractQuantity");
  let i;
  var session_id = getSessao();
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const codigo_item = div.getElementsByTagName('td')[0].innerHTML;
      const nome_item = div.getElementsByTagName('td')[1].innerHTML;
        if (session_id != null)
        {
            const formData = new FormData();
            formData.append('codigo_produto', codigo_item);
            formData.append('session_id', session_id); 
            let url = 'http://127.0.0.1:5000/subtract_quantidade_item_carrinho';
            fetch(url, {
              method: 'PUT',
              body:formData
            })
            .then(response => {
              if(response.ok) {
                var box = document.getElementById('div_aviso');
                box.innerHTML='Nova Quantidade do item '+ nome_item +' ajustada!'; 
                setTimeout(function() {box.innerHTML='';},4000);
                getTotal();
                return response.json();
              }
              else{
                alert('Resposta:' + response.status);
              }
            })
            .then(data => {
              div.getElementsByTagName('td')[2].innerHTML = data.nova_quantidade;
              div.getElementsByTagName('td')[4].innerHTML = data.novo_valor_total;
            })
            .catch((error) => {
              alert('Erro: Falha no ajuste da quantidade. Verifique. ' + error);
            });                
      }
      else{
        getList();
      }
    }
  }
}
  
/*
  --------------------------------------------------------------------------------------
  Função para inserir items no carrinho
  --------------------------------------------------------------------------------------
*/
const insertListaCarrinho = (codigo,descricao,quantidade,valor_unitario) => {
  var item = [codigo,descricao,quantidade,valor_unitario];
  var table = document.getElementById('itens_carrinho');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
    if (i > 1 )
    cel.className = 'col_direita';
  }
  var cel_total = row.insertCell(-1);
  cel_total.textContent = quantidade * valor_unitario;
  cel_total.className = 'col_direita';

  insertButton_Subtract(row.insertCell(-1));
  insertButton_Add(row.insertCell(-1));
  insertButton_Remove(row.insertCell(-1));
  subtractQuantity();
  addQuantity();   
  removeElement();
}

/*
  --------------------------------------------------------------------------------------
  Função para obter o total da lista carrinho do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/

const getTotal = async () => {

  var session_id = getSessao();

  if (session_id != null)
  {
    let url = 'http://127.0.0.1:5000/total_carrinho?session_id=' + session_id;
    fetch(url, {
      method: 'get'
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


/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/

//Ajusta itens menus para situação login/logout        
menu_login_logout();

getList()

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
  formData.append('url_imagem', image); 
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
      console.error('Erro:', error);
    });
}


