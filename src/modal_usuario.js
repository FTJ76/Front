const getToken_sessao = () => {
// Get saved data from sessionStorage
let sessao_atual = sessionStorage.getItem("sessao_token_shopping");
return sessao_atual;
}
const clearToken_sessao = () => {
  // Get saved data from sessionStorage
  sessionStorage.setItem("sessao_token_shopping", '');
  sessionStorage.setItem("user_guid_shopping", '');
  sessionStorage.setItem("user_name_shopping", '');
}
  


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const logout = () => {

  let url = 'http://127.0.0.1:5000/logout';
  let token_sessao = getToken_sessao();
  fetch(url, {
    method: 'DELETE',
    headers: {
    'Authorization': 'Bearer ' + token_sessao
    },    

  })
  .then((response) => {
    if(!response.ok) {
      alert('Erro: ' + response.status);
    }
    else
    {
      var box = document.getElementById('div_aviso');
      box.style.backgroundColor = 'green';
      box.style.color = 'yelllow';
      box.innerHTML="Logout efetuado com sucesso."; 
      setTimeout(function() {box.innerHTML='';},3000);
      document.getElementById('username').value = '';
      clearToken_sessao();
      document.getElementById('link_login').style.display = "block";
      document.getElementById('link_pedidos').style.display = "none";          
      document.getElementById('link_sair').style.display = "none";          
    }})
  .catch((error) => {
    alert ('Falha no logout. Verifique. Erro:' + error );
  });

}

const login_usuario = () => {
  
    var login = document.getElementById('login_acesso').value;
    var senha = document.getElementById('senha_acesso').value;
  
    const formData = new FormData();
    formData.append('login', login);
    formData.append('senha', senha);
    
    let url = 'http://127.0.0.1:5000/login';
    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.token_acesso != null)
      {
        if (data.token_acesso != '')
        {
          sessionStorage.setItem("sessao_token_shopping", data.token_acesso);
          sessionStorage.setItem("user_guid_shopping", data.user_guid);
          sessionStorage.setItem("user_name_shopping", data.usuario_logado);
          document.getElementById('link_login').style.display = "none";
          document.getElementById('link_pedidos').style.display = "block";          
          document.getElementById('link_sair').style.display = "block";          
          //carrega usuario logado  no input
          document.getElementById('username').value = data.usuario_logado;
          //Fecha o modal
          document.getElementById('modal_login').style.display = "none";
          //Avisa na tela usuario logado
          var box = document.getElementById('div_aviso');
          box.style.backgroundColor = 'green';
          box.style.color = 'yelllow';    
          box.innerHTML="Login de '"+ data.usuario_logado +"' realizado com sucesso!"; 
          setTimeout(function() {box.innerHTML='';},3000);  
        }
        else
        {
          var box = document.getElementById('div_aviso');
          box.style.backgroundColor = 'red';
          box.style.color = 'yelllow';
    
          if (data.message != null)
          {
            box.innerHTML="Não foi possível autenticar o usuário! Erro: " + data.message; 
          }
          else
          {
            box.innerHTML="Não foi possível autenticar o usuário! Erro Desconhecido."; 
          }
          setTimeout(function() {box.innerHTML='';},3000);  
        }
      }
      else{
        document.getElementById('username').value = '';
        var box = document.getElementById('div_aviso');
        box.style.backgroundColor = 'red';
        box.style.color = 'yelllow';  
        if (data.message != null)
        {
          box.innerHTML="Não foi possível autenticar o usuário! Erro: " + data.message; 
        }
        else
        {
          box.innerHTML="Não foi possível autenticar o usuário! Erro Desconhecido."; 
        }
        setTimeout(function() {box.innerHTML='';},3000);  
      }
    })
    .catch((error) => {
      alert ('Falha no login. Verifique. Erro:' + error );
    });                
  
  }
  
  const registro_usuario = () => {
    var login = document.getElementById('login_registro').value;
    var senha = document.getElementById('senha_registro').value;
    var nome = document.getElementById('nome_registro').value;

    const formData = new FormData();
    formData.append('login', login);
    formData.append('senha', senha);
    formData.append('nome', nome);
    
    let url = 'http://127.0.0.1:5000/cadastro';
    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.status != null)
      {
        if (data.status != '')
        {
            var box = document.getElementById('div_aviso');
            box.style.backgroundColor = 'green';
            box.style.color = 'yelllow';
            if (data.message != null)
            {
              document.getElementById('modal_registro').style.display = "none";
              box.innerHTML="Mensagem:  " + data.message; 
              setTimeout(function() {box.innerHTML='';},3000);  
            } 
        }
        else
        {
          var box = document.getElementById('div_aviso');
          if (data.message != null)
          {
            box.innerHTML="Mensagem:  " + data.message; 
          }
          else
          {
            box.innerHTML="Não foi possível autenticar o usuário! Erro Desconhecido."; 
          }
          setTimeout(function() {box.innerHTML='';},3000);  
        }
      }
      else{
        document.getElementById('username').value = '';
        var box = document.getElementById('div_aviso');
        box.style.backgroundColor = 'red';
        box.style.color = 'yelllow';
        if (data.message != null)
        {
          box.innerHTML="Não foi possível cadastrar o usuário! Erro: " + data.message; 
        }
        else
        {
          box.innerHTML="Não foi possível cadastrar o usuário! Erro Desconhecido."; 
        }
        setTimeout(function() {box.innerHTML='';},3000);  
      }
    })
    .catch((error) => {
      alert ('Falha no cadastro. Verifique. Erro:' + error );
    });                
  }
  