# Guia do aluno — Amplify com ZIP

## Antes de começar
Abra ABRIR-OFICINA.html no navegador. Você pode acompanhar a oficina e personalizar offline; publicar exige internet e acesso AWS preparado. Acesse a aplicação pela sua conta ou em dupla, conforme a organização da aula.

Cada etapa tem três momentos: Entender apresenta o problema; Fazer mostra a ação; Conferir mostra o resultado esperado. A indicação de local informa se a ação acontece nesta oficina, no console AWS ou no site publicado. Os desenhos e o simulador não alteram a AWS.

Use Meu projeto para abrir o editor. Por que fazemos isso? contém a explicação técnica; Meus registros e arquivos reúne suas anotações, URL e downloads. Guarde seu registro antes de encerrar.

## 1. Publique o site no Amplify.

Vamos colocar um portfólio pronto na internet. Você vai enviar o ZIP e receber um endereço para acessá-lo.

### Entender — Você já tem o site pronto.

Onde: Nesta oficina → Baixar o ZIP.

O arquivo laboratorio-v1.zip contém as páginas do portfólio. O Amplify vai hospedá-las para que outras pessoas possam acessá-las.

1. Baixe o ZIP pelo botão abaixo.
2. Abra o ZIP e encontre index.html.
3. Mantenha o arquivo compactado para o envio.

### Fazer — Envie o ZIP ao Amplify.

Onde: AWS Amplify → Create new app → Deploy without Git.

Agora saia desta oficina e faça a publicação no console da AWS.

1. Crie a aplicação oficina-seu-nome, com branch production.
2. Em Drag and drop, selecione laboratorio-v1.zip.
3. Clique em Save and deploy e aguarde a conclusão.

### Conferir — Abra o endereço publicado.

Onde: Sua aplicação → URL publicada.

A publicação está pronta quando o site abre pelo link da aplicação.

1. No Amplify, abra a URL da aplicação.
2. Confira a marca v1 no topo da página.
3. Guarde esse endereço: usaremos o mesmo nas próximas etapas.

Resultado esperado: o endereço fornecido pelo Amplify abrir o portfólio com a marca v1.

Para entender: O Amplify recebe os arquivos prontos para exibir. Se um projeto precisar de compilação, ela deve acontecer antes de gerar o ZIP. Neste exercício, não há comando de build para configurar.

Detalhe da prática: No console AWS, abra Amplify → Create new app → Deploy without Git. Use o nome oficina-seu-nome e a branch production. Escolha Drag and drop, envie laboratorio-v1.zip e clique em Save and deploy. Os nomes das ações podem variar na interface.

## 2. Faça um link antigo abrir a página certa.

O link /antigo/especial está abrindo a lista geral, quando deveria abrir um projeto em destaque. Vamos provocar o erro, descobrir a regra responsável e corrigir o destino.

### Entender — Provoque e observe o erro.

Onde: Aqui na oficina → Simulação.

Comece pela situação que o visitante vê. O problema está no destino escolhido para um link antigo.

1. Mantenha /antigo/especial e escolha Os links antigos vêm primeiro.
2. Observe que o destino vira /projetos.html, em vez de /especial.html.
3. Anote: o endereço existe, mas a resposta leva ao lugar errado.

### Fazer — Descubra qual regra foi usada.

Onde: Rewrites and redirects → Ordem das regras.

Antes de reenviar arquivos, procure a regra que explica esse resultado.

1. Abra Ver quais regras estão sendo testadas e encontre a linha destacada.
2. A regra geral /antigo/<*> aparece antes da regra específica: ela vence primeiro.
3. No console Amplify, confira se suas regras estão nessa ordem; guarde a configuração atual antes de editar.

### Conferir — Corrija e repita o mesmo acesso.

Onde: Amplify → Salvar regras → Testar novamente.

A solução precisa mudar a resposta que você acabou de observar.

1. Baixe o conjunto correto e coloque /antigo/especial antes de /antigo/<*> no console.
2. Salve e abra sua URL publicada seguida de /antigo/especial: o destino deve ser /especial.html.
3. Confira também /fale-comigo e /nao-existe; use sessão limpa se um 301 anterior persistir.

Resultado esperado: /antigo/especial abrir a página Projeto em destaque, sem cair na lista geral de projetos.

Para entender: Um redirecionamento envia o visitante para outro endereço: 301 indica mudança permanente e 302, temporária. Uma reescrita 200 entrega o conteúdo de um arquivo sem mudar o endereço mostrado. A regra 404 mostra nossa página de erro quando não há recurso no caminho pedido.

Detalhe da prática: Na simulação, selecione a ordem com conflito e observe a regra destacada. Na aplicação real, abra Rewrites and redirects, guarde a configuração atual e coloque a regra específica antes da geral. O conjunto regras-corretas.json serve de referência. Salve e repita o mesmo acesso; confira destino, status e conteúdo no navegador.

## 3. Outro site está mostrando seu portfólio.

Imagine seu perfil dentro de uma página com a marca de outra pessoa. O visitante continua naquele site, mesmo vendo seu conteúdo. Vamos comparar essa exibição antes e depois de restringi-la.

### Entender — Veja o problema antes de configurar.

Onde: Teste externo → Antes da restrição.

No exemplo, alguém apresenta seu portfólio dentro de outro site. O endereço na barra continua sendo o desse outro site.

1. Abra o teste pelo botão à direita e cole a URL publicada na etapa 1.
2. Clique em Carregar no iframe e observe se o portfólio aparece.
3. Compare com Abrir link diretamente: são duas formas de acessar a mesma página.

### Fazer — Restrinja a exibição em outros sites.

Onde: Amplify → Mesma aplicação → Nova publicação manual.

Vamos manter o portfólio público e impedir apenas que outro site o coloque dentro de um iframe.

1. Baixe a v1 com restrição pelo botão abaixo.
2. Publique esse ZIP na aplicação existente; o conteúdo continua sendo v1.
3. O arquivo customHttp.yml pede ao Amplify que envie a regra junto da resposta.

### Conferir — Compare com o primeiro teste.

Onde: Teste externo → Depois da publicação.

Agora repita exatamente o acesso feito antes. Você deve observar a mudança no iframe, não no conteúdo do portfólio.

1. Recarregue a URL no teste e veja se o navegador bloqueia o iframe.
2. Abra o link diretamente: o portfólio deve continuar acessível.
3. No Console e no Network, confira se a causa é a regra frame-ancestors, e não outro erro.

Resultado esperado: o perfil continuar abrindo diretamente e o navegador recusar sua exibição no site de teste, após aplicar a restrição.

Para entender: Este é um exemplo opcional de configuração de cabeçalhos no Amplify. Um iframe permite mostrar um site dentro de outro. A regra Content-Security-Policy: frame-ancestors 'self' permite incorporação pelo próprio site e impede outros sites de fazerem isso. Ela não impede acesso direto, não protege contra cópia dos arquivos e não substitui login.

Detalhe da prática: Primeiro, abra o teste externo e carregue a URL do portfólio v1, antes da restrição. Depois publique laboratorio-v1-com-cabecalhos.zip na mesma aplicação. Recarregue o teste e compare. Este pacote mantém o conteúdo v1 e acrescenta customHttp.yml. Se a exibição já estiver bloqueada antes, confira os cabeçalhos existentes em vez de atribuir o bloqueio à nova configuração.

## 4. Publique a v2 e volte à v1.

Vamos trocar os arquivos do site e depois recuperar a versão anterior, usando a mesma aplicação.

### Entender — Guarde uma cópia antes de atualizar.

Onde: Aqui na oficina → Comparação ilustrativa.

Você tem dois pacotes: v1 é o site inicial; v2 tem uma página inicial diferente.

1. Clique em Publicação v2 e Recuperar v1 à direita.
2. Observe a troca dos arquivos no desenho.
3. As regras do console não fazem parte dessa troca.

### Fazer — Envie a v2 e recupere a v1.

Onde: Sua aplicação → Nova publicação manual.

A comparação à direita é ilustrativa. Faça os envios reais na aplicação que já existe no Amplify.

1. Baixe o ZIP v2 pelo botão à direita e publique-o.
2. Aguarde e confira VERSÃO 2 na página inicial.
3. Baixe a v1 pelo botão abaixo e publique-a novamente.

### Conferir — Confira a versão e os endereços.

Onde: Seu site publicado → Verificação.

A recuperação termina depois de conferir a página e as configurações usadas para acessá-la.

1. Abra a página inicial e confira a marca v1.
2. Teste /antigo/especial: a regra da etapa 2 deve continuar funcionando.
3. Confira os cabeçalhos recebidos e registre o resultado.

Resultado esperado: a página mostrar VERSÃO 2 após o novo envio e voltar à marca v1 após a recuperação.

Para entender: Cada ZIP guarda os arquivos daquela versão. Reenviar um pacote anterior recupera esses arquivos, mas não restaura as regras de endereço que você mudou no console. Registre essas configurações separadamente e confira os cabeçalhos efetivos depois da publicação.

Detalhe da prática: Abra a aplicação e a branch já utilizadas. Use a ação de nova publicação manual exibida no console. Envie laboratorio-v2.zip e depois recuperacao-v1.zip. Não crie outra aplicação. O pacote v2 pode ser baixado pelo botão da ilustração ou em Anotações e materiais.

## 5. Crie e publique seu próprio portfólio.

Agora você vai personalizar a página e usar o Amplify para publicar o seu resultado.

### Entender — Escolha o que quer mostrar.

Onde: Editor → Personalização.

O editor já está pronto. Você pode experimentar sem escrever a estrutura da página novamente.

1. Abra Personalizar meu site e experimente um dos quatro modelos.
2. Preencha nome, foto, links e projetos; personalize os títulos.
3. Em Composição e seções, escolha o layout e mova ou oculte as seções.

### Fazer — Salve a edição e publique o resultado.

Onde: Editor → Downloads.

Guarde os dois arquivos para poder publicar agora e continuar editando depois.

1. Em Salvar e retomar edição, baixe o backup editável.
2. Clique em Baixar meu ZIP para gerar o site público.
3. Envie esse ZIP à sua aplicação no Amplify.

### Conferir — Peça a alguém para testar.

Onde: Página publicada → Verificação em dupla.

Sua entrega é a página publicada, acompanhada de uma decisão que você sabe explicar.

1. Compartilhe a URL e confira se a outra pessoa consegue abrir.
2. Demonstre um redirecionamento e uma página inexistente.
3. Envie a URL para a votação organizada pela turma.

Resultado esperado: outra pessoa conseguir abrir sua página e você tiver salvo o ZIP público e o backup editável.

Para entender: O ZIP público contém as páginas prontas para hospedar. O backup editável contém o editor e suas escolhas para continuar depois. São arquivos com finalidades diferentes. Importe apenas backups criados por você ou de fonte confiável.

Detalhe da prática: Abra Personalizar meu site. Preencha nome, foto, links e projetos; ajuste cores e aparência. Salve o backup em Salvar e retomar edição. Baixe o ZIP e publique no Amplify. Voltar à oficina mantém a edição enquanto esta página permanece aberta.

## Antes de fechar o editor
Em Salvar e retomar edição, salve seu backup editável. Para publicar, use Baixar meu ZIP: esse arquivo contém as páginas prontas e recebe seu nome mais um código aleatório. O backup retoma a edição; o ZIP público entrega o site. Importe somente backups criados por você ou de fonte confiável, pois o HTML editável contém código executável.

## Entrega e encerramento
Compartilhe nome/dupla, URL publicada e uma regra que consiga explicar. Peça a outra pessoa para conferir a página. A votação é organizada pela turma; este material não cria um serviço de votação. Combine com os organizadores quem mantém ou remove os recursos e os custos. O endereço padrão do Amplify não implica uso ilimitado gratuito.

## Sobre os exemplos
Os registros de acesso são consulta complementar da etapa de links, sem atividade independente. O CSV do kit é sintético e opcional. Evidências reais do Amplify devem ser coletadas no ensaio. O teste de iframe confirma seu resultado no navegador, não detecta automaticamente bloqueio ou sucesso. Não é necessário Git nem comprar domínio nesta prática.
