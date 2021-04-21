create extension if not exists "uuid-ossp";

create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  price integer
);

create table if not exists stocks (
  product_id uuid,
  count integer,
  foreign key ("product_id") references "products" ("id") on delete cascade
);


insert into products (title, description, price) values
('GTX 3080Ti', 'Super new videocard for your computer', 3000),
('GTX 3070', 'Pre top videocard for your computer', 2000),
('GTX 970', 'Legendary videocard', 228);

insert into stocks (product_id, count)
(select id, 3 from products where title = 'GTX 3080Ti');

insert into stocks (product_id, count)
(select id, 4 from products where title = 'GTX 3070');

insert into stocks (product_id, count)
(select id, 5 from products where title = 'GTX 970');