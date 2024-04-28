# Meu Front (Explicação de conteúdo e instalação):

Este pequeno projeto faz parte do material extra da Disciplina **Desenvolvimento Back End Avançado** 

# CONCEITO DA APLICAÇÃO

# Descrição:

Pequena página de comércio eletrônico que permite inserir, ajustar quantidades, remover itens no carrinho de compras. Além disso é possível concluir o pedido com registro/login do usuário. Todos os pedidos ficam registrados o podem ser consultados no detalhe na aba do menu pedidos.

# Nota: 
-Essa aplicação consome uma API externa de produtos. Caso se pretendesse colocar em produção seria necessário desenvolver uma api para fazer a gestão desses produtos.
-Essa aplicação não possuí gateway de pagamentos. Para fins comerciais seria necessário integrar meios de pagamentos tais como cartão de crédito e pix.
-Não foi implementado a confirmação de conta de email do usuário cadastrado.

-Caso fossem implementados os itens acima a aplicação estaria pronta para uso e produção. A ser desenvolvido posteriormente.

Consulte o swagger após instalação do backend em: http://localhost:5000/openapi/swagger# para verificar os métodos disponíveis implementados.

# Telas de frontend criadas:

1) Index.html (Inserção de itens a comprar)
    a) Utiliza API Externa (https://fakestoreapi.com) para listar produtos existentes

2) Carrinho.html (Visualiza itens no carrinho e permite ajuste de quantidades)

3) Checkout.html (Preparação pedido de compra)
    a) Precisa de autenticação de finalizar compra
    b) Utiliza API Externa (https://viacep.com.br) para consulta de endereços

4) pedido_concluido.html


5) lista_pedidos.html
    a) Precisa autenticação para visualizar histórico de pedidos

6) detalhe_pedido.html
    Permite ver o detalhe do pedido na lista de pedidos

IMPORTANTE: O registro e consultas utilizam GUID para segurança dos dados. Id numérico sequencial não é seguro.

---

# ------------------EXECUÇÃO DO CÓGIGO -----------------------
## COMO EXECUTAR EM MODO DE DESENVOLVIMENTO:

Basta fazer o download do projeto e abrir o arquivo index.html no seu browser.

## COMO EXECUTAR PELA OPÇÃO DOCKER:

# 1) Instale o docker:

Certifique-se de ter o [Docker](https://docs.docker.com/engine/install/) instalado e em execução em sua máquina.

# 2) Acessar pasta:

Navegue até o diretório que contém o Dockerfile no terminal e seus arquivos de aplicação e
Execute **como administrador** o seguinte comando para construir a imagem Docker:

Exemplo: cd C:\Users\felis\Documents\PUC\MVP_2_Final\Front (Minha máquina)

# 3) Criar a imagem:

```
$ docker build -t nome_da_sua_imagem .
```
Exemplo: docker build -t front .

# 4) Executar o container:

Uma vez criada a imagem, para executar o container basta executar, **como administrador**, seguinte o comando:

```
$ docker run -d -p 8080:80 nome_da_sua_imagem
```
Exemplo: docker run --name projeto_front -d -p 80:80 front

# 5) Executar o código:

Se já tiver instalado o container do back é só digitar no seu browser: localhost e a aplicação está pronta para uso

