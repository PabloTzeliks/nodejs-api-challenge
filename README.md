# Node.js API Challenge 🚀

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/PabloTzeliks/nodejs-api-challenge)
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow.svg)](https://github.com/PabloTzeliks/nodejs-api-challenge)
[![Node.js](https://img.shields.io/badge/node.js-v22+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-ISC-lightgrey.svg)](https://opensource.org/licenses/ISC)

> 🌐 **[English Documentation](./README.en.md)**

## 📖 Descrição

Uma API REST desenvolvida em **Node.js v22+** para gerenciamento de cursos. Este projeto foi criado como parte de um desafio técnico, implementando as melhores práticas de desenvolvimento com TypeScript, validação de dados e arquitetura moderna.

**⚠️ Versão Inicial (v0.1.0)** - Este projeto está em evolução constante e novas funcionalidades serão adicionadas regularmente.

## 👨‍💻 Autor

**Pablo Tzeliks**

- GitHub: [@PabloTzeliks](https://github.com/PabloTzeliks)
- Repositório: [nodejs-api-challenge](https://github.com/PabloTzeliks/nodejs-api-challenge)

## 🛠️ Tech Stack

Este projeto utiliza as seguintes tecnologias:

- **[Node.js](https://nodejs.org/)** v22+ - Runtime JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** v5.9+ - Superset JavaScript com tipagem estática
- **[Fastify](https://fastify.dev/)** v5.6+ - Framework web de alta performance
- **[Drizzle ORM](https://orm.drizzle.team/)** v0.45+ - ORM TypeScript-first para SQL
- **[PostgreSQL](https://www.postgresql.org/)** 17 - Banco de dados relacional
- **[Docker](https://www.docker.com/)** - Containerização do banco de dados
- **[Pino](https://getpino.io/)** - Logger de alta performance

## 🚀 Como Rodar

### Pré-requisitos

- Node.js v22 ou superior
- Docker e Docker Compose
- npm (gerenciador de pacotes)

### Passo 1: Instalar Dependências

```bash
npm install
```

### Passo 2: Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/challenge_db"
```

**Variáveis disponíveis:**
- `DATABASE_URL`: String de conexão com o banco de dados PostgreSQL

### Passo 3: Subir o Banco de Dados com Docker

Execute o comando para iniciar o container PostgreSQL:

```bash
docker-compose up -d
```

Isso iniciará um container PostgreSQL na porta `5432` com as seguintes credenciais:
- **Usuário:** postgres
- **Senha:** postgres
- **Database:** challenge_db

### Passo 4: Executar as Migrações do Banco de Dados

Gere as migrações (se necessário):

```bash
npm run db:generate
```

Execute as migrações para criar as tabelas:

```bash
npm run db:migrate
```

### Passo 5: Iniciar o Servidor

Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor estará disponível em: **http://localhost:3333**

## 📚 Documentação da API

### Base URL

```
http://localhost:3333
```

### Endpoints Disponíveis

#### 1. Criar um Novo Curso

Cria um novo curso no sistema.

- **Método:** `POST`
- **URL:** `/courses`
- **Headers:**
  - `Content-Type: application/json`

**Body (JSON):**
```json
{
  "title": "Introdução ao TypeScript",
  "description": "Aprenda os fundamentos do TypeScript do zero"
}
```

**Resposta de Sucesso (201 Created):**
```json
{
  "courseId": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
}
```

**Resposta de Erro (400 Bad Request):**
```json
{
  "message": "Title is required"
}
```

**Observações:**
- O campo `title` é obrigatório
- O campo `description` é opcional
- O ID é gerado automaticamente usando UUID v4

---

#### 2. Listar Todos os Cursos

Retorna uma lista com todos os cursos cadastrados.

- **Método:** `GET`
- **URL:** `/courses`

**Resposta de Sucesso (200 OK):**
```json
{
  "courses": [
    {
      "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "title": "Introdução ao TypeScript"
    },
    {
      "id": "a1b2c3d4-e5f6-4789-0abc-def123456789",
      "title": "Node.js Avançado"
    }
  ]
}
```

**Observações:**
- Retorna apenas os campos `id` e `title` de cada curso
- Retorna um array vazio se não houver cursos cadastrados

---

#### 3. Buscar Curso por ID

Retorna os detalhes completos de um curso específico.

- **Método:** `GET`
- **URL:** `/courses/:id`
- **Parâmetros de URL:**
  - `id` (UUID) - ID do curso

**Exemplo de Requisição:**
```
GET /courses/f47ac10b-58cc-4372-a567-0e02b2c3d479
```

**Resposta de Sucesso (200 OK):**
```json
{
  "course": {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "title": "Introdução ao TypeScript",
    "description": "Aprenda os fundamentos do TypeScript do zero"
  }
}
```

**Resposta de Erro (404 Not Found):**
```json
{
  "message": "Course not found."
}
```

**Observações:**
- O ID deve ser um UUID válido
- Retorna todos os campos do curso (id, title, description)

---

## 🗄️ Banco de Dados

### Estrutura da Tabela `courses`

A tabela de cursos possui a seguinte estrutura:

| Campo         | Tipo      | Descrição                                    | Restrições          |
|---------------|-----------|----------------------------------------------|---------------------|
| `id`          | UUID      | Identificador único do curso                 | PRIMARY KEY, AUTO   |
| `title`       | TEXT      | Título do curso                              | NOT NULL, UNIQUE    |
| `description` | TEXT      | Descrição detalhada do curso                 | NULL                |

**Características:**
- IDs são gerados automaticamente usando UUID v4 (`.defaultRandom()`)
- O título é único no sistema (não é possível cadastrar dois cursos com o mesmo título)
- A descrição é opcional e pode ser nula

### Schema (Drizzle ORM)

```typescript
export const courses = pgTable('courses', {
    id: uuid().primaryKey().defaultRandom(),
    title: text().notNull().unique(),
    description: text(),
})
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor em modo watch com hot reload

# Banco de Dados
npm run db:generate  # Gera as migrações do banco de dados
npm run db:migrate   # Executa as migrações no banco de dados
npm run db:studio    # Abre o Drizzle Studio para visualizar o banco

# Testes
npm test            # Executar testes (ainda não implementado)
```

## 📝 Notas de Desenvolvimento

- O projeto utiliza o recurso `--experimental-strip-types` do Node.js v22+ para executar TypeScript nativamente
- O modo `--watch` permite hot reload automático durante o desenvolvimento
- O arquivo `.env` é carregado automaticamente usando `--env-file`
- Logs formatados com Pino Pretty para melhor legibilidade

## 🔐 Segurança

- Variáveis de ambiente para credenciais sensíveis
- Validação de entrada básica implementada
- PostgreSQL com autenticação via usuário e senha

## 🚧 Roadmap

- [ ] Implementar validação de dados com Zod
- [ ] Adicionar testes automatizados
- [ ] Implementar autenticação e autorização
- [ ] Adicionar paginação nos endpoints de listagem
- [ ] Implementar soft delete
- [ ] Adicionar documentação com Swagger/OpenAPI

## 📄 Licença

ISC

---

**Desenvolvido com ❤️ por Pablo Tzeliks**
