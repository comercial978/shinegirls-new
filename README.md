# Shine Girls New

Nova versão da Shine Girls construída do zero em Next.js, sem dependência de WordPress.

## Stack

- Next.js App Router
- TypeScript
- TailwindCSS
- Framer Motion
- Lucide React
- SEO nativo com Metadata API, sitemap e robots

## Estrutura

- `src/app`: rotas e páginas.
- `src/components`: componentes reutilizáveis.
- `src/content`: conteúdo curado migrado do legado.
- `src/lib`: utilitários.
- `public/legacy`: assets relevantes reaproveitados.
- `audit`: extração técnica do WordPress antigo.
- `docs/AUDITORIA.md`: relatório técnico e roadmap.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Deploy na Vercel

1. Suba este projeto para um repositório Git.
2. Importe o repositório na Vercel.
3. Use o preset automático de Next.js.
4. Configure o domínio `shinegirls.com.br`.
5. Após validar a nova versão, aponte DNS para a Vercel.

## Decisões de migração

- O WordPress antigo foi usado apenas como fonte de auditoria.
- WooCommerce, AliDropship e produtos antigos foram ignorados.
- Conteúdos editoriais relevantes foram reescritos para preservar intenção, sem clonar o site.
- A página `Loja` foi mantida como frente estratégica para uma loja futura.
- A logomarca original foi preservada em `public/legacy/shine-girls-logo-original.jpeg`.
- A logomarca enviada no diretório `logotipo` foi publicada em `public/legacy/logo-shine-girls-root.jpg` e aplicada no header/footer.
- O rosa foi reforçado como cor principal da identidade visual.
- O formulário de contato usa FormSubmit e redireciona para `/obrigado` após envio.
- A foto atualizada da Barbara Santos está em `public/modelos/barbara-santos.jpg`.

## Comandos úteis

```bash
npm run lint
npm run build
```
