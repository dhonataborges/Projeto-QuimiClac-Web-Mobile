```markdown
# 🧪 QuimiCalc

Sistema **web e mobile** para **cálculo de dosagem química**, com cadastro de produtos e cálculos em **mg/L** e **mL**, desenvolvido com arquitetura moderna **React Native + Node + PostgreSQL**.

---

# 🚀 Funcionalidades

* Cadastro de produtos químicos
* Edição e exclusão de produtos
* Listagem de produtos
* Cálculo de dosagem em mg/L
* Cálculo de dosagem em mL
* Validação de formulários
* Tratamento de erros da API
* Feedback com toast
* Modal de confirmação personalizado
* Suporte a densidade e concentração final
* Navegação entre telas (Stack Navigator)

---

# 🛠️ Tecnologias

## Mobile
* React Native
* TypeScript
* Expo
* React Navigation (Stack)
* @react-native-picker/picker
* react-native-toast-message
* react-native-safe-area-context
* Axios

## Backend
* Node.js
* Express
* TypeScript
* PostgreSQL
* Arquitetura em camadas
* CORS configurado para web e mobile

---

# 📁 Estrutura do Projeto

## Mobile
```
mobile/
 └── src/
      ├── components/
      ├── features/
      │   ├── home/
      │   │   └── screens/
      │   ├── produtos/
      │   │   ├── screens/
      │   │   ├── services/
      │   │   └── types/
      │   └── calculadora/
      │       ├── screens/
      │       ├── services/
      │       └── types/
      ├── navigation/
      ├── services/
      └── utils/
```

## Backend
```
backend-api/
 └── src/
      ├── config/
      ├── controllers/
      ├── services/
      ├── repository/
      ├── routes/
      ├── dto/
      ├── middlewares/
      └── server.ts
```

---

# ⚙️ Instalação

## Clonar repositório
```bash
git clone https://github.com/dhonataborges/Projeto-QuimiClac-Web-Mobile.git
```

---

# ▶️ Executar Backend

```bash
cd backend-api
npm install
npm run dev
```

Servidor:
```
http://localhost:3000
```

---

# ▶️ Executar Mobile

```bash
cd mobile
npm install
npx expo start --clear
```

Emulador web:
```
http://localhost:8081
```

---

# 🔌 Endpoints API

## Produtos

| Método | Rota              | Descrição         |
| ------ | ----------------- | ----------------- |
| GET    | /api/produtos     | Listar produtos   |
| GET    | /api/produtos/:id | Buscar por id     |
| POST   | /api/produtos     | Criar produto     |
| PUT    | /api/produtos/:id | Atualizar produto |
| DELETE | /api/produtos/:id | Remover produto   |

---

## Calculadora

| Método | Rota                               | Descrição             |
| ------ | ---------------------------------- | --------------------- |
| POST   | /api/calculadoras/produto-ml       | Calcular dosagem mL   |
| POST   | /api/calculadoras/produto-mg-litro | Calcular dosagem mg/L |

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
  "erro": "Produto não informado"
}
```

Mobile captura automaticamente:
```ts
Toast.show({ type: "error", text1: "Erro!", text2: error.message })
```

---

# 🧠 Arquitetura

## Mobile
```
Screens → Services → API (Axios)
```

## Backend
```
Routes → Controller → Service → Repository → Database
```

---

# 🔒 Validações

Frontend Mobile:
* Campos obrigatórios
* Validação manual por campo
* Toast feedback visual
* Modal de confirmação para exclusão

Backend:
* Validação DTO
* Tratamento de erros
* Status HTTP corretos

---

# 📱 Plataformas Suportadas

* Android (via Expo)
* iOS (via Expo)
* Web (via Expo Web / emulador browser)

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
```
