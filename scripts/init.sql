
-- File: init.sql

-- Create your database if it doesn't exist
CREATE DATABASE IF NOT EXISTS hive_db;

-- Use your database
USE hive_db;

-- Create table for colleges
CREATE TABLE IF NOT EXISTS hive_db.colleges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    college_name VARCHAR(100) NOT NULL,
    admin_user_id INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    modified_by INT,
    deleted_on TIMESTAMP,
    deleted_by VARCHAR(200),
    deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- Create table for users
CREATE TABLE IF NOT EXISTS hive_db.users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    user_type ENUM('ADMIN', 'STUDENT') NOT NULL,
    college_id INT,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    modified_by INT,
    deleted_on TIMESTAMP,
    deleted_by VARCHAR(200),
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    CONSTRAINT fk_users_college_id FOREIGN KEY (college_id) REFERENCES hive_db.colleges(id)
);

-- Create table for events
CREATE TABLE IF NOT EXISTS hive_db.events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    college_id INT NOT NULL,
    event_type ENUM('PUBLIC', 'PRIVATE') NOT NULL,
    event_fee DECIMAL(10, 2),
    event_location VARCHAR(100) NOT NULL,
    event_time DATETIME NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    modified_by INT,
    deleted_on TIMESTAMP,
    deleted_by VARCHAR(200),
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    CONSTRAINT fk_events_college_id FOREIGN KEY (college_id) REFERENCES hive_db.colleges(id)
);

-- Create table for event participants
CREATE TABLE IF NOT EXISTS hive_db.event_participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    is_blocked BOOLEAN DEFAULT FALSE,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    modified_by INT,
    deleted_on TIMESTAMP,
    deleted_by VARCHAR(200),
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    CONSTRAINT fk_event_participants_event_id FOREIGN KEY (event_id) REFERENCES hive_db.events(id),
    CONSTRAINT fk_event_participants_user_id FOREIGN KEY (user_id) REFERENCES hive_db.users(id)
);

-- Create table for payments
CREATE TABLE IF NOT EXISTS hive_db.payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    participant_id INT NOT NULL,
    payment_amount DECIMAL(10, 2) NOT NULL,
    payment_date DATETIME NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    modified_by INT,
    deleted_on TIMESTAMP,
    deleted_by VARCHAR(200),
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    CONSTRAINT fk_payments_participant_id FOREIGN KEY (participant_id) REFERENCES hive_db.event_participants(id)
);

-- Create table for activity logs
CREATE TABLE IF NOT EXISTS hive_db.activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action VARCHAR(100) NOT NULL,
    action_time DATETIME NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    modified_by INT,
    deleted_on TIMESTAMP,
    deleted_by VARCHAR(200),
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    CONSTRAINT fk_activity_logs_user_id FOREIGN KEY (user_id) REFERENCES hive_db.users(id)
);