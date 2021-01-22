/* Replace with your SQL commands */
CREATE TYPE parkmanager_user_type AS ENUM (
    'admin',
    'basic'
);

CREATE TYPE parking_space_availabilty_type AS ENUM (

    'unavailable',
    'available',
    'in_use'
);


CREATE TABLE IF NOT EXISTS user_info(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    role parkmanager_user_type NOT NULL,
    drivers_license VARCHAR,
    salt VARCHAR NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS parking_space(
    id SERIAL PRIMARY KEY,
    no_of_space VARCHAR,
    floor VARCHAR,
    availability parking_space_availabilty_type,
    occupancy VARCHAR,
    user_id INT NULL REFERENCES user_info(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);