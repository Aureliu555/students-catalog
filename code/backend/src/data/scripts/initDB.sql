begin transaction;

-- Delete tables if exist
drop table if exists users, students, subjects, users_students, students_subjects cascade;

-- Create tables

create table users(
    email character varying check (email like '%@%.%') primary key,
    name character varying not null,
    birth_date bigint not null,
    password character varying not null
);

create table students(
    id UUID primary key,
    name character varying not null
);

create table subjects(
    id UUID primary key,
    name character varying,
    student_id UUID,
    grade integer,
    foreign key (student_id) references students(id) on delete cascade
);

create table users_students(
    user_email character varying,
    student_id UUID,
    primary key (user_email, student_id),
    foreign key (user_email) references users(email) on delete cascade,
    foreign key (student_id) references students(id) on delete cascade
);

commit;
