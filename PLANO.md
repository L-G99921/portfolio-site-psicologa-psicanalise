# Plano de ação — Site de Psicóloga (abordagem psicanalítica)

Base: [REFERENCIAS.md](REFERENCIAS.md). Direção escolhida: **B (minimalismo quente) com toques de A (editorial literária)**.

---

## 1. Identidade (profissional fictícia)

| Item | Definição |
|---|---|
| Nome | **Helena Vasconcelos** — Psicóloga |
| Registro | CRP 06/000000 (fictício, formato de SP) |
| Abordagem | Psicologia clínica de orientação psicanalítica |
| Público | Adultos e adolescentes a partir de 16 anos |
| Modalidades | Presencial (São Paulo) e online (cadastro e-Psi) |
| Assinatura | *"Onde a palavra falta, o sintoma fala."* |

> Sem "Dra." (o CFP orienta usar só com doutorado) e sem "especialista em psicanálise".

## 2. Direção visual

**Sensação:** uma sala silenciosa com luz de fim de tarde: papel, linho, madeira e livros. Acolhe sem ser fofo e é sério sem ser clínico.

### Paleta (rascunho)
| Papel | Cor | Uso |
|---|---|---|
| Linho | `#F3EEE6` | Fundo principal |
| Papel | `#FBF8F3` | Cards, seções alternadas |
| Tinta | `#221E1A` | Texto e títulos |
| Sépia | `#6E655B` | Texto secundário |
| Oliva | `#5E6B4F` | Cor principal (botões, links) |
| Terracota | `#A4553A` | Acento raro (citações, detalhes), o toque "A" |
| Noite | `#1A1714` | Modo escuro: sala à noite, luminária acesa |

### Tipografia
- **Títulos:** Newsreader (serifa editorial com itálicos lindos, feita para leitura longa), com itálico nas palavras-chave.
- **Texto:** Inter, em tamanho generoso (18px) e entrelinha larga.
- **Detalhes editoriais (A):** numeração de "capítulos" (I, II, III...), capitular na primeira letra do "Sobre mim", citações em corpo grande com o autor em versalete.

### Fotografia (Unsplash / rawpixel)
- 1 retrato da psicóloga (luz natural, fundo neutro, olhar acolhedor).
- Consultório: poltrona ou divã, estante de livros, janela com luz, planta.
- Detalhes: caderno e caneta, xícara, livros empilhados, cortina com sol.
- Tratamento: leve granulação e tom quente aplicados em CSS, para as fotos parecerem de uma mesma série.
- **Proibido:** pessoas chorando, mãos na cabeça, cérebros, quebra-cabeças (clichês de "saúde mental").

### Ritmo e movimento
- Muito respiro: seções altas, largura de texto de ~65 caracteres.
- Animações **lentas e raras**: fade suave ao rolar, nada de contadores, carrosséis ou urgência.
- Respeito total a `prefers-reduced-motion`.

### Sistema de design: o que vem do Atlassian Design System
Referência enviada pelo usuário (`atlassian-design-design.md`). O visual do Atlassian (azul, cantos de 3px, texto de 14px, alta densidade) **não combina** com a direção B+A. Aproveitamos só a **arquitetura**:

| Do Atlassian | Como aplicamos aqui |
|---|---|
| Tokens semânticos | `--surface`, `--surface-sunken`, `--surface-raised`, `--text`, `--text-subtle`, `--border`, `--brand`, `--accent` |
| Base de espaçamento de 8px | `--space-1` (4px) até `--space-10` (128px), com mais passos grandes para dar respiro |
| Dois níveis de elevação | `--shadow-raised` e `--shadow-overlay`, em tons quentes (sépia), não azulados |
| Easing `cubic-bezier(0.15, 1, 0.3, 1)` | `--ease`, com durações longas (400–900ms) para um movimento calmo |
| Temas claro, escuro e alto contraste | Modo "luminária" (escuro) + `prefers-contrast: more` |

**Não adotado:** azul `#0c66e4`, cantos de 3px, corpo de 14px e densidade de interface de produto.

## 3. Estrutura da página

| # | Seção | Conteúdo | Regra CFP atendida |
|---|---|---|---|
| — | Header | Nome + "Psicóloga · CRP 06/000000", menu, botão "Agendar conversa" | Art. 20 "a" |
| I | **Hero** | Retrato, frase de acolhimento, subtítulo com abordagem e modalidades, CTA gentil | Sem promessa de resultado |
| II | **O que te traz aqui?** | Questões comuns (angústia, luto, relações, repetições, ansiedade, momentos de mudança) sem prometer solução | Art. 20 "e" |
| III | **O que é a psicanálise** | Explicação leiga em 3 ideias (falar livremente, o inconsciente, o tempo de cada um) + citação de Freud | Conteúdo educativo (Art. 19) |
| IV | **Como funcionam as sessões** | Primeira conversa, duração (~50 min), frequência, presencial/online, sigilo, valores "informados na primeira conversa" | Art. 4º, sem preço como propaganda |
| V | **Sobre mim** | Trajetória: graduação, formação psicanalítica, análise pessoal, supervisão, instituições | Art. 20 "b" |
| VI | **O consultório** | 2–3 fotos do espaço, endereço, referência ao metrô, mapa estático | — |
| VII | **Textos** | 3 cards de artigos autorais + páginas completas | Conteúdo educativo |
| VIII | **Perguntas frequentes** | Psicólogo x psicanalista x psiquiatra, divã, sigilo, online, duração do tratamento, emergências | — |
| IX | **Contato** | WhatsApp, e-mail, formulário curto (nome, contato, preferência presencial/online) | — |
| — | Rodapé | Nome completo, CRP, e-Psi, **aviso: "Em crise? CVV 188 ou SAMU 192"**, "profissional fictícia — portfólio" | Responsabilidade ética |

**Não entram:** depoimentos, preços/planos, números de "sucesso", selos de avaliação, pop-ups, contagens regressivas.

## 4. Páginas e arquivos

```
index.html
textos/
  o-que-e-uma-primeira-sessao.html
  por-que-falar-cura.html        (título a revisar, para evitar soar como promessa)
  angustia-nao-e-inimiga.html
css/styles.css
js/main.js
img/
favicon.svg
README.md
```

## 5. Interações (JavaScript leve)
1. Header que ganha fundo ao rolar e menu móvel acessível.
2. Fade suave de entrada (desligado com reduced-motion).
3. FAQ em acordeão nativo (`<details>`).
4. Formulário com validação gentil + mensagem pronta para o WhatsApp.
5. Modo noturno ("luminária"), com a preferência salva.
6. Tempo estimado de leitura nos textos.

## 6. Etapas de execução

1. **Fotos:** buscar e conferir visualmente no Unsplash/rawpixel, baixar para `img/` e registrar os créditos no README.
2. **Base:** tokens de cor e tipografia, layout, header e rodapé.
3. **Seções I–IX** da home, com textos finais.
4. **Três textos autorais** do blog.
5. **Responsivo + acessibilidade:** teste em 390px, contraste AA, navegação por teclado.
6. **Checagem ética:** passar a página inteira pela tabela do CFP (seção 1 do REFERENCIAS).
7. **Screenshots:** conferir claro/escuro, desktop/mobile.
8. **Localhost** para você revisar.
9. **GitHub Pages:** repositório `portfolio-site-psicologa-psicanalise`.

## 7. Revisão de texto (pedido do usuário: menos "cara de IA")

Na primeira versão, o texto e alguns elementos visuais pareciam gerados por IA. O que mudou:

| Antes | Depois |
|---|---|
| Frases de efeito no fim dos blocos ("Chegar já é um começo") | Texto que termina quando a informação termina |
| Construções "não é X, é Y" e listas sempre em trios | Frases diretas, de tamanhos variados |
| Metáforas genéricas ("aquilo que dói possa ganhar palavras") | Detalhes concretos: horários, sala no 2º andar, café na recepção, remarcação com 24h |
| Numeração romana e "i. ii. iii." em todas as seções | Títulos simples |
| Metade de cada título em itálico colorido | Itálico só na assinatura |
| Seis cards com ícone para informações práticas | Uma lista simples (duração, onde, horários, valores, recibo, remarcação) |
| "Sobre mim" com frases de efeito | Trajetória contada em primeira pessoa, com detalhes pessoais |

Também passou por uma varredura automática de travessões, "não é X, é Y" e clichês ("jornada", "espaço seguro", "ressignificar", "essência").

## 8. Pendências com o usuário
- [x] Design anexado recebido (Atlassian Design System): só a arquitetura de tokens foi adotada (ver seção 2).
- [x] Nome aprovado; assinatura definida pelo usuário.
