-- SQLite schema generated from the Django ORM design.
-- Run migrations with: python manage.py migrate

CREATE TABLE internships_domain (
    id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    name varchar(80) NOT NULL UNIQUE,
    slug varchar(90) NOT NULL UNIQUE,
    is_active bool NOT NULL
);

CREATE TABLE internships_user (
    id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    password varchar(128) NOT NULL,
    last_login datetime NULL,
    is_superuser bool NOT NULL,
    username varchar(150) NOT NULL UNIQUE,
    first_name varchar(150) NOT NULL,
    last_name varchar(150) NOT NULL,
    is_staff bool NOT NULL,
    is_active bool NOT NULL,
    date_joined datetime NOT NULL,
    email varchar(254) NOT NULL UNIQUE,
    full_name varchar(150) NOT NULL,
    role varchar(20) NOT NULL,
    assigned_domain_id bigint NULL REFERENCES internships_domain(id) DEFERRABLE INITIALLY DEFERRED
);

CREATE TABLE internships_student (
    id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    phone varchar(20) NOT NULL,
    college varchar(160) NOT NULL,
    is_active bool NOT NULL,
    created_at datetime NOT NULL,
    domain_id bigint NOT NULL REFERENCES internships_domain(id) DEFERRABLE INITIALLY DEFERRED,
    user_id bigint NOT NULL UNIQUE REFERENCES internships_user(id) DEFERRABLE INITIALLY DEFERRED
);

CREATE TABLE internships_task (
    id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    title varchar(160) NOT NULL,
    description text NOT NULL,
    due_date date NULL,
    status varchar(20) NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    created_by_id bigint NOT NULL REFERENCES internships_user(id) DEFERRABLE INITIALLY DEFERRED,
    domain_id bigint NOT NULL REFERENCES internships_domain(id) DEFERRABLE INITIALLY DEFERRED
);

CREATE TABLE internships_task_assigned_students (
    id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    task_id bigint NOT NULL REFERENCES internships_task(id) DEFERRABLE INITIALLY DEFERRED,
    student_id bigint NOT NULL REFERENCES internships_student(id) DEFERRABLE INITIALLY DEFERRED,
    UNIQUE(task_id, student_id)
);

CREATE TABLE internships_attendance (
    id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    date date NOT NULL,
    check_in_time datetime NULL,
    check_out_time datetime NULL,
    worked_duration bigint NOT NULL,
    status varchar(20) NOT NULL,
    student_id bigint NOT NULL REFERENCES internships_student(id) DEFERRABLE INITIALLY DEFERRED,
    UNIQUE(student_id, date)
);

CREATE TABLE internships_leaverequest (
    id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    leave_type varchar(20) NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    reason text NOT NULL,
    status varchar(20) NOT NULL,
    reviewed_at datetime NULL,
    created_at datetime NOT NULL,
    reviewed_by_id bigint NULL REFERENCES internships_user(id) DEFERRABLE INITIALLY DEFERRED,
    student_id bigint NOT NULL REFERENCES internships_student(id) DEFERRABLE INITIALLY DEFERRED
);
