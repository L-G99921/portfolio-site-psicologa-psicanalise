# Helena Vasconcelos · Psicóloga

Site de uma psicóloga de orientação psicanalítica, **fictícia**, feito como peça de portfólio.

**Site no ar:** https://l-g99921.github.io/portfolio-site-psicologa-psicanalise/

## Como rodar

```bash
node server.js
```

Abra http://localhost:5501. Também funciona abrindo o `index.html` direto no navegador.

## Estrutura

```
index.html        Página principal
textos/           Três artigos
css/styles.css    Estilos (tokens no topo do arquivo)
js/main.js        Menu, modo noturno, dúvidas, formulário, tempo de leitura
img/              Fotos do Unsplash
favicon.svg
server.js         Servidor local sem dependências
REFERENCIAS.md    Pesquisa de referências e regras do CFP
PLANO.md          Plano de ação
```

## Identidade

| Item | Valor |
|---|---|
| Fundo | Linho `#f3eee6` e papel `#fbf8f3` |
| Texto | Tinta `#221e1a` e sépia `#6a6157` |
| Cor principal | Oliva `#5e6b4f` |
| Acento | Terracota `#a4553a` |
| Títulos | Newsreader |
| Texto | Inter |

A organização dos tokens (nomes semânticos, espaçamento em base 8px, dois níveis de sombra, easing e temas claro, escuro e alto contraste) segue a arquitetura do Atlassian Design System. O visual não segue.

## Regras do CFP aplicadas

- Nome completo, título "Psicóloga" e CRP em todas as páginas (Código de Ética, Art. 20, "a").
- Sem depoimentos de pacientes, sem preço como propaganda e sem promessa de resultado.
- Sem o título "especialista": a psicanálise não é uma especialidade registrada no CFP.
- Valores informados só na primeira conversa (Art. 4º).
- Aviso do CVV (188) e do SAMU (192) no FAQ, no contato e no rodapé.

## Observações

- O formulário simula o envio e monta uma mensagem de WhatsApp. Para receber os contatos, troque o `setTimeout` em `js/main.js` por um serviço de formulários.
- Nome, CRP, endereço, telefone e trajetória são fictícios.
- Fotos: [Unsplash](https://unsplash.com/), licença de uso livre.
