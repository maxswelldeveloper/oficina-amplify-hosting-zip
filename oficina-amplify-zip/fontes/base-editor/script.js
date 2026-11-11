const perfil = document.querySelector("#profile");
const feedback = document.querySelector("#feedback");
const botaoExportar = document.querySelector("#exportButton");

// AULA 1: ENCONTRAR → OUVIR → ALTERAR.
// data-edit guarda o seletor do elemento que cada campo modifica.
document.querySelectorAll("[data-edit]").forEach((campo) => {
  campo.addEventListener("input", () => {
    const elemento = document.querySelector(campo.dataset.edit);
    elemento.textContent = campo.value;
    atualizarIdentidade();
  });
});

// AULA 2: o clique muda uma propriedade CSS do perfil; o CSS aplica a cor.
const botoesCor = document.querySelectorAll("[data-accent]");
botoesCor.forEach((botao) => {
  botao.addEventListener("click", () => aplicarCor(botao.dataset.accent));
});
document.querySelector("#accentInput").addEventListener("input", (evento) => {
  aplicarCor(evento.target.value);
});

// A cor do fundo também é uma propriedade CSS; o texto acompanha o contraste.
document.querySelector("#backgroundColorInput").addEventListener("input", (evento) => {
  const cor = evento.target.value;
  perfil.style.setProperty("--profile-background", cor);
  const claro = luminanciaCor(cor) > .179;
  perfil.dataset.tone = claro ? "light" : "dark";
  perfil.style.setProperty("--profile-text", claro ? "#161b18" : "#f0f1ed");
  perfil.style.setProperty("--profile-muted", claro ? "#38453d" : "#b8c1ba");
});

// Outros controles seguem a mesma ideia: ouvir uma escolha e mudar o elemento.
const fontes = { sans: "Arial, Helvetica, sans-serif", mono: '"Courier New", monospace', serif: "Georgia, serif" };
document.querySelector("#fontInput").addEventListener("change", (evento) => {
  perfil.style.setProperty("--name-font", fontes[evento.target.value]);
});
document.querySelector("#shapeInput").addEventListener("change", (evento) => {
  perfil.style.setProperty("--card-radius", evento.target.value);
});
document.querySelector("#backgroundInput").addEventListener("change", (evento) => {
  perfil.dataset.background = evento.target.value;
});
document.querySelector("#layoutInput").addEventListener("change", (evento) => {
  perfil.dataset.layout = evento.target.value;
});
document.querySelector("#showProjects").addEventListener("change", (evento) => {
  document.querySelector("#projectsSection").hidden = !evento.target.checked;
});

// AULA 3: o formulário lê os campos e acrescenta um card à coleção.
const formularioFavorito = document.querySelector("#favoriteForm");
ouvirFormulario(formularioFavorito, async () => {
  const titulo = lerTextoObrigatorio("#favoriteTitle");
  const comentario = lerTextoObrigatorio("#favoriteComment");
  const link = lerLink("#favoriteLink");
  if (!titulo || !comentario || link === null) return;

  const botao = formularioFavorito.querySelector("[data-submit]");
  botao.disabled = true;
  try {
    const imagem = await lerImagem(document.querySelector("#favoriteImage").files[0]);
    adicionarFavorito({ titulo, comentario, link, imagem, categoria: document.querySelector("#favoriteCategory").value });
    formularioFavorito.reset();
    avisar("Novo favorito adicionado à sua seleção.");
    document.querySelector("#favoriteTitle").focus();
  } catch (erro) {
    avisar(erro.message);
  } finally {
    botao.disabled = false;
  }
});

function adicionarFavorito(favorito) {
  // createElement cria o elemento; append coloca-o dentro de outro.
  const item = document.createElement("article");
  item.className = "collection-item";
  const detalhes = criarElemento("details", "collection-card");
  const resumo = criarElemento("summary");
  const estilos = { Jogo: "visual-game", Filme: "visual-film", Música: "visual-music" };
  const visual = criarElemento("div", "card-visual " + (estilos[favorito.categoria] || ""));
  const marca = criarElemento("span", "card-mark", iniciais(favorito.titulo));
  marca.setAttribute("aria-hidden", "true");
  visual.append(marca);
  if (favorito.imagem) {
    const imagem = criarElemento("img", "card-image");
    imagem.src = favorito.imagem;
    imagem.alt = "Imagem de " + favorito.titulo;
    visual.append(imagem);
  }
  const informacao = criarElemento("div", "card-info");
  const categoria = criarElemento("span", "card-category", favorito.categoria);
  const linhaTitulo = criarElemento("div", "card-title-row");
  const titulo = criarElemento("h4", "", favorito.titulo);
  const seta = criarElemento("span", "card-open-icon", "↗");
  seta.setAttribute("aria-hidden", "true");
  linhaTitulo.append(titulo, seta);
  informacao.append(categoria, linhaTitulo);
  resumo.append(visual, informacao);
  const conteudo = criarElemento("div", "card-details");
  const comentario = criarElemento("p", "", favorito.comentario);
  // textContent trata o que a pessoa escreveu como texto, sem interpretar HTML.
  conteudo.append(comentario);
  if (favorito.link) conteudo.append(criarLink(favorito.link, "Explorar referência ↗"));
  detalhes.append(resumo, conteudo);
  item.append(detalhes, criarRemover(item, favorito.titulo, "#collectionHeading"));
  document.querySelector("#favoriteList").append(item);
  atualizarContagens();
}

// PROJETOS E LINKS: o mesmo processo de ler, criar e inserir elementos.
ouvirFormulario(document.querySelector("#projectForm"), (formulario) => {
  const titulo = lerTextoObrigatorio("#projectTitle");
  const descricao = lerTextoObrigatorio("#projectDescription");
  const link = lerLink("#projectLink");
  if (!titulo || !descricao || link === null) return;
  adicionarProjeto({ titulo, descricao, link });
  formulario.reset();
  avisar("Projeto adicionado. Você pode vê-lo no seu perfil.");
});
function adicionarProjeto(projeto) {
  const card = criarElemento("article", "project-card");
  const numero = criarElemento("span", "project-number", "PROJETO / " + String(document.querySelector("#projectList").children.length + 1).padStart(2, "0"));
  card.append(numero, criarElemento("h4", "", projeto.titulo), criarElemento("p", "", projeto.descricao));
  if (projeto.link) card.append(criarLink(projeto.link, "Abrir projeto ↗"));
  card.append(criarRemover(card, projeto.titulo, "#projectsHeading"));
  document.querySelector("#projectList").append(card);
  atualizarContagens();
}
ouvirFormulario(document.querySelector("#linkForm"), (formulario) => {
  const titulo = lerTextoObrigatorio("#linkTitle");
  const endereco = lerLink("#linkUrl", true);
  if (!titulo || !endereco) return;
  const item = criarElemento("div", "link-item");
  const link = criarLink(endereco, titulo + " ↗");
  link.className = "profile-link";
  item.append(link, criarRemover(item, titulo, "#profileName"));
  document.querySelector("#profileLinks").append(item);
  formulario.reset();
  atualizarContagens();
  avisar("Link adicionado ao perfil.");
});

// LINGUAGENS: uma etiqueta é outro exemplo de criar e inserir um elemento.
ouvirFormulario(document.querySelector("#languageForm"), (formulario) => {
  const nome = lerTextoObrigatorio("#languageInput");
  if (!nome) return;
  const repetida = [...document.querySelectorAll(".language-name")].some((item) => item.textContent.toLocaleLowerCase("pt-BR") === nome.toLocaleLowerCase("pt-BR"));
  if (repetida) { avisar("Essa linguagem já está no perfil."); return; }
  adicionarLinguagem(nome);
  formulario.reset();
  document.querySelector("#languageInput").focus();
  avisar("Linguagem adicionada ao perfil.");
});
function adicionarLinguagem(nome) {
  const etiqueta = criarElemento("div", "language-tag");
  etiqueta.append(criarElemento("span", "language-name", nome), criarRemover(etiqueta, nome, "#languagesHeading"));
  document.querySelector("#languageList").append(etiqueta);
  atualizarContagens();
}

// FOTO: FileReader transforma a imagem local em um endereço que pode acompanhar o HTML.
let versaoAvatar = 0;
document.querySelector("#avatarInput").addEventListener("change", async (evento) => {
  const versao = ++versaoAvatar;
  try {
    const imagem = await lerImagem(evento.target.files[0]);
    if (!imagem || versao !== versaoAvatar) return;
    const foto = document.querySelector("#avatarPhoto");
    foto.src = imagem;
    foto.hidden = false;
    document.querySelector("#avatarInitials").hidden = true;
    avisar("Foto atualizada. Ela será incluída no download.");
  } catch (erro) { avisar(erro.message); }
});
document.querySelector("#removeAvatar").addEventListener("click", () => {
  versaoAvatar++;
  const foto = document.querySelector("#avatarPhoto");
  foto.hidden = true;
  foto.removeAttribute("src");
  document.querySelector("#avatarInitials").hidden = false;
  document.querySelector("#avatarInput").value = "";
});

// PRÉVIA: classList alterna a classe que esconde o editor.
document.querySelector("#previewButton").addEventListener("click", (evento) => {
  const ativo = document.body.classList.toggle("preview-mode");
  evento.currentTarget.setAttribute("aria-pressed", String(ativo));
  evento.currentTarget.textContent = ativo ? "Voltar à edição ↙" : "Ver meu perfil ↗";
});

// DOWNLOAD: copia o perfil preenchido. É um recurso pronto da base da aula.
// O ZIP contém index.html e style.css, sem editor ou JavaScript.
botaoExportar.addEventListener("click", async () => {
  const nome = lerTextoObrigatorio("#nameInput");
  if (!nome) return;
  const nomeSeguro = nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "perfil";
  const codigo = Array.from(crypto.getRandomValues(new Uint8Array(4)), byte => byte.toString(16).padStart(2, "0")).join("");
  const nomeArquivo = nomeSeguro + "-" + codigo + ".zip";
  const pagina = document.implementation.createHTMLDocument(nome + " | Meu espaço");
  pagina.documentElement.lang = "pt-BR";
  const charset = pagina.createElement("meta");
  charset.setAttribute("charset", "utf-8");
  const viewport = pagina.createElement("meta");
  viewport.name = "viewport";
  viewport.content = "width=device-width, initial-scale=1";
  const estilo = pagina.createElement("link");
  estilo.rel = "stylesheet";
  estilo.href = "style.css";
  pagina.head.prepend(charset, viewport);
  pagina.head.append(estilo);
  pagina.body.className = "published-page";
  const copia = pagina.importNode(perfil, true);
  // Remove apenas o destaque temporário da ferramenta, preservando estilos do perfil.
  [copia, ...copia.querySelectorAll("[data-course-outline]")].forEach(elemento => {
    if (!elemento.hasAttribute("data-course-outline")) return;
    elemento.style.outline = elemento.getAttribute("data-course-outline");
    elemento.removeAttribute("data-course-outline");
    if (!elemento.getAttribute("style")) elemento.removeAttribute("style");
  });
  copia.setAttribute("aria-label", "Perfil de " + nome);
  copia.querySelectorAll(".editor-only").forEach((elemento) => elemento.remove());
  copia.querySelectorAll("details").forEach((elemento) => elemento.open = false);
  pagina.body.append(copia);
  botaoExportar.disabled = true;
  try {
    const css = await obterCssExportacao();
    const html = "<!doctype html>\n" + pagina.documentElement.outerHTML;
    const arquivo = criarZip([
      { nome: "index.html", conteudo: html },
      { nome: "style.css", conteudo: css },
    ]);
    if (window.cursoIntegrado) { const buffer = await arquivo.arrayBuffer(); window.parent.postMessage({ tipo: "curso-download", buffer, nome: nomeArquivo }, "*", [buffer]); return; } const endereco = URL.createObjectURL(arquivo);
    const link = criarElemento("a");
    link.href = endereco;
    link.download = nomeArquivo;
    link.className = "button button-accent";
    link.textContent = "Salvar " + nomeArquivo;
    const anterior = document.querySelector("#downloadReady");
    if (anterior) { URL.revokeObjectURL(anterior.href); anterior.remove(); }
    link.id = "downloadReady";
    document.querySelector(".studio-actions").append(link);
    link.click();
    avisar("ZIP pronto. Se o download não iniciou, clique em “Salvar " + nomeArquivo + "”.");
  } catch (erro) {
    avisar("Não foi possível gerar o ZIP. " + erro.message);
  } finally {
    botaoExportar.disabled = imagensPendentes > 0;
  }
});

// Alternativa para a prévia: copiar o perfil gerado e salvá-lo como index.html.
document.querySelector("#closeExportButton").addEventListener("click", () => {
  document.querySelector("#exportDialog").close();
  botaoExportar.focus();
});
document.querySelector("#copyExportButton").addEventListener("click", async () => {
  const campo = document.querySelector("#exportHtml");
  const status = document.querySelector("#exportCopyStatus");
  campo.focus();
  campo.select();
  try {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(campo.value);
    else if (!document.execCommand("copy")) throw new Error();
    status.textContent = "HTML copiado. Cole em um editor e salve como index.html.";
  } catch {
    campo.focus();
    campo.select();
    status.textContent = "O navegador bloqueou a cópia automática. O HTML está selecionado: use Ctrl+C (ou ⌘C), cole em um editor e salve como index.html.";
  }
});

// O botão chama o JavaScript diretamente: funciona também na prévia do chat,
// onde o navegador bloqueia o envio nativo de formulários.
// reportValidity mantém as regras dos campos; Enter também aciona a inclusão.
function ouvirFormulario(formulario, incluir) {
  const botao = formulario.querySelector("[data-submit]");
  const executar = () => {
    if (!botao.disabled && formulario.reportValidity()) incluir(formulario);
  };
  botao.addEventListener("click", executar);
  formulario.addEventListener("submit", (evento) => { evento.preventDefault(); executar(); });
  formulario.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter" && evento.target.matches('input:not([type="file"]):not([type="color"])')) {
      evento.preventDefault();
      executar();
    }
  });
}

// APOIO: estes trechos já vêm prontos para manter os blocos da aula mais curtos.
function criarElemento(tag, classe = "", texto = "") {
  const elemento = document.createElement(tag);
  elemento.className = classe;
  elemento.textContent = texto;
  return elemento;
}
function criarLink(endereco, texto) {
  const link = criarElemento("a", "", texto);
  link.href = endereco;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  return link;
}
function criarRemover(elemento, titulo, foco) {
  const botao = criarElemento("button", "remove-button editor-only", "×");
  botao.type = "button";
  botao.setAttribute("aria-label", "Remover " + titulo);
  botao.addEventListener("click", () => {
    elemento.remove();
    atualizarContagens();
    const destino = document.querySelector(foco);
    destino.setAttribute("tabindex", "-1");
    destino.focus({ preventScroll: true });
    avisar(titulo + " removido.");
  });
  return botao;
}
function iniciais(nome) {
  return nome.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((parte) => Array.from(parte)[0]).join("").toLocaleUpperCase("pt-BR") || "EU";
}
function atualizarIdentidade() {
  const nome = document.querySelector("#nameInput").value.trim() || "Seu nome";
  document.querySelector("#profileName").textContent = nome;
  document.querySelector("#avatarInitials").textContent = iniciais(nome);
  document.querySelector("#profileHandle").textContent = iniciais(nome);
  document.querySelector("#profileSignature").textContent = nome.toLocaleUpperCase("pt-BR");
  document.querySelector("#avatarPhoto").alt = "Foto de " + nome;
}
function aplicarCor(cor) {
  perfil.style.setProperty("--accent", cor);
  // Escolhe preto ou branco para as iniciais terem contraste com a cor escolhida.
  const luminancia = luminanciaCor(cor);
  perfil.style.setProperty("--accent-ink", luminancia > .179 ? "#111111" : "#ffffff");
  document.querySelector("#accentInput").value = cor;
  botoesCor.forEach((botao) => botao.setAttribute("aria-pressed", String(botao.dataset.accent === cor)));
}
function luminanciaCor(cor) {
  const canais = cor.match(/[a-f0-9]{2}/gi).map((canal) => parseInt(canal, 16) / 255).map((canal) => canal <= .04045 ? canal / 12.92 : ((canal + .055) / 1.055) ** 2.4);
  return canais[0] * .2126 + canais[1] * .7152 + canais[2] * .0722;
}
function atualizarContagens() {
  document.querySelector("#languagesEmpty").hidden = document.querySelector("#languageList").children.length > 0;
  const quantidade = document.querySelector("#favoriteList").children.length;
  document.querySelector("#collectionCount").textContent = String(quantidade).padStart(2, "0") + (quantidade === 1 ? " ITEM" : " ITENS");
  document.querySelector("#favoritesEmpty").hidden = quantidade > 0;
  const projetos = document.querySelectorAll("#projectList .project-card");
  projetos.forEach((card, index) => card.querySelector(".project-number").textContent = "PROJETO / " + String(index + 1).padStart(2, "0"));
  document.querySelector("#projectsEmpty").hidden = projetos.length > 0;
  document.querySelector("#linksEmpty").hidden = document.querySelectorAll("#profileLinks .link-item").length > 0;
}
function lerTextoObrigatorio(seletor) {
  const campo = document.querySelector(seletor);
  const texto = campo.value.trim();
  if (!texto) {
    if (document.body.classList.contains("preview-mode")) document.querySelector("#previewButton").click();
    const secao = campo.closest("details");
    if (secao) secao.open = true;
    campo.setCustomValidity("Preencha este campo com algum texto.");
    campo.reportValidity();
  }
  return texto;
}
function lerLink(seletor, obrigatorio = false) {
  const campo = document.querySelector(seletor);
  const texto = campo.value.trim();
  if (!texto && !obrigatorio) return "";
  try {
    const endereco = new URL(texto);
    if (!["http:", "https:"].includes(endereco.protocol)) throw new Error();
    return endereco.href;
  } catch {
    campo.setCustomValidity("Use um endereço completo começando com https:// ou http://.");
    campo.reportValidity();
    return null;
  }
}
document.querySelectorAll("input, textarea").forEach((campo) => campo.addEventListener("input", () => campo.setCustomValidity("")));
let imagensPendentes = 0;
async function lerImagem(arquivo) {
  if (!arquivo) return "";
  if (!["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"].includes(arquivo.type) && !(arquivo.type === "" && /\.(png|jpe?g|webp|gif)$/i.test(arquivo.name))) throw new Error("Escolha uma imagem PNG, JPG, WebP ou GIF.");
  if (arquivo.size > 8 * 1024 * 1024) throw new Error("A imagem deve ter até 8 MB.");
  imagensPendentes++;
  botaoExportar.disabled = true;
  try {
    const dados = await new Promise((resolve, reject) => {
      const leitor = new FileReader();
      leitor.onload = () => resolve(leitor.result);
      leitor.onerror = () => reject(new Error("Não foi possível ler a imagem. Tente outro arquivo."));
      leitor.readAsDataURL(arquivo);
    });
    // Confere se o arquivo é uma imagem que o navegador consegue abrir.
    await new Promise((resolve, reject) => {
      const imagem = new Image();
      imagem.onload = resolve;
      imagem.onerror = () => reject(new Error("Não foi possível abrir essa imagem. Escolha outra."));
      imagem.src = dados;
    });
    return dados;
  } finally {
    imagensPendentes--;
    botaoExportar.disabled = imagensPendentes > 0;
  }
}
let avisoTimeout;
function avisar(texto) {
  clearTimeout(avisoTimeout);
  feedback.textContent = texto;
  avisoTimeout = setTimeout(() => feedback.textContent = "", 6500);
}

// PERSONALIZE: exemplos iniciais. Na interface, remova-os e adicione seus próprios itens.
[
  { titulo: "Hollow Knight", categoria: "Jogo", comentario: "O tipo de mundo que me faz explorar cada canto antes de seguir em frente." },
  { titulo: "Blade Runner 2049", categoria: "Filme", comentario: "Uma referência visual que eu sempre revisito: luz, silêncio e contraste." },
  { titulo: "After Hours", categoria: "Música", comentario: "A trilha das minhas sessões de criação, quase sempre depois da meia-noite." },
].forEach(adicionarFavorito);
[
  { titulo: "Meu primeiro deploy", descricao: "Uma página feita com HTML, CSS e JavaScript, publicada na internet." },
  { titulo: "Interface em construção", descricao: "Meu laboratório de layouts, cores e pequenas interações." },
].forEach(adicionarProjeto);
atualizarIdentidade();

["JavaScript", "HTML", "CSS"].forEach(adicionarLinguagem);

// EXPORTAÇÃO — recurso pronto da aula. Sem dependências nem conexão obrigatória.
async function obterCssExportacao() {
  const incorporado = document.querySelector("style[data-export-style]");
  if (incorporado) return incorporado.textContent;
  // Com servidor, inclui inclusive alterações feitas diretamente no style.css.
  if (["http:", "https:"].includes(location.protocol)) {
    try {
      const resposta = await fetch("style.css", { cache: "no-store", signal: AbortSignal.timeout(4000) });
      if (resposta.ok) return await resposta.text();
    } catch { /* Sem rede, usa a cópia de apoio incluída no HTML. */ }
  }
  const css = document.querySelector("#exportStyles")?.textContent;
  if (!css?.trim()) throw new Error("A cópia dos estilos não foi encontrada.");
  return css.trim();
}

// Monta um ZIP sem compressão, com os arquivos diretamente na raiz.
// Esta parte vem pronta: não é necessário ensinar o formato ZIP na aula.
function criarZip(arquivos) {
  const encoder = new TextEncoder();
  const partes = [];
  const diretorio = [];
  let deslocamento = 0;
  const tabelaCrc = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let crc = i;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
    tabelaCrc[i] = crc;
  }
  for (const arquivo of arquivos) {
    const nome = encoder.encode(arquivo.nome);
    const dados = encoder.encode(arquivo.conteudo);
    let crc = 0xffffffff;
    for (const byte of dados) crc = (crc >>> 8) ^ tabelaCrc[(crc ^ byte) & 255];
    crc = (crc ^ 0xffffffff) >>> 0;
    const local = new Uint8Array(30 + nome.length);
    const cabecalho = new DataView(local.buffer);
    cabecalho.setUint32(0, 0x04034b50, true);
    cabecalho.setUint16(4, 20, true);
    cabecalho.setUint16(6, 0x0800, true); // Texto UTF-8.
    cabecalho.setUint16(12, 0x0021, true); // Data DOS válida: 01/01/1980.
    cabecalho.setUint32(14, crc, true);
    cabecalho.setUint32(18, dados.length, true);
    cabecalho.setUint32(22, dados.length, true);
    cabecalho.setUint16(26, nome.length, true);
    local.set(nome, 30);
    partes.push(local, dados);
    const central = new Uint8Array(46 + nome.length);
    const indice = new DataView(central.buffer);
    indice.setUint32(0, 0x02014b50, true);
    indice.setUint16(4, 20, true);
    indice.setUint16(6, 20, true);
    indice.setUint16(8, 0x0800, true);
    indice.setUint16(14, 0x0021, true);
    indice.setUint32(16, crc, true);
    indice.setUint32(20, dados.length, true);
    indice.setUint32(24, dados.length, true);
    indice.setUint16(28, nome.length, true);
    indice.setUint32(42, deslocamento, true);
    central.set(nome, 46);
    diretorio.push(central);
    deslocamento += local.length + dados.length;
  }
  const tamanhoDiretorio = diretorio.reduce((total, item) => total + item.length, 0);
  const fim = new Uint8Array(22);
  const registro = new DataView(fim.buffer);
  registro.setUint32(0, 0x06054b50, true);
  registro.setUint16(8, arquivos.length, true);
  registro.setUint16(10, arquivos.length, true);
  registro.setUint32(12, tamanhoDiretorio, true);
  registro.setUint32(16, deslocamento, true);
  return new Blob([...partes, ...diretorio, fim], { type: "application/zip" });
}
