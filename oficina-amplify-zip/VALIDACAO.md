# Validação do material

Executada localmente em 11/11/2026, com Chromium por Playwright. Veja professor/evidencias/resultado-local.json e as capturas identificadas como locais.

## Verificações concluídas

- Remoção da etapa independente de investigação, renumeração de atualização/personalização e migração das anotações anteriores para as novas posições.
- Guia e roteiro sincronizados para 60/90 minutos, com 20/30 minutos de personalização.

- Quatro modelos de portfólio, três composições, escala do nome, formato/visibilidade do retrato e densidade de espaços.
- Títulos e descrições editáveis, seções reordenáveis/ocultáveis, sincronização da visibilidade de projetos e preservação no backup.
- ZIP público com as escolhas do perfil; página auxiliar de projetos usa o título editado e as cores escolhidas.
- Etapa 3 apresentada como demonstração extra: cenário de exibição do portfólio em outro site, com teste antes/depois e pacote que mantém o conteúdo v1 enquanto acrescenta cabeçalhos.
- Investigação integrada à etapa de links, com consulta opcional recolhida para a tabela de cinco acessos; não há etapa independente de registros.
- Roteiro do apresentador refeito com sequência de falas, cliques, perguntas, respostas esperadas, transições e cronogramas de 60/90 minutos.
- Textos organizados em problemas concretos, três ações por momento, indicação de onde agir e resultado esperado; guia do aluno gerado da mesma fonte das etapas.
- Editor e perfil com o novo tema claro, mantendo personalização de cores e exportação do estilo para o ZIP público.
- Teste de iframe redesenhado, com estado vazio, carregamento real, abertura direta em outra aba e orientação para verificar o resultado.
- Teste adicional em duas origens HTTP locais: perfil permitido, perfil com CSP bloqueado no iframe e acesso direto preservado. Isso valida o comportamento do navegador, sem configurar a AWS.
- Interface clara com destaques AWS, percurso superior e três momentos por etapa: Entender, Fazer e Conferir.
- Navegação das abas por teclado e 15 combinações de etapa/momento sem transbordamento horizontal em 390 px.
- Diagramas de publicação/política, casos selecionáveis de diagnóstico e comparação visual dos arquivos v2/v1.
- Explicações técnicas e anotações recolhidas por padrão; a edição do momento não desloca a página.
- Navegação das cinco etapas, guia, retorno ao editor e persistência de anotações.
- Simulador: regra específica, conflito de prioridade, fallback 404 e arquivo real preservado.
- Download de material e ZIP de perfil com slug do nome e oito dígitos hexadecimais aleatórios.
- JPG aceito, incorporado ao perfil e preservado no backup.
- Inclusão de projeto, exportação das páginas auxiliares e retirada dos controles de edição do resultado público.
- Backup editável exportado, importado e alterado novamente; remoção de cards após importação e ausência de controles duplicados.
- Oficina aberta por file:// sem requisições HTTP e sem erros JavaScript.
- Tela de 390 px sem transbordamento horizontal; captura também em desktop.
- Quatro PDFs gerados de HTML local: guia, roteiro, ficha e checklist de evidências.
- Integridade dos quatro ZIPs de laboratório, index.html e dependências na raiz.
- ZIP personalizado: nome, JPG e projeto autoral presentes; sete arquivos esperados, sem controles de remoção na página pública de projetos.

## Limites

Não houve autenticação nem publicação na AWS nesta execução. Regras, cabeçalhos e registros reais da conta devem ser verificados no ensaio com o checklist COLETAR-NA-AWS. O simulador e o CSV sintético não substituem essa validação. A simulação cobre apenas os casos descritos da oficina.

O teste de iframe verifica uma política configurada no serviço real; a página auxiliar não detecta automaticamente o bloqueio entre origens. Verifique Console e resposta no Network.

O formulário de votação não é um backend: modelo CSV e critérios estão disponíveis para organização antes do evento. Os nomes e projetos do laboratório são fictícios.

## Manutenção

As fontes do editor original estão em fontes/base-editor. Python gera os arquivos HTML e ZIPs publicáveis; Node e Playwright são necessários apenas para executar novamente os testes e a geração de PDFs. A turma não precisa instalar dependências.

1. python3 fontes/gerar.py (a partir de qualquer diretório; mantenha a pasta oficina-amplify-zip com esse nome).
2. NODE_PATH=caminho/node_modules PLAYWRIGHT_BROWSERS_PATH=caminho/dos/browsers node fontes/validar.cjs.
3. NODE_PATH=caminho/node_modules PLAYWRIGHT_BROWSERS_PATH=caminho/dos/browsers node fontes/validar-visuais.cjs.
4. NODE_PATH=caminho/node_modules PLAYWRIGHT_BROWSERS_PATH=caminho/dos/browsers node fontes/validar-personalizacao.cjs.
5. python3 fontes/empacotar.py.

As capturas são locais. O arquivo SHA256SUMS.txt permite conferir os arquivos do pacote completo. Após qualquer alteração, gere novamente as evidências e os pacotes.
