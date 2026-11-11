
// Extensão da oficina: páginas publicáveis e backup completo dos controles e do perfil.
const modelosOficina = {"projetos.html": "<!doctype html>\n<html lang=\"pt-BR\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Projetos | Oficina Amplify</title><link rel=\"stylesheet\" href=\"style.css\"></head>\n<body><header><a href=\"index.html\">PORTFÓLIO / LAB</a><nav><a href=\"index.html\">Perfil</a><a href=\"projetos.html\">Projetos</a><a href=\"contato.html\">Contato</a></nav></header><main><p class=\"eyebrow\">LABORATÓRIO • V1</p><h1>Ideias que viraram projetos.</h1><div class=\"grid\"><article class=\"card\"><h2>Mapa cultural</h2><p>Um catálogo de lugares para descobrir a cidade.</p></article><article class=\"card\"><h2>Estúdio digital</h2><p>Uma coleção de experimentos visuais.</p></article></div></main><footer>Exemplo fictício para a oficina. Arquivos estáticos • publicação manual.</footer></body></html>", "contato.html": "<!doctype html>\n<html lang=\"pt-BR\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Contato | Oficina Amplify</title><link rel=\"stylesheet\" href=\"style.css\"></head>\n<body><header><a href=\"index.html\">PORTFÓLIO / LAB</a><nav><a href=\"index.html\">Perfil</a><a href=\"projetos.html\">Projetos</a><a href=\"contato.html\">Contato</a></nav></header><main><p class=\"eyebrow\">LABORATÓRIO • V1</p><h1>Vamos conversar.</h1><p>Esta é a página de destino da reescrita <code>/fale-comigo</code>. Não há formulário nem envio a um backend.</p><a href=\"mailto:exemplo@example.com\">Enviar e-mail pelo seu aplicativo</a></main><footer>Exemplo fictício para a oficina. Arquivos estáticos • publicação manual.</footer></body></html>", "404.html": "<!doctype html>\n<html lang=\"pt-BR\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Página não encontrada | Oficina Amplify</title><link rel=\"stylesheet\" href=\"style.css\"></head>\n<body><header><a href=\"index.html\">PORTFÓLIO / LAB</a><nav><a href=\"index.html\">Perfil</a><a href=\"projetos.html\">Projetos</a><a href=\"contato.html\">Contato</a></nav></header><main><p class=\"eyebrow\">LABORATÓRIO • V1</p><span class=\"badge\">404</span><h1>Esse caminho não existe.</h1><p>O arquivo existe; o status 404 será configurado no Amplify para os caminhos ausentes. Abrir este arquivo diretamente pode retornar 200.</p><a href=\"index.html\">Voltar ao perfil</a></main><footer>Exemplo fictício para a oficina. Arquivos estáticos • publicação manual.</footer></body></html>", "especial.html": "<!doctype html>\n<html lang=\"pt-BR\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Projeto especial | Oficina Amplify</title><link rel=\"stylesheet\" href=\"style.css\"></head>\n<body><header><a href=\"index.html\">PORTFÓLIO / LAB</a><nav><a href=\"index.html\">Perfil</a><a href=\"projetos.html\">Projetos</a><a href=\"contato.html\">Contato</a></nav></header><main><p class=\"eyebrow\">LABORATÓRIO • V1</p><h1>Projeto em destaque.</h1><p>Você chegou ao destino da regra específica para <code>/antigo/especial</code>.</p></main><footer>Exemplo fictício para a oficina. Arquivos estáticos • publicação manual.</footer></body></html>"};
window.paginasOficina = nome => {
 const resultado={};
 for(const [arquivo,modelo] of Object.entries(modelosOficina)){
  const d=new DOMParser().parseFromString(modelo,'text/html');
  d.title=nome+' | '+d.title;
  d.querySelector('header a').textContent=nome+' / PERFIL';
  d.querySelector('header nav')?.remove();
  // As páginas auxiliares preservam seus estilos independentemente do tema do perfil.
  d.querySelector('link[rel=stylesheet]').remove();
  const s=d.createElement('style');s.textContent=":root{color-scheme:light}*{box-sizing:border-box}body{margin:0;background:#f5f6f8;color:#172b45;font:16px/1.65 -apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif;-webkit-font-smoothing:antialiased}a{color:#365e84;text-underline-offset:4px}a:hover{color:#9d5b00}header,main,footer{max-width:1100px;margin:auto;padding:26px 30px}header{display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap;border-bottom:1px solid #e0e6ee;font-size:12px}header>a{font-weight:650;color:#172b45;text-decoration:none}nav{display:flex;gap:24px;flex-wrap:wrap}nav a{text-decoration:none;color:#6d7f93}main{padding-top:54px;padding-bottom:50px}.eyebrow{color:#99651c;font-size:10px;font-weight:650;letter-spacing:.13em}h1{font-size:clamp(36px,6vw,66px);font-weight:650;line-height:1.05;letter-spacing:-.055em;max-width:850px;margin:20px 0 26px}h2{font-size:23px;font-weight:600;letter-spacing:-.035em}p{max-width:740px;color:#6a7c91}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:18px;margin-top:32px}.card{padding:26px;border:1px solid #e0e6ee;border-radius:20px;background:#fff;box-shadow:0 10px 30px #172b4503}.badge{display:inline-block;background:#fff0d9;color:#965c09;padding:5px 12px;border-radius:9px;font-size:11px;font-weight:650}footer{border-top:1px solid #e0e6ee;color:#8492a5;font-size:11px}code{background:#e9eef4;color:#294864;border-radius:5px;padding:3px 6px;font-size:.85em}button,input{font:inherit}button{cursor:pointer;padding:12px 18px;border:0;border-radius:10px;background:#172b45;color:#fff}input{padding:12px;border-radius:10px;background:#fff;color:#172b45;border:1px solid #ccd6e2;width:100%}:focus-visible{outline:3px solid #4a94bd;outline-offset:4px}@media(max-width:600px){header,main,footer{padding:23px 20px}main{padding-top:35px}nav{gap:16px}h1{font-size:39px}}\n";d.head.append(s);
  const palette=getComputedStyle(perfil);
  const bg=palette.getPropertyValue('--profile-background').trim();
  const ink=palette.getPropertyValue('--profile-text').trim();
  const muted=palette.getPropertyValue('--profile-muted').trim();
  const accent=palette.getPropertyValue('--accent').trim();
  const shared=d.createElement('style');
  shared.textContent='body{background:'+bg+';color:'+ink+'}p,footer,nav a{color:'+muted+'}header>a,a{color:'+ink+'}.card{background:color-mix(in srgb,'+ink+' 4%,'+bg+');border-color:color-mix(in srgb,'+ink+' 13%,transparent)}.eyebrow{color:'+muted+'}.badge{background:'+accent+';color:'+palette.getPropertyValue('--accent-ink').trim()+'}';
  d.head.append(shared);
  if(arquivo==='projetos.html'){
   d.querySelector('h1').textContent=document.querySelector('#projectsHeading').textContent;
   const destino=d.querySelector('.grid'); destino.replaceChildren();
   document.querySelectorAll('#projectList .project-card').forEach(card=>{const c=d.importNode(card,true);c.classList.add('card');c.querySelectorAll('.editor-only').forEach(x=>x.remove());destino.append(c);});
   if(!destino.children.length){const p=d.createElement('p');p.textContent='Meus projetos serão apresentados aqui.';destino.append(p);}
  }
  resultado[arquivo]='<!doctype html>\n'+d.documentElement.outerHTML;
 }
 resultado['VERSAO.txt']='Perfil de '+nome+'\nExportado em '+new Date().toISOString()+'\n';
 return resultado;
};
const salvarBackup=document.createElement('button');salvarBackup.type='button';salvarBackup.className='button button-quiet';salvarBackup.textContent='Salvar projeto editável';salvarBackup.id='backupButton';
const importarLabel=document.createElement('label');importarLabel.id='importLabel';importarLabel.className='button button-quiet';importarLabel.textContent='Importar projeto';
const importar=document.createElement('input');importar.type='file';importar.accept='.html,text/html';importar.id='importProject';importar.style.maxWidth='180px';importarLabel.append(importar);
document.querySelector('#projectTools').append(salvarBackup,importarLabel);
importarLabel.tabIndex=0;importarLabel.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();importar.click();}});
let urlBackup;
salvarBackup.addEventListener('click',()=>{
 if(imagensPendentes>0){avisar('Aguarde o carregamento das imagens antes de salvar.');return;}
 const copia=document.documentElement.cloneNode(true);
 const atuais=[...document.querySelectorAll('input,textarea,select')];
 copia.querySelectorAll('input,textarea,select').forEach((el,i)=>{
  const atual=atuais[i];if(el.type==='file'){el.removeAttribute('value');return;}
  if(el.tagName==='TEXTAREA')el.textContent=atual.value;
  else if(el.tagName==='SELECT')[...el.options].forEach((op,j)=>op.toggleAttribute('selected',atual.options[j].selected));
  else {el.setAttribute('value',atual.value);if(el.type==='checkbox'||el.type==='radio')el.toggleAttribute('checked',atual.checked);}
 });
 copia.querySelector('#backupState')?.remove();
 const state=document.createElement('script');state.id='backupState';state.type='application/json';
 state.textContent=JSON.stringify({version:1,profile:document.querySelector('#profile').outerHTML}).replace(/</g,'\u003c');
 copia.querySelector('body').prepend(state);
 copia.querySelectorAll('#downloadReady,#backupReady,#importReady,#backupButton,#importLabel').forEach(x=>x.remove());
 const ready=document.createElement('a');ready.className='button button-accent';ready.id='backupReady';ready.download='meu-projeto-editavel.html';ready.textContent='Salvar backup HTML';
 if(urlBackup)URL.revokeObjectURL(urlBackup);urlBackup=URL.createObjectURL(new Blob(['<!doctype html>\n'+copia.outerHTML],{type:'text/html'}));ready.href=urlBackup;
 document.querySelector('#backupReady')?.remove();document.querySelector('.studio-actions').append(ready);ready.click();
 avisar('Backup pronto. Importe somente arquivos seus ou de fonte confiável.');
});
let urlImport;
importar.addEventListener('change',async()=>{
 const f=importar.files[0];if(!f)return;
 if(f.size>80*1024*1024){avisar('Backup muito grande; limite de 80 MB.');return;}
 try{
  const texto=await f.text();const d=new DOMParser().parseFromString(texto,'text/html');
  const state=JSON.parse(d.querySelector('#backupState')?.textContent||'null');
  if(state?.version!==1||!state.profile)throw Error('Escolha um backup editável gerado nesta oficina.');
  if(!confirm('Este backup HTML contém código executável. Abra somente um arquivo criado por você ou de fonte confiável. Continuar?'))return;
  if(urlImport)URL.revokeObjectURL(urlImport);urlImport=URL.createObjectURL(new Blob([texto],{type:'text/html'}));
  const a=document.createElement('a');a.href=urlImport;a.textContent='Abrir projeto importado';a.className='button button-accent';a.id='importReady';
  document.querySelector('#importReady')?.remove();document.querySelector('.studio-actions').append(a);a.click();
 }catch(e){avisar(e.message);}
});
const estadoSalvo=document.querySelector('#backupState');
if(estadoSalvo){try{const s=JSON.parse(estadoSalvo.textContent);if(s.version===1){const d=new DOMParser().parseFromString(s.profile,'text/html');const p=d.querySelector('#profile');if(p){perfil.innerHTML=p.innerHTML;for(const a of [...perfil.attributes])perfil.removeAttribute(a.name);for(const a of p.attributes)perfil.setAttribute(a.name,a.value);perfil.querySelectorAll('.remove-button').forEach(b=>{b.addEventListener('click',()=>{b.parentElement.remove();atualizarContagens();avisar('Item removido.');});});atualizarIdentidade();atualizarContagens();}}}catch(e){avisar('Não foi possível restaurar o backup.');}}

// Opções adicionais do portfólio. O estado visual permanece no perfil exportado.
const portfolioControls = document.querySelector('#portfolioEnhancements');
const hasPortfolioControls = Boolean(portfolioControls);
if (!hasPortfolioControls) {
  document.querySelector('.project-tools').insertAdjacentHTML('afterend', "<section id=\"portfolioEnhancements\" aria-label=\"Mais opções para seu portfólio\">\n  <details class=\"editor-section style-start\" open>\n    <summary><span>Escolha um ponto de partida</span><span class=\"accordion-icon\" aria-hidden=\"true\">+</span></summary>\n    <div class=\"editor-fields\"><p class=\"preset-hint\">Cada modelo muda a aparência. Seus textos, fotos e projetos continuam com você.</p>\n      <div class=\"theme-presets\" role=\"group\" aria-label=\"Modelos visuais\">\n        <button type=\"button\" data-theme=\"minimal\" aria-pressed=\"true\"><span class=\"theme-mini minimal\" aria-hidden=\"true\"><i></i><b>Aa</b><em></em></span><strong>Essencial</strong><small>Claro e equilibrado</small></button>\n        <button type=\"button\" data-theme=\"editorial\" aria-pressed=\"false\"><span class=\"theme-mini editorial\" aria-hidden=\"true\"><i></i><b>Aa</b><em></em></span><strong>Editorial</strong><small>Quente e expressivo</small></button>\n        <button type=\"button\" data-theme=\"terminal\" aria-pressed=\"false\"><span class=\"theme-mini terminal\" aria-hidden=\"true\"><i></i><b>Aa_</b><em></em></span><strong>Terminal</strong><small>Escuro e preciso</small></button>\n        <button type=\"button\" data-theme=\"aurora\" aria-pressed=\"false\"><span class=\"theme-mini aurora\" aria-hidden=\"true\"><i></i><b>Aa</b><em></em></span><strong>Aurora</strong><small>Noturno e criativo</small></button>\n      </div><p id=\"themeStatus\" class=\"preset-hint\" role=\"status\">Essencial é o ponto de partida. Você pode ajustar tudo depois.</p>\n    </div>\n  </details>\n  <details class=\"editor-section composition-options\">\n    <summary><span>Composição e seções</span><span class=\"accordion-icon\" aria-hidden=\"true\">+</span></summary>\n    <div class=\"editor-fields\">\n      <label for=\"heroLayoutInput\">Apresentação do perfil</label><select id=\"heroLayoutInput\"><option value=\"split\">Texto e foto lado a lado</option><option value=\"center\">Apresentação centralizada</option><option value=\"compact\">Cabeçalho compacto</option></select>\n      <label for=\"nameScaleInput\">Destaque do nome <output id=\"nameScaleValue\" for=\"nameScaleInput\">100%</output></label><input id=\"nameScaleInput\" type=\"range\" min=\"75\" max=\"130\" step=\"5\" value=\"100\">\n      <label for=\"densityInput\">Espaço entre as seções</label><select id=\"densityInput\"><option value=\"comfortable\">Confortável</option><option value=\"airy\">Mais espaço</option><option value=\"compact\">Mais compacto</option></select>\n      <label for=\"photoShapeInput\">Formato do retrato</label><select id=\"photoShapeInput\"><option value=\"soft\">Cantos suaves</option><option value=\"circle\">Circular</option><option value=\"square\">Quadrado</option></select>\n      <label class=\"checkbox-label\"><input id=\"showPortraitInput\" type=\"checkbox\" checked> Mostrar foto ou iniciais</label>\n      <p class=\"field-label\">Ordem e visibilidade das seções</p><p class=\"preset-hint\">Use as setas para mover. Desmarque o que não quiser mostrar.</p><div id=\"sectionOrder\" class=\"section-order\"></div>\n    </div>\n  </details>\n  <details class=\"editor-section section-copy-options\">\n    <summary><span>Títulos e textos da página</span><span class=\"accordion-icon\" aria-hidden=\"true\">+</span></summary>\n    <div class=\"editor-fields\">\n      <label for=\"collectionTitleInput\">Título da sua seleção</label><input id=\"collectionTitleInput\" data-profile-target=\"#collectionHeading\" maxlength=\"65\">\n      <label for=\"collectionDescriptionInput\">Apresentação da seleção</label><textarea id=\"collectionDescriptionInput\" data-profile-target=\".section-description\" maxlength=\"220\" rows=\"3\"></textarea>\n      <label for=\"projectsTitleInput\">Título dos projetos</label><input id=\"projectsTitleInput\" data-profile-target=\"#projectsHeading\" maxlength=\"65\">\n      <label for=\"stackTitleInput\">Título das tecnologias</label><input id=\"stackTitleInput\" data-profile-target=\"#languagesHeading\" maxlength=\"80\">\n      <label for=\"footerTextInput\">Frase de encerramento</label><input id=\"footerTextInput\" data-profile-target=\".profile-footer > span:first-child\" maxlength=\"100\">\n    </div>\n  </details>\n</section>\n");
}
const themes = {
  minimal:{name:'Essencial',background:'#ffffff',accent:'#ff9900',font:'sans',pattern:'solid',layout:'split',shape:'soft',density:'comfortable',cards:'12px'},
  editorial:{name:'Editorial',background:'#f7f0e5',accent:'#ab462f',font:'serif',pattern:'solid',layout:'center',shape:'circle',density:'airy',cards:'0px'},
  terminal:{name:'Terminal',background:'#0b1720',accent:'#61d9bb',font:'mono',pattern:'grid',layout:'compact',shape:'square',density:'compact',cards:'0px'},
  aurora:{name:'Aurora',background:'#19152b',accent:'#b8a0ff',font:'sans',pattern:'dots',layout:'center',shape:'soft',density:'airy',cards:'24px'}
};
let choosingTheme=false;
function setControl(selector,value,event='change') {
  const element=document.querySelector(selector);
  element.value=value;element.dispatchEvent(new Event(event,{bubbles:true}));
}
function themeSelection(name) {
  document.querySelectorAll('[data-theme]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.theme===name)));
  document.querySelector('#themeStatus').textContent=themes[name]?themes[name].name+' aplicado. Ajuste as opções para criar sua própria versão.':'Aparência personalizada. Suas escolhas atuais estão no perfil.';
}
document.querySelectorAll('[data-theme]').forEach(button=>button.addEventListener('click',()=>{
  const theme=themes[button.dataset.theme];choosingTheme=true;
  setControl('#backgroundColorInput',theme.background,'input');aplicarCor(theme.accent);
  setControl('#fontInput',theme.font);setControl('#backgroundInput',theme.pattern);setControl('#shapeInput',theme.cards);
  setControl('#heroLayoutInput',theme.layout);setControl('#photoShapeInput',theme.shape);setControl('#densityInput',theme.density);
  setControl('#nameScaleInput','100','input');
  perfil.dataset.themeName=button.dataset.theme;perfil.dataset.themeBase=button.dataset.theme;themeSelection(button.dataset.theme);choosingTheme=false;
  avisar('Modelo '+theme.name+' aplicado. Seu conteúdo foi mantido.');
}));
const visualInputs=['#accentInput','#backgroundColorInput','#fontInput','#shapeInput','#backgroundInput','#heroLayoutInput','#photoShapeInput','#densityInput','#nameScaleInput'];
function markCustom(){if(!choosingTheme){perfil.dataset.themeName='custom';themeSelection('custom');}}
for(const selector of visualInputs)document.querySelector(selector).addEventListener(['#accentInput','#backgroundColorInput','#nameScaleInput'].includes(selector)?'input':'change',markCustom);
document.querySelectorAll('[data-accent]').forEach(button=>button.addEventListener('click',markCustom));
document.querySelector('#heroLayoutInput').addEventListener('change',event=>perfil.dataset.hero=event.target.value);
document.querySelector('#densityInput').addEventListener('change',event=>perfil.dataset.density=event.target.value);
document.querySelector('#photoShapeInput').addEventListener('change',event=>perfil.dataset.photoShape=event.target.value);
document.querySelector('#nameScaleInput').addEventListener('input',event=>{
  perfil.style.setProperty('--name-scale',Number(event.target.value)/100);
  document.querySelector('#nameScaleValue').textContent=event.target.value+'%';
});
document.querySelector('#showPortraitInput').addEventListener('change',event=>{
  perfil.querySelector('.portrait-frame').hidden=!event.target.checked;
  perfil.dataset.portrait=event.target.checked?'visible':'hidden';
});
document.querySelectorAll('[data-profile-target]').forEach(input=>{
  const target=perfil.querySelector(input.dataset.profileTarget);
  if(!hasPortfolioControls)input.value=target.textContent.replace(/\.$/,'');
  input.addEventListener('input',()=>target.textContent=input.value);
});
const sectionDefinitions=[
  {key:'languages',selector:'.languages-section',label:'Tecnologias'},
  {key:'collection',selector:'.collection-section',label:'Minha seleção'},
  {key:'projects',selector:'#projectsSection',label:'Projetos'}
];
function orderedSections(){return sectionDefinitions.slice().sort((a,b)=>{
  const elements=[...perfil.children];return elements.indexOf(perfil.querySelector(a.selector))-elements.indexOf(perfil.querySelector(b.selector));
});}
function drawSectionOrder(){
  const container=document.querySelector('#sectionOrder');container.replaceChildren();
  const order=orderedSections();
  order.forEach((section,index)=>{
    const element=perfil.querySelector(section.selector);
    const row=document.createElement('div');row.className='section-order-row';
    const label=document.createElement('label');label.className='checkbox-label';
    const check=document.createElement('input');check.type='checkbox';check.checked=!element.hidden;check.dataset.sectionToggle=section.key;
    check.addEventListener('change',()=>{element.hidden=!check.checked;if(section.key==='projects')document.querySelector('#showProjects').checked=check.checked;});
    label.append(check,document.createTextNode(section.label));row.append(label);
    for(const [direction,arrow] of [[-1,'↑'],[1,'↓']]){
      const button=document.createElement('button');button.type='button';button.textContent=arrow;button.dataset.move=section.key+':'+direction;
      button.setAttribute('aria-label','Mover '+section.label+' para '+(direction<0?'cima':'baixo'));
      button.disabled=index+direction<0||index+direction>=order.length;
      button.addEventListener('click',()=>{
        const other=perfil.querySelector(order[index+direction].selector);
        if(direction<0)perfil.insertBefore(element,other);else perfil.insertBefore(other,element);
        drawSectionOrder();const moved=document.querySelector('[data-move="'+section.key+':'+direction+'"]');const focus=moved.disabled?document.querySelector('[data-move="'+section.key+':'+(-direction)+'"]'):moved;focus.focus({preventScroll:true});
      });row.append(button);
    }
    container.append(row);
  });
}
document.querySelector('#showProjects').addEventListener('change',drawSectionOrder);
drawSectionOrder();themeSelection(perfil.dataset.themeName||'minimal');
document.querySelector('#nameScaleValue').textContent=document.querySelector('#nameScaleInput').value+'%';
