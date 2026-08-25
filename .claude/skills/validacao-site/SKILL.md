---
name: validacao-site
description: Use when finishing any edit to a site's HTML, CSS, JS, or copy — automatically check for Portuguese spelling/grammar errors, broken layout, and code errors before considering the edit done. Also use before any deploy/publish step as a final pass.
---

## O que essa skill faz

Depois de qualquer edição em um site (texto, HTML, CSS, JS), roda uma checagem automática de erros de escrita e de código, corrige o que for óbvio, e avisa o que foi corrigido. Objetivo: nenhuma edição fica "pronta" com erro de português ou bug óbvio de layout/código sem eu ter checado.

## Quando rodar

Depois de qualquer Edit/Write que mexa em:
- Texto visível do site (HTML com conteúdo, ou arquivos de config tipo `site.ts`/`data/*.ts`)
- CSS
- HTML estrutural (tags, atributos, links)

Não precisa rodar para mudanças puramente mecânicas sem risco (ex: trocar só um número de telefone já validado, mexer em `.gitignore`).

## Passo 1 — Checagem de texto (português)

Releia todo texto que foi adicionado ou alterado (não o arquivo inteiro, só o que mudou) e procure por:
- Erros de digitação e ortografia
- Concordância de gênero/número errada (ex: "o" quando devia ser "a", singular/plural incoerente)
- Acentuação faltando ou errada
- Pontuação quebrada (ponto duplo, vírgula faltando em lista, aspas não fechadas)
- Frase que ficou sem sentido depois de uma edição anterior (resto de frase antiga colado com a nova)

Se algo já estava errado ANTES da edição atual (erro pré-existente que você notou de passagem), pode corrigir também, mas avise separadamente que não era da edição atual.

## Passo 2 — Checagem de código/layout

Para HTML editado:
- Tags abertas sem fechar, ou fechadas na ordem errada
- Atributos `href`/`src` apontando pra arquivo que não existe — confirme com `Glob`/`Bash ls` que o arquivo referenciado realmente está no caminho apontado
- Links de âncora (`href="#secao"`) sem `id="secao"` correspondente em algum elemento
- Tags duplicadas de `id` (dois elementos com o mesmo id quebra CSS/JS)

Para CSS editado:
- Classe usada no HTML que não tem regra correspondente no CSS (ou vice-versa: regra CSS que não bate com nenhuma classe usada) — checar com `Grep`
- Chaves `{`/`}` desbalanceadas

Para JS editado:
- Erros óbvios de sintaxe (parênteses/chaves desbalanceados)
- Se o projeto tiver `npm run build`/`npm run lint` configurado (checar `package.json`), rodar e reportar erros

## Passo 3 — Corrigir e avisar

- Corrija diretamente o que for inequívoco (erro de digitação, tag não fechada, link quebrado óbvio).
- Se o erro for ambíguo (pode ser intencional, ou a correção certa não é óbvia), **pergunte antes de mudar** em vez de assumir.
- No final, liste em poucas linhas o que foi corrigido — não precisa detalhar cada acento, um resumo tipo "corrigi 2 erros de digitação e 1 link quebrado" é suficiente, a menos que o usuário peça detalhe.

## Antes de publicar/deploy

Além da checagem acima, antes de um deploy real (não a cada edição pequena), rode também:
- Confirme que toda imagem referenciada no HTML/CSS existe de fato na pasta de assets (`Glob` pelos arquivos referenciados)
- Se for viável, use a skill/processo de rodar o site localmente (`run`) pra checar visualmente que nada quebrou — layout responsivo, imagens carregando, sem elemento sobreposto quebrando o design

## Notas

- Essa skill é sobre pegar erros óbvios e mecânicos, não é revisão de qualidade de copywriting (isso é a `landing-page-autentica`) nem de design (isso é a `frontend-design`). As três se complementam.
- Não invente conteúdo pra "corrigir" um texto incompleto — se faltar informação (ex: frase cortada, dado ausente), sinalize em vez de completar com um chute.
- Corrigir automaticamente não dispensa avisar o usuário — sempre reporte o que mudou, mesmo que pequeno.
