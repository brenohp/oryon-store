# Guia de Integração Front-End ↔ Back-End (Oryøn Collective)

Este documento mapeia a arquitetura do front-end (React + Tailwind + Vite) e orienta a substituição dos dados estáticos (Mocks) pelas APIs reais geridas pelo painel administrativo da Oryøn.

Em todos os arquivos principais, você encontrará marcações `// TODO: [BACKEND]` indicando o ponto exato de injeção das lógicas.

---

## 1. Autenticação e Sessão de Usuário
O front-end já possui as telas de Login e Cadastro com validações visuais e máscaras (CPF/CEP) funcionando.

*   **`src/pages/Login.tsx`**:
    *   **Ação:** O formulário dispara a função `handleLogin` no `onSubmit`.
    *   **Integração:** Substituir o `e.preventDefault()` por uma chamada `POST /api/auth/login` (capturando E-mail e Senha). Armazenar o JWT (via Cookie ou LocalStorage).
*   **`src/pages/Cadastro.tsx`**:
    *   **Ação:** O formulário dispara a função `handleCadastro` no `onSubmit`.
    *   **Integração:** Realizar a chamada `POST /api/auth/register` com os dados completos (Nome, CPF, CEP, E-mail, Senha).
*   **`src/components/Navbar.tsx`**:
    *   **Ação:** A variável estática `mockUserLogado` controla a renderização do menu do usuário (Minha Conta / Meus Pedidos vs. Fazer Login).
    *   **Integração:** Promover essa variável para ler o estado global de autenticação (verificar se o token JWT é válido).

## 2. Catálogo e Produtos (Loja)
As páginas de listagem e detalhes do produto já estão componentizadas.

*   **`src/pages/Loja.tsx` (Vitrine):**
    *   **Ação:** Atualmente filtra o `mockProdutosLoja` localmente usando o estado `categoriaAtiva`.
    *   **Integração:** Substituir o array local por uma requisição `GET /api/produtos`.
    *   **Recomendação de SEO:** Em vez de usar estado local para a categoria, mapeie os botões de filtro para atualizar a URL via *Query Parameters* (ex: `/loja?categoria=camisetas&cor=preto`). O `useEffect` deve escutar a URL e refazer o `GET` passando esses parâmetros.
*   **`src/pages/Produto.tsx` (PDP - Product Detail Page):**
    *   **Ação:** A página já lê o ID da URL via `useParams()`.
    *   **Integração:** Utilizar esse `id` para disparar um `GET /api/produtos/:id` no mount do componente (`useEffect`) e substituir o objeto `mockProduto` pelos dados do banco (fotos, descrição, tabela de medidas e grade de estoque).

## 3. Gestão da Home Page via Painel Administrativo
O cliente precisa ter autonomia para alterar o que aparece na capa do site.

*   **`src/pages/Home.tsx`**:
    *   **Seção de Lançamentos (Carrossel):** Consumir um endpoint de destaques (ex: `GET /api/home/destaques`). *Nota de UI:* O código atual multiplica o array (`produtosRotativos`) para garantir o efeito infinito. Se a loja tiver poucos produtos iniciais, mantenha uma lógica de repetição na interface.
    *   **Seção de Qualidade Técnica:** Centralizada no objeto `mockQualidadeDestaque`. Criar um endpoint que permita ao admin alterar a foto principal, a frase de impacto e as 6 especificações técnicas ("Tecido", "Gramatura", etc) diretamente pelo painel.

## 4. Carrinho de Compras e Checkout
O carrinho foi construído com estado local para fins de design, mas precisa ser global.

*   **Elevação de Estado (Crucial):**
    *   Atualmente, `Navbar.tsx` e `Carrinho.tsx` possuem seus próprios estados isolados `cartItems`. 
    *   **Integração:** Criar um gerenciador de estado global (Zustand, Redux ou Context API). O botão "Adicionar à Sacola" em `Produto.tsx` e `Loja.tsx` deve disparar uma Action para esse estado global.
*   **`src/pages/Carrinho.tsx`**:
    *   As funções mutadoras (`aumentarQuantidade`, `diminuirQuantidade`, `removerItem`) já possuem a matemática pronta, basta refatorá-las para disparar as actions do estado global.
    *   **Finalizar Pedido:** A função `handleCheckout` está mapeada. Ela deve enviar o payload do carrinho para a API (ex: `POST /api/checkout`) e redirecionar o usuário para o gateway de pagamento ou tela de confirmação de pedido.