
/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/

const getList = async () => {
  let url = 'https://fakestoreapi.com/products';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach(item => insertCard(item))
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para inserir um item no carrinho via POST
  --------------------------------------------------------------------------------------
*/

const newItem = (id,title,image,price,session) => {

  var session = getSessao();
  postItem(id,title,image,price,session);
  }

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (id,title,image,price,session ) => {
  const formData = new FormData();
  formData.append('session_id', session);
  formData.append('codigo_produto', id);
  formData.append('descricao', title);
  formData.append('titulo', title);
  formData.append('url_imagem', image );
  formData.append('quantidade', '1');
  formData.append('preco', price);

  let url = 'http://127.0.0.1:5000/adicionar_item_carrinho';
  fetch(url, {
    method: 'POST',
    body: formData
  })
    .then((response) => {
      if(response.ok) {
        var box = document.getElementById('div_aviso');
        box.innerHTML='Item '+ title +' adicionado com sucesso!'; 
        setTimeout(function() {box.innerHTML='';},4000);
      }
      else{
        alert('Resposta:' + response.status);
      }

    })
    .catch((error) => {
      alert('Erro: Falha na inserção. Verifique.');
      console.error('Error:', error);
    });
}

document.addEventListener("DOMContentLoaded", () => {

    // Grava sessao do usuario no sessionStorage
    if (sessionStorage.getItem("sessao_shopping") == null)
    {
      var sessao = guid_uuidv4();
      sessionStorage.setItem("sessao_shopping", sessao);  
    }
  
});


//Ajusta itens menus para situação login/logout        
menu_login_logout();

getList()

//Preenche o usuário logado
document.getElementById('username').value = getUserName()



/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertCard = (product) => {
  var section = document.getElementById('products-list');
  let article = document.createElement('article');
  article.setAttribute('class','product');
  article.setAttribute('id', product.id);

  let img = document.createElement('img');
  img.setAttribute('src', product.image);
  img.setAttribute('alt', 'Não foi possível carregar a imagem do produto');
  
  let h3 = document.createElement('h3');
  h3.setAttribute('class', 'price-product');
  let span = document.createElement('span');
  span.innerHTML = 'R$ ' + product.price;
  h3.appendChild(span);

  let p = document.createElement('p');
  p.setAttribute('class', 'name-product');
  p.innerHTML = product.title;

  let button = document.createElement('button');
  button.setAttribute('class', 'buy-product');
  button.setAttribute('type', 'button');
  button.setAttribute('id', product.id);
  button.setAttribute('style', 'cursor: pointer');
  button.onclick= function() {newItem(product.id,product.title,product.image,product.price)};
  button.innerHTML = 'Comprar';

  article.appendChild(img);
  article.appendChild(h3);
  article.appendChild(p);
  article.appendChild(button);
  section.appendChild(article);
}

