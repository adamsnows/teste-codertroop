# CoderTroop Task Manager

## Descrição
Este é um projeto de um gerenciador de tarefas construído com Next.js, Tailwind CSS e Firebase. O CoderTroop Task Manager permite que você crie, visualize e gerencie suas tarefas de forma eficiente.

## Pré-requisitos
Antes de executar o projeto, certifique-se de ter as seguintes ferramentas instaladas:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Firebase CLI](https://firebase.google.com/docs/cli)

## Instalação
Siga estas etapas para executar o projeto localmente:

1. Clone o repositório:
```git clone https://github.com/seu-usuario/codertroop-task-manager.git```

2. Navegue até o diretório do projeto:

```cd teste-codertroop```

3. Instale as dependências: ```npm install```

4. Execução
Após a configuração, você pode iniciar o projeto localmente com o seguinte comando:

npm run dev
O aplicativo estará disponível em http://localhost:3000.

## Estratégia de Desenvolvimento

Durante a criação deste projeto, adotei uma abordagem cuidadosa na escolha das tecnologias e implementações, visando oferecer uma experiência de usuário fluida e eficiente. Eis como o projeto foi desenvolvido:

### Escolha das Tecnologias

Inicialmente, optei por utilizar Tailwind CSS em conjunto com Styled Components para estilização. No entanto, encontrei alguns conflitos que resultaram em bugs, levando à decisão de continuar apenas com o Tailwind CSS. Essa escolha permitiu uma estilização consistente e eficaz em todo o projeto.

### Integração com Firebase Realtime Database

Para o gerenciamento dos dados do aplicativo, fiz uso do Firebase Realtime Database. Neste banco de dados, criei várias coleções para armazenar informações vitais do aplicativo, incluindo:

- **Movimento do Mouse**: Desenvolvi uma função que coleta em tempo real as coordenadas X e Y dos movimentos do mouse dos usuários, utilizando as capacidades de tempo real do Firebase. Em seguida, criei um componente que se move com base nas coordenadas X e Y de cada usuário, proporcionando uma experiência interativa única.

- **Usuários Online e Total de Usuários**: Registrei informações sobre os usuários online e o total de usuários ativos, fornecendo visibilidade em tempo real da presença e atividade dos usuários.

- **Tasks (Tarefas)**: As tarefas do aplicativo foram gerenciadas em uma coleção separada. Para garantir uma experiência colaborativa e eficiente, implementei as seguintes regras:

  - **Criador da Tarefa**: Os criadores das tarefas têm o poder de editar, apagar e marcar uma tarefa como concluída.

  - **Pessoa Atribuída a uma Tarefa por Outra Pessoa**: Quando uma tarefa é atribuída a um usuário por outra pessoa, esse usuário tem permissão para marcar a tarefa como concluída.

  - **Tarefas Concluídas**: Tarefas que já foram marcadas como concluídas não podem ser mais editadas ou re-marcadas como concluídas. A exclusão de tarefas concluídas só pode ser realizada pelo seu criador.

### Toast e Limite de Tempo de Inatividade

Implementei uma funcionalidade de toast para fornecer feedback aos usuários a cada ação realizada, mantendo-os informados sobre o estado das tarefas e das interações. Além disso, estabeleci um limite de tempo de 10 minutos para a inatividade. Caso um usuário fique inativo por mais de 10 minutos, o sistema o desconectará automaticamente, garantindo a segurança e eficiência do aplicativo.

### Filtro de Tarefas

O aplicativo também apresenta uma funcionalidade de filtro que permite aos usuários selecionar as tarefas de acordo com diferentes critérios, incluindo:

- Tarefas Atribuídas a Mim: Permite que os usuários vejam apenas as tarefas atribuídas a eles.
- Tarefas Concluídas: Oferece a capacidade de visualizar somente as tarefas que foram marcadas como concluídas.
- Todas as Tarefas: Apresenta uma lista completa de todas as tarefas disponíveis.

Esses recursos de filtragem proporcionam aos usuários a flexibilidade de visualizar e gerenciar tarefas de maneira eficaz, tornando a experiência de uso do aplicativo mais conveniente e personalizada.

Essa estratégia de implementação permitiu a criação de um gerenciador de tarefas dinâmico e interativo, oferecendo recursos essenciais para colaboração e rastreamento de tarefas, juntamente com um ambiente seguro e responsivo para os usuários.

BÔNUS:


- Bônus 1: [Site](https://codertroop-taskmanager.vercel.app/)
- Bônus 2: Não feito
- Bônus 3: Feito

__Adam Neves__
