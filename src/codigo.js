
function isTokenExpired(token) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
  }
const getUserName = () => {
// Get saved data from sessionStorage
let user_guid = sessionStorage.getItem("user_name_shopping");
return user_guid;
}

const getUserGuid = () => {
// Get saved data from sessionStorage
let user_guid = sessionStorage.getItem("user_guid_shopping");
return user_guid;
}
    
const getSessao = () => {
// Get saved data from sessionStorage
let sessao_atual = sessionStorage.getItem("sessao_shopping");
// Remove saved data from sessionStorage
//sessionStorage.removeItem("key");

// Remove all saved data from sessionStorage
//sessionStorage.clear();
return sessao_atual;
}


/*
  --------------------------------------------------------------------------------------
  Função para obter token da sessao ativa
  --------------------------------------------------------------------------------------
*/


const getToken = () => {
// Get saved data from sessionStorage
let sessao_atual = sessionStorage.getItem("sessao_token_shopping");
return sessao_atual;
}
  

const pagina_index = () => {
window.location="index.html";
}
const pagina_checkout = () => {
window.location="checkout.html";
}  
const pagina_carrinho = () => {
window.location="carrinho.html";
}
const pagina_pedidos = () => {
    const token = getToken();
    if (token == '' || token == null)
    {
    //alert('Usuário não autenticado');
    var box = document.getElementById('div_aviso');
    box.style.backgroundColor = 'red';
    box.style.color = 'yelllow';
    box.innerHTML='Usuário não autenticado'; 
    setTimeout(function() {box.innerHTML='';},4000);
    }
    else if (isTokenExpired(token))
    {
    //alert('Token expirado');
    var box = document.getElementById('div_aviso');
    box.style.backgroundColor = 'red';
    box.style.color = 'yelllow';
    box.innerHTML='Token expirado'; 
    setTimeout(function() {box.innerHTML='';},4000);
    }
    else{
    window.location='lista_pedidos.html?user_guid='+ getUserGuid();
    }

}

const menu_login_logout = () => {
    var sessao = getToken_sessao();
    if (sessao == '' || sessao == null)
    {
      document.getElementById('link_login').style.display = "block";
      document.getElementById('link_pedidos').style.display = "none";          
      document.getElementById('link_sair').style.display = "none";          
    }
    else
    {
      document.getElementById('link_login').style.display = "none";
      document.getElementById('link_pedidos').style.display = "block";          
      document.getElementById('link_sair').style.display = "block";          
    }
  }
  
  const guid_uuidv4 = () => {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }
  

  // Get the modal login
var modal_login = document.getElementById('modal_login');
var modal_registro = document.getElementById('modal_registro');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal_login) {
    modal_login.style.display = "none";
  }
  if (event.target == modal_registro) {
    modal_registro.style.display = "none";
  }
}

  