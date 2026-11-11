const { chromium }=require('playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const base=path.resolve(__dirname,'..');
const assert=(c,m)=>{if(!c)throw Error(m);};
(async()=>{
 let browser;const servers=[];
 try{
  const fixture=http.createServer((req,res)=>{if(req.url==='/bloqueado')res.setHeader('Content-Security-Policy',"frame-ancestors 'self'");res.setHeader('Content-Type','text/html');res.end('<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Perfil de teste local</title><h1>Perfil de teste local</h1><p>Resposta de outra origem para verificar o iframe.</p></html>');});
  const ui=http.createServer((req,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync(path.join(base,'professor/teste-incorporacao.html')));});
  for(const s of [fixture,ui]){await new Promise(r=>s.listen(0,'127.0.0.1',r));servers.push(s);}
  const site='http://127.0.0.1:'+fixture.address().port;
  browser=await chromium.launch({args:['--no-sandbox']});const page=await browser.newPage({viewport:{width:1360,height:1000}});const errors=[],messages=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>messages.push(m.text()));
  await page.goto('http://127.0.0.1:'+ui.address().port);
  assert(await page.locator('#empty').isVisible(),'Estado inicial sem conteúdo externo');assert(await page.locator('#openDirect').isDisabled(),'Abertura direta indisponível antes de testar');
  await page.screenshot({path:path.join(base,'professor/evidencias/iframe-redesign-local.png'),fullPage:true});
  await page.fill('#url',site+'/permitido');await page.locator('#form button').click();await page.frameLocator('#target').locator('h1').waitFor();assert(!(await page.locator('#empty').isVisible()),'Preview real carregado');
  const popup=page.waitForEvent('popup');await page.locator('#openDirect').click();const direct=await popup;await direct.waitForLoadState();assert(await direct.title()==='Perfil de teste local','Acesso direto abre outra aba');await direct.close();
  await page.fill('#url',site+'/bloqueado');await page.locator('#form button').click();await page.waitForFunction(()=>document.querySelector('#target').src.endsWith('/bloqueado'));
  for(let i=0;i<30&&!messages.some(x=>x.includes('frame-ancestors'));i++)await page.waitForTimeout(100);
  assert(messages.some(x=>x.includes('frame-ancestors')),'Política de outra origem bloqueia iframe e gera evidência no Console');
  assert((await page.locator('#status').textContent()).includes('Confira'),'Interface não declara sucesso ou bloqueio sem evidência');
  await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Teste iframe sem overflow no celular');
  await page.goto('file://'+path.join(base,'ABRIR-OFICINA.html'));await page.locator('#editorButton').click();const editor=page.frameLocator('#editorFrame');
  await editor.locator('#nameInput').waitFor();assert(await editor.locator('body').evaluate(el=>getComputedStyle(el).backgroundColor)==='rgb(245, 246, 248)','Editor com superfície clara');
  assert(await editor.locator('#backgroundColorInput').inputValue()==='#ffffff','Controle e fundo inicial do perfil concordam');
  assert(await editor.locator('#backgroundInput').inputValue()==='solid','Controle e padrão inicial concordam');
  assert(await editor.locator('body').evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Editor mobile sem overflow');
  await editor.locator('#backgroundColorInput').fill('#101820');await editor.locator('#backgroundColorInput').dispatchEvent('input');assert(await editor.locator('#profile').getAttribute('data-tone')==='dark','Personalização de fundo escuro preservada');
  assert(errors.length===0,'Sem erros de script: '+errors.join(';'));
  fs.writeFileSync(path.join(base,'professor/evidencias/resultado-visuais-local.json'),JSON.stringify({result:'PASS',scope:'Teste local com duas origens HTTP e CSP real; nenhuma chamada AWS.',checks:['iframe estado vazio','carregamento real','acesso direto em outra aba','bloqueio CSP real entre origens','interface sem detecção automática falsa','iframe e editor mobile','tema inicial consistente','fundo escuro personalizável'],consoleEvidence:messages.filter(x=>x.includes('frame-ancestors')),errors},null,2));
  console.log('PASS: iframe real permitido/bloqueado, acesso direto, tema do editor e mobile.');
 }finally{if(browser)await browser.close();for(const s of servers)s.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
