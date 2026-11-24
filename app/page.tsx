"use client";

import { useRef, useState, type KeyboardEvent } from "react";

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

function chooseMetric(event: KeyboardEvent<HTMLDivElement>, setMode: (index: number) => void) {
  if (!(event.target instanceof HTMLButtonElement)) return;
  const buttons = Array.from(event.currentTarget.querySelectorAll("button"));
  const active = buttons.indexOf(event.target);
  const directions: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };
  const next = event.key === "Home" ? 0
    : event.key === "End" ? views.length-1
    : event.key in directions ? (active + directions[event.key] + views.length) % views.length : -1;
  if (next < 0) return;
  event.preventDefault();
  setMode(next);
  buttons[next]?.focus();
}

function CapacityPlanner() {
  const [available, setAvailable] = useState("36");
  const [planned, setPlanned] = useState("24");
  const [incoming, setIncoming] = useState("8");
  const [copyState, setCopyState] = useState<"idle"|"pending"|"copied"|"fallback">("idle");
  const copyRequest=useRef(0);
  const entries = [
    { id:"available", label:"Horas disponíveis", value:available, update:setAvailable },
    { id:"planned", label:"Horas já comprometidas", value:planned, update:setPlanned },
    { id:"incoming", label:"Horas do novo projeto", value:incoming, update:setIncoming },
  ];
  const validNumber = (value:string) => /^(?:0|[1-9]\d{0,2})$/.test(value);
  const invalid=entries.some(entry=>!validNumber(entry.value));
  const used=Number(planned)+Number(incoming);
  const balance=Number(available)-used;
  const remaining=Math.max(0,balance);
  const usePercent=Number(available)>0 ? Math.round(100*used/Number(available)) : null;
  const summary=invalid ? "Preencha os três campos com números inteiros entre 0 e 999."
    : balance<0 ? `Excesso de ${-balance} ${balance===-1?"hora":"horas"} nesta semana.`
    : balance===0 ? "Capacidade preenchida. Não sobram horas nesta semana."
    : `Sobram ${remaining} ${remaining===1?"hora":"horas"} nesta semana.`;
  const weeklyCard = invalid ? "" : `Vetor Studio | Quadro de capacidade (demonstração)\nDisponíveis: ${available} h | Já comprometidas: ${planned} h | Novo projeto: ${incoming} h\n${summary}\nCenário fictício. Nenhuma informação foi enviada.\nFaça seu próprio cenário: https://lipe404.github.io/toledo-lab-vetor-studio/#planejador`;
  function clearCopy(){copyRequest.current+=1;setCopyState("idle");}
  async function copyWeeklyCard(){
    if (!weeklyCard) return;
    const request=++copyRequest.current;
    setCopyState("pending");
    try { await navigator.clipboard.writeText(weeklyCard); if(copyRequest.current===request)setCopyState("copied"); }
    catch { if(copyRequest.current===request)setCopyState("fallback"); }
  }
  return <section className="planner" id="planejador" aria-labelledby="planner-title">
    <div className="wrap planner-grid">
      <div className="planner-copy"><p className="kicker"><span/> FERRAMENTA INTERATIVA</p>
        <h2 id="planner-title">Simulador de capacidade semanal</h2>
        <p>Uma nova entrega cabe no calendário? Compare o tempo disponível da equipe com o trabalho já assumido e o novo pedido.</p>
        <p>Os números mudam só nesta página. Use valores fictícios para explorar.</p>
      </div>
      <div className="planner-card">
        <fieldset><legend>Monte um cenário de horas</legend><p id="hour-help">Use números inteiros de 0 a 999.</p>
          <div className="hours-list">
            {entries.map(entry=><label key={entry.id} htmlFor={entry.id}>{entry.label}
              <span><input id={entry.id} type="number" inputMode="numeric" min="0" max="999" step="1" value={entry.value} onChange={event=>{entry.update(event.target.value);clearCopy();}} aria-invalid={!validNumber(entry.value)} aria-describedby="hour-help"/><b aria-hidden="true">h</b></span>
            </label>)}
          </div>
        </fieldset>
        <div className="capacity-result" data-state={invalid?"invalid":balance<0?"over":"fits"}>
          <p role="status" aria-live="polite" aria-atomic="true">{summary}</p>
          {!invalid&&<><div className="capacity-meter" aria-hidden="true"><i style={{ width:(usePercent===null?(used>0?100:0):Math.min(100,usePercent))+"%" }}/></div><small>{usePercent===null?"Sem horas disponíveis para calcular o percentual.":`${usePercent}% da capacidade em uso.`}</small></>}
        </div>
        <div className="planner-actions">
          <button type="button" className="reset-hours" onClick={()=>{setAvailable("36");setPlanned("24");setIncoming("8");clearCopy();}}>Restaurar exemplo</button>
          <button type="button" className="button" disabled={invalid||copyState==="pending"} onClick={copyWeeklyCard}>Copiar quadro da semana</button>
        </div>
        <p className="copy-status" role="status">{copyState==="copied"?"Quadro copiado. Você decide onde colar.":copyState==="fallback"?"Cópia automática indisponível. Selecione o quadro abaixo.":copyState==="pending"?"Preparando a cópia…":""}</p>
        {copyState==="fallback"&&weeklyCard&&<textarea className="copy-fallback" readOnly rows={4} value={weeklyCard} aria-label="Quadro da semana pronto para copiar"/>}
      </div>
    </div>
  </section>;
}

function NumberTable({mode}:{mode:number}){
  const view=views[mode];
  const unit=mode===0?"entregas":mode===1?"%":"mil reais";
  return <details className="chart-data">
    <summary>Ver dados em tabela</summary>
    <table><caption>{view.label} ilustrativa em quatro semanas</caption>
      <thead><tr><th scope="col">Amostra</th><th scope="col">Valor ({unit})</th></tr></thead>
      <tbody>{view.values.map((value, index)=><tr key={index}><th scope="row">Semana {Math.floor(index/4)+1}, ponto {index%4+1}</th><td>{value}</td></tr>)}</tbody>
    </table>
    <p>Leituras fictícias do painel, não medições de uma equipe real.</p>
  </details>;
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
      <a className="brand brand-masthead" href="#conteudo"><img className="brand-image" src={(process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/brand-lockup.webp"} alt="Vetor Studio" width="640" height="160" decoding="async" /></a>
      <nav aria-label="Navegação principal"><a href="#recursos">Recursos</a><a className="nav-cta" href="#planejador">Simular semana</a></nav>
    </div></header>
    <main id="conteudo" tabIndex={-1}>
      <section className="hero wrap" aria-labelledby="title">
        <div className="hero-copy">
          <p className="kicker"><span/> CONCEITO DE SOFTWARE PARA EQUIPES CRIATIVAS</p>
          <h1 id="title">O trabalho cabe<br className="wide"/> na <em>semana?</em></h1>
          <p>Para estúdios criativos que precisam dizer sim ou não a um projeto sem sobrecarregar a equipe. Compare as horas e leve uma decisão clara para a reunião.</p>
          <div className="hero-actions"><a className="button" href="#planejador">Simular minha semana</a><a className="secondary-action" href="#demo">Ver painel de exemplo</a></div>
          <span className="under">Teste com números fictícios. Sem cadastro ou integração.</span>
          <figure className="hero-photo">
            <img src={(process.env.NEXT_PUBLIC_BASE_PATH ?? "")+"/planejamento.webp"} alt="Pessoas observando um colega que apresenta um planejamento no quadro" width="800" height="480" loading="eager" decoding="async"/>
            <figcaption><span>ESTÚDIO EM FOCO</span> Criação e operação, na mesma mesa.</figcaption>
          </figure>
        </div>
        <div className="demo" id="demo" aria-labelledby="demo-title">
          <div className="demo-top"><span id="demo-title">Painel Vetor</span><span className="sample">Dados de exemplo</span></div>
          <div className="demo-core">
            <div className="choices" role="group" aria-label="Escolha um indicador" onKeyDown={event=>chooseMetric(event,setMode)}>
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
            <p className="hint">{view.text}</p><NumberTable mode={mode} />
          </div>
        </div>
      </section>
      <CapacityPlanner />
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
    <footer className="footer"><div className="wrap"><img className="brand-image brand-footer" src={(process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/brand-lockup-inverse.webp"} alt="Vetor Studio" width="640" height="160" decoding="async" /><a href="#recursos">Conhecer recursos</a><p>Projeto conceitual de portfólio. Marca, produto e indicadores fictícios.</p></div></footer>
  </>;
}
