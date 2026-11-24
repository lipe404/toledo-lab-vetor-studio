# Vetor Studio

Landing page conceitual de portfólio para o segmento de **SaaS de operações**. Marca, serviços e dados são fictícios.

**Demonstração:** Painel com três indicadores e gráficos simulados. Não há envio de dados pessoais, sistema de cadastro ou pagamento.

## Rodar localmente

Requisitos: Node.js 22+ e npm.

```sh
npm ci
npm run dev
```

Abra http://localhost:3000 para ver a landing page.

## Publicar

O projeto usa Next.js App Router, TypeScript e exportação estática. `npm run build` gera `out/`.
Para GitHub Pages, em **Settings → Pages**, selecione **GitHub Actions**, então execute o fluxo “Publicar demonstração no GitHub Pages”. O fluxo configura o caminho público do repositório automaticamente.
Para Vercel, importe o repositório como projeto Next.js sem definir `PAGES_BASE_PATH`.

## Crédito fotográfico

A foto ilustrativa do estúdio é de [Vitaly Gariev no Unsplash](https://unsplash.com/photos/team-collaborating-around-a-whiteboard-in-an-office-CdTQI-Nh7J4), disponibilizada sob a [Unsplash License](https://unsplash.com/license). Não representa uma equipe ou cliente do projeto fictício.
