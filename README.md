# Ap01 - Gerenciador de times
## Membros
  - André Vitor Kuduavski GRR20184595
  - Carlos Felipe Godinho Silva GRR20184630
  - Rafael Henrique Karam GRR20184601

# Instruções de uso

## Endpoints
  - Buscar por todos os times: GET em `http://localhost:12345/teams`.
  - Buscar por um time: GET em `http://localhost:12345/teams/#nome` onde #nome é o nome do time (podendo ser o nome completo ou apenas uma parte dele).
  - Cadastrar um time: POST em `http://localhost:12345/teams` enviando os dados do time por JSON no corpo da requisição.
  - Alterar um time: PUT em `http://localhost:12345/teams/#id` onde #id é o id do time, enviando os dados a alterar por JSON no corpo da requisição.
  - Remover um time: DELETE em `http://localhost:12345/teams/#id` onde #id é o id do time.