CREATE DATABASE IF NOT EXISTS smart_health_mate;
USE smart_health_mate;

CREATE TABLE IF NOT EXISTS health_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(20) NOT NULL,
    height_cm DECIMAL(5,2) NOT NULL,
    weight_kg DECIMAL(5,2) NOT NULL,
    systolic INT NOT NULL,
    diastolic INT NOT NULL,
    heart_rate INT NOT NULL,
    notes VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO health_records
(full_name, age, gender, height_cm, weight_kg, systolic, diastolic, heart_rate, notes)
VALUES
('Demo User',20,'Other',170,65,120,80,72,'Sample healthy reading');
