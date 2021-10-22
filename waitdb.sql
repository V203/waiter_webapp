
CREATE TABLE waiters(
    id SERIAL NOT NULL PRIMARY KEY,
    waiters_name text not NULL
);

CREATE TABLE week(
    id SERIAL NOT NULL PRIMARY KEY,
    week_day text not null

);
insert into week(week_day) values('monday');
insert into week(week_day) values('tuesday');
insert into week(week_day) values('wednesday');
insert into week(week_day) values('thursday');
insert into week(week_day) values('friday');
insert into week(week_day) values('saturday');
insert into week(week_day) values('sunday');


CREATE TABLE shift(
    id SERIAL NOT NULL PRIMARY KEY,
    waiters_id int not NULL ,
    shift_days_id int not NULL, 
    foreign key (waiters_id) references waiters(id),
    foreign key (shift_days_id) references week(id)
);