-- Update live_classes table structure based on live_lecture.txt requirements

-- Drop existing live_classes table to recreate with new structure
DROP TABLE IF EXISTS live_classes;

-- Create updated live_classes table
CREATE TABLE `live_classes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `youtube_live_link` text NOT NULL,
  `session_type` enum('subject_specific','other_topic') NOT NULL DEFAULT 'subject_specific',
  `topic_name` varchar(255) DEFAULT NULL,
  `subject_id` int DEFAULT NULL,
  `class_id` int NOT NULL,
  `teacher_id` int NOT NULL,
  `school_id` int DEFAULT NULL,
  `is_all_schools` boolean DEFAULT FALSE,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `status` enum('upcoming','live','completed','cancelled') NOT NULL DEFAULT 'upcoming',
  `is_active` boolean DEFAULT TRUE,
  `created_by_role` enum('super_admin','school_admin','teacher') NOT NULL,
  `approved_by` int DEFAULT NULL,
  `approval_status` enum('pending','approved','rejected') DEFAULT 'approved',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `subject_id` (`subject_id`),
  KEY `teacher_id` (`teacher_id`),
  KEY `class_id` (`class_id`),
  KEY `school_id` (`school_id`),
  KEY `approved_by` (`approved_by`),
  CONSTRAINT `live_classes_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE SET NULL,
  CONSTRAINT `live_classes_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `live_classes_ibfk_3` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `live_classes_ibfk_4` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`) ON DELETE CASCADE,
  CONSTRAINT `live_classes_ibfk_5` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Add indexes for better performance on filtering and consolidation
ALTER TABLE `live_classes` ADD INDEX `idx_consolidation` (`title`, `start_time`, `end_time`, `teacher_id`, `class_id`);
ALTER TABLE `live_classes` ADD INDEX `idx_status_time` (`status`, `start_time`);

-- Insert sample data
INSERT INTO `live_classes` (`title`, `youtube_live_link`, `session_type`, `topic_name`, `subject_id`, `class_id`, `teacher_id`, `school_id`, `start_time`, `end_time`, `status`, `created_by_role`) VALUES
('Mathematics Live Session', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'subject_specific', 'Algebra Basics', 4, 3, 7, 1, '2025-01-15 10:00:00', '2025-01-15 11:00:00', 'upcoming', 'teacher'),
('Science Experiment Demo', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'subject_specific', 'Chemical Reactions', 5, 3, 24, 1, '2025-01-15 14:00:00', '2025-01-15 15:00:00', 'live', 'teacher'),
('Career Guidance Session', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'other_topic', 'Future Career Options', NULL, 3, 25, 1, '2025-01-16 11:00:00', '2025-01-16 12:00:00', 'upcoming', 'school_admin');