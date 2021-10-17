DROP TABLE IF EXISTS waiters;
-- DROP TABLE IF EXISTS admin_;
-- DROP TABLE IF EXISTS days;


create table waiters(
    id SERIAL NOT NULL PRIMARY KEY,
    name varchar(255),
    shift varchar(255)
    
    
);




-- create table admin_(
--     id SERIAL NOT NULL PRIMARY KEY ,
--     name varchar(255),
--     shift varchar(255),

--     -- waiters_id int not NULL,
   
--     FOREIGN KEY (name) REFERENCES waiters(name) 

-- );

-- create table days(
--     monday text ,
--     tuesday text,
--     wednesday text ,
--     thursday text ,
--     friday text ,
--     saturday text ,
--     sunday text ,
    

--     -- UNIQUE(monday,tuesday,wednesday,thursday,friday,saturday,sunday),
    
--     FOREIGN KEY days_shift(monday,tuesday,wednesday,thursday,friday,saturday,sunday) REFERENCES waiters(shift)

-- );

-- CREATE TABLE admin(
--     admin_id int GENERATED ALWAYS AS IDENTITY,
--     name text,
--     days text not null,
--     PRIMARY KEY (admin_id),

    
--     FOREIGN KEY(admin_id) REFERENCES waiters(id)


--     )

    -- SELECT waiters.shift ,name  FROM  waiters INNER JOIN days ON  week.id = waiters.shift