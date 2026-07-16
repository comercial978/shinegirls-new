# Shine Girls New

Nova versao da Shine Girls construida em Next.js, sem dependencia de WordPress.

## Stack

- Next.js App Router
- React
- TypeScript
- TailwindCSS
- Supabase Auth, Postgres e Storage
- Deploy recomendado: Vercel

## Estrutura

- `src/app`: rotas e paginas.
- `src/components`: componentes reutilizaveis.
- `src/content`: conteudo editorial estatico.
- `src/lib`: utilitarios, tipos e clientes Supabase.
- `public/legacy`: assets reaproveitados do legado.
- `public/modelos`: assets publicos do casting.
- `audit`: extracao tecnica do WordPress antigo.
- `docs/AUDITORIA.md`: relatorio tecnico.

## Variaveis de ambiente

Crie um `.env.local` localmente e configure as mesmas variaveis na Vercel.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Tambem existe `.env.example` com os nomes esperados. Em Next.js, prefira sempre as variaveis `NEXT_PUBLIC_*` para o cliente.

Importante: `SUPABASE_SERVICE_ROLE_KEY` deve ficar apenas no servidor/Vercel. Nunca exponha essa chave no browser.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Build

```bash
npm run lint
npm run build
npm run start
```

## Funcionalidades de modelos

- `/modelos`: mantem o casting editorial atual.
- `/modelos/cadastro`: cadastro em tres etapas com Supabase Auth e perfil pendente.
- `/modelos/entrar`: login e recuperacao de senha.
- `/modelos/dashboard`: area protegida para ver/editar perfil.
- `/modelos/como-funciona`: explica o processo, a curadoria e a privacidade.
- `/termos` e `/privacidade`: documentos vinculados aos consentimentos do cadastro.
- Perfis cadastrados entram com `status = pending`.
- Apenas perfis aprovados devem aparecer publicamente.
- Dados sensiveis como e-mail e WhatsApp nao sao exibidos na listagem publica.
- A autorizacao de analise/publicacao fica registrada nos metadados da conta do Supabase Auth.
- O rascunho do formulario e salvo no dispositivo, sem armazenar senha ou foto.

## Analytics do funil

O projeto usa `@vercel/analytics` para visualizacoes de pagina e deixa preparados os eventos:

```text
visitou_home
clicou_casting
clicou_criar_cadastro
iniciou_cadastro
concluiu_etapa_1
concluiu_etapa_2
enviou_foto
enviou_cadastro
erro_no_formulario
```

Ative Web Analytics no painel da Vercel. Eventos personalizados dependem de um plano da Vercel que ofereca esse recurso; o site continua funcionando normalmente quando eles nao estiverem disponiveis.

## SQL Supabase

Rode este SQL no Supabase SQL Editor.

```sql
create table if not exists public.model_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  artistic_name text not null,
  full_name text not null,
  email text not null,
  whatsapp text,
  city text,
  state text,
  instagram text,
  category text,
  bio text,
  portfolio_url text,
  main_photo_url text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  is_adult_confirmed boolean default false,
  terms_accepted boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_model_profiles_updated_at on public.model_profiles;

create trigger set_model_profiles_updated_at
before update on public.model_profiles
for each row
execute function public.set_updated_at();
```

## RLS

```sql
alter table public.model_profiles enable row level security;

revoke all on public.model_profiles from anon;
revoke all on public.model_profiles from authenticated;

grant select on public.model_profiles to authenticated;
grant insert on public.model_profiles to authenticated;
grant update (
  whatsapp,
  city,
  state,
  instagram,
  category,
  bio,
  portfolio_url,
  main_photo_url,
  is_adult_confirmed,
  terms_accepted,
  updated_at
) on public.model_profiles to authenticated;

drop policy if exists "Models can read own profile" on public.model_profiles;
create policy "Models can read own profile"
on public.model_profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Models can insert own profile" on public.model_profiles;
create policy "Models can insert own profile"
on public.model_profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "Models can update own editable profile" on public.model_profiles;
create policy "Models can update own editable profile"
on public.model_profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);
```

### View publica segura

Use uma view para expor apenas dados publicos de perfis aprovados.

```sql
create or replace view public.public_model_profiles as
select
  id,
  artistic_name,
  city,
  state,
  instagram,
  category,
  bio,
  portfolio_url,
  main_photo_url
from public.model_profiles
where status = 'approved';

grant select on public.public_model_profiles to anon, authenticated;
```

O site tambem possui a rota `/api/modelos/approved`, que retorna somente campos publicos.

## Storage

Crie um bucket chamado:

```text
model-photos
```

Recomendacao simples para esta fase: bucket publico, pois apenas fotos aprovadas devem aparecer no site.

Politica para upload autenticado no proprio diretorio:

```sql
create policy "Models can upload own photos"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'model-photos'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Models can update own photos"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'model-photos'
  and (storage.foldername(name))[1] = auth.uid()::text
);
```

## Aprovar modelos manualmente

Por seguranca, o painel admin completo nao foi criado nesta fase. Aprove manualmente no Supabase:

```sql
update public.model_profiles
set status = 'approved'
where id = 'UUID_DA_MODELO';
```

Para recusar:

```sql
update public.model_profiles
set status = 'rejected'
where id = 'UUID_DA_MODELO';
```

Status permitidos:

- `pending`
- `approved`
- `rejected`

## Testar cadastro/login

1. Configure Supabase e variaveis de ambiente.
2. Rode `npm run dev`.
3. Acesse `/modelos/cadastro`.
4. Crie um cadastro.
5. Entre em `/modelos/entrar`.
6. Edite o perfil em `/modelos/dashboard`.
7. Aprove manualmente no Supabase.
8. Volte em `/modelos` e confira a area "Casting aprovado".

## Deploy na Vercel

1. Suba o projeto para o GitHub.
2. Importe o repositorio na Vercel.
3. Configure as variaveis:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Use o preset de Next.js.
5. Publique.

## Decisoes de migracao

- O WordPress antigo foi usado apenas como fonte de auditoria.
- WooCommerce, AliDropship e produtos antigos foram ignorados.
- A pagina `Loja` foi mantida como frente estrategica para uma loja futura.
- A logomarca enviada no diretorio `logotipo` foi aplicada no header/footer.
- O rosa foi reforcado como cor principal da identidade visual.
- O formulario de contato abre WhatsApp com mensagem preenchida e oferece e-mail como fallback.
- A foto atualizada da Barbara Santos esta em `public/modelos/barbara-santos.jpg`.
