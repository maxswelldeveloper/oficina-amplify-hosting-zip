const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {pathToFileURL}=require('url');
const base=path.resolve(__dirname,'..');const assert=(c,m)=>{if(!c)throw Error(m);};
(async()=>{
const browser=await chromium.launch({args:['--no-sandbox']});try{
 const page=await browser.newPage({viewport:{width:1440,height:1100},acceptDownloads:true});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(path.join(base,'aluno/EDITOR-PERFIL.html')).href);
 await page.fill('#nameInput','Marina Costa');
 const items=await page.locator('#favoriteList>*').count();
 for(const name of ['minimal','editorial','terminal','aurora']){
  await page.locator('[data-theme="'+name+'"]').click();
  assert(await page.locator('#profile').getAttribute('data-theme-name')===name,'Modelo '+name);
  assert(await page.locator('#shapeInput').inputValue()!=='','Formato de card válido em '+name);
  assert(await page.locator('.project-card h4').first().evaluate(el=>getComputedStyle(el).color===getComputedStyle(document.querySelector('#profile')).color),'Texto de projetos acompanha o tema '+name);assert(await page.locator('#profileName').textContent()==='Marina Costa','Conteúdo preservado em '+name);
  assert(await page.locator('#favoriteList>*').count()===items,'Cards preservados em '+name);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Sem overflow desktop em '+name);
 }
 await page.locator('.composition-options summary').click();
 for(const layout of ['center','compact','split']){await page.selectOption('#heroLayoutInput',layout);assert(await page.locator('#profile').getAttribute('data-hero')===layout,'Composição '+layout);}
 await page.selectOption('#heroLayoutInput','center');await page.selectOption('#photoShapeInput','circle');
 await page.locator('#nameScaleInput').fill('130');await page.locator('#nameScaleInput').dispatchEvent('input');
 assert(await page.locator('#nameScaleValue').textContent()==='130%','Destaque do nome');
 await page.selectOption('#densityInput','airy');await page.uncheck('#showPortraitInput');
 assert(await page.locator('#profile .portrait-frame').isHidden(),'Ocultar retrato');
 await page.locator('[data-move="projects:-1"]').click();await page.locator('[data-move="projects:-1"]').click();
 assert(await page.locator('#sectionOrder .section-order-row').first().innerText().then(t=>t.includes('Projetos')),'Reorganização de seções');
 await page.uncheck('[data-section-toggle="languages"]');assert(await page.locator('#profile .languages-section').isHidden(),'Ocultar tecnologias');
 await page.uncheck('[data-section-toggle="projects"]');assert(!(await page.locator('#showProjects').isChecked()),'Controles de projetos sincronizados');
 await page.check('[data-section-toggle="projects"]');
 await page.locator('.section-copy-options summary').click();
 await page.fill('#collectionTitleInput','Minhas referências');await page.fill('#collectionDescriptionInput','Inspirações para os meus próximos trabalhos.');await page.fill('#projectsTitleInput','Projetos em destaque');await page.fill('#footerTextInput','Vamos criar algo juntos.');
 assert(await page.locator('#collectionHeading').textContent()==='Minhas referências','Título editável');
 const exp=page.waitForEvent('download');await page.locator('#exportButton').click();const zip=await exp;await zip.saveAs(path.join(base,'professor/evidencias/personalizacao-avancada-QA.zip'));
 await page.locator('.project-tools summary').click();const b=page.waitForEvent('download');await page.locator('#backupButton').click();const backup=await b;await backup.saveAs('/tmp/portfolio-avancado-backup.html');
 page.once('dialog',d=>d.accept());await page.setInputFiles('#importProject','/tmp/portfolio-avancado-backup.html');
 await page.waitForFunction(()=>location.protocol==='blob:'&&document.querySelector('#backupButton'));await page.waitForLoadState();
 assert(await page.locator('#portfolioEnhancements').count()===1,'Sem duplicar controles no backup');
 assert(await page.locator('#collectionTitleInput').inputValue()==='Minhas referências','Backup preserva campos extras');
 assert(await page.locator('#collectionHeading').textContent()==='Minhas referências','Backup preserva título');
 assert(await page.locator('#profile .portrait-frame').isHidden(),'Backup preserva retrato oculto');
 assert(await page.locator('#profile .languages-section').isHidden(),'Backup preserva visibilidade');
 assert(await page.locator('#sectionOrder .section-order-row').first().innerText().then(t=>t.includes('Projetos')),'Backup preserva ordem');
 await page.fill('#collectionTitleInput','Seleção revisada');assert(await page.locator('#collectionHeading').textContent()==='Seleção revisada','Edição depois de importar');
 await page.locator('[data-theme="editorial"]').click();assert(await page.locator('#collectionHeading').textContent()==='Seleção revisada','Troca de modelo preserva textos depois de importar');
 await page.screenshot({path:path.join(base,'professor/evidencias/portfolio-editorial-local.png'),fullPage:true});
 await page.setViewportSize({width:390,height:844});
 for(const name of ['minimal','editorial','terminal','aurora']){await page.locator('[data-theme="'+name+'"]').click();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Modelo mobile '+name);}
 for(const layout of ['center','split','compact']){await page.selectOption('#heroLayoutInput',layout);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Composição mobile '+layout);}
 assert(errors.length===0,'Sem erros de script: '+errors.join(';'));
 fs.writeFileSync(path.join(base,'professor/evidencias/resultado-personalizacao-local.json'),JSON.stringify({result:'PASS',checks:['quatro modelos','preservação de conteúdo','três composições','escala de nome','formato e visibilidade do retrato','densidade','títulos e textos','ordem e visibilidade das seções','sincronização dos controles de projetos','exportação ZIP','backup e restauração sem duplicar controles','edição após importar','modelos e composições mobile'],errors},null,2));
 console.log('PASS: modelos, composição, textos, seções, ZIP, backup e mobile.');
}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
