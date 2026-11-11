# Oficina AWS Amplify Hosting

Material interativo para quem já conhece HTML, CSS e JavaScript e quer praticar publicação manual e configuração do AWS Amplify Hosting usando arquivos ZIP.

## Começar

Baixe e extraia o [material do aluno](MATERIAL-ALUNO-AMPLIFY.zip) ou o [pacote completo do apresentador](OFICINA-AMPLIFY-COMPLETA.zip). Abra **ABRIR-OFICINA.html** no navegador. A oficina e o editor funcionam offline; a publicação na AWS exige internet, conta e permissões preparadas.

O [index.html](index.html) da raiz contém a mesma oficina em um único arquivo, pronto para abrir no navegador ou hospedar. O GitHub exibe o código HTML; para executar localmente, baixe o arquivo ou extraia um dos pacotes.

## Percurso atual

1. Publicar o site de exemplo pronto e verificar a versão v1.
2. Resolver links antigos: observar o erro, identificar a regra responsável, corrigir e testar novamente.
3. Demonstração extra para 90 minutos: comparar a exibição do perfil em iframe antes e depois de uma restrição.
4. Publicar a v2 e recuperar a v1, distinguindo arquivos das configurações do serviço.
5. Personalizar o portfólio, guardar backup editável e publicar o ZIP do aluno.

A investigação acontece junto dos links. Registros de acesso ficam como consulta complementar recolhida, sem exigir CSV ou atividade separada. O roteiro reserva 30 minutos para personalização na aula de 90 minutos e 20 minutos na de 60.

## Materiais

| Arquivo ou pasta | Uso |
| --- | --- |
| [Roteiro do apresentador em PDF](oficina-amplify-zip/professor/ROTEIRO-APRESENTADOR.pdf) | Falas, cliques, perguntas, respostas esperadas e cronogramas de 60/90 minutos. |
| [Guia do aluno em PDF](oficina-amplify-zip/aluno/GUIA-RAPIDO.pdf) | Instruções geradas das mesmas etapas da interface. |
| [Pacotes publicáveis](oficina-amplify-zip/aluno/pacotes) | Site de exemplo, atualização e recuperação. |
| [Configurações](oficina-amplify-zip/configuracoes) | Exemplos de regras e cabeçalhos para a prática. |
| [Fontes da ferramenta](oficina-amplify-zip/fontes) | Interface, textos, geradores e verificações locais. |
| [Plano da prática](PLANO-AMPLIFY-PRATICA.md) | Objetivo, sequência e distribuição do tempo. |
| [Validação](oficina-amplify-zip/VALIDACAO.md) | O que foi testado e os limites da verificação. |
| [Aula iniciante](iniciante/index.html) | Percurso anterior de construção com HTML, CSS e JavaScript. |

## Personalização do portfólio

O editor oferece quatro modelos visuais, três composições de apresentação, cores, tipografia, retrato, títulos, descrições e ordem/visibilidade das seções. Também permite adicionar favoritos, projetos, tecnologias e links.

**Backup editável** retoma a sessão. **ZIP público** entrega as páginas personalizadas e recebe o nome da pessoa mais um código aleatório. Importe somente backups próprios ou de fonte confiável: são documentos HTML executáveis.

## Publicar no Amplify

A oficina dos alunos continua usando ZIP; este repositório distribui o material.

1. No Amplify Hosting, escolha **Create new app → Deploy without Git**.
2. Para os exercícios comuns, envie **laboratorio-v1.zip**, disponível em `oficina-amplify-zip/aluno/pacotes`.
3. Para publicar o perfil autoral, envie o ZIP gerado no editor.
4. Para hospedar a ferramenta da aula, use o `index.html` independente da raiz como página inicial.

**Os ZIPs de distribuição não devem ser enviados como se fossem o perfil do aluno.** O ZIP publicável precisa conter `index.html` e suas dependências diretamente na raiz. As regras JSON são configuradas no console; incluí-las no ZIP não as aplica automaticamente.

Simulações locais e registros sintéticos são identificados. Este material não acessa automaticamente a conta AWS. O kit inclui um checklist para o ensaio e para coletar evidências reais; os testes locais não representam publicação validada na AWS.

## Manutenção

A turma não precisa de Node, Python ou bibliotecas. Para regenerar o material, execute na raiz deste repositório:

```sh
python3 oficina-amplify-zip/fontes/gerar.py
cp oficina-amplify-zip/ABRIR-OFICINA.html index.html
```

Os scripts `validar.cjs`, `validar-visuais.cjs` e `validar-personalizacao.cjs` usam Playwright instalado separadamente. O primeiro também gera os PDFs das versões HTML. Configure `NODE_PATH` e `PLAYWRIGHT_BROWSERS_PATH` conforme seu ambiente, conforme descrito em [VALIDACAO.md](oficina-amplify-zip/VALIDACAO.md).

Depois de atualizar os arquivos e concluir as verificações:

```sh
python3 oficina-amplify-zip/fontes/empacotar.py
```

Fontes oficiais: [publicação manual](https://docs.aws.amazon.com/amplify/latest/userguide/manual-deploys.html), [redirecionamentos e reescritas](https://docs.aws.amazon.com/amplify/latest/userguide/redirects.html), [cabeçalhos](https://docs.aws.amazon.com/amplify/latest/userguide/setting-custom-headers.html).
