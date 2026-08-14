CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    role VARCHAR(20) NOT NULL DEFAULT 'USER',

    CONSTRAINT users_role_check
        CHECK (role IN ('USER', 'ADMIN'))
);


CREATE TABLE albums (
    id INTEGER PRIMARY KEY,
    album_name VARCHAR(255),
    artist VARCHAR(255),
    genre VARCHAR(255),
    release_date DATE
);


CREATE TABLE tracks (
    id INTEGER PRIMARY KEY,
    album_id INTEGER,

    track_name VARCHAR(255),
    duration INTEGER,
    genre VARCHAR(255),

    CONSTRAINT tracks_album_id_fkey
        FOREIGN KEY (album_id)
        REFERENCES albums(id)
);


CREATE TABLE ratings (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    user_id INTEGER NOT NULL,
    album_id INTEGER,
    track_id INTEGER,

    rate INTEGER NOT NULL,
    comment TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP,

    CONSTRAINT ratings_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT ratings_album_id_fkey
        FOREIGN KEY (album_id)
        REFERENCES albums(id),

    CONSTRAINT ratings_track_id_fkey
        FOREIGN KEY (track_id)
        REFERENCES tracks(id),

    CONSTRAINT ratings_rate_check
        CHECK (rate BETWEEN 1 AND 10),

    CONSTRAINT uq_user_album
        UNIQUE (user_id, album_id),

    CONSTRAINT uq_user_track
        UNIQUE (user_id, track_id),

    CONSTRAINT exactly_one_target
        CHECK (
            (album_id IS NOT NULL AND track_id IS NULL)
            OR
            (album_id IS NULL AND track_id IS NOT NULL)
        )
);