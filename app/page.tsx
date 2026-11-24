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
    </main>
    <footer className="footer"><div className="wrap"><span>Vetor Studio</span><p>Projeto conceitual de portfólio. Marca, produto e indicadores fictícios.</p></div></footer>
  </>;
}
