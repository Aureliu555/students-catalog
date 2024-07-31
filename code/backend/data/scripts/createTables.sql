rollback;

-- ################# --

begin transaction;

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
    code integer primary key,
    name character varying not null
);

create table users_students(
    user_email character varying,
    student_id UUID,
    primary key (user_email, student_id),
    foreign key (user_email) references users(email) on delete cascade,
    foreign key (student_id) references students(id) on delete cascade
);

create table students_subjects(
    student_id UUID,
    subject_code integer,
    grade integer,
    primary key (student_id, subject_code),
    foreign key (student_id) references students(id) on delete cascade,
    foreign key (subject_code) references subjects(code) on delete cascade
);

commit;