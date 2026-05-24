# Auditoria Shine Girls

Data: 2026-05-23

Origem analisada: `C:\shinegirls`

Destino da reconstrução: `C:\shinegirls-new`

## Estrutura encontrada

- `bancodedados`: dump SQL `uaisoft_shine_girls_2025-01-20_00-00-08.sql`, aproximadamente 39 MB.
- `site`: instalação WordPress com arquivos públicos, `wp-admin`, `wp-includes`, `wp-content`, `store.html`, `.htaccess`, `web.config` e arquivos de configuração.
- `site\wordpress`: segunda cópia WordPress mais enxuta, com outro `wp-content`.
- `site\wp-content`: conteúdo principal ativo, com temas, plugins, uploads, logs, LiteSpeed e arquivos temporários.

## Banco e conteúdo

- Prefixo real das tabelas: `5pun3r86w_`.
- Tema ativo: `insights`.
- Site antigo: `https://shinegirls.com.br`.
- Título antigo: plataforma para divulgação online de trabalhos de modelos, e-commerce, loja virtual de modas e produtos femininos.
- Descrição antiga: plataforma para divulgação online de trabalhos de modelos, e-commerce e loja virtual especializada em produtos femininos.

Extração gerada em:

- `audit/wordpress-audit.json`
- `audit/content-summary.md`

Resumo extraído:

- 30 páginas publicadas.
- 17 posts publicados.
- 1 formulário.
- 135 produtos publicados no WooCommerce, descartados da migração por orientação estratégica.
- 162 produtos e 2104 variações no total, incluindo itens de dropshipping.

## Conteúdo relevante preservado

- História e posicionamento: Shine Girls nasceu em 2019 com foco em beleza feminina, modelos, moda e divulgação.
- Modelos e influenciadoras: Laysa Padovani, Marcella Narhell, Barbara Santos, Renata Palis e outros nomes no legado.
- Categorias editoriais úteis: Moda, Auto Estima, Garotas que Brilham, Influenciadoras, Publicidade, Serviços.
- Contato: `shinegirls.com.br@gmail.com`, WhatsApp `(34) 98897-7879`, Instagram `@shinegirls.com.br`.
- Intenção comercial: publicidade, anunciantes, parcerias e futura loja.

## Assets relevantes selecionados

Copiados para `public/legacy`:

- `laysa-inverno.jpg`
- `laysa-casual.jpg`
- `laysa-blazer.jpg`
- `marcella-narhell.jpeg`
- `barbara-santos.jpg`
- `renata-palis.jpg`
- `brand-editorial.jpeg`
- `legacy-insights-logo.png`
- `shine-girls-logo-original.jpeg`
- `logo-shine-girls-root.jpg`

## Problemas encontrados

- WordPress com duas estruturas sobrepostas.
- Muitos plugins legados: WooCommerce, AliDropship, LiteSpeed, tradutor, galeria, formulários, cache e extensões de checkout.
- Registros de erros fatais por tempo máximo de execução no banco.
- Produtos importados e categorias duplicadas ou desalinhadas com a marca.
- Shortcodes e conteúdo bruto de Instagram/galerias.
- Páginas de checkout, carrinho e conta que não fazem sentido na nova estratégia.
- Encoding legado com mojibake em parte dos textos exportados.
- Dependência de `.htaccess`, `web.config`, PHP e plugins para funcionalidades básicas.

## Oportunidades

- Reposicionar a Shine Girls como plataforma editorial e comercial premium.
- Transformar modelos em perfis profissionais.
- Trocar loja genérica por curadoria futura.
- Criar páginas claras para anunciantes, contato, modelos, blog e sobre.
- Implementar SEO técnico, sitemap, robots, metadata e schema.
- Manter imagens, intenção de marca, logomarca original e rosa como cor proprietária, mas reescrever textos com tom mais elegante.

## Stack recomendada

- Next.js App Router
- TypeScript
- TailwindCSS
- Framer Motion disponível para evoluções de animação
- Lucide React para ícones
- Deploy na Vercel
- CMS headless opcional em fase futura

## Roadmap técnico

1. Fundar nova arquitetura independente de WordPress.
2. Migrar conteúdo útil como dados estáticos curados.
3. Criar design system com paleta feminina sofisticada.
4. Publicar Home, Sobre, Modelos, Blog, Anunciantes, Loja futura e Contato.
5. Implementar SEO técnico e performance.
6. Validar build, lint e experiência visual.
7. Evoluir para CMS ou loja futura quando houver estratégia comercial definida.
