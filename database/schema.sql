-- Run in phpMyAdmin or: mysql -u root -p < database/schema.sql
CREATE DATABASE IF NOT EXISTS portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio;

CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'general',
  proficiency TINYINT UNSIGNED NOT NULL DEFAULT 80,
  icon VARCHAR(64) DEFAULT NULL,
  sort_order INT NOT NULL DEFAULT 0
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  tech_stack VARCHAR(500) DEFAULT NULL,
  live_url VARCHAR(500) DEFAULT NULL,
  repo_url VARCHAR(500) DEFAULT NULL,
  image_url VARCHAR(500) DEFAULT NULL,
  featured TINYINT(1) NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(200) DEFAULT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS site_content (
  slug VARCHAR(64) NOT NULL PRIMARY KEY,
  data_json LONGTEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO skills (name, category, proficiency, icon, sort_order) VALUES
('Laravel', 'web', 90, 'laravel', 1),
('PHP', 'programming', 88, 'php', 2),
('MySQL', 'database', 88, 'mysql', 3),
('Flutter', 'mobile', 86, 'flutter', 4),
('Dart', 'programming', 84, 'dart', 5),
('JavaScript', 'programming', 82, 'js', 6),
('Python', 'programming', 80, 'python', 7),
('Firebase', 'cloud', 78, 'firebase', 8),
('Git', 'tools', 86, 'git', 9),
('Java', 'programming', 76, 'java', 10);

INSERT INTO projects (title, description, tech_stack, live_url, repo_url, featured, sort_order) VALUES
('PJLC Learning System', 'Online learning management system at Xentral Methods—Laravel server-side features, MySQL queries, and Blade front-end templates. Shipped features, resolved bugs, and improved reliability.', 'Laravel · MySQL · Blade · PHP', NULL, NULL, 1, 1),
('Laundry IoT + Flutter', 'End-to-end IoT build: rain/moisture sensing hardware, backend data processing, and a Flutter mobile app for real-time monitoring and remote control.', 'Flutter · IoT · Sensors · Backend pipeline', NULL, NULL, 1, 2),
('eBook conversion tool', 'Content processing pipeline to turn traditional printed books into structured digital eBooks—backend parsing plus a user-facing interface for operators.', 'Parsing · Laravel / web stack · UX for operators', NULL, NULL, 0, 3);
