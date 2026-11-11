// Requer Playwright instalado. Uso: PLAYWRIGHT_BROWSERS_PATH=... NODE_PATH=... node este-arquivo.cjs
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const base = path.resolve(__dirname,'..');
const assert = (condition, message) => { if(!condition) throw Error(message); };
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const context=await browser.newContext({acceptDownloads:true,viewport:{width:1440,height:1000}});
 const page=await context.newPage();const errors=[];const requests=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.url().startsWith('http'))requests.push(r.url());});
 await page.goto(pathToFileURL(path.join(base,'ABRIR-OFICINA.html')).href);
 await page.evaluate(()=>{localStorage.removeItem('amplify-zip-workshop-v2');localStorage.setItem('amplify-zip-workshop-v1',JSON.stringify({notes:{1:'Regra antiga',3:'Nota dos registros',4:'Nota de atualização',5:'Nota do portfólio'},done:{4:true},url:'https://example.com'}));});await page.reload();
 await page.locator('#missions button').nth(3).click();assert(await page.inputValue('#notes')==='Nota de atualização','Migração das anotações de atualização');assert(await page.locator('#complete').isChecked(),'Migração da conclusão');
 await page.locator('#missions button').nth(4).click();assert(await page.inputValue('#notes')==='Nota do portfólio','Migração das anotações do portfólio');
 assert(await page.locator('#missions button').count()===5,'Cinco etapas');
 for(let i=0;i<5;i++){await page.locator('#missions button').nth(i).click();assert((await page.locator('#title').innerText()).length>10,'Conteúdo missão '+i);}
 await page.locator('#missions button').nth(0).click();
 await page.locator('#phase1').click();assert((await page.locator('#phaseTitle').textContent()).includes('Envie'),'Momento Fazer');
 await page.locator('#phase2').click();assert((await page.locator('#phaseTitle').textContent()).includes('Abra'),'Momento Conferir');
 await page.locator('#phase2').press('Home');assert(await page.locator('#phase0').getAttribute('aria-selected')==='true','Abas acessíveis pelo teclado');
 await page.screenshot({path:path.join(base,'professor/evidencias/oficina-inicio-local.png'),fullPage:true});
 await page.locator('#missions button').nth(1).click();
 assert((await page.locator('#simResult').innerText()).includes('/especial.html'),'Regra específica');
 await page.selectOption('#ruleMode','bad');assert((await page.locator('#simResult').innerText()).includes('/projetos.html'),'Conflito observado');
 await page.selectOption('#ruleMode','correct');await page.fill('#path','/nao-existe');await page.locator('#simForm button.primary').click();assert((await page.locator('#simResult').innerText()).includes('404'),'Fallback 404');
 await page.fill('#path','/style.css');await page.locator('#simForm button.primary').click();assert((await page.locator('#simResult').innerText()).includes('Arquivo real'),'Arquivo real preservado');
 await page.locator('#notesDetails summary').first().click();await page.fill('#notes','Hipótese: regra ampla antes da específica.');await page.check('#complete');await page.reload();await page.locator('#missions button').nth(1).click();assert((await page.inputValue('#notes')).includes('Hipótese'),'Persistência das anotações');
 const dl=page.waitForEvent('download');await page.locator('#missionDownload').click();const material=await dl;await material.saveAs(path.join(base,'professor/evidencias/regras-baixadas-QA.json'));
 await page.locator('#guideButton').click();assert(await page.locator('#guideDialog').isVisible(),'Guia abre');await page.locator('#closeGuide').click();
 await page.locator('#missions button').nth(2).click();assert(await page.locator('#visualTest').isVisible(),'Teste antes de aplicar a restrição');await page.screenshot({path:path.join(base,'professor/evidencias/iframe-problema-local.png'),fullPage:true});await page.locator('#phase2').click();assert(await page.locator('#visualTest').isVisible(),'Teste de política no momento Conferir');
 await page.locator('#missions button').nth(1).click();await page.locator('#depthDetails summary').first().click();await page.locator('#accessExtra summary').first().click();assert(await page.locator('#recordsBody tr').count()===5,'Consulta opcional de acessos na etapa de links');await page.locator('#recordsErrors').click();assert(await page.locator('#recordsBody tr').count()===3,'Filtro complementar de erros');
 await page.locator('#missions button').nth(3).click();await page.locator('[data-version="v1"]').click();assert((await page.locator('#versionBadge').textContent()).includes('V1'),'Modelo de recuperação na etapa 4');
 await page.locator('#missions button').nth(4).click();assert(await page.locator('#visualEditor').isVisible(),'Personalização na etapa 5');
 await page.locator('#missions button').nth(1).click();
 await page.screenshot({path:path.join(base,'professor/evidencias/oficina-local.png'),fullPage:true});
 await page.locator('#editorButton').click();const frame=page.frames().find(f=>f!==page.mainFrame());await frame.waitForSelector('#nameInput');
 await page.screenshot({path:path.join(base,'professor/evidencias/editor-redesign-local.png')});await page.locator('#editorFrame').screenshot({path:path.join(base,'professor/evidencias/editor-perfil-local.png')});await frame.fill('#nameInput','João da Silva');await frame.fill('#bioInput','Perfil de teste com personalização.');
 const jpeg=await page.evaluate(()=>{const c=document.createElement('canvas');c.width=40;c.height=40;const x=c.getContext('2d');x.fillStyle='#ff9900';x.fillRect(0,0,40,40);return c.toDataURL('image/jpeg').split(',')[1];});
 await frame.setInputFiles('#avatarInput',{name:'foto.jpg',mimeType:'image/jpeg',buffer:Buffer.from(jpeg,'base64')});await frame.waitForFunction(()=>document.querySelector('#avatarPhoto').src.startsWith('data:image/jpeg'));
 await frame.selectOption('#fontInput','mono');
 const projectBefore=await frame.locator('#projectList .project-card').count();
 await frame.locator('#projectForm').evaluate(el=>el.closest('details').open=true);
 await frame.fill('#projectTitle','Meu projeto autoral');await frame.fill('#projectDescription','Experimento do laboratório.');await frame.locator('#projectForm [data-submit]').click();assert(await frame.locator('#projectList .project-card').count()===projectBefore+1,'Adicionar projeto');
 const exp=page.waitForEvent('download');await frame.locator('#exportButton').click();const zip=await exp;assert(/^joao-da-silva-[0-9a-f]{8}\.zip$/.test(zip.suggestedFilename()),'Nome personalizado com código');await zip.saveAs(path.join(base,'professor/evidencias/perfil-personalizado-QA.zip'));
 await frame.locator('.project-tools summary').click();const bp=page.waitForEvent('download');await frame.locator('#backupButton').click();const backup=await bp;const backupPath='/tmp/oficina-backup-QA.html';await backup.saveAs(backupPath);
 await page.locator('#closeEditor').click();await page.locator('#editorButton').click();assert(await frame.inputValue('#nameInput')==='João da Silva','Voltar preserva editor');
 page.once('dialog',d=>d.accept());await frame.setInputFiles('#importProject',backupPath);
 await frame.waitForFunction(()=>location.protocol==='blob:' && document.querySelector('#backupButton') && document.querySelector('#backupState')!==null);
 await frame.waitForLoadState('load');
 assert(await frame.inputValue('#nameInput')==='João da Silva','Importação preserva nome');assert(await frame.locator('#profileBio').innerText()==='Perfil de teste com personalização.','Backup preserva bio');
 assert(await frame.locator('#avatarPhoto').getAttribute('alt')==='Foto de João da Silva','Backup preserva alt');assert((await frame.locator('#avatarPhoto').getAttribute('src')).startsWith('data:image/jpeg'),'Backup preserva JPG');
 assert(await frame.locator('#backupButton').count()===1,'Backup não duplica controles');assert(await frame.locator('#projectList .project-card').count()===projectBefore+1,'Backup preserva projetos: esperado '+(projectBefore+1)+'; obtido '+await frame.locator('#projectList .project-card').count()+'; erros: '+errors.join(';'));
 await frame.locator('#projectList .remove-button').last().click();assert(await frame.locator('#projectList .project-card').count()===projectBefore,'Remoção funciona após importar');
 await frame.fill('#nameInput','Nome depois de importar');assert(await frame.locator('#profileName').textContent()==='Nome depois de importar','Edição após importar');
 await page.locator('#closeEditor').click();await page.setViewportSize({width:390,height:844});
 for(let i=0;i<5;i++){await page.locator('#missions button').nth(i).click();for(let j=0;j<3;j++){await page.locator('#phase'+j).click();assert(await page.locator('#phaseSteps li').count()===3,'Três ações por momento');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),'Sem overflow horizontal mobile: etapa '+i+', momento '+j);}}
 await page.locator('#missions button').nth(0).click();await page.screenshot({path:path.join(base,'professor/evidencias/oficina-mobile-local.png'),fullPage:true});
 assert(errors.length===0,'Sem erros JavaScript: '+errors.join('; '));assert(requests.length===0,'Oficina offline sem dependências HTTP: '+requests.join('; '));
 // PDFs reais a partir das versões HTML distribuídas.
 for(const file of ['aluno/GUIA-RAPIDO','professor/ROTEIRO-APRESENTADOR','professor/FICHA-INVESTIGACAO','professor/evidencias/COLETAR-NA-AWS']){
  await page.goto(pathToFileURL(path.join(base,file+'.html')).href);await page.pdf({path:path.join(base,file+'.pdf'),format:'A4',printBackground:true});
 }
 fs.writeFileSync(path.join(base,'professor/evidencias/resultado-local.json'),JSON.stringify({checkedAt:new Date().toISOString(),result:'PASS',checks:['5 etapas','15 momentos Entender/Fazer/Conferir em mobile','abas por teclado','simulação específica/conflito/404/arquivo real','investigação integrada às regras e consulta opcional de acessos','comparação v2/v1','anotações persistentes','download material','guia','editor','JPG','projeto','ZIP nome aleatório','backup/importação/edição/remoção','sem overflow mobile','sem requisições HTTP','sem erros JS','PDFs'],browser:await browser.version(),errors,requests},null,2));
 await browser.close();console.log('PASS: oficina, editor, ZIP, backup/importação, mobile, offline e PDFs.');
})().catch(e=>{console.error(e);process.exit(1);});
