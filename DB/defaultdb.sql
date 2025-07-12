-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Jul 12, 2025 at 06:32 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skill_swap`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_actions`
--

CREATE TABLE `admin_actions` (
  `action_id` int(11) NOT NULL,
  `admin_user_id` int(11) DEFAULT NULL,
  `target_user_id` int(11) DEFAULT NULL,
  `action_type` enum('Reject Description','Ban User','Monitor Swap','Message') DEFAULT NULL,
  `description` text DEFAULT NULL,
  `action_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banned_users`
--

CREATE TABLE `banned_users` (
  `user_id` int(11) NOT NULL,
  `banned_by` int(11) DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `banned_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `credentials`
--

CREATE TABLE `credentials` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `joining_date` datetime DEFAULT current_timestamp(),
  `role` enum('user','admin') DEFAULT 'user',
  `status` enum('active','banned') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `platform_messages`
--

CREATE TABLE `platform_messages` (
  `message_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `posted_on` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `skill_id` int(11) NOT NULL,
  `skill_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `swap_feedback`
--

CREATE TABLE `swap_feedback` (
  `feedback_id` int(11) NOT NULL,
  `request_id` int(11) DEFAULT NULL,
  `from_user_id` int(11) DEFAULT NULL,
  `to_user_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `feedback` text DEFAULT NULL,
  `feedback_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `swap_requests`
--

CREATE TABLE `swap_requests` (
  `request_id` int(11) NOT NULL,
  `requester_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `skill_offered_id` int(11) DEFAULT NULL,
  `skill_requested_id` int(11) DEFAULT NULL,
  `status` enum('Pending','Accepted','Rejected','Cancelled') DEFAULT 'Pending',
  `request_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `user_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `profile_photo_url` text DEFAULT NULL,
  `availability` enum('Weekends','Evenings','Anytime') DEFAULT NULL,
  `is_public` tinyint(1) DEFAULT 1,
  `github_url` varchar(255) DEFAULT NULL,
  `linkedin_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_skills`
--

CREATE TABLE `user_skills` (
  `user_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_wanted_skills`
--

CREATE TABLE `user_wanted_skills` (
  `user_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_actions`
--
ALTER TABLE `admin_actions`
  ADD PRIMARY KEY (`action_id`),
  ADD KEY `admin_user_id` (`admin_user_id`),
  ADD KEY `target_user_id` (`target_user_id`);

--
-- Indexes for table `banned_users`
--
ALTER TABLE `banned_users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `banned_by` (`banned_by`);

--
-- Indexes for table `credentials`
--
ALTER TABLE `credentials`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `platform_messages`
--
ALTER TABLE `platform_messages`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`skill_id`),
  ADD UNIQUE KEY `skill_name` (`skill_name`);

--
-- Indexes for table `swap_feedback`
--
ALTER TABLE `swap_feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `request_id` (`request_id`),
  ADD KEY `from_user_id` (`from_user_id`),
  ADD KEY `to_user_id` (`to_user_id`);

--
-- Indexes for table `swap_requests`
--
ALTER TABLE `swap_requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `requester_id` (`requester_id`),
  ADD KEY `receiver_id` (`receiver_id`),
  ADD KEY `skill_offered_id` (`skill_offered_id`),
  ADD KEY `skill_requested_id` (`skill_requested_id`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_skills`
--
ALTER TABLE `user_skills`
  ADD PRIMARY KEY (`user_id`,`skill_id`),
  ADD KEY `skill_id` (`skill_id`);

--
-- Indexes for table `user_wanted_skills`
--
ALTER TABLE `user_wanted_skills`
  ADD PRIMARY KEY (`user_id`,`skill_id`),
  ADD KEY `skill_id` (`skill_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_actions`
--
ALTER TABLE `admin_actions`
  MODIFY `action_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `credentials`
--
ALTER TABLE `credentials`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `platform_messages`
--
ALTER TABLE `platform_messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `skill_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `swap_feedback`
--
ALTER TABLE `swap_feedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `swap_requests`
--
ALTER TABLE `swap_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_actions`
--
ALTER TABLE `admin_actions`
  ADD CONSTRAINT `admin_actions_ibfk_1` FOREIGN KEY (`admin_user_id`) REFERENCES `credentials` (`user_id`),
  ADD CONSTRAINT `admin_actions_ibfk_2` FOREIGN KEY (`target_user_id`) REFERENCES `credentials` (`user_id`);

--
-- Constraints for table `banned_users`
--
ALTER TABLE `banned_users`
  ADD CONSTRAINT `banned_users_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `credentials` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `banned_users_ibfk_2` FOREIGN KEY (`banned_by`) REFERENCES `credentials` (`user_id`);

--
-- Constraints for table `swap_feedback`
--
ALTER TABLE `swap_feedback`
  ADD CONSTRAINT `swap_feedback_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `swap_requests` (`request_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `swap_feedback_ibfk_2` FOREIGN KEY (`from_user_id`) REFERENCES `credentials` (`user_id`),
  ADD CONSTRAINT `swap_feedback_ibfk_3` FOREIGN KEY (`to_user_id`) REFERENCES `credentials` (`user_id`);

--
-- Constraints for table `swap_requests`
--
ALTER TABLE `swap_requests`
  ADD CONSTRAINT `swap_requests_ibfk_1` FOREIGN KEY (`requester_id`) REFERENCES `credentials` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `swap_requests_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `credentials` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `swap_requests_ibfk_3` FOREIGN KEY (`skill_offered_id`) REFERENCES `skills` (`skill_id`),
  ADD CONSTRAINT `swap_requests_ibfk_4` FOREIGN KEY (`skill_requested_id`) REFERENCES `skills` (`skill_id`);

--
-- Constraints for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD CONSTRAINT `user_profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `credentials` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_skills`
--
ALTER TABLE `user_skills`
  ADD CONSTRAINT `user_skills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `credentials` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_skills_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`skill_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_wanted_skills`
--
ALTER TABLE `user_wanted_skills`
  ADD CONSTRAINT `user_wanted_skills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `credentials` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_wanted_skills_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`skill_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
