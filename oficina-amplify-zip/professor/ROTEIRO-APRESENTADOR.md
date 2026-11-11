# Como apresentar a oficina — roteiro de falas e cliques

Este roteiro acompanha ABRIR-OFICINA.html. Público que já conhece HTML, CSS e JavaScript. A prática usa somente ZIP. A demonstração de iframe é extra para 90 minutos; a investigação acontece dentro da etapa de links; registros de acesso são apenas consulta opcional.

## Prepare antes de receber a turma

1. Confirme acessos AWS, permissões e região. Organize uma aplicação por pessoa ou dupla, conforme a capacidade da conta. As contas precisam estar prontas antes do cronômetro começar.
2. Abra três abas: a oficina visual, o console Amplify e o site de laboratório. Abra o teste externo em outra aba quando chegar à demonstração de iframe.
3. Separe os ZIPs v1, v1-com-cabecalhos, v2 e recuperação-v1. O pacote de distribuição da oficina inteira não deve ser enviado como site de aluno.
4. Faça um ensaio das regras corretas e do conflito na sua aplicação de demonstração. Guarde as regras anteriores, confirme o status 404 e observe possíveis redirecionamentos armazenados pelo navegador.
5. Para a etapa extra, compare a exibição em iframe antes e depois da restrição. O pacote v1-com-cabecalhos mantém o conteúdo v1. Se já houver bloqueio antes, descubra a política existente; não apresente isso como efeito da nova configuração.
6. Se quiser mostrar Access logs como complemento da etapa 2, prepare um registro real antes. A tabela fictícia fica recolhida em Por que fazemos isso?; não exige atividade nem tempo próprio. O checklist COLETAR-NA-AWS orienta a coleta opcional.
7. Tenha uma aplicação pronta e capturas identificadas para continuar explicando enquanto um deploy executa. Teste o editor, JPG, backup, ZIP e a URL da votação. Combine responsáveis pelos custos e pelo encerramento dos recursos.

## Distribuição do tempo

| Bloco | Aula de 90 min | Aula de 60 min |
| --- | --- | --- |
| Etapa 1: publicação | 0–10 | 0–8 |
| Etapa 2: links, investigação e correção | 10–30 | 8–26 |
| Etapa 3: iframe, demonstração extra | 30–40 | Pular |
| Etapa 4: atualizar e voltar | 40–50 | 26–35 |
| Etapa 5: personalização protegida | 50–80 | 35–55 |
| Verificação, votação e margem | 80–90 | 55–60 |

Não há tempo adicional de apresentação fora desses blocos. Evite ler todos os detalhes técnicos projetados. Explique uma decisão depois de a turma observar o efeito.

## Abertura — dentro do tempo da etapa 1

Fale: “Vocês já sabem fazer uma página. Hoje vamos usar o Amplify para publicá-la, decidir como os endereços funcionam, investigar um acesso com erro e trocar a versão que está no ar.”

Mostre as cinco etapas no topo. Explique: “Entender apresenta o problema; Fazer mostra onde clicar; Conferir mostra o resultado que vamos procurar. O desenho ajuda a pensar. A configuração real acontece no console AWS.”

Mostre o portfólio pronto por alguns segundos. Diga: “Esta é a base comum. No final, teremos tempo para cada pessoa criar e publicar a própria versão.”

## Etapa 1 — publicar o site

### Entender: mostre o que será enviado

1. Na oficina, selecione Publicar → Entender.
2. Clique em Baixar site pronto · v1. Abra o ZIP para mostrar index.html, style.css e as páginas auxiliares.
3. Aponte o desenho ZIP → Amplify → página. Fale: “O Amplify recebe os arquivos prontos. Ele não vai executar nossos comandos de desenvolvimento nesse envio.”

Pergunte: “Se eu compactar uma pasta extra em volta de index.html, onde a página inicial vai ficar?” Espere duas respostas. Explique que os arquivos devem ficar na raiz do ZIP.

### Fazer: conduza o primeiro envio

1. Selecione Fazer na oficina e depois vá ao console.
2. No Amplify, escolha Create new app → Deploy without Git. Informe oficina-seu-nome e branch production. Explique que esse nome identifica a publicação manual; não precisamos de Git.
3. Escolha Drag and drop, envie laboratorio-v1.zip e clique em Save and deploy. Acompanhe a execução. Confirme os nomes das ações no ensaio, porque a interface pode mudar.

Enquanto publica, peça que os alunos encontrem os arquivos no próprio ZIP. Não abra uma explicação longa sobre rede. Diga apenas que o endereço será usado para acessar os arquivos hospedados.

### Conferir: identifique a versão

Abra a URL fornecida pelo Amplify e mostre a marca v1. Peça à turma que guarde sua URL. Só marque a conclusão se o site real abrir.

Transição: “O site está acessível. Agora vamos resolver uma situação de quem já divulgou um link e depois mudou de endereço.”

## Etapa 2 — resolver links antigos

### Entender: apresente o caso antes dos códigos

Fale: “Divulguei vários projetos em links que começavam com /antigo/. Agora quero mandar esses acessos para a lista de projetos. Mas um link especial deve abrir o projeto em destaque.”

1. Selecione Links antigos → Entender. Na simulação, mantenha /antigo/especial.
2. Mostre o destino /especial.html. Troque a ordem para Os links antigos vêm primeiro.
3. Antes de revelar a resposta, pergunte: “A regra geral também aceita esse endereço? Qual vai ser usada primeiro?” Observe a mudança para /projetos.html.

Explique: “O Amplify lê as regras na ordem. A exceção precisa vir antes do grupo.” Mostre as regras no painel recolhido somente depois dessa observação. O padrão <*> significa qualquer continuação do caminho.

### Fazer: descubra qual regra explica o erro

1. Selecione Fazer e abra Ver quais regras estão sendo testadas. A linha destacada atende primeiro ao caminho informado.
2. Pergunte: “O ZIP está errado ou uma regra está levando a outro destino?”. Compare a regra geral com a específica; a primeira correspondência explica o resultado.
3. Vá a Rewrites and redirects no Amplify e confira a ordem real. Guarde a configuração antes de editar. Na demonstração do professor, use o conjunto com conflito já preparado; os alunos podem acompanhar o diagnóstico na simulação.

Diga: “Agora temos uma hipótese sustentada por uma evidência. Reenviar o mesmo ZIP não muda a ordem dessas regras.”

### Conferir: corrija e repita o acesso

1. Baixe regras-corretas.json e use o conjunto como referência para colocar a regra específica acima da geral no Amplify. O arquivo JSON não configura o serviço só por estar no ZIP.
2. Salve e repita exatamente /antigo/especial na URL publicada. Confira que o destino passou a ser /especial.html.
3. Compare com o resultado errado anterior. Se um 301 armazenado persistir, use sessão limpa ou desabilite o cache no DevTools. Não mantenha dois fallbacks conflitantes.

### Amplie a comparação se houver tempo

Abra cada endereço no site publicado, explicando o motivo depois do resultado:

| Acesso | O que mostrar | Decisão |
| --- | --- | --- |
| /antigo/especial | Endereço muda para /especial.html | 301: mudança definitiva. |
| /campanha | Endereço muda temporariamente para projetos | 302: destino temporário. Demonstre se houver tempo. |
| /fale-comigo | Mostra Contato e mantém /fale-comigo | 200: entrega outro arquivo sem trocar o endereço mostrado. |
| /nao-existe | Nossa página de erro; confirme status 404 no Network | O recurso não existe. Não mascarar tudo com 200. |

Consulta complementar, sem atividade separada: em Por que fazemos isso?, abra Consulta opcional: registros de acesso se quiser mostrar como investigar acessos de outros visitantes. A tabela é fictícia e dispensa planilha. Explique apenas que Access logs ajuda a observar caminho/status, mas não prova sozinho a causa nem captura todas as exceções JavaScript. O CSV é opcional. Não é preciso abrir essa consulta para concluir a etapa.

Transição para 90 minutos: “Já decidimos qual página responder. Agora vou mostrar uma outra configuração da resposta: permitir ou não que outro site mostre nossa página dentro dele.”

Transição para 60 minutos: “Resolvemos o link e verificamos a resposta. Agora vamos trocar os arquivos do site e aprender a voltar à versão anterior.” Pule a etapa 3 e abra Atualizar.

## Etapa 3 — demonstração extra: exibição dentro de outro site

### Explique a motivação

Fale: “Imagine que um agregador colocou seu portfólio dentro da página dele. O visitante vê seus projetos, mas a barra de endereço e a marca continuam sendo do agregador. Se eu não quiser essa exibição, onde configuro isso?”

Esclareça: esse é um exemplo de escolha do responsável pelo site. Iframe também tem usos legítimos. O exercício não trata cópia de conteúdo nem substitui autenticação.

### Entender: veja o estado anterior

1. Na etapa 3, selecione Entender e abra o teste externo pelo botão da ilustração.
2. Cole a URL do portfólio ainda sem o arquivo de restrição e clique em Carregar no iframe. Esta página de teste deve estar fora do site do perfil, por exemplo no navegador local.
3. Compare com Abrir link diretamente. Fale: “Estamos olhando a mesma página, mas em contextos diferentes.”

Se o iframe já estiver bloqueado, abra o Console e os cabeçalhos. Diga: “Neste ambiente já existe uma restrição. Vamos identificar qual é.” Use a evidência anterior do ensaio para explicar a comparação. Não prometa que todo site sem nosso arquivo permitirá incorporação.

### Fazer: configure a restrição pelo pacote

1. Volte à oficina, selecione Fazer e baixe laboratorio-v1-com-cabecalhos.zip.
2. Mostre somente a regra frame-ancestors 'self' em customHttp.yml. Fale: “Estamos pedindo que o Amplify envie uma instrução para o navegador: só o próprio site pode colocar esta página em um frame.”
3. Envie o ZIP na mesma aplicação e aguarde a publicação. O conteúdo continua v1; a mudança que queremos observar é a regra de exibição.

### Conferir: repita exatamente o teste

1. No teste externo, carregue novamente a URL. Observe o bloqueio.
2. Abra diretamente: o portfólio deve continuar acessível.
3. No Console, leia o motivo do bloqueio. No Network, confira o cabeçalho Content-Security-Policy da resposta do documento.

Pergunte: “Bloqueamos a visita ao perfil ou a exibição do perfil dentro de outro site?” Resposta esperada: a exibição em outro site. Uma área vazia não comprova sozinha que a regra funcionou.

Feche o teste. Transição: “Já verificamos endereços e uma configuração da resposta. Agora vamos atualizar os arquivos e recuperar uma versão anterior.”

## Etapa 4 — atualizar e recuperar

1. Selecione Atualizar → Entender. Nos botões da ilustração, alterne v2 e v1. Explique que esses botões só ilustram; o upload real será feito no console.
2. Em Fazer, baixe laboratorio-v2.zip, abra a aplicação existente e use a ação de nova publicação manual. Aguarde e confira VERSÃO 2 no site.
3. Baixe recuperacao-v1.zip, publique na mesma aplicação e confira a marca v1.
4. Em Conferir, teste /antigo/especial. Pergunte: “Reenviar o ZIP anterior mudou a ordem das regras que salvamos no console?” Resposta: as regras precisam de verificação e registro próprios.
5. Confira também os cabeçalhos. Remover um arquivo do pacote não é evidência suficiente para afirmar que toda configuração anterior foi eliminada.

Transição: “Agora vocês sabem publicar, configurar e investigar. Vamos usar esse fluxo para uma página que represente cada um.”

## Etapa 5 — personalização com tempo protegido

1. Abra Seu portfólio → Entender → Personalizar meu site. Mostre em um minuto a escolha de um modelo, o nome, um projeto e a ordem das seções. Evite explicar sintaxe.
2. Fale: “Vocês têm 30 minutos” na aula de 90, ou “20 minutos” na de 60. Projete o horário de término. Quem terminar cedo verifica a página de uma dupla.
3. No meio do período, relembre a diferença: Salvar e retomar edição guarda o backup; Baixar meu ZIP gera os arquivos públicos. O ZIP tem nome da pessoa e código aleatório.
4. Peça que publiquem esse ZIP no Amplify e compartilhem a URL. A outra dupla verifica a página, um endereço configurado e uma página ausente.

Não use esse intervalo para encaixar tópicos extras. Se houver espera de publicação, peça a verificação do backup e dos links.

## Galeria, votação e encerramento

Receba nome/dupla e URL funcional pelo formulário combinado. Dê a palavra a duas ou três pessoas para uma decisão: “Qual regra você configurou e como verificou?”. Realize a votação visual e o prêmio conforme combinado. O kit contém um modelo; não cria um serviço compartilhado de votação.

Feche com: “Vocês publicaram uma página e também tomaram decisões sobre como o Amplify deve entregá-la. Quando algo não funcionar, procurem a evidência antes de repetir o envio.”

Lembre o destino dos recursos, responsáveis por custos e o que deve ser removido. Não é necessário comprar domínio ou configurar Route 53 nesta prática.

## Quando o tempo ou o serviço não colaborar

Se um deploy demorar, use a captura do ensaio identificada e deixe a execução continuar. Se o acesso AWS de uma pessoa falhar, ela acompanha em dupla; não marque como executado algo que ela apenas observou. Aos 60 minutos, preserve os 20 de personalização e pule integralmente a etapa extra de iframe. Registros de acesso não são imediatos nem uma auditoria exaustiva de toda atividade do navegador.
