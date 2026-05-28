create database if not exists masiha character set utf8mb4 collate utf8mb4_unicode_ci;
use masiha;

create table if not exists users (
  id bigint unsigned primary key auto_increment,
  email varchar(255) unique,
  display_name varchar(120),
  path enum('seeker', 'growing') default 'seeker',
  created_at timestamp default current_timestamp
);

create table if not exists content_items (
  id bigint unsigned primary key auto_increment,
  slug varchar(160) not null unique,
  kind enum(
    'bible_passage',
    'journey_lesson',
    'study_theme_day',
    'daily_liturgy',
    'year_plan_day'
  ) not null,
  title varchar(220) not null,
  body text not null,
  metadata json not null,
  status enum('draft', 'published', 'archived') default 'draft',
  sort_order int not null default 0,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp,
  index content_kind_order (kind, status, sort_order)
);

create table if not exists user_bookmarks (
  id bigint unsigned primary key auto_increment,
  user_id bigint unsigned not null,
  content_item_id bigint unsigned not null,
  note text,
  created_at timestamp default current_timestamp,
  unique key unique_user_bookmark (user_id, content_item_id),
  constraint fk_bookmark_user foreign key (user_id) references users(id) on delete cascade,
  constraint fk_bookmark_content foreign key (content_item_id) references content_items(id) on delete cascade
);

create table if not exists user_progress (
  id bigint unsigned primary key auto_increment,
  user_id bigint unsigned not null,
  track_slug varchar(160) not null,
  content_item_id bigint unsigned,
  completed_at timestamp null,
  answer varchar(255),
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp,
  unique key unique_user_track_content (user_id, track_slug, content_item_id),
  constraint fk_progress_user foreign key (user_id) references users(id) on delete cascade,
  constraint fk_progress_content foreign key (content_item_id) references content_items(id) on delete set null
);
