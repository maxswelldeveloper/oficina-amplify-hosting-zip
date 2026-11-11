# Comece aqui

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
