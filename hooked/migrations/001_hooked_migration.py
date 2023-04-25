steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            hashed_password VARCHAR(100) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE posts (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id SMALLINT NOT NULL,
            location VARCHAR(100) NOT NULL,
            fish VARCHAR(50) NOT NULL,
            description TEXT NOT NULL,
            picture_url TEXT NOT NULL,
            created_at DATE DEFAULT CURRENT_DATE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE posts;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE fish (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(50) NOT NULL,
            size VARCHAR(50) NOT NULL,
            fishing_technique TEXT NOT NULL,
            type VARCHAR(50) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE fish;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE location (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL UNIQUE,
            state TEXT NOT NULL,
            city TEXT NOT NULL,
            picture_url TEXT NOT NULL,
            description TEXT NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE location;
        """
    ],
    [
        """
        CREATE TABLE location_fish (
            location_id SERIAL REFERENCES location(id),
            fish_id SERIAL REFERENCES fish(id),
            PRIMARY KEY (location_id, fish_id)
        );
        """,
        """
        DROP TABLE location_fish;
        """
    ],
    [
        """
        CREATE TABLE fish_requests (
            id SERIAL PRIMARY KEY NOT NULL,
            location VARCHAR(100) NOT NULL,
            fish VARCHAR(100) NOT NULL,
            picture_url TEXT NOT NULL
        );
        """,
        """
        DROP TABLE fish_requests;
        """
    ]
]
