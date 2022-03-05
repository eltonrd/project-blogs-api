# Boas vindas ao repositório do projeto API de Blogs!


Esse projeto foi desenvolvido durante o módulo de _BackEnd_ na Trybe! #vqv 🚀

Aqui você vai encontrar os detalhes de como foi o desenvolvimento do projeto e quais foram os requisitos obrigatórios e opcionais para o desenvolvimento.

---
# Habilidades desenvolvidas
 - Criar e associar tabelas usando `models` do `sequelize`.
 - Construir endpoints para consumir os models que criar. 
 - Fazer um `CRUD` com o `ORM`.
 - Utilizar o pacote `sequelize` do `npm`.

---

## O que foi desenvolvido

Foi arquitetado e desenvolvido uma API de um CRUD posts de blog (com o Sequelize). Começando pela API, foi desenvolvido alguns endpoints (seguindo os princípios do REST) que estão conectados ao banco de dados.

---

## Desenvolvimento

Você deve desenvolver uma aplicação em `Node.js` usando o pacote `sequelize` para fazer um `CRUD` de posts.

Para fazer um post é necessário usuário e login, portanto será trabalhada a **relação entre** `user` e `post`. Também será necessário a utilização de categorias para seus posts, assim trabalhando a relação de `posts` para `categorias` e de `categorias` para `posts`.
 
### Execução de testes unitários

Vamos usar o Jest para executar os testes, use o comando a seguir para executar todos os testes: 

```sh
npm test
```

Caso queira executar só um arquivo de test use o seguinte comando, considerado que quer testar o arquivo `tests/req07-createPost.test.js`:

```sh
npm test tests/req07-createPost.test.js
```
ou
```
npm test req07
```

⚠ **Atenção:** ⚠
É necessário ter o `MYSQL` instalado e rodando na sua máquina para a execução da aplicação e dos testes corretamente.
Todos os dados de conexão com o banco de dados `MYSQL` devem ser feitos em um arquivo `.env` criado na raiz no projeto.

---
# Requisitos desenvolvidos no projeto:
### Requisitos Obrigatórios:

- ✅ 1. Crie um endpoint POST `/user`: O endpoint deve ser capaz de adicionar um novo user a sua tabela no banco de dados.
- ✅ 2. Crie um endpoint POST `/login`: O endpoint deve ser capaz de cadastrar um novo usuário com sucesso.
- ✅ 3. Crie um endpoint GET `/user`: O endpoint deve ser capaz de listar todos os `USERS` cadastrados.
- ✅ 4. Crie um endpoint GET `/user/:id`: O endpoint deve ser capaz de listar um `USER` específico com sucesso.
- ✅ 5. Crie um endpoint POST `/categories`: O endpoint deve ser capaz de cadastrar uma categoria com sucesso.
- ✅ 6. Crie um endpoint GET `/categories`: O endpoint deve ser capaz de listar todas as categorias cadastradas.
- ✅ 7. Crie um endpoint POST `/post`: O endpoint deve ser capaz de cadastrar um `BLOGPOST` com sucesso.
- ✅ 8. Crie um endpoint GET `/post`: O endpoint deve ser capaz de listar todos os `BLOGPOSTS` cadastrados.
- ✅ 9. Crie um endpoint GET `/post/:id`: O endpoint deve ser capaz de listar um `BLOGPOST` específico com sucesso.
- ✅ 10. Crie um endoint PUT `/post/:id`: O endpoint deve ser capaz de editar e atualizar `BLOGPOST` específico com sucesso.
### Requisitos Opcionais:

- ✅ 11. Crie um endpoint DELETE `/post/:id`: O endpoint deve ser capaz de deletar um `BLOGPOST` específico com sucesso.
- ✅ 12. Crie um endpoint DELETE `/user/me`: O endpoint deve ser capaz de deletar o usuário atual com sucesso.
- ✅ 13. Crie um endpoint GET `/post/search?q=:searchTerm`: O endpoint deve ser capaz de listar um `BLOGPOST` que contenham em seu título ou conteúdo, o termo pesquisado no `queryParam` da URL.
