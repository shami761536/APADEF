-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2025 at 11:09 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `social_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `last_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `email`, `password`, `profile_picture`, `bio`, `created_at`, `updated_at`, `last_login`) VALUES
(3, 'kenny', 'kennytohne@gmail.com', '$2y$10$MMOoswvArlVz2IklFmLbtOGzFEaJT0R6qz6a5VSKf1R4vR.nujca2', NULL, NULL, '2025-12-01 09:38:33', '2025-12-05 11:58:26', '2025-12-05 11:58:26');

-- --------------------------------------------------------

--
-- Table structure for table `admin_logs`
--

CREATE TABLE `admin_logs` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `action_type` varchar(50) NOT NULL,
  `details` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_logs`
--

INSERT INTO `admin_logs` (`id`, `admin_id`, `action_type`, `details`, `created_at`) VALUES
(1, 3, 'reset_password', 'Reset password for user #2', '2025-12-01 09:39:35'),
(2, 3, 'force_edit', 'Edited post #1', '2025-12-01 11:54:27'),
(3, 3, 'delete_post', 'Deleted post #2', '2025-12-01 11:54:37'),
(4, 3, 'reset_password', 'Reset password for user #2', '2025-12-01 12:03:21'),
(5, 3, 'reset_password', 'Reset password for user #2', '2025-12-01 12:04:13'),
(6, 3, 'delete_user', 'Deleted user #2', '2025-12-01 12:06:58'),
(7, 3, 'update_user', 'Updated user #3', '2025-12-01 12:11:27'),
(8, 3, 'update_user', 'Updated user #3', '2025-12-01 12:11:42'),
(9, 3, 'force_edit', 'Edited post #4', '2025-12-01 12:15:57'),
(10, 3, 'create_user', 'Created user tohne', '2025-12-01 12:17:18'),
(11, 3, 'delete_post', 'post 4', '2025-12-05 12:00:54'),
(12, 3, 'delete_post', 'post 3', '2025-12-05 12:00:57');

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `id` int(11) NOT NULL,
  `donor_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `caption` text DEFAULT NULL,
  `total_donations` decimal(10,2) DEFAULT 0.00,
  `edited` tinyint(1) DEFAULT 0,
  `edited_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `image_path`, `caption`, `total_donations`, `edited`, `edited_at`, `created_at`, `updated_at`) VALUES
(6, 6, 'uploads/1764926953_7262.jpeg', 'i want to build a church', 0.00, 0, NULL, '2025-12-05 11:29:13', '2025-12-05 11:29:13');

-- --------------------------------------------------------

--
-- Table structure for table `post_history`
--

CREATE TABLE `post_history` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `old_caption` text DEFAULT NULL,
  `edited_by` enum('user','admin') NOT NULL,
  `edited_by_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `wallet_balance` decimal(10,2) DEFAULT 0.00,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `last_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `profile_picture`, `bio`, `wallet_balance`, `created_at`, `updated_at`, `last_login`) VALUES
(3, 'tupyi', 'kennytohne@gmail.com', '$2y$10$RBBGdRc22RvSQ./jisFioOq/7mQaHyiw.y8AaEqBBx8kUAKJ/bOm2', 'uploads/avatar_692d521bb99220.75656221.jpeg', 'yoooooooooooo', 12.12, '2025-12-01 09:44:08', '2025-12-05 10:32:49', '2025-12-05 09:48:02'),
(4, 'tohne', 'tdocmosby@gmail.com', '$2y$10$BzLCNcypXi7A7jUUD4LkZut.hajecxmXllOsZjs1EwgHIo/YjE79G', NULL, NULL, 0.00, '2025-12-01 12:17:18', '2025-12-05 11:44:33', '2025-12-05 11:44:33'),
(6, 'serge', 'new@gmail.com', '$2y$10$IQwR9P04pPj97pqfRWn4de.l7wzyG0j7iWlCEjafz.dRadgfIVRPG', 'uploads/pfp_1764928413_7465.jpeg', 'this is a very good insight of a long jurney', -12.12, '2025-12-05 10:27:48', '2025-12-05 12:06:12', '2025-12-05 12:06:12');

-- --------------------------------------------------------

--
-- Table structure for table `wallet_transactions`
--

CREATE TABLE `wallet_transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` enum('donation_received','donation_sent') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `admin_logs`
--
ALTER TABLE `admin_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_donations_postid` (`post_id`),
  ADD KEY `idx_donations_donorid` (`donor_id`),
  ADD KEY `idx_donations_receiverid` (`receiver_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_posts_userid` (`user_id`),
  ADD KEY `idx_posts_created` (`created_at`),
  ADD KEY `idx_posts_edited` (`edited`),
  ADD KEY `idx_posts_total_donations` (`total_donations`);

--
-- Indexes for table `post_history`
--
ALTER TABLE `post_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `wallet_transactions`
--
ALTER TABLE `wallet_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `admin_logs`
--
ALTER TABLE `admin_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `post_history`
--
ALTER TABLE `post_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `wallet_transactions`
--
ALTER TABLE `wallet_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_logs`
--
ALTER TABLE `admin_logs`
  ADD CONSTRAINT `admin_logs_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`);

--
-- Constraints for table `donations`
--
ALTER TABLE `donations`
  ADD CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`donor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `donations_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `donations_ibfk_3` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `post_history`
--
ALTER TABLE `post_history`
  ADD CONSTRAINT `post_history_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

--
-- Constraints for table `wallet_transactions`
--
ALTER TABLE `wallet_transactions`
  ADD CONSTRAINT `wallet_transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `wallet_transactions_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
