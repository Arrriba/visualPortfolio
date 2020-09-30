create table Categories
(
	id bigint auto_increment primary key,
	name varchar(255) not null
);

create table Games
(
	id bigint auto_increment primary key,
	name varchar(255) not null,
    creator varchar(255) not null,
    description varchar(1000) not null,
    rating float
);

create table Games_Categories
(
	game_id bigint not null,
	category_id bigint not null,
	primary key (game_id, category_id),
	constraint FK_games_categories_game_id
		foreign key (game_id) references games (id),
	constraint FK_games_categories_category_id
		foreign key (category_id) references categories (id)
);


create table Users
(
	id bigint auto_increment primary key,
	username varchar(255) not null,
    email varchar(255) not null,
    uid varchar(255) not null
);

create table Users_Games
(
	user_id bigint not null,
	game_id bigint not null,
	primary key (user_id, game_id),
    rating float not null,
    review varchar(255),
	constraint FK_users_games_user_id
		foreign key (user_id) references users (id),
	constraint FK_users_games_game_id
		foreign key (game_id) references games (id)
);

create table Orders
(
	id bigint auto_increment primary key,
	number varchar(255) not null,
    user_id bigint not null,
    constraint FK_orders_users_user_id
		foreign key (user_id) references users(id)
);

create table Orders_Games
(
	order_id bigint not null,
	game_id bigint not null,
	primary key (order_id, game_id),
	constraint FK_orders_games_order_id
		foreign key (order_id) references orders (id),
	constraint FK_orders_games_game_id
		foreign key (game_id) references games (id)
);