# Portfólio — Bia Ferraz (Designer Gráfico & Visual)

Portfólio interativo em **Next.js 16 (App Router)**, **React**, **TypeScript**, **Tailwind CSS v4** e **GSAP** — conceito visual "designer gráfico colorido com a espinha dorsal de um back-end": paleta pastel vibrante combinada com elementos de sistema (terminal funcional, cards de projeto como respostas de API, status codes, paths de arquivo).

## ✨ Conceito

- **Paleta pastel Memphis-suave**: lilás, rosa, amarelo manteiga, menta e azul céu sobre fundo papel — todas as combinações de cor/texto testadas e aprovadas em contraste WCAG AA/AAA.
- **Camada "back-end" sutil**: breadcrumb de navegação tipo path de arquivo (`/usr/biaferraz/projetos`), cards de projeto com cabeçalho de método HTTP + status (`GET /projetos/x` · `200 OK`), botão "ver log" que expande um terminal com `git log` e `curl -I` simulados, skills como `console.log()`.
- **Terminal interativo de verdade** no Hero — o elemento de assinatura do design. Funciona com teclado, tem histórico (↑/↓) e comandos reais.
- **Animações GSAP** em todas as seções: entrada do hero com timeline orquestrada (formas pastel + texto em cortina + terminal), scroll-reveal com stagger nos projetos e seções, formas ambiente com loop infinito sutil.

## 🚀 Como rodar

Pré-requisito: [Node.js](https://nodejs.org) 18.18+.

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Build de produção:

```bash
npm run build
npm run start
```

> **Fontes:** Space Grotesk (display), Inter (corpo) e IBM Plex Mono (camada "sistema") são carregadas via `@import` no `app/globals.css`, com fallback de sistema — não trava o build mesmo sem acesso à internet.

## 🖥️ O terminal interativo

No Hero, o terminal aceita comandos reais. Para adicionar novos comandos, edite `terminalCommands` em `lib/data.ts`:

```ts
export const terminalCommands = {
  "meu-comando": {
    output: ["linha 1 da resposta", "linha 2 da resposta"],
  },
  // ...
};
```

Comandos disponíveis por padrão: `help`, `whoami`, `ls projetos`, `cat sobre.txt`, `clear`.

## ✏️ Personalizando o conteúdo

Tudo fica em **`lib/data.ts`**:

| O que mudar | Onde |
|---|---|
| Nome, cargo, bio, e-mail, redes | `profile` |
| Stack de ferramentas (Figma, Illustrator...) | `profile.stack` |
| Projetos (título, descrição, tags, status, cor) | `projects` |
| Paleta de cores por categoria de projeto | `colorTokens` |
| Comandos do terminal | `terminalCommands` |
| Itens do menu | `nav` |

### Cor por projeto

Cada projeto tem um campo `color` que aponta para uma chave de `colorTokens` (`lilac`, `rose`, `butter`, `mint`, `sky`). Essa cor aparece como barra lateral no card — pense nela como uma "tag de categoria" visual.

## 🎨 Personalizando a paleta

As cores globais estão em `app/globals.css`, no bloco `:root`. Cada tom pastel tem um par `--cor` (fundo) e `--cor-text` (texto com contraste garantido sobre aquele fundo) — se for trocar uma cor, ajuste o par junto para manter a acessibilidade:

```css
--lilac: #d9c8f0;
--lilac-text: #3d2e5c;
```

## 📦 Estrutura

```
app/
  layout.tsx        → metadata, layout raiz
  globals.css        → design tokens (cores, fontes)
  page.tsx
components/
  Navbar.tsx          → breadcrumb de navegação
  Terminal.tsx         → terminal interativo
  Footer.tsx
  sections/
    Hero.tsx           → timeline GSAP de entrada
    Projects.tsx        → cards estilo API response
    About.tsx           → bio + stack estilo console.log
    Contact.tsx          → formulário estilo POST request
lib/
  data.ts              → todo o conteúdo do site
  gsap-config.ts        → setup centralizado do GSAP/ScrollTrigger
```

## 📬 Back-end do formulário de contato (envio de e-mail real)

O formulário da seção de Contato é conectado a uma **API Route real** em `app/api/contato/route.ts`, que usa a [Resend](https://resend.com) para enviar o e-mail de verdade. Sem essa configuração, o formulário mostra um erro tratado (não falha silenciosamente).

### Configurando a Resend (gratuito para começar)

1. Crie uma conta em [resend.com](https://resend.com)
2. Em **API Keys**, gere uma chave (algo como `re_xxxxxxxxxxxx`)
3. Copie `.env.example` para `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
4. Cole sua chave no `.env.local`:
   ```
   RESEND_API_KEY=re_sua_chave_aqui
   ```
5. Abra `app/api/contato/route.ts` e troque `TO_EMAIL` para o e-mail que deve **receber** as mensagens:
   ```ts
   const TO_EMAIL = "seuemail@dominio.com";
   ```

### Sobre o remetente (`FROM_EMAIL`)

Por padrão, o código usa `onboarding@resend.dev` — um endereço de teste que a própria Resend fornece, **funciona sem configuração extra**, mas só envia para o e-mail cadastrado na sua conta Resend (bom para testar).

Para produção (receber de qualquer pessoa que usar o formulário), você precisa:
1. Verificar um domínio próprio em **Domains** no painel da Resend (adicionar registros DNS — leva minutos)
2. Trocar `FROM_EMAIL` em `route.ts` para usar esse domínio:
   ```ts
   const FROM_EMAIL = "Portfólio <contato@seudominio.com>";
   ```

### Testando localmente

```bash
npm run dev
```

Preencha o formulário em `http://localhost:3000#contato` e envie. Se tudo estiver certo, você recebe o e-mail e a tela mostra a confirmação `201 CREATED`.

### Deploy (Vercel)

Ao fazer deploy, adicione a variável de ambiente no painel da Vercel: **Settings → Environment Variables → `RESEND_API_KEY`**. O arquivo `.env.local` nunca é enviado ao Git (está no `.gitignore`), então essa variável precisa ser configurada manualmente em cada ambiente.

### O que a rota já trata

- Validação de campos obrigatórios (`name`, `email`, `message`) e formato de e-mail → `422`
- JSON malformado no corpo da requisição → `400`
- Chave da Resend ausente ou inválida → erro claro, sem crashar o servidor
- Erros inesperados → `500`, logados no servidor (não expostos ao usuário)
- Escapa o HTML do nome/mensagem antes de montar o corpo do e-mail (evita injeção)



```bash
npm install -g vercel
vercel
```

## 📝 Próximos passos sugeridos

- Adicionar um honeypot (campo invisível) na API route para reduzir spam de bots
- Adicionar páginas de case study completas por projeto (`app/projetos/[slug]/page.tsx`), continuando a estética de "request/response"
- Adicionar fotos/mockups reais dos projetos como imagens dentro dos cards
- Expandir o terminal com mais comandos (ex: `cat contato.txt`, `open instagram`)
