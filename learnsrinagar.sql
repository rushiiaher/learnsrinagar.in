-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 11, 2025 at 06:04 PM
-- Server version: 8.0.36-28
-- PHP Version: 8.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `learnsrinagar`
--

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `name`, `created_at`) VALUES
(1, '6', '2025-05-18 17:59:46'),
(2, '7', '2025-05-18 17:59:50'),
(3, '8', '2025-05-18 17:59:54');

-- --------------------------------------------------------

--
-- Table structure for table `class_admins`
--

CREATE TABLE `class_admins` (
  `id` int NOT NULL,
  `admin_id` int NOT NULL,
  `school_id` int NOT NULL,
  `class_id` int NOT NULL,
  `assigned_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_admins`
--

INSERT INTO `class_admins` (`id`, `admin_id`, `school_id`, `class_id`, `assigned_at`) VALUES
(1, 4, 1, 2, '2025-05-18 18:02:04'),
(2, 10, 1, 1, '2025-05-19 08:55:25');

-- --------------------------------------------------------

--
-- Table structure for table `homework`
--

CREATE TABLE `homework` (
  `id` int NOT NULL,
  `subject_id` int DEFAULT NULL,
  `teacher_id` int DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `class_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homework`
--

INSERT INTO `homework` (`id`, `subject_id`, `teacher_id`, `title`, `description`, `created_at`, `class_id`) VALUES
(2, 1, 3, 'Write 5 sentences using at least one noun, one verb, and one adjective in each sentence.', 'Example: The tall boy kicks the ball.', '2025-05-19 09:03:10', NULL),
(3, 4, 7, 'Fractions and Decimals', 'a) Riya ate \n3\n8\n8\n3\n​\n  of a pizza. Her friend ate \n1\n4\n4\n1\n​\n . How much pizza did they eat together?\n\nb) A rope is 4.5 meters long. If it is cut into 3 equal parts, what is the length of each part?', '2025-05-19 09:13:22', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `live_classes`
--

CREATE TABLE `live_classes` (
  `id` int NOT NULL,
  `subject_id` int DEFAULT NULL,
  `teacher_id` int DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `duration_minutes` int DEFAULT NULL,
  `join_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `day_of_week` int NOT NULL DEFAULT '1',
  `class_id` int NOT NULL,
  `class_date` date NOT NULL,
  `class_time` time NOT NULL,
  `description` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `live_classes`
--

INSERT INTO `live_classes` (`id`, `subject_id`, `teacher_id`, `start_time`, `duration_minutes`, `join_url`, `created_at`, `day_of_week`, `class_id`, `class_date`, `class_time`, `description`) VALUES
(10, 3, 3, NULL, 30, 'https://us06web.zoom.us/j/86986026186?pwd=vsPImQwtMcxT8zMM5amaQIapeaFwOy.1', '2025-07-10 03:23:41', 1, 3, '2025-07-10', '09:30:00', 'Haroof Ka Bayan'),
(11, 8, 7, NULL, 30, 'https://us06web.zoom.us/j/86986026186?pwd=vsPImQwtMcxT8zMM5amaQIapeaFwOy.1', '2025-07-10 03:26:26', 1, 3, '2025-07-10', '10:00:00', 'Naste Fufijh'),
(12, 5, 24, NULL, 30, 'https://us06web.zoom.us/j/86986026186?pwd=vsPImQwtMcxT8zMM5amaQIapeaFwOy.1', '2025-07-10 06:11:10', 1, 3, '2025-07-12', '09:00:00', 'Reaching The Age of Adolescence'),
(13, 8, 25, NULL, 60, 'https://us06web.zoom.us/j/86986026186?pwd=vsPImQwtMcxT8zMM5amaQIapeaFwOy.1', '2025-07-10 06:14:02', 1, 3, '2025-07-12', '10:00:00', 'Krawten Huind Istemal (From ﻣﺎٛﻧﭽﮭ ﺗُٕﻠﺮ)');

-- --------------------------------------------------------

--
-- Table structure for table `parent_feedback`
--

CREATE TABLE `parent_feedback` (
  `id` int NOT NULL,
  `parent_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parent_feedback`
--

INSERT INTO `parent_feedback` (`id`, `parent_id`, `student_id`, `title`, `description`, `created_at`) VALUES
(1, 6, 5, 'Test', NULL, '2025-05-18 18:12:55'),
(3, 6, 5, 'xyz', NULL, '2025-05-19 09:10:03'),
(4, 6, 5, 'Test', NULL, '2025-06-10 05:31:56');

-- --------------------------------------------------------

--
-- Table structure for table `parent_feedback_items`
--

CREATE TABLE `parent_feedback_items` (
  `id` int NOT NULL,
  `feedback_id` int NOT NULL,
  `section` enum('academic','behavioral','satisfaction') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `statement_id` int NOT NULL,
  `rating` int NOT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parent_feedback_items`
--

INSERT INTO `parent_feedback_items` (`id`, `feedback_id`, `section`, `statement_id`, `rating`, `comment`, `created_at`) VALUES
(1, 1, 'academic', 0, 4, NULL, '2025-05-18 18:12:55'),
(2, 1, 'academic', 1, 5, NULL, '2025-05-18 18:12:55'),
(3, 1, 'academic', 2, 5, NULL, '2025-05-18 18:12:55'),
(4, 1, 'academic', 3, 3, NULL, '2025-05-18 18:12:55'),
(5, 1, 'academic', 4, 4, NULL, '2025-05-18 18:12:55'),
(6, 1, 'behavioral', 0, 4, NULL, '2025-05-18 18:12:55'),
(7, 1, 'behavioral', 1, 5, NULL, '2025-05-18 18:12:55'),
(8, 1, 'behavioral', 2, 4, NULL, '2025-05-18 18:12:55'),
(9, 1, 'behavioral', 3, 3, NULL, '2025-05-18 18:12:55'),
(10, 1, 'behavioral', 4, 5, NULL, '2025-05-18 18:12:55'),
(11, 1, 'satisfaction', 0, 1, NULL, '2025-05-18 18:12:55'),
(12, 1, 'satisfaction', 1, 4, NULL, '2025-05-18 18:12:55'),
(13, 1, 'satisfaction', 2, 2, NULL, '2025-05-18 18:12:55'),
(15, 4, 'academic', 0, 1, 'test', '2025-06-10 05:31:56'),
(16, 4, 'academic', 1, 4, 'DD', '2025-06-10 05:31:56'),
(17, 4, 'academic', 2, 2, 'DDD', '2025-06-10 05:31:56'),
(18, 4, 'academic', 3, 3, 'DDDDD', '2025-06-10 05:31:56'),
(19, 4, 'academic', 4, 3, 'DDDD', '2025-06-10 05:31:56');

-- --------------------------------------------------------

--
-- Table structure for table `parent_student_links`
--

CREATE TABLE `parent_student_links` (
  `id` int NOT NULL,
  `parent_id` int NOT NULL,
  `student_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parent_student_links`
--

INSERT INTO `parent_student_links` (`id`, `parent_id`, `student_id`) VALUES
(1, 6, 5);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`) VALUES
(1, 'super_admin', '2025-05-18 17:56:11'),
(2, 'school_admin', '2025-05-18 17:56:11'),
(3, 'class_admin', '2025-05-18 17:56:11'),
(4, 'teacher', '2025-05-18 17:56:11'),
(5, 'student', '2025-05-18 17:56:11'),
(6, 'parent', '2025-05-18 17:56:11');

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `id` int NOT NULL,
  `users_id` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`id`, `users_id`, `name`, `address`, `created_at`) VALUES
(1, 2, 'BMS Noorbagh', 'Noorbagh Srinagar', '2025-05-18 17:59:31'),
(2, 11, 'BMS Kreshbal', 'Kreshbal, Noorbagh, Srinagar', '2025-05-19 09:25:21'),
(3, 18, 'BMS Nowgam', 'Nowgam, Srinagar', '2025-05-20 08:57:18'),
(4, 12, 'BMS Q. D. Pora', 'Q. D. Pora', '2025-07-10 03:14:47'),
(5, 13, 'BMS Zakoora', 'Zakoora', '2025-07-10 03:15:09'),
(6, 14, 'GMS Barzulla', 'Barzulla', '2025-07-10 03:15:33'),
(7, 15, 'BMS Soura', 'Soura', '2025-07-10 03:15:48'),
(8, 16, 'GMS Saidakadal', 'Saidakadal', '2025-07-10 03:16:07'),
(9, 17, 'BMS Batamaloo', 'Batamaloo', '2025-07-10 03:16:21'),
(10, 19, 'MS Panjkarwari', 'Panjkarwari', '2025-07-10 03:16:59'),
(11, 21, 'MS Khojabagh', 'Khojabagh', '2025-07-10 03:17:27'),
(12, 22, 'GMS Newtheed', 'Newtheed', '2025-07-10 03:17:47');

-- --------------------------------------------------------

--
-- Table structure for table `student_attendance`
--

CREATE TABLE `student_attendance` (
  `id` int NOT NULL,
  `student_id` int DEFAULT NULL,
  `class_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `status` enum('present','absent','late') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_attendance`
--

INSERT INTO `student_attendance` (`id`, `student_id`, `class_id`, `date`, `status`, `created_at`) VALUES
(1, 8, 2, '2025-05-19', 'present', '2025-05-19 08:52:12'),
(3, 9, 2, '2025-05-19', 'absent', '2025-05-19 08:52:44'),
(5, 5, 1, '2025-05-19', 'present', '2025-05-19 08:57:03'),
(6, 8, 2, '2025-06-10', 'present', '2025-06-10 05:47:56');

-- --------------------------------------------------------

--
-- Table structure for table `student_profiles`
--

CREATE TABLE `student_profiles` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `class_id` int NOT NULL,
  `schools_id` int NOT NULL,
  `image` longblob,
  `enrollment_no` int NOT NULL,
  `date_of_birth` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_profiles`
--

INSERT INTO `student_profiles` (`id`, `user_id`, `class_id`, `schools_id`, `image`, `enrollment_no`, `date_of_birth`) VALUES
(1, 5, 1, 1, NULL, 1, '2025-05-01'),
(2, 8, 2, 1, NULL, 2, '2025-05-06'),
(3, 9, 2, 1, NULL, 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int NOT NULL,
  `class_id` int DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `class_id`, `name`, `created_at`) VALUES
(1, 1, 'English', '2025-05-18 18:00:08'),
(3, 1, 'Urdu', '2025-05-19 08:31:29'),
(4, 3, 'Mathematics', '2025-05-19 08:31:49'),
(5, 1, 'Science', '2025-05-19 09:20:18'),
(6, 1, 'Social Science', '2025-06-10 05:21:33'),
(8, 1, 'Kashmiri', '2025-07-10 03:18:21');

-- --------------------------------------------------------

--
-- Table structure for table `subject_classes`
--

CREATE TABLE `subject_classes` (
  `subject_id` int NOT NULL,
  `class_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subject_classes`
--

INSERT INTO `subject_classes` (`subject_id`, `class_id`) VALUES
(1, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(8, 1),
(1, 2),
(3, 2),
(4, 2),
(5, 2),
(6, 2),
(8, 2),
(1, 3),
(3, 3),
(4, 3),
(5, 3),
(6, 3),
(8, 3);

-- --------------------------------------------------------

--
-- Table structure for table `teacher_assignments`
--

CREATE TABLE `teacher_assignments` (
  `id` int NOT NULL,
  `teacher_id` int NOT NULL,
  `subject_id` int NOT NULL,
  `class_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher_assignments`
--

INSERT INTO `teacher_assignments` (`id`, `teacher_id`, `subject_id`, `class_id`) VALUES
(9, 3, 3, 3),
(7, 23, 1, 1),
(8, 23, 4, 2),
(10, 24, 5, 3),
(11, 25, 8, 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `role_id` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password_hash` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `name`, `email`, `password_hash`, `created_at`) VALUES
(1, 1, 'Super Admin', 'super_admin@gmail.com', '$2a$12$HMQ5W8apezIwxlH.o51oEOoVss9LtxiGeFlx3tvSN5ZrSbke1Nlgu', '2025-05-18 17:57:56'),
(2, 2, 'BMS Noorbagh', 'bmsnoorbagh@learnsrinagar.in', '$2b$10$hENHgW9wup6T.HZlQo9gq.7MPpyUHYGnaZUrPUfyxZZTEmBtjymXy', '2025-05-18 17:59:11'),
(3, 4, 'Ajaz Ahmad Guchay', 'ajazguchay@learnsrinagar.in', '$2b$10$Wrwz8Ve3T/ZKHpKdN0BDV.egFiM7KCO6rIY90hnTcHwmwqvhK9rUS', '2025-05-18 18:00:26'),
(4, 3, 'Class Admin', 'class_admin@gmail.com', '$2b$10$waIaGhd4Ex7pprFlb.YVqOrdpq/DhyaZU4Xmqjpha/akR92ikB9ly', '2025-05-18 18:02:04'),
(5, 5, 'Student', 'student@gmail.com', '$2b$10$nef2nW47Nk9rBnyAcnRGauf55HmPL40NhkGX4SoeTszcsu6m4U52a', '2025-05-18 18:03:26'),
(6, 6, 'Parent', 'parent@gmail.com', '$2b$10$nef2nW47Nk9rBnyAcnRGauf55HmPL40NhkGX4SoeTszcsu6m4U52a', '2025-05-18 18:03:26'),
(7, 4, 'Shahnawaz Ahmad Ganie', 'shahnawazahmad@learnsrinagar.in', '$2b$10$gl8glY82o6Zq3kVngYzm.O7QESnGI71Rvir/VA5ZTgynbByprArgq', '2025-05-19 08:33:35'),
(8, 5, 'student2', 'student2@gmail.com', '$2b$10$MzfOTK2VU/1ndAIh4AJDVOKmLJbxbfCxt5HRLcgSkOhBLB9zPYJ0u', '2025-05-19 08:46:10'),
(9, 5, 'student3', 'student3@gmail.com', '$2b$10$NWR8ZsBO0wzRnx6kECJ1f.qF4U4jR7BajlqqwFYyx4QU3OwOM53gS', '2025-05-19 08:51:25'),
(10, 3, 'Class Admin2', 'class_admin2@gmail.com', '$2b$10$eyiQF06VO0jpm7MjPcqxZ.sU66tgmpX7xL3Tkonp6O1WaEI.6gLcm', '2025-05-19 08:55:25'),
(11, 2, 'BMS Kreshbal', 'bmskreshbal@learnsrinagar.in', '$2b$10$rWHTxPt/nZGl4q2ZvezjfeNL6olhGyOdzAknS.KtYWHEIGn4/wHZa', '2025-05-19 09:24:51'),
(12, 2, 'BMS Q. D. Pora', 'bmsqdpora@learnsrinagar.in', '$2b$10$ptjNAqBbzL0SKWi014j6eOVdHTn.kqK0pSnzW37dZvVNyYFRkqedu', '2025-05-20 08:44:25'),
(13, 2, 'BMS Zakoora', 'bmszakoora@learnsrinagar.in', '$2b$10$KbXHR3.H9DJV.XrKrWRHx.zi3O/Hfwf4tqXB9.x.agkK8GfFP88yq', '2025-05-20 08:44:54'),
(14, 2, 'GMS Barzulla', 'gmsbarzulla@learnsrinagar.in', '$2b$10$gpm0hcVn9AYPGSrEKgAsWeeFDE.GTqIVrblvL9VxNPp.JXZ/1J6Me', '2025-05-20 08:45:21'),
(15, 2, 'BMS Soura', 'bmssoura@learnsrinagar.in', '$2b$10$3IgY6.Xs/jN/isciM9FnHe7rTJXFfm.ALXDuUg5LQEGMok48dWnl.', '2025-05-20 08:46:15'),
(16, 2, 'GMS Saidakadal', 'gmssaidakadal@learnsrinagar.in', '$2b$10$v9ODLko6PgMQXeNDRGS/5OGPFBvR3VJydvVUPZvNMtb6IsJHiTYH6', '2025-05-20 08:46:44'),
(17, 2, 'BMS Batamaloo', 'bmsbatamaloo@learnsrinagar.in', '$2b$10$palHSjW652v2mOw4.qqq7.P1WumxhJ7XZYHZZKdtfczGxbkrDayrC', '2025-05-20 08:47:10'),
(18, 2, 'BMS Nowgam', 'bmsnowgam@learnsrinagar.in', '$2b$10$no0B/4doD71sXFeKoxZ7geT.BQ0MVX3mw..sUQCBNa9ySEtwyqZhu', '2025-05-20 08:47:37'),
(19, 2, 'MS Panjkarwari', 'mspanjkarwari@learnsrinagar.in', '$2b$10$685xOXTV2gzTHiJuevH5sOfGwF/LyeT1WSG9cIxXW8/F/dS2Es5Xq', '2025-05-20 08:48:05'),
(21, 2, 'MS Khojabagh', 'mskhojabagh@learnsrinagar.in', '$2b$10$hKGBz5.5zjd9j8XsjAbrKOzVwLYkjS2RORmU5OrecHfPZd.k9M/6m', '2025-05-20 08:48:32'),
(22, 2, 'GMS Newtheed', 'gmsnewtheed@learnsrinagar.in', '$2b$10$rgPDwHZ1ZRSxU7D6hjDOge.WJ31VDh4NwDSlJVJiPu1kaj2DDmIX.', '2025-05-20 08:48:57'),
(23, 4, 'Urfana Amin', 'urfanaamin@learnsrinagar.in', '$2b$10$5FJCScLBM8SO2NMAjsbYS.CZ5Rc88QUrCB6yRIKdFUqpb9pcGc6su', '2025-05-22 05:26:10'),
(24, 4, 'Snober Mushtaq', 'snobermushtaq@learnsrinagar.in', '$2b$10$AfxgWekCLqVEpsPS/CEvd.HLTsxmHSrrmfliId2oQUD8l7f.DFy7C', '2025-07-10 06:08:15'),
(25, 4, 'Syed Tajamul Andrabi', 'syedtajamul@learnsrinagar.in', '$2b$10$QME462jNCIogp9cmB2Oj0OgUjuuYOX.aNb3CCaGfN9pz28Ric4j/W', '2025-07-10 06:12:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class_admins`
--
ALTER TABLE `class_admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_id` (`admin_id`,`school_id`,`class_id`),
  ADD KEY `school_id` (`school_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `homework`
--
ALTER TABLE `homework`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject_id` (`subject_id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `fk_homework_class` (`class_id`);

--
-- Indexes for table `live_classes`
--
ALTER TABLE `live_classes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject_id` (`subject_id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `fk_live_classes_class` (`class_id`);

--
-- Indexes for table `parent_feedback`
--
ALTER TABLE `parent_feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `parent_feedback_items`
--
ALTER TABLE `parent_feedback_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `feedback_id` (`feedback_id`);

--
-- Indexes for table `parent_student_links`
--
ALTER TABLE `parent_student_links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`users_id`);

--
-- Indexes for table `student_attendance`
--
ALTER TABLE `student_attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `student_profiles`
--
ALTER TABLE `student_profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `enrollment_no` (`enrollment_no`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `schools_id` (`schools_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `subject_classes`
--
ALTER TABLE `subject_classes`
  ADD PRIMARY KEY (`subject_id`,`class_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `teacher_assignments`
--
ALTER TABLE `teacher_assignments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_teacher_subject_class` (`teacher_id`,`subject_id`,`class_id`),
  ADD KEY `subject_id` (`subject_id`),
  ADD KEY `fk_teacher_assignments_class` (`class_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `class_admins`
--
ALTER TABLE `class_admins`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `homework`
--
ALTER TABLE `homework`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `live_classes`
--
ALTER TABLE `live_classes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `parent_feedback`
--
ALTER TABLE `parent_feedback`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `parent_feedback_items`
--
ALTER TABLE `parent_feedback_items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `parent_student_links`
--
ALTER TABLE `parent_student_links`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `student_attendance`
--
ALTER TABLE `student_attendance`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `student_profiles`
--
ALTER TABLE `student_profiles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `teacher_assignments`
--
ALTER TABLE `teacher_assignments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `class_admins`
--
ALTER TABLE `class_admins`
  ADD CONSTRAINT `class_admins_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `class_admins_ibfk_2` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`),
  ADD CONSTRAINT `class_admins_ibfk_3` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`);

--
-- Constraints for table `homework`
--
ALTER TABLE `homework`
  ADD CONSTRAINT `fk_homework_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  ADD CONSTRAINT `homework_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`),
  ADD CONSTRAINT `homework_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `live_classes`
--
ALTER TABLE `live_classes`
  ADD CONSTRAINT `fk_live_classes_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  ADD CONSTRAINT `live_classes_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`),
  ADD CONSTRAINT `live_classes_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `parent_feedback`
--
ALTER TABLE `parent_feedback`
  ADD CONSTRAINT `parent_feedback_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `parent_feedback_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `parent_feedback_items`
--
ALTER TABLE `parent_feedback_items`
  ADD CONSTRAINT `parent_feedback_items_ibfk_1` FOREIGN KEY (`feedback_id`) REFERENCES `parent_feedback` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `parent_student_links`
--
ALTER TABLE `parent_student_links`
  ADD CONSTRAINT `parent_student_links_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `parent_student_links_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `schools`
--
ALTER TABLE `schools`
  ADD CONSTRAINT `schools_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `student_attendance`
--
ALTER TABLE `student_attendance`
  ADD CONSTRAINT `student_attendance_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `student_attendance_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`);

--
-- Constraints for table `student_profiles`
--
ALTER TABLE `student_profiles`
  ADD CONSTRAINT `student_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_profiles_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  ADD CONSTRAINT `student_profiles_ibfk_3` FOREIGN KEY (`schools_id`) REFERENCES `schools` (`id`);

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`);

--
-- Constraints for table `subject_classes`
--
ALTER TABLE `subject_classes`
  ADD CONSTRAINT `subject_classes_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `subject_classes_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `teacher_assignments`
--
ALTER TABLE `teacher_assignments`
  ADD CONSTRAINT `fk_teacher_assignments_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  ADD CONSTRAINT `teacher_assignments_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `teacher_assignments_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
