// Opções adicionais do portfólio. O estado visual permanece no perfil exportado.
const portfolioControls = document.querySelector('#portfolioEnhancements');
const hasPortfolioControls = Boolean(portfolioControls);
if (!hasPortfolioControls) {
  document.querySelector('.project-tools').insertAdjacentHTML('afterend', CONTROLES_PORTFOLIO);
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
