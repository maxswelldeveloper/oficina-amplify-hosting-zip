# Fontes e limites técnicos

Consultadas em 11/11/2026. Confirme nomes das telas na região/conta no ensaio.

- [Deploy manual](https://docs.aws.amazon.com/amplify/latest/userguide/manual-deploys.html): ZIP de saída pronta, raiz correta e ausência de suporte manual a SSR.
- [Regras](https://docs.aws.amazon.com/amplify/latest/userguide/redirects.html): diferenças entre 301, 302, 200 e 404 e ordem de avaliação.
- [Custom headers](https://docs.aws.amazon.com/amplify/latest/userguide/setting-custom-headers.html): console/arquivo, prevalência de customHttp.yml e nova publicação para aplicar.
- [Monitoramento](https://docs.aws.amazon.com/amplify/latest/userguide/access-logs.html): métricas, registros de acesso e CloudTrail são evidências diferentes.

O simulador cobre só os caminhos e padrões do laboratório, sem consulta à AWS, sem reproduzir cache, normalização de URLs, condições, query strings ou todas as formas de regras. Diagramas, marcações de conclusão e CSV sintético são recursos didáticos. Evidência real deve ser coletada na conta.
