# SkillMatch

Sistema web que compara o perfil de um candidato com vagas de front-end
e calcula o percentual de compatibilidade, indicando habilidades
encontradas, faltantes, e recomendações de estudo.

## Problema que resolve

Muitos candidatos possuem dificuldade para identificar quais oportunidades de trabalho são mais compatíveis com suas habilidades atuais.

Além disso, frequentemente não sabem:

Quais requisitos já dominam;
Quais habilidades ainda precisam desenvolver;
Quais vagas são mais compatíveis com seu perfil.

O SkillMatch resolve esse problema realizando uma comparação entre:

Perfil do candidato
        +
Requisitos da vaga
        ↓
Percentual de compatibilidade

O sistema também identifica as habilidades que ainda precisam ser desenvolvidas, permitindo que o usuário tenha uma visão mais clara de seu plano de estudos.

## Tecnologias utilizadas

- HTML5 semântico
- CSS3 (Flexbox, variáveis CSS, mobile-first)
- JavaScript (ES6+), módulos ES (import/export)
- Programação Orientada a Objetos (classes, herança)
- Fetch API + async/await
- localStorage

## Estrutura do projeto
skillmatch-web/
├── index.html
├── README.md
└── assets/
├── styles/index.style.css
├── scripts/
│   ├── main.js    → orquestra o fluxo da aplicação
│   ├── motor.js   → classes Vaga/VagasFrontEnd, cálculo de compatibilidade
│   ├── ui.js      → renderização de tela (cards, mensagens, formulário)
│   └── dados.js   → fetch das vagas + persistência (localStorage)
├── dados/vagas.json
└── img/

## Como executar

1. Clone o repositório
2. Abra a pasta no VS Code
3. Instale a extensão **Live Server** (se ainda não tiver)
4. Clique com o botão direito em `index.html` → "Open with Live Server"

> ⚠️ Não abra o `index.html` direto pelo navegador (`file://`) — o projeto
> usa módulos ES e `fetch`, que exigem um servidor local.

## Funcionalidades

- Formulário de perfil (nome, área, habilidades, experiência) com validação
- Cálculo automático de compatibilidade entre o candidato e cada vaga
- Classificação por faixa (Alta / Média / Baixa compatibilidade)
- Destaque da vaga mais compatível + recomendação de estudo
- Persistência do perfil entre visitas (localStorage)
- Estados de carregamento, vazio e erro no carregamento das vagas

## Melhorias futuras

- [ ] Filtro/ordenação de vagas
- [ ] Integração com API pública de vagas reais ou Banco de dados.

## Vídeo de apresentação

[![Assista à demonstração](https://drive.google.com/file/d/1sMPotzugbVKCZYPW7O81tcwudhXzKD95/view?usp=drive_link)](COLOQUE_SEU_LINK_AQUI)

[![Assista à demonstração](https://youtu.be/_dvCSQuaTmQ)](COLOQUE_SEU_LINK_AQUI)

## Autor

Francisco Otacílio Machado
[GitHub](https://github.com/fransciscootacilio) · [LinkedIn](https://www.linkedin.com/in/francisco-o-machado/)