# Plataforma FutFem

A **Plataforma FutFem** é uma aplicação web interativa e inclusiva, focada em meninas e mulheres de todas as regiões do Brasil, que integra um mapa geolocalizado de oportunidades de prática de futebol feminino. O objetivo é reduzir barreiras geográficas e sociais, aumentando a visibilidade e o acesso a treinamentos, eventos e clubes, além de criar uma base de dados estratégica para descoberta e desenvolvimento de talentos.

O diferencial da plataforma está na **centralização, democratização e transparência das informações**, incentivando o protagonismo local e promovendo a diversidade no esporte.

Além disso, a solução busca automatizar os Encontros PassaBola, centralizando a gestão de inscrições, vagas e documentos, e facilitando o acompanhamento e organização de campeonatos e eventos. Dessa forma, reduz processos manuais e burocráticos, tornando mais eficiente a operação tanto para as usuárias quanto para organizadoras e gestores de projetos.

## 🔗 Links Importantes

- **Deploy da aplicação:** [https://fut-fem.vercel.app/](https://fut-fem.vercel.app/)  
- **API (JSON Server):** [https://futfem-json-sever.onrender.com](https://futfem-json-sever.onrender.com)

## 🎯 Visão Geral

A Plataforma FutFem conecta meninas e mulheres ao futebol em todo o Brasil, democratizando o acesso ao esporte e centralizando informações sobre treinos, campeonatos e oportunidades em um só lugar.

## ✨ Funcionalidades 

### Usuárias

- **Mapa Interativo:** Visualize oportunidades de treinos e eventos próximos a você  
- **Filtros Avançados:** Filtre por tipo, faixa etária, nível e custo  
- **Geolocalização:** Descubra oportunidades perto de você  
- **Cadastro Completo:** Perfil com informações pessoais, posição e nível de habilidade  
- **Gestão de Encontros:** Participe de eventos PassaBola  
- **Sistema de Inscrições:** Inscreva-se e acompanhe o status das inscrições
- **Busca e Filtros:** Encontre eventos por tipo, faixa etária, nível e custo  
- **Perfil de Usuária:** Acompanhe suas inscrições e histórico 
- **Integração ViaCEP:** Preenchimento automático de endereços via CEP
- **Coordenadas Nominatim:** Consulta de latitude e longitude para localização precisa no mapa

### Admin
- **Dashboard Administrativo:** Visualize estatísticas e gestão de usuários e eventos
- **Cadastro de Eventos:** Crie e edite eventos
- **Gestão de Inscrições:** Acompanhe inscrições de usuárias e vagas disponíveis
- **Controle de Vagas e Histórico*:** Atualize ocupação de eventos e histórico de inscrições


## 🛠️ Tecnologias Utilizadas

### Frontend
- React  
- React Router DOM  
- React Leaflet  
- Tailwind CSS  
- Lucide React  

### Backend
- JSON Server – API REST simulada para desenvolvimento 
- ViaCEP – integração para preenchimento de endereços
- Nominatim (OpenStreetMap) – obtenção de coordenadas geográficas

### Armazenamento
- LocalStorage (armazenamento local de dados e tokens de usuário)  

## 🔌 API Endpoints

A aplicação utiliza **JSON Server** como backend simulado. A seguir, os principais endpoints e suas funcionalidades:

### Usuárias (`/usuarios`)

| Método | Endpoint             | Descrição |
|--------|--------------------|-----------|
| GET    | `/usuarios`         | Retorna todas as usuárias cadastradas |
| GET    | `/usuarios/:id`     | Retorna dados de uma usuária específica |
| POST   | `/usuarios`         | Cadastra uma nova usuária.              |
| PUT    | `/usuarios/:id`     | Atualiza os dados de uma usuária existente |

### Eventos (`/eventos`)

| Método | Endpoint             | Descrição |
|--------|--------------------|-----------|
| GET    | `/eventos`         | Retorna todos os eventos |
| GET    | `/eventos/:id`     | Retorna um evento específico |
| POST   | `/eventos`         | Cadastra um novo evento |
| PUT    | `/eventos/:id`     | Atualiza um evento (vagas, inscritos, histórico) |

### Locais (`/locais`)

| Método | Endpoint             | Descrição |
|--------|--------------------|-----------|
| GET    | `/locais`          | Retorna todos os pontos de acesso (quadras, escolinhas, clubes, academias, eventos) |
| GET    | `/locais/:id`      | Retorna um ponto de acesso específico |

## 👥 Usuárias para Teste

Para facilitar a exploração da plataforma, seguem algumas usuárias de teste:

| Email             | Senha    | Role       |
|-------------------|----------|------------|
| bere@example.com  | 123      | admin      |
| pam@example.com   | 123      | user       |
| m@email.com       | 123      | user       | 

> **Observação:** Estes usuários estão cadastrados apenas na base de teste (JSON Server) e podem ser utilizados para explorar todas as funcionalidades da plataforma.


## 🔍 Observações

O JSON Server é apenas para desenvolvimento e testes

A integração com ViaCEP garante preenchimento automático de endereços por CEP.

Geolocalização depende de permissão do navegador; caso negada, a aplicação ainda funciona, mas sem mostrar a localização exata.

Coordenadas para o mapa são obtidas via Nominatim (OpenStreetMap) usando o nome do local ou endereço completo.

## 👥 Equipe 

- Matheus von Koss Wildeisen - RM: 561539
- Ana Clara Rocha de Oliveira – RM: 564298
- Deivid ruan Marques – RM: 566356
- Felipe Cordeiro - RM: 566518

## ⚽ Juntos transformamos o futebol feminino no Brasil!

A Plataforma FutFem conecta e empodera meninas e mulheres no futebol em todo o Brasil. Com funcionalidades de mapa interativo, gestão de eventos e inscrições, filtros avançados e integração com geolocalização, a plataforma promove acesso democrático, transparência e inclusão no esporte.
