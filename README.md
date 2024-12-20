# Sensor Flow Front

Este é o front-end da aplicação **Sensor Flow**, projetado para visualizar os dados salvos pelos sensores. A aplicação é construída com Next.js e utiliza autenticação baseada em cookies HTTP-only para proteger as rotas do sistema.

## Funcionalidades

- **Login**: Autenticação via formulário com suporte a cookies HTTP-only.
- **Logout**: Encerramento da sessão do usuário.
- **Autenticação Automática**: Verificação do token de sessão para redirecionar o usuário ao dashboard ou à tela de login.
- **Dashboard**: Visualização interativa dos dados dos sensores com gráficos e filtros de intervalos de tempo.

### Descrição

- **`login/`**: Formulário e a lógica de autenticação.
- **`context/AuthContext.tsx`**: Gerencia o estado de autenticação.
- **`middleware.ts`**: Protege as rotas.
- **`components/Dashboard/`**: Componente separado para o dashboard, contendo a lógica e a interface de visualização dos dados dos sensores.

## Rotas da API

- **POST `/auth/login`**: Realiza o login e define um cookie HTTP-only.
- **GET `/auth/me`**: Verifica o estado de autenticação (retorna `200 OK` se o token for válido).
- **POST `/auth/logout`**: Realiza o logout removendo o cookie de autenticação.
- **GET `/sensor-data-aggregated`**: Recupera os dados agregados dos sensores com base no intervalo de tempo especificado.

## Como Funciona

1. **Login**
   - Usuário preenche o formulário na página de login.
   - Credenciais são enviadas para `/auth/login`.
   - Se bem-sucedido, o usuário é redirecionado ao dashboard.

2. **Verificação Automática**
   - Ao acessar a aplicação, o estado de autenticação é verificado via `/auth/me`.
   - Usuários autenticados são direcionados ao dashboard.
   - Usuários não autenticados são redirecionados à página de login.

3. **Logout**
   - O botão de logout chama `/auth/logout` para encerrar a sessão.
   - Usuário é redirecionado à página de login.

4. **Dashboard**
   - Após o login, o usuário acessa o dashboard onde pode visualizar gráficos interativos dos dados dos sensores.
   - É possível selecionar diferentes intervalos de tempo para filtrar os dados exibidos.
   - O dashboard exibe métricas como a média dos valores dos sensores e o total de amostras coletadas.

## Instalação

1. Clone o repositório:

   ```bash
   git clone <url-do-repositorio>
   cd sensor-flow-front
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env.local` e adicione:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```

4. Execute a aplicação:

   ```bash
   npm run dev
   ```

5. Acesse a aplicação em `http://localhost:3000`.

## Middleware

O middleware garante que:

- Apenas usuários autenticados podem acessar o dashboard.
- Usuários não autenticados são redirecionados para `/login`.

Configuração em `middleware.ts`.

## Componentes

- **`LoginForm`**: Componente para autenticação de usuários.
- **`LogoutButton`**: Botão que encerra a sessão do usuário.
- **`AuthContext`**: Contexto de autenticação que gerencia o estado do usuário e fornece funções de login/logout.
- **`Dashboard`**: Componente separado responsável por:
  - Buscar e gerenciar os dados agregados dos sensores.
  - Exibir gráficos interativos utilizando a biblioteca Recharts.
  - Permitir a seleção de diferentes intervalos de tempo para filtragem dos dados.
  - Mostrar métricas como a média dos valores dos sensores e o total de amostras.

### Estrutura do Componente Dashboard

- **`Dashboard.tsx`**: Contém a lógica de estado, chamadas à API e a interface do usuário para o dashboard.


## Executando a Aplicação

Após seguir os passos de instalação, execute a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

Acesse `http://localhost:3000` no seu navegador para utilizar a aplicação.