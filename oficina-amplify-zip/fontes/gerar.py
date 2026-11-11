"""Execute da raiz do workspace: python3 oficina-amplify-zip/fontes/gerar.py."""
from pathlib import Path
import base64, csv, hashlib, html, json, re, shutil, zipfile

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'oficina-amplify-zip'
BASE = OUT / 'fontes/base-editor'
BASE.mkdir(parents=True, exist_ok=True)
for filename in ['index.html','style.css','script.js']:
    if not (BASE / filename).is_file() and (ROOT / filename).is_file(): shutil.copy2(ROOT / filename, BASE / filename)
def write(name, content):
    p = OUT / name
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content, encoding='utf-8')
def zipped(name, files):
    with zipfile.ZipFile(OUT / name, 'w', zipfile.ZIP_DEFLATED) as z:
        for key, value in files.items():
            z.writestr(key, value)

CSS = (OUT/'fontes/laboratorio.css').read_text()
def page(title, body, version='v1'):
    return f'''<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title} | Oficina Amplify</title><link rel="stylesheet" href="style.css"></head>
<body><header><a href="index.html">PORTFÓLIO / LAB</a><nav><a href="index.html">Perfil</a><a href="projetos.html">Projetos</a><a href="contato.html">Contato</a></nav></header><main><p class="eyebrow">LABORATÓRIO • {version.upper()}</p>{body}</main><footer>Exemplo fictício para a oficina. Arquivos estáticos • publicação manual.</footer></body></html>'''
projects = page('Projetos', '<h1>Ideias que viraram projetos.</h1><div class="grid"><article class="card"><h2>Mapa cultural</h2><p>Um catálogo de lugares para descobrir a cidade.</p></article><article class="card"><h2>Estúdio digital</h2><p>Uma coleção de experimentos visuais.</p></article></div>')
contact = page('Contato', '<h1>Vamos conversar.</h1><p>Esta é a página de destino da reescrita <code>/fale-comigo</code>. Não há formulário nem envio a um backend.</p><a href="mailto:exemplo@example.com">Enviar e-mail pelo seu aplicativo</a>')
error = page('Página não encontrada', '<span class="badge">404</span><h1>Esse caminho não existe.</h1><p>O arquivo existe; o status 404 será configurado no Amplify para os caminhos ausentes. Abrir este arquivo diretamente pode retornar 200.</p><a href="index.html">Voltar ao perfil</a>')
special = page('Projeto especial', '<h1>Projeto em destaque.</h1><p>Você chegou ao destino da regra específica para <code>/antigo/especial</code>.</p>')
base = {'index.html': page('Perfil', '<h1>Construir. Publicar. Evoluir.</h1><p>Sou Alex. Este portfólio é o ponto de partida para configurar o Amplify Hosting.</p><div class="grid"><article class="card"><h2>Versão inicial</h2><p>Pacote de referência: v1. Guarde este ZIP antes de atualizar.</p></article><article class="card"><h2>Desafio</h2><p>Onde termina o conteúdo do pacote e começa a configuração da hospedagem?</p></article></div>'), 'style.css': CSS, 'projetos.html': projects, 'contato.html': contact, '404.html': error, 'especial.html': special}
v2 = dict(base)
v2['index.html'] = page('Perfil', '<span class="badge">VERSÃO 2</span><h1>Uma nova entrega no ar.</h1><p>O pacote mudou. As regras configuradas no console precisam ser avaliadas separadamente.</p><a href="projetos.html">Conheça meus projetos</a>', 'v2')
headers = """customHeaders:
  - pattern: '**'
    headers:
      - key: 'Content-Security-Policy'
        value: "frame-ancestors 'self'"
      - key: 'X-Oficina-Versao'
        value: 'politica-de-iframe'
"""
for name, files in [('laboratorio-v1.zip', base), ('laboratorio-v2.zip', v2), ('recuperacao-v1.zip', base), ('laboratorio-v2-com-cabecalhos.zip', dict(v2, **{'customHttp.yml':headers})), ('laboratorio-v1-com-cabecalhos.zip', dict(base, **{'customHttp.yml':headers}))]:
    zipped('aluno/pacotes/'+name, files)
for name, content in base.items(): write('laboratorio/'+name, content)
write('configuracoes/customHttp.yml', headers)
rules = [
    {'source':'/antigo/especial','target':'/especial.html','status':'301'},
    {'source':'/antigo/<*>','target':'/projetos.html','status':'301'},
    {'source':'/campanha','target':'/projetos.html','status':'302'},
    {'source':'/fale-comigo','target':'/contato.html','status':'200'},
    {'source':'/<*>','target':'/404.html','status':'404'},
]
bad = [rules[1], rules[0], *rules[2:]]
write('configuracoes/regras-corretas.json', json.dumps(rules, ensure_ascii=False, indent=2))
write('configuracoes/regras-conflito.json', json.dumps(bad, ensure_ascii=False, indent=2))
write('configuracoes/LEIA-ME.txt', '''Os arquivos JSON são conjuntos completos de regras para um aplicativo de laboratório.
Antes de aplicar: copie/exporte as regras atuais. Substitua o conjunto no editor do Amplify, sem duplicar o fallback existente. Não cole isso em uma aplicação de produção alheia ao laboratório.
Regra 404: fallback de recurso inexistente. Recursos reais como /style.css devem continuar sendo servidos. Diferente de uma reescrita 200 universal.
Não confunda 404 com 404-200. Teste status e corpo na AWS.
customHttp.yml deve entrar na raiz do ZIP ao lado de index.html; o pacote com cabeçalhos já contém esse arquivo. O arquivo prevalece sobre Custom headers no console. Após mudar cabeçalhos, publique novamente.
As regras JSON são aplicadas no console; colocá-las no ZIP não as configura automaticamente.
301 pode ficar armazenado no navegador. Teste alterações com cache desabilitado ou uma sessão limpa.
''')

write('professor/teste-incorporacao.html', (OUT/'fontes/teste-iframe.html').read_text())

STUDENT = '''# Guia do aluno — Amplify com ZIP

## Objetivo e preparação
Você já sabe HTML, CSS e JavaScript. Vamos configurar o Hosting que entrega a página. Trabalhe individualmente ou em dupla com acesso AWS preparado. Abra ABRIR-OFICINA.html no navegador; os materiais e o editor funcionam offline. A AWS exige internet.

## Como acompanhar a oficina visual
Escolha uma etapa no percurso superior. Cada etapa tem três momentos: Entender mostra a ideia; Fazer apresenta a ação e o local no console; Conferir indica o resultado que precisa ser observado. O desenho acompanha o momento selecionado. Em Endereços, experimente caminhos e ordem das regras; em Diagnóstico, selecione uma evidência; em Recuperação, compare os arquivos v2/v1. Essas interações são modelos locais, não executam alterações na AWS. As decisões técnicas completas ficam no painel Por que fazemos isso?; anotações e arquivos ficam em Meus registros e arquivos. Meu projeto abre o editor, e Voltar à oficina preserva sua sessão de edição.

## 1. Publique o pacote comum
Abra aluno/pacotes/laboratorio-v1.zip e confira index.html na raiz. Não envie o ZIP desta oficina inteira. No Amplify: Create new app → Deploy without Git → nome da aplicação → branch production → Drag and drop → selecione laboratorio-v1.zip → Save and deploy. Abra os detalhes da execução e o endereço publicado. Um nome de branch neste fluxo não exige repositório Git.

O pacote já contém arquivos publicáveis. Não haverá npm install, npm run build, amplify.yml ou SSR nesse envio. Se um projeto exigir build, ele deve acontecer antes da compactação. O index.html e suas dependências ficam diretamente na raiz do ZIP.

## 2. Resolva endereços no Amplify
Em Rewrites and redirects, guarde as regras atuais e aplique o conjunto de configuracoes/regras-corretas.json no editor apropriado. O JSON contém o conjunto completo; evite manter dois fallbacks. Salve e teste:

| Caminho | Resultado esperado |
| --- | --- |
| /antigo/especial | 301 para /especial.html; a barra de endereço muda. |
| /antigo/qualquer | 301 para /projetos.html. |
| /campanha | 302 para /projetos.html, mudança temporária. |
| /fale-comigo | 200, conteúdo de contato.html, endereço mantido. |
| /nao-existe | Corpo de 404.html e status 404. |
| /style.css | Arquivo CSS real, não HTML da página de erro. |

Agora aplique regras-conflito.json. Por que /antigo/especial chega ao destino errado? Faça uma previsão, confira a resposta e reposicione a regra específica. As regras são avaliadas de cima para baixo. Um 301 armazenado no navegador pode interferir: desabilite cache no DevTools ou teste em sessão limpa. Não aplique reescrita universal 200 ao nosso site multipágina.

## 3. Política de incorporação — percurso de 90 minutos
No laboratório do professor, publique laboratorio-v2-com-cabecalhos.zip. O customHttp.yml define Content-Security-Policy: frame-ancestors 'self'. Confira o cabeçalho no Network. Teste professor/teste-incorporacao.html de outra origem. Abrir diretamente continua permitido; o iframe externo deve ser bloqueado. Isso não é autenticação. Cabeçalhos no arquivo prevalecem sobre os do console. Após alterá-los, publique novamente. A mesma política aplicada à ferramenta da aula impediria sua incorporação externa; nosso alvo é o perfil público.

## 4. Investigue antes de alterar
Registre sintoma, hipótese, evidência e correção. Confira o pacote enviado, a regra correspondente e a resposta real. Em Monitoring, explore métricas e Access logs conforme disponíveis na conta. Eles ajudam a observar requisições; não registram automaticamente todos os erros JavaScript. Logs podem demorar e são fornecidos em melhor esforço. O CSV de exemplo do kit é sintético, não comprova acesso na AWS.

## 5. Atualize e recupere
Abra a aplicação/branch já criada e use a ação de nova publicação manual exibida no console. Envie laboratorio-v2.zip, confira a execução e a marca VERSÃO 2. Não crie outra aplicação para cada versão. Para recuperar os arquivos, envie recuperacao-v1.zip. Isso não restaura automaticamente regras alteradas no console. Revise também a configuração de cabeçalhos; remover o arquivo de um pacote não deve ser tratado como prova de que toda política anterior foi eliminada: confira a resposta efetiva.

## 6. Personalize e publique o seu
Na oficina, clique em Personalizar. Edite nome, bio, cores, foto, links e projetos. O novo ZIP inclui também páginas de apoio à prática e um arquivo VERSAO.txt. As páginas auxiliares levam seu nome e a página de projetos replica seus projetos. Confira o resultado antes de publicar. Os cards públicos usam details/summary; o JavaScript do editor não vai junto.

Use Salvar projeto editável para guardar a sessão e Importar projeto para retomá-la. Esse backup HTML é um documento executável: importe somente um backup criado por você ou de fonte confiável. O ZIP público e o backup editável têm funções diferentes. Guarde o ZIP validado e anote nome/horário da versão. Após publicar, teste links, uma regra e uma página ausente; peça a outra dupla para conferir.

## Entrega e votação
Envie nome/dupla, URL publicada e uma decisão de configuração que consiga explicar. Participe com uma página funcional e personalizada. A votação premia a apresentação visual; o desafio técnico é justificar uma regra ou diagnóstico.

## Encerramento
Combine com os organizadores o que deve permanecer publicado e quem remove os recursos. O endereço padrão não implica uso ilimitado gratuito. Não há necessidade de comprar domínio ou usar Route 53 nesta prática.
'''
TEACHER = (OUT/'fontes/roteiro-apresentador.md').read_text()

INVESTIGATION = '''# Ficha de investigação e entrega

Nome/dupla: ____________________  Data: __________
Aplicação / região / branch: ____________________
URL publicada: ____________________
ZIP e versão enviados: ____________________
Horário/ID da execução: ____________________

## Antes de corrigir
Sintoma observado e caminho exato: ____________________
Resultado esperado: ____________________
Hipótese: pacote / regra / cabeçalho / outro: ____________________
Evidência consultada e resultado (status, destino, corpo ou registro): ____________________
Correção escolhida e motivo: ____________________
Resultado após verificar: ____________________

## Registro de configuração
Regras atuais salvas em: ____________________
Cabeçalhos vêm do console ou do pacote? ____________________
Pacote validado de recuperação: ____________________
O que o reenvio desse pacote não restaura? ____________________

## Entrega / votação
Nome, URL funcional, nome do ZIP, uma regra justificada e uma evidência de verificação. Cada pessoa vota uma vez em outra página. Vence a mais votada pela apresentação visual; empate: voto de desempate dos organizadores. Formulário: usar o modelo CSV ou preparar previamente em uma ferramenta escolhida pelos organizadores. Este kit não cria um serviço de votação compartilhada.
'''
CHECK = '''# Evidências reais para coletar no ensaio AWS

Nenhuma captura ou log AWS real foi produzido na geração deste kit. Os testes locais não comprovam o comportamento da conta ou das configurações do Amplify.

| Evidência | Como produzir | Arquivo sugerido |
| --- | --- | --- |
| v1 publicada | Tela da execução e página com marca v1 | 01-publicacao-v1.png |
| Regras corretas | Console com conjunto salvo | 02-regras.png |
| Conflito e correção | Network do primeiro salto e destinos | 03-conflito.png |
| Erro real | /nao-existe com status 404 e corpo próprio | 04-404.png |
| Cabeçalho | Resposta com CSP e X-Oficina-Versao | 05-cabecalho.png |
| Incorporação | Página de outra origem e Console com bloqueio | 06-frame.png |
| Atualização/recuperação | Histórico e marcas v2/v1 | 07-recuperacao.png |
| Acessos | Arquivo real do intervalo conhecido | 08-acessos-real.csv |
| Métricas | Janela de tempo e métricas relevantes | 09-metricas.png |

Registre data, região, pacote/versão, configuração e resultado. Remova identificadores de conta, dados pessoais e segredos antes de distribuir. A consulta opcional na etapa de links usa os mesmos dados do CSV sintético; não o renomeie como evidência real.
'''
SOURCES = '''# Fontes e limites técnicos

Consultadas em 11/11/2026. Confirme nomes das telas na região/conta no ensaio.

- [Deploy manual](https://docs.aws.amazon.com/amplify/latest/userguide/manual-deploys.html): ZIP de saída pronta, raiz correta e ausência de suporte manual a SSR.
- [Regras](https://docs.aws.amazon.com/amplify/latest/userguide/redirects.html): diferenças entre 301, 302, 200 e 404 e ordem de avaliação.
- [Custom headers](https://docs.aws.amazon.com/amplify/latest/userguide/setting-custom-headers.html): console/arquivo, prevalência de customHttp.yml e nova publicação para aplicar.
- [Monitoramento](https://docs.aws.amazon.com/amplify/latest/userguide/access-logs.html): métricas, registros de acesso e CloudTrail são evidências diferentes.

O simulador cobre só os caminhos e padrões do laboratório, sem consulta à AWS, sem reproduzir cache, normalização de URLs, condições, query strings ou todas as formas de regras. Diagramas, marcações de conclusão e CSV sintético são recursos didáticos. Evidência real deve ser coletada na conta.
'''
README = '''# Comece aqui

1. Extraia este pacote completo.
2. Abra ABRIR-OFICINA.html no navegador. Funciona offline e contém editor e materiais incorporados.
3. Leia aluno/GUIA-RAPIDO.html ou PDF; o professor usa professor/ROTEIRO-APRESENTADOR.html ou PDF.
4. Para publicar o laboratório no Amplify, envie aluno/pacotes/laboratorio-v1.zip. Não envie o ZIP do kit inteiro.
5. Personalize na oficina e baixe seu ZIP. Salve também um backup editável para retomar a sessão.

O pacote aluno distribui somente a oficina e as instruções da turma. O pacote completo inclui soluções, fontes e roteiro. Laboratório usa páginas de exemplo fictícias. Não é necessário Git, Node ou Python para usar; Python só é usado para regenerar o material.

## Local e publicação
Duplo clique em ABRIR-OFICINA.html abre a oficina. Para testar incorporação, sirva professor/teste-incorporacao.html em outra origem, por exemplo com python3 -m http.server 8787 dentro desta pasta, e use a URL HTTPS do perfil publicado no Amplify. Acesso local à oficina não executa as regras AWS.

## Arquivos
- aluno/pacotes: ZIPs publicáveis; recuperação-v1 é idêntica à v1.
- laboratorio: fontes descompactadas da v1.
- configuracoes: regras para aplicar no console e política opcional para pacote.
- professor: roteiro, soluções, ficha, CSV sintético e checklist de evidências reais.
- fontes: gerador e extensão do editor para manutenção.
- VALIDACAO.md: verificações executadas e limites.

Não foi criado serviço de votação: há modelo CSV e critérios para organizar o formulário. Não foram gerados logs ou capturas reais da AWS. Contas, permissões, custos e coleta de evidências fazem parte do ensaio antes da aula.
'''
etapas = json.loads((OUT/'fontes/etapas.json').read_text())
STUDENT = '''# Guia do aluno — Amplify com ZIP

## Antes de começar
Abra ABRIR-OFICINA.html no navegador. Você pode acompanhar a oficina e personalizar offline; publicar exige internet e acesso AWS preparado. Acesse a aplicação pela sua conta ou em dupla, conforme a organização da aula.

Cada etapa tem três momentos: Entender apresenta o problema; Fazer mostra a ação; Conferir mostra o resultado esperado. A indicação de local informa se a ação acontece nesta oficina, no console AWS ou no site publicado. Os desenhos e o simulador não alteram a AWS.

Use Meu projeto para abrir o editor. Por que fazemos isso? contém a explicação técnica; Meus registros e arquivos reúne suas anotações, URL e downloads. Guarde seu registro antes de encerrar.
'''
for i, etapa in enumerate(etapas, 1):
    STUDENT += '\n## '+str(i)+'. '+etapa['title']+'\n\n'+etapa['intro']+'\n'
    for label, fase in zip(['Entender','Fazer','Conferir'], etapa['phases']):
        STUDENT += '\n### '+label+' — '+fase[0]+'\n\nOnde: '+' → '.join(fase[2])+'.\n\n'+fase[1]+'\n\n'
        STUDENT += '\n'.join(str(n)+'. '+texto for n,texto in enumerate(fase[3],1))+'\n'
    STUDENT += '\nResultado esperado: '+etapa['check']+'\n\nPara entender: '+etapa['choice']+'\n\nDetalhe da prática: '+etapa['action']+'\n'
STUDENT += '''
## Antes de fechar o editor
Em Salvar e retomar edição, salve seu backup editável. Para publicar, use Baixar meu ZIP: esse arquivo contém as páginas prontas e recebe seu nome mais um código aleatório. O backup retoma a edição; o ZIP público entrega o site. Importe somente backups criados por você ou de fonte confiável, pois o HTML editável contém código executável.

## Entrega e encerramento
Compartilhe nome/dupla, URL publicada e uma regra que consiga explicar. Peça a outra pessoa para conferir a página. A votação é organizada pela turma; este material não cria um serviço de votação. Combine com os organizadores quem mantém ou remove os recursos e os custos. O endereço padrão do Amplify não implica uso ilimitado gratuito.

## Sobre os exemplos
Os registros de acesso são consulta complementar da etapa de links, sem atividade independente. O CSV do kit é sintético e opcional. Evidências reais do Amplify devem ser coletadas no ensaio. O teste de iframe confirma seu resultado no navegador, não detecta automaticamente bloqueio ou sucesso. Não é necessário Git nem comprar domínio nesta prática.
'''
docs = {'aluno/GUIA-RAPIDO':STUDENT, 'professor/ROTEIRO-APRESENTADOR':TEACHER, 'professor/FICHA-INVESTIGACAO':INVESTIGATION, 'professor/evidencias/COLETAR-NA-AWS':CHECK, 'FONTES':SOURCES, 'LEIA-ME':README}
def md_html(md):
    # Renderizador mínimo para o subconjunto Markdown usado no kit, sem dependências.
    out=[]; table=[]; listing=False
    def flush():
        if table:
            rows=[r for r in table if not re.match(r'^\|[\s:|\-]+\|$',r)]
            out.append('<table>'+''.join('<tr>'+''.join('<'+('th' if i==0 else 'td')+'>'+inline(c.strip())+'</'+('th' if i==0 else 'td')+'>' for c in row.strip('|').split('|'))+'</tr>' for i,row in enumerate(rows))+'</table>');table.clear()
    def inline(s):
        s=html.escape(s)
        return re.sub(r'\[([^]]+)\]\((https://[^)]+)\)',r'<a href="\2">\1</a>',s)
    for line in md.splitlines():
        if line.startswith('|'): table.append(line);continue
        flush()
        if line.startswith('#'):
            n=len(line)-len(line.lstrip('#'));out.append(f'<h{n}>{inline(line[n:].strip())}</h{n}>')
        elif line.strip(): out.append('<p>'+inline(line)+'</p>')
    flush()
    return '<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+html.escape(md.splitlines()[0].lstrip('# '))+'</title><style>body{max-width:960px;margin:40px auto;padding:0 24px;font:16px/1.6 system-ui;color:#172438}h1,h2{line-height:1.2}h2{margin-top:32px}table{border-collapse:collapse;width:100%;font-size:14px}td,th{border:1px solid #b5bfcc;padding:9px;text-align:left}th{background:#e8eef4}a{color:#075c9b}@media print{body{margin:0;font-size:11pt}h2{break-after:avoid}tr{break-inside:avoid}a{color:inherit}@page{size:A4;margin:16mm}}</style><body>'+''.join(out)+'</body></html>'
for name, content in docs.items():
    write(name+'.md', content);write(name+'.html', md_html(content))
write('professor/modelo-votacao.csv', 'nome,dupla,url_publicada,zip_versao,decisao_tecnica,voto_em\n')
write('professor/evidencias/acessos-SINTETICOS.csv', 'origem,timestamp_utc,caminho,status,observacao\nSINTETICO,2026-11-11T10:00:00Z,/,200,pagina inicial\nSINTETICO,2026-11-11T10:01:00Z,/curriculo,404,link sem destino\nSINTETICO,2026-11-11T10:02:00Z,/curriculo,404,segunda tentativa\nSINTETICO,2026-11-11T10:03:00Z,/fale-comigo,200,conferir corpo\nSINTETICO,2026-11-11T10:04:00Z,/favicon.ico,404,recurso ausente\n')

# O editor existente é incorporado com CSS e scripts locais. A cópia evita alterar a aula iniciante.
editor = (BASE/'index.html').read_text()
editor = editor.replace('data-background="grid" data-layout="grid"','data-background="solid" data-layout="grid" data-tone="light"')
editor = editor.replace('value="#c7fa62"','value="#ff9900"').replace('data-accent="#c7fa62" style="--swatch:#c7fa62" aria-label="Verde elétrico"','data-accent="#ff9900" style="--swatch:#ff9900" aria-label="Laranja AWS"')
editor = editor.replace('id="backgroundColorInput" type="color" value="#111412"','id="backgroundColorInput" type="color" value="#ffffff"')
editor = editor.replace('<option value="grid">Grade</option>','<option value="grid">Grade</option>').replace('<option value="solid">Liso</option>','<option value="solid" selected>Liso</option>')
editor = editor.replace('m/</span> meu.espaço','a/</span> Meu portfólio').replace('STUDIO</span>','AMPLIFY LAB</span>')
editor = editor.replace('SEU ESPAÇO. SUAS ESCOLHAS.','PERSONALIZE SEU PORTFÓLIO').replace('Monte seu perfil<span>.</span>','Comece por você<span>.</span>').replace('Preencha, experimente e veja acontecer ao lado.','Preencha os campos e acompanhe sua página na prévia.')
editor = editor.replace('<p class="editor-note">Edite nesta sessão e baixe antes de fechar. O download inclui seus textos, cores e imagens.</p>','<p class="editor-note">Baixe o ZIP para publicar. Guarde também o backup editável para continuar depois.</p>')
editor = editor.replace('PERSONAL PROFILE / 001','SUA PÁGINA PUBLICÁVEL').replace('PRÉVIA AO VIVO','PRÉVIA DO SEU PORTFÓLIO').replace(' / PERSONAL ARCHIVE',' / PORTFÓLIO').replace('IDENTITY /','RETRATO /').replace('WORK IN PROGRESS','MEUS PROJETOS')
editor = editor.replace('<main class="studio-shell"', '<div class="studio-workflow" aria-label="Como concluir"><span><b>1</b> Personalize</span><span><b>2</b> Salve sua edição</span><span><b>3</b> Baixe e publique o ZIP</span></div><main class="studio-shell"')
editor = editor.replace('<details class="editor-section" open>', '<details class="editor-section" open>',1)
marker='      <!-- AULA: os campos com data-edit'
editor = editor.replace(marker, '<details class="project-tools"><summary>Salvar e retomar edição</summary><p>Backup editável: guarda esta edição. ZIP: leva as páginas prontas para o Amplify.</p><div id="projectTools"></div></details>'+marker)
editor_css = (BASE/'style.css').read_text() + (OUT/'fontes/editor-design.css').read_text()

editor_script = (BASE/'script.js').read_text()
extra = {'projetos.html':projects, 'contato.html':contact, '404.html':error, 'especial.html':special}
editor_script = editor_script.replace('{ nome: "style.css", conteudo: css },', '''{ nome: "style.css", conteudo: css },
      ...Object.entries(window.paginasOficina(nome)).map(([nome,conteudo])=>({nome,conteudo})),''')
extension = '''
// Extensão da oficina: páginas publicáveis e backup completo dos controles e do perfil.
const modelosOficina = MODELOS;
window.paginasOficina = nome => {
 const resultado={};
 for(const [arquivo,modelo] of Object.entries(modelosOficina)){
  const d=new DOMParser().parseFromString(modelo,'text/html');
  d.title=nome+' | '+d.title;
  d.querySelector('header a').textContent=nome+' / PERFIL';
  d.querySelector('header nav')?.remove();
  // As páginas auxiliares preservam seus estilos independentemente do tema do perfil.
  d.querySelector('link[rel=stylesheet]').remove();
  const s=d.createElement('style');s.textContent=CSSLAB;d.head.append(s);
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
  resultado[arquivo]='<!doctype html>\\n'+d.documentElement.outerHTML;
 }
 resultado['VERSAO.txt']='Perfil de '+nome+'\\nExportado em '+new Date().toISOString()+'\\n';
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
 state.textContent=JSON.stringify({version:1,profile:document.querySelector('#profile').outerHTML}).replace(/</g,'\\u003c');
 copia.querySelector('body').prepend(state);
 copia.querySelectorAll('#downloadReady,#backupReady,#importReady,#backupButton,#importLabel').forEach(x=>x.remove());
 const ready=document.createElement('a');ready.className='button button-accent';ready.id='backupReady';ready.download='meu-projeto-editavel.html';ready.textContent='Salvar backup HTML';
 if(urlBackup)URL.revokeObjectURL(urlBackup);urlBackup=URL.createObjectURL(new Blob(['<!doctype html>\\n'+copia.outerHTML],{type:'text/html'}));ready.href=urlBackup;
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
'''.replace('MODELOS',json.dumps(extra,ensure_ascii=False)).replace('CSSLAB',json.dumps(CSS))
portfolio_options=(OUT/'fontes/portfolio-opcoes.js').read_text().replace('CONTROLES_PORTFOLIO',json.dumps((OUT/'fontes/portfolio-controles.html').read_text(),ensure_ascii=False))
extension += '\n'+portfolio_options
write('fontes/editor-extensao.js', extension)
editor = re.sub(r'<link rel="stylesheet" href="style.css"\s*/>',lambda _: '<style data-export-style>'+editor_css+'</style>',editor)
editor = re.sub(r'<script src="script.js" defer></script>', '', editor)
editor = editor.replace('</body>','<script>'+ (editor_script+'\n'+extension).replace('</script','<\\/script')+'</script></body>')
editor = re.sub(r'(?m)^[ \t]+$', '', editor)
write('aluno/EDITOR-PERFIL.html',editor)

# Conteúdo de missões, sempre com ações no console e evidência observável.
missions = etapas

# Recursos embutidos garantem downloads mesmo abrindo só este HTML offline.
assets={}
for folder in ['aluno/pacotes','configuracoes']:
    for p in (OUT/folder).iterdir():
        if p.is_file():assets[str(p.relative_to(OUT))]=base64.b64encode(p.read_bytes()).decode()
for p in [OUT/'aluno/GUIA-RAPIDO.html', OUT/'professor/evidencias/acessos-SINTETICOS.csv', OUT/'professor/FICHA-INVESTIGACAO.html', OUT/'professor/teste-incorporacao.html']:
    assets[str(p.relative_to(OUT))]=base64.b64encode(p.read_bytes()).decode()

template = (OUT/'fontes/oficina-template.html').read_text().replace('/*__EXPERIMENTS__*/',(OUT/'fontes/experimentos.js').read_text()).replace('/*__STYLES__*/',(OUT/'fontes/oficina.css').read_text())
records = list(csv.DictReader((OUT/'professor/evidencias/acessos-SINTETICOS.csv').read_text().splitlines()))
payload={'records':records,'missions':missions,'rules':rules,'badRules':bad,'assets':assets,'editor':editor,'guide':md_html(STUDENT)}
encoded=json.dumps(payload,ensure_ascii=False).replace('</','<\\/')
write('ABRIR-OFICINA.html',template.replace('/*__PAYLOAD__*/', 'const DATA = '+encoded+';'))
write('index.html',(OUT/'ABRIR-OFICINA.html').read_text())
print('Material HTML, fontes e ZIPs de publicação gerados em', OUT)
