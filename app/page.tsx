"use client";

import { useState } from "react";

const views = [
  {label:"Produção", number:"24", unit:"entregas no mês", color:"#baf251",
   text:"Veja o ritmo de produção e descubra quando a equipe tem espaço para receber novos trabalhos.",
   values:[4,6,5,8,7,9,10,9,12,15,14,18,17,20,19,24]},
  {label:"Capacidade", number:"72%", unit:"da capacidade em uso", color:"#a9acff",
   text:"Compare o volume previsto com o tempo disponível antes de encaixar um projeto no calendário.",
   values:[48,53,48,63,56,67,62,71,74,68,78,76,77,74,76,72]},
  {label:"Receita", number:"R$ 38 mil", unit:"de receita simulada", color:"#ffd08a",
   text:"Acompanhe receitas simuladas ao lado das entregas para entender como os projetos afetam o caixa.",
   values:[9,9,11,14,14,14,15,17,22,22,24,27,31,34,34,38]},
] as const;

const features = [
  {icon:"layers",title:"Menos abas abertas",copy:"Produção, disponibilidade e receita lado a lado, sem alternar entre três planilhas.",tag:"VISÃO OPERACIONAL"},
  {icon:"grid",title:"Veja onde o trabalho trava",copy:"Compare os picos de demanda com a capacidade do time antes de prometer uma data.",tag:"PLANEJAMENTO"},
  {icon:"clock",title:"Converse com dados à mão",copy:"Use os indicadores na reunião semanal para decidir o que entra, o que espera e o que sai.",tag:"ROTINA DE EQUIPE"},
] as const;

const stages = [
  {index:"01", title:"Mapeie os compromissos", copy:"Registre o que está em revisão, produção e entrega. Um combinado só entra no calendário depois de ter responsável e prazo."},
  {index:"02", title:"Encontre espaço no calendário", copy:"Veja a capacidade disponível e mova a próxima entrega antes de prometer algo que a equipe não consegue assumir."},
  {index:"03", title:"Dê contexto aos números", copy:"Revise o efeito de cada mudança no caixa de exemplo. Leve uma decisão objetiva para a reunião semanal."},
] as const;

function FlowArt(){
  return <svg className="flow-art" viewBox="0 0 510 300" fill="none" role="img" aria-label="Três trajetórias de produção, capacidade e receita que convergem para um plano semanal">
    <defs><pattern id="flow-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0v28" stroke="#435644" strokeWidth="1"/></pattern></defs>
    <rect width="510" height="300" rx="15" fill="#223227"/>
    <rect width="510" height="300" rx="15" fill="url(#flow-grid)"/>
    <path d="M20 150H490M255 22V278" stroke="#84907e" strokeDasharray="5 7" opacity=".5"/>
    <circle cx="362" cy="150" r="85" stroke="#829078" opacity=".34"/>
    <circle cx="362" cy="150" r="106" stroke="#829078" opacity=".23"/>
    <path className="flow-line" pathLength="1" d="M30 56H130Q183 56 217 102L230 116Q258 150 308 150H484" stroke="#baf251" strokeWidth="4"/>
    <path className="flow-line two" pathLength="1" d="M30 150H484" stroke="#c1b6ff" strokeWidth="3"/>
    <path className="flow-line three" pathLength="1" d="M30 244H128Q180 244 216 200L232 180Q258 150 312 150H484" stroke="#ffca86" strokeWidth="3"/>
    <g fill="#ddebdf" fontSize="14" fontFamily="monospace"><text x="30" y="42">PRODUÇÃO</text><text x="30" y="136">CAPACIDADE</text><text x="30" y="230">RECEITA</text></g>
    <circle cx="362" cy="150" r="29" fill="#baf251"/>
    <circle cx="362" cy="150" r="13" stroke="#213227" strokeWidth="2"/>
    <path d="m355 150 4 4 9-9" stroke="#213227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="308" y="200" fill="#ddebdf" fontSize="13" fontFamily="monospace">PLANO SEMANAL</text>
  </svg>;
}

function Icon({name}:{name:string}) {
  return <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    {name==="layers" ? <path d="m3 9 9-5 9 5-9 5-9-5Zm0 4 9 5 9-5M3 17l9 5 9-5"/> :
     name==="grid" ? <path d="M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z"/> :
     <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>}
  </svg>;
}

export default function Page() {
  const [mode,setMode]=useState(0);
  const view=views[mode];
  const high=Math.max(...view.values)*1.13;
  const points=view.values.map((v,i)=>[i*320/(view.values.length-1),128-v/high*115]);
  const line=points.map(([x,y],i)=>`${i?"L":"M"}${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");
  return <>
    <a className="skip" href="#conteudo">Pular para o conteúdo</a>
    <header className="top"><div className="wrap top-inner">
      <a className="brand" href="#conteudo"><span className="mark" aria-hidden="true">↗</span> vetor<span className="brand-sub">studio</span></a>
      <nav aria-label="Navegação principal"><a href="#recursos">Recursos</a><a className="nav-cta" href="#demo">Abrir demo</a></nav>
    </div></header>
    <main id="conteudo">
      <section className="hero wrap" aria-labelledby="title">
        <div className="hero-copy">
          <p className="kicker"><span/> CONCEITO DE SOFTWARE PARA EQUIPES CRIATIVAS</p>
          <h1 id="title">Dê direção<br className="wide"/> ao <em>trabalho.</em></h1>
          <p>Organize entregas, acompanhe a capacidade da equipe e entenda o caixa do estúdio em um só lugar.</p>
          <a className="button" href="#demo">Explorar painel</a>
          <span className="under">Demo interativa. Não é necessário cadastro.</span>
        </div>
        <div className="demo" id="demo" aria-labelledby="demo-title">
          <div className="demo-top"><span id="demo-title">Painel Vetor</span><span className="sample">Dados de exemplo</span></div>
          <div className="demo-core">
            <div className="choices" role="group" aria-label="Escolha um indicador">
              {views.map((entry,i)=><button key={entry.label} type="button" aria-pressed={mode===i} onClick={()=>setMode(i)}>{entry.label}</button>)}
            </div>
            <div className="value" aria-live="polite"><strong key={mode}>{view.number}</strong><span>{view.unit}</span></div>
            <svg className="chart" viewBox="0 0 320 142" role="img" aria-label={`Gráfico demonstrativo de ${view.label.toLowerCase()} para quatro semanas`}>
              <defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor={view.color} stopOpacity=".32"/><stop offset="1" stopColor={view.color} stopOpacity=".01"/></linearGradient></defs>
              {[12,42,72,102,132].map(y=><path key={y} d={`M0 ${y}H320`} stroke="#344239" strokeDasharray="3 5"/>)}
              <path d={`${line}L320 132H0Z`} fill="url(#fill)"/>
              <path key={mode} className="trace" d={line} pathLength="1" stroke={view.color} strokeWidth="2.7" fill="none" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="axis" aria-hidden="true"><span>Semana 1</span><span>Semana 2</span><span>Semana 3</span><span>Semana 4</span></div>
            <p className="hint">{view.text}</p>
          </div>
        </div>
      </section>
      <section className="wrap resources" id="recursos" aria-labelledby="resource-title">
        <p className="kicker dark"><span/> O QUE VOCÊ VÊ NO PAINEL</p>
        <h2 id="resource-title">Saiba o que cabe<br/> na próxima semana.</h2>
        <div className="features">{features.map(f=><article key={f.title}><Icon name={f.icon}/><p className="tag">{f.tag}</p><h3>{f.title}</h3><p>{f.copy}</p></article>)}</div>
      </section>
      <section className="studio-section" aria-labelledby="studio-title">
        <div className="wrap studio-grid">
          <figure className="studio-image">
            <img src={(process.env.NEXT_PUBLIC_BASE_PATH ?? "")+"/studio.webp"} alt="Equipe reunida em frente a um quadro branco com anotações, durante uma sessão de planejamento" width="1280" height="853" loading="lazy" decoding="async"/>
            <figcaption>Fotografia ilustrativa de <a href="https://unsplash.com/photos/team-collaborating-around-a-whiteboard-in-an-office-CdTQI-Nh7J4">Vitaly Gariev / Unsplash</a></figcaption>
          </figure>
          <div className="studio-copy">
            <p className="kicker"><span/> UM DIA NO ESTÚDIO</p>
            <h2 id="studio-title">A proposta chegou.<br/><em>E agora?</em></h2>
            <p>É segunda, e chegou uma proposta de identidade visual para a semana seguinte. A criação está animada, mas o calendário mostra duas entregas em revisão. Antes de aceitar, compare a capacidade, confira os compromissos e proponha uma data que faça sentido.</p>
            <p className="scenario-label">EXEMPLO FICTÍCIO · AGÊNCIA DE DESIGN</p>
            <a className="button" href="#demo">Ver os indicadores</a>
          </div>
        </div>
      </section>
      <section className="flow wrap" id="fluxo" aria-labelledby="flow-title">
        <div className="flow-illustration">
          <p className="kicker"><span/> UM PLANO A PARTIR DE TRÊS SINAIS</p>
          <h2 id="flow-title">Da conversa<br/> ao combinado.</h2>
          <FlowArt />
        </div>
        <ol>{stages.map(stage=><li key={stage.index}><span>{stage.index}</span><div><h3>{stage.title}</h3><p>{stage.copy}</p></div></li>)}</ol>
      </section>
      <section className="faq wrap" aria-labelledby="faq-title">
        <div><p className="kicker"><span/> SOBRE A DEMO</p><h2 id="faq-title">O que este conceito mostra?</h2></div>
        <div>
          <details><summary>Para quem seria o Vetor?</summary><p>O conceito foi pensado para pequenos estúdios, agências e equipes criativas que se dividem entre várias entregas simultâneas.</p></details>
          <details><summary>Os indicadores são reais?</summary><p>Não. As séries foram criadas só para demonstrar como a interface muda ao escolher produção, capacidade ou receita.</p></details>
          <details><summary>O painel guarda as minhas escolhas?</summary><p>Não. A seleção fica em memória até recarregar ou fechar a página. Não há cadastro, banco de dados, cookies de análise ou envio de informações.</p></details>
        </div>
      </section>
    </main>
    <footer className="footer"><div className="wrap"><span>Vetor Studio</span><p>Projeto conceitual de portfólio. Marca, produto e indicadores fictícios.</p></div></footer>
  </>;
}
