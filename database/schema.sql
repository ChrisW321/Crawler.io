DROP DATABASE IF EXISTS pubcrawls;
CREATE DATABASE pubcrawls;
\c pubcrawls;


CREATE TABLE users (
    id SERIAL,
    username VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE pubCrawl (
    id SERIAL,
    crawlName VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE bars (
    id SERIAL,

    
);


-- CREATE INDEX listingIndex on searchListing (listingId);

-- psql < ./data/schema.sql