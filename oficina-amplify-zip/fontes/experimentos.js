// Experimentos locais. Não consultam nem alteram a conta AWS.
function policyMarkup(moment) {
  const restricted = moment > 0;
  return '<div class="policy-case"><p class="eyebrow">'+(restricted?'DEPOIS · RESULTADO ESPERADO':'ANTES · O PROBLEMA DO EXEMPLO')+'</p><div class="mini-browser"><div class="browser-top"><span class="dot"></span><span class="dot"></span><div class="address">portal-de-outra-pessoa.exemplo</div></div><div class="browser-content"><p class="third-party-brand">Portal de outra pessoa</p><p class="muted" style="font-size:12px">A marca e o endereço pertencem a outro site.</p><div class="embedded-portfolio '+(restricted?'restricted':'')+'"><span aria-hidden="true">'+(restricted?'⊘':'AM')+'</span><div><b>'+(restricted?'O frame deve ser bloqueado.':'Seu portfólio aparece aqui dentro.')+'</b><p>'+(restricted?'O conteúdo deixa de ser exibido neste outro site.':'O visitante vê seu conteúdo sem sair deste portal.')+'</p></div></div></div></div><div class="policy-row"><span class="allowed">✓ Abrir seu link diretamente continua permitido.</span></div><div class="actions" style="justify-content:center"><button id="visualTest" class="primary">Abrir teste real de iframe ↗</button></div><p class="caption">Desenho ilustrativo. Compare antes e depois no teste real.</p></div>';
}

function recordsMarkup() {
  return '<div class="records-lab"><p class="eyebrow">REGISTROS FICTÍCIOS · LEITURA GUIADA</p><p class="records-intro">Cada linha mostra um acesso ao site. Selecione um caminho para interpretar o resultado.</p><div class="resources"><button id="recordsAll" type="button">Todos os acessos</button><button id="recordsErrors" type="button">Somente erros</button></div><div class="records-table-wrap"><table class="records-table"><caption class="sr-only">Exemplo de acessos ao site, com horário UTC, caminho e resultado.</caption><thead><tr><th>Hora UTC</th><th>Caminho pedido</th><th>Resultado</th></tr></thead><tbody id="recordsBody"></tbody></table></div><div class="record-detail" aria-live="polite"><span id="traceStatus" class="version"></span><h3 id="traceTitle"></h3><p id="traceHint"></p></div><p class="caption">Clique em um caminho para interpretar o acesso. Não precisa abrir CSV.</p></div>';
}

function showRecords(onlyErrors = false) {
  const body = document.querySelector('#recordsBody');
  if (!body) return;
  body.replaceChildren();
  DATA.records.forEach((record, index) => {
    if (onlyErrors && Number(record.status) < 400) return;
    const row = document.createElement('tr');
    const time = document.createElement('td');
    time.textContent = record.timestamp_utc.slice(11,19);
    const request = document.createElement('td');
    const button = document.createElement('button');
    button.type='button';button.dataset.record=index;button.textContent=record.caminho;
    button.addEventListener('click',()=>selectRecord(index));request.append(button);
    const result = document.createElement('td');
    const badge = document.createElement('span');
    badge.className=Number(record.status)>=400?'record-error':'record-ok';
    badge.textContent=record.status+' · '+(record.status==='404'?'Não encontrado':'Recebido');
    result.append(badge);row.append(time,request,result);body.append(row);
  });
  document.querySelector('#recordsAll').setAttribute('aria-pressed',String(!onlyErrors));
  document.querySelector('#recordsErrors').setAttribute('aria-pressed',String(onlyErrors));
  selectRecord(1);
}

function selectRecord(index) {
  const r=DATA.records[index];
  if(!r)return;
  document.querySelector('#traceStatus').textContent=r.status+' · '+r.caminho;
  document.querySelector('#traceTitle').textContent=r.caminho==='/curriculo'?'O currículo não foi encontrado.':r.status==='404'?'Outro recurso também não foi encontrado.':'O servidor entregou uma resposta.';
  document.querySelector('#traceHint').textContent=r.caminho==='/curriculo'?'Confira se o pacote tem uma página de currículo e se há uma regra para esse caminho. O código 404 não explica sozinho a causa.':r.status==='404'?'Este pedido é por um ícone do site. O código é o mesmo, mas o impacto é diferente do currículo que um visitante procurava.':'Receber uma resposta 200 não prova que o conteúdo era o esperado. Confira também a página recebida.';
  document.querySelectorAll('[data-record]').forEach(button=>{
    const active=Number(button.dataset.record)===index;
    button.setAttribute('aria-pressed',String(active));button.closest('tr').classList.toggle('record-selected',active);
  });
}

function mountRecords() {
  if(!document.querySelector('#recordsBody'))return;
  document.querySelector('#recordsAll').onclick=()=>showRecords(false);
  document.querySelector('#recordsErrors').onclick=()=>showRecords(true);
  showRecords(false);
}
