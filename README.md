# EndDo

Bem-vindo ao **EndDo**! Este é um aplicativo de lista de tarefas desenvolvido para ajudá-lo a organizar e concluir suas atividades de forma eficiente. O nome "EndDo" é uma combinação de "end" (fim) e "do" (fazer), refletindo o objetivo de ajudá-lo a finalizar suas tarefas. Além disso, é uma homenagem ao apelido "Endo", dado por minha avó, inspirado no meu nome, Wendel.

## Índice

- [Recursos](#recursos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Uso](#uso)
- [Licença](#licença)
- [Contato](#contato)

## Recursos

- Barra lateral responsiva que pode ser ocultada.
- Organização de conteúdo de forma intuitiva.
- Criação, edição, exclusão e listagem de listas com:
  - Categorias
  - Prioridades
  - Status
  - Quantidade de itens
- Busca de listas e itens por meio de barra de pesquisa.
- Aplicação de filtros para classificação por:
  - Todos
  - Categoria
  - Status
  - Prioridade
- Ordenação por:
  - Data de criação
  - Prioridade
  - Título (ordem alfabética)
  - Data de término
- Conclusão automática de listas quando todos os itens são concluídos.
- Gerenciamento de itens com:
  - Título
  - Data de término
  - Status de conclusão
- Interação direta com itens para marcar como concluídos.
- Filtragem e busca de itens individualmente.

## Tecnologias Utilizadas

- **Frontend:**
  - React
  - TypeScript
  - SCSS

- **Backend:**
  - Ruby on Rails
  - PostgreSQL

- **Outras Ferramentas:**
  - Docker
  - Git

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/WendelRodriguesz/EndDo_Lists.git
   cd EndDo_Lists
   ```

2. **Configure o Backend:**

   - Instale as dependências:

     ```bash
     cd backend
     bundle install
     ```

   - Configure o banco de dados:

     ```bash
     rails db:create db:migrate
     ```

   - Inicie o servidor:

     ```bash
     rails server
     ```

3. **Configure o Frontend:**

   - Instale as dependências:

     ```bash
     cd ../frontend
     npm install
     ```

   - Inicie o aplicativo:

     ```bash
     npm run dev
     ```

## Uso

1. Acesse o aplicativo no seu navegador em `http://localhost:3000`.
2. Adicione novas listas com prioridades e categorias personalizadas.
3. Adicione itens às listas, definindo título, data de término e status.
4. Utilize a barra de pesquisa para encontrar listas e itens.
5. Aplique filtros para organizar suas tarefas conforme necessário.
6. Marque itens como concluídos diretamente na página da lista.
7. Observe que listas são marcadas como concluídas automaticamente quando todos os itens são finalizados.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

## Contato

Para mais informações ou suporte, entre em contato:

- **Nome:** Wendel Rodrigues
- **Email:** wendeldev2010@gmail.com
- **LinkedIn:** [linkedin.com/in/-endel](https://www.linkedin.com/in/-endel)
