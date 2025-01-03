# API de Login com Fastify

Esta é uma API de autenticação criada utilizando [Fastify](https://www.fastify.io/). Ela oferece funcionalidades de registro, login e logout, além de verificar tokens para autenticação de usuários. O projeto utiliza Prisma para gerenciamento do banco de dados, bcrypt para hashing de senhas e JWT para geração e verificação de tokens de sessão.

---

## Tecnologias Utilizadas

- [Fastify](https://www.fastify.io/): Framework web rápido e eficiente.
- [Prisma](https://www.prisma.io/): ORM para banco de dados.
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js): Biblioteca para hashing de senhas.
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken): Geração e validação de JWT.
- [dotenv](https://github.com/motdotla/dotenv): Gerenciamento de variáveis de ambiente.

---

## Instalação e Execução

1. Clone este repositório:
   ```bash
   git clone https://github.com/coopas/auth-api.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   PORT=3000
   JWT_SECRET=sua_chave_secreta
   DATABASE_URL=seu_url_de_conexao_prisma
   ```

4. Execute as migrações do Prisma para configurar o banco de dados:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor:
   ```bash
   npm start
   ```

---

## Estrutura do Projeto

```
|-- src
|   |-- controllers
|   |   |-- auth
|   |       |-- Login.controller.ts
|   |       |-- Logout.controller.ts
|   |       |-- Register.controller.ts
|   |
|   |-- middleware
|   |   |-- auth.middleware.ts
|   |
|   |-- repositories
|   |   |-- token.repository.ts
|   |   |-- user.repository.ts
|   |
|   |-- routes
|   |   |-- auth.routes.ts
|   |
|   |-- services
|       |-- auth
|           |-- Login.service.ts
|           |-- Logout.service.ts
|           |-- Register.service.ts
|-- prisma
|   |-- schema.prisma
|-- .env
|-- package.json
|-- server.ts
```

---

## Endpoints Disponíveis

### 1. Registro de Usuário
**Rota:** `POST /api/auth/register`

**Body:**
```json
{
  "user": "username",
  "email": "user@example.com",
  "password": "senha123",
  "first_name": "Nome",
  "last_name": "Sobrenome"
}
```

**Resposta:**
```json
{
  "message": "Usuário cadastrado"
}
```

### 2. Login de Usuário
**Rota:** `POST /api/auth/login`

**Body:**
```json
{
  "login": "username ou email",
  "password": "senha123",
  "remember_me": true
}
```

**Resposta:**
```json
{
  "token": "token_jwt",
  "message": "Logado com sucesso!"
}
```

### 3. Logout de Usuário
**Rota:** `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer <token>
```

**Resposta:**
```json
{
  "message": "Usuário deslogado"
}
```

### 4. Teste de Autenticação
**Rota:** `GET /api/auth/test`

**Headers:**
```
Authorization: Bearer <token>
```

**Resposta:**
```json
{
  "message": "Olá, (ID do usuário)"
}
```

---

## Lógica da API

### Registro
- Verifica se todos os campos obrigatórios estão presentes.
- Verifica se o usuário está utilizando apenas caracteres permitidos.
- Valida o formato do email.
- Verifica o nível de segurança da senha.
- Verifica se o email ou nome de usuário já existe.
- Hasheia a senha com bcrypt e salva o usuário no banco de dados.

### Login
- Busca o usuário pelo email ou nome de usuário.
- Compara a senha fornecida com o hash armazenado.
- Verifica se o usuário deseja que a sessão seja ou não lembrada.
- Gera um token JWT com informações do usuário.

### Logout
- Verifica se o token existe no banco de dados.
- Armazena o token e sua data de validade para prevenção de reutilização.

### Middleware de Autenticação
- Decodifica o token JWT e anexa os dados do usuário na requisição.

---

## Configuração do Prisma
**Arquivo `schema.prisma`:**
```prisma
model User {
  id         Int      @id @default(autoincrement())
  user       String   @unique
  email      String   @unique
  password   String
  first_name String
  last_name  String
}

model Tokens {
  id         Int      @id @default(autoincrement())
  token      String   @unique
  valid_date DateTime
}
```

---

## Contribuições
Contribuições são bem-vindas! Abra um PR ou envie sugestões através de issues.

---

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

