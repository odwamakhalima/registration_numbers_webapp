create table mytowns(
	id serial not null primary key,
	description text not null
);

create table myregnumbers (
	id serial not null primary key,
    description text not null,
	mytowns_id int,
	foreign key (mytowns_id) references mytowns(id)
);