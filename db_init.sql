# Example SQL for initial database setup

CREATE TABLE emails (
    id SERIAL PRIMARY KEY,
    subject TEXT NOT NULL,
    sender TEXT NOT NULL,
    body TEXT NOT NULL,
    label TEXT
);

CREATE TABLE audit_trail (
    id SERIAL PRIMARY KEY,
    email_id INTEGER REFERENCES emails(id),
    action TEXT NOT NULL,
    user TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT NOW()
);
