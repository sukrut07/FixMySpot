create extension if not exists postgis;

create type issue_category as enum ('pothole','garbage','streetlight','water_leak','waterlogging','fallen_tree','broken_footpath','electrical_hazard','construction_debris','traffic_sign','drainage','other');
create type issue_severity as enum ('low','medium','high','critical');
create type issue_status as enum ('reported','verified','in_progress','resolved');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text not null default '',
  avatar_url text,
  locality text default '',
  city text default '',
  pin_code text default '',
  total_reports int not null default 0,
  resolved_reports int not null default 0,
  xp_points int not null default 0,
  report_streak int not null default 0,
  badges text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table issues (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references profiles(id) on delete set null,
  title text not null,
  description text not null,
  category issue_category not null,
  severity issue_severity not null,
  status issue_status not null default 'reported',
  lat double precision not null,
  lng double precision not null,
  location geography(point, 4326) generated always as (st_setsrid(st_makepoint(lng, lat), 4326)::geography) stored,
  address text not null default '',
  locality text not null default '',
  image_urls text[] not null default '{}',
  ai_confidence numeric,
  priority_score int not null default 0,
  upvote_count int not null default 0,
  me_too_count int not null default 0,
  comment_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table upvotes (
  user_id uuid references profiles(id) on delete cascade,
  issue_id uuid references issues(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, issue_id)
);

create table comments (
  id uuid primary key default gen_random_uuid(),
  issue_id uuid references issues(id) on delete cascade,
  author_id uuid references profiles(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create table issue_timeline (
  id uuid primary key default gen_random_uuid(),
  issue_id uuid references issues(id) on delete cascade,
  status issue_status not null,
  note text not null,
  image_urls text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table complaints (
  id uuid primary key default gen_random_uuid(),
  issue_id uuid references issues(id) on delete cascade,
  letter text not null,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table issues enable row level security;
alter table upvotes enable row level security;
alter table comments enable row level security;
alter table issue_timeline enable row level security;
alter table complaints enable row level security;

create policy "profiles are readable" on profiles for select using (true);
create policy "issues are readable" on issues for select using (true);
create policy "comments are readable" on comments for select using (true);
create policy "timeline is readable" on issue_timeline for select using (true);
