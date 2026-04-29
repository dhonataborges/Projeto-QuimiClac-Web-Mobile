# 🧪 QuimiCalc

Sistema web para **cálculo de dosagem química**, com cadastro de produtos e cálculos em **mg/L** e **mL**, desenvolvido com arquitetura moderna **React + Node + PostgreSQL**.
---
# 🚀 Funcionalidades
* Cadastro de produtos químicos
* Edição e exclusão de produtos
* Listagem com paginação
* Cálculo de dosagem em mg/L
* Cálculo de dosagem em mL
* Validação de formulários
* Tratamento de erros da API
* Layout responsivo (mobile e desktop)
* Feedback com toast
* Modal de confirmação
---
# 🛠️ Tecnologias

## Frontend
* React
* TypeScript
* React Router DOM
* Tailwind CSS
* React Hot Toast
* Heroicons

### 📱 Mobile
* React Native
* Expo
* TypeScript
* React Navigation
* Toast Message

## Backend
* Node.js
* Express
* TypeScript
* PostgreSQL
* Arquitetura em camadas
---

# 📁 Estrutura do Projeto
## Mobile
```
mobile/
 └── src/
      ├── components/
      ├── navigation/
      ├── services/
      ├── utils/
      └── features/
           ├── home/
           │    └── screens/
           ├── produtos/
           │    ├── screens/
           │    ├── services/
           │    └── types/
           └── calculadora/
                ├── screens/
                ├── services/
                └── types/
```
## Frontend
```
src/
 ├── api
 ├── components
 │   ├── layout
 │   └── ui
 ├── pages
 │   ├── home
 │   ├── produtos
 │   └── calculadora
 ├── services
 ├── types
 ├── routes
 └── App.tsx
```
## Backend
```
src/
 ├── config
 ├── controllers
 ├── services
 ├── repository
 ├── routes
 ├── dto
 └── server.ts
```
---
# ⚙️ Instalação
## Clonar repositório

```bash
git clone https://github.com/seu-usuario/quimicalc.git
```
---
# ▶️ Executar Backend
```bash
cd backend
npm install
npm run dev
```
Servidor:
```
http://localhost:3000
```
---
# ▶️ Executar Frontend
```bash
cd frontend
npm install
npm run dev
```
Aplicação:
```
http://localhost:5173
```
---
# ▶️ Executar Mobile
```bash
cd mobile
npm install
npx expo start --clear
```
Expo Web:
```
http://localhost:8081
```
# 🔌 Endpoints API

## Produtos

| Método | Rota          | Descrição         |
| ------ | ------------- | ----------------- |
| GET    | /produtos     | Listar produtos   |
| GET    | /produtos/:id | Buscar por id     |
| POST   | /produtos     | Criar produto     |
| PUT    | /produtos/:id | Atualizar produto |
| DELETE | /produtos/:id | Remover produto   |
---
## Calculadora
| Método | Rota                           | Descrição             |
| ------ | ------------------------------ | --------------------- |
| POST   | /calculadoras/produto-ml       | Calcular dosagem mL   |
| POST   | /calculadoras/produto-mg-litro | Calcular dosagem mg/L |

---
# 📦 Exemplo Request

```json
{
  "produto": {
    "idProduto": 1
  },
  "vazao": 100,
  "dosagem": 5,
  "resultado": 0
}
```
---

# 📦 Exemplo Response

```json
{
  "resultado": 12.35
}
```

---

# ❌ Exemplo Erro API

```json
{
  "mensagem": "Produto não informado"
}
```

Frontend captura automaticamente:

```ts
toast.error(error.message)
```

---

# 🧠 Arquitetura

## Frontend

```
Pages → Services → API
```

## Backend

```
Routes → Controller → Service → Repository → Database
```

---

# 📱 Responsividade

* Mobile
* Tablet
* Desktop
* Menu mobile
* Tabela com scroll horizontal

---

# 🔒 Validações

Frontend:

* required
* validação manual
* toast feedback

Backend:

* validação DTO
* tratamento de erros
* status HTTP corretos

---

# 👨‍💻 Autor

Dhonata Borges

---

# 📄 Licença

MIT

---

# 🚀 Melhorias Futuras

* Autenticação
* Histórico de cálculos
* Exportar PDF
* Dashboard
* Tema dark
* PWA
* Gráficos
* Favoritos
* Logs de cálculo
