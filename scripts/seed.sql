-- Insert sample data for colleges
INSERT INTO hive_db.colleges (college_name, admin_user_id, created_by)
VALUES ('Sample College 1', 1, 1),
       ('Sample College 2', 2, 1),
       ('Sample College 3', 3, 1);

-- Insert sample data for users
-- DefaultPassword: Password@123 ("$2a$10$jK7oUedgnbvIDqXxWQOQYO9E/Ds0SpN78hLxNIHnrbcFdORFX41am")
INSERT INTO hive_db.users (username, password, user_type, created_by)
VALUES ('admin1', '$2a$10$jK7oUedgnbvIDqXxWQOQYO9E/Ds0SpN78hLxNIHnrbcFdORFX41am', 'ADMIN', 1),
       ('student1', '$2a$10$jK7oUedgnbvIDqXxWQOQYO9E/Ds0SpN78hLxNIHnrbcFdORFX41am', 'STUDENT', 2),
       ('student2', '$2a$10$jK7oUedgnbvIDqXxWQOQYO9E/Ds0SpN78hLxNIHnrbcFdORFX41am', 'STUDENT', 2),
       ('student3', '$2a$10$jK7oUedgnbvIDqXxWQOQYO9E/Ds0SpN78hLxNIHnrbcFdORFX41am', 'STUDENT', 2);

-- Insert sample data for events
INSERT INTO hive_db.events (event_name, college_id, event_type, event_fee, event_location, event_time, created_by)
VALUES ('Event 1', 1, 'PUBLIC', NULL, 'Location 1', '2024-04-15 09:00:00', 1),
       ('Event 2', 2, 'PUBLIC', NULL, 'Location 2', '2024-04-20 10:00:00', 2),
       ('Event 3', 1, 'PRIVATE', 50.00, 'Location 3', '2024-04-25 11:00:00', 1);

-- Insert sample data for event participants
INSERT INTO hive_db.event_participants (event_id, user_id, is_approved, created_by)
VALUES (1, 2, TRUE, 1),
       (1, 3, FALSE, 1),
       (2, 3, TRUE, 1),
       (3, 2, FALSE, 1);

-- Insert sample data for payments
INSERT INTO hive_db.payments (participant_id, payment_amount, payment_date, created_by)
VALUES (1, 0.00, '2024-04-15 09:00:00', 1),
       (2, 50.00, '2024-04-20 10:00:00', 1);

-- Insert sample data for activity logs
INSERT INTO hive_db.activity_logs (user_id, action, action_time, created_by)
VALUES (1, 'Logged in', '2024-04-15 09:00:00', 1),
       (2, 'Registered for Event 1', '2024-04-15 09:00:00', 1),
       (3, 'Registered for Event 2', '2024-04-20 10:00:00', 1);