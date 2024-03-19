-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2024 at 07:11 AM
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
-- Database: `ctrmain`
--

-- --------------------------------------------------------

--
-- Table structure for table `adds`
--

CREATE TABLE `adds` (
  `name` varchar(255) NOT NULL,
  `price` varchar(100) NOT NULL,
  `offer_price` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `id` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adds`
--

INSERT INTO `adds` (`name`, `price`, `offer_price`, `description`, `id`) VALUES
('banner-ad-examples-1024x536.jpg', '1500', '1200', '11', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ctr`
--

CREATE TABLE `ctr` (
  `addId` varchar(100) NOT NULL,
  `UserName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `id` int(255) NOT NULL,
  `date` varchar(100) NOT NULL DEFAULT 'null',
  `time` varchar(255) NOT NULL DEFAULT 'null'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ctr`
--

INSERT INTO `ctr` (`addId`, `UserName`, `Email`, `id`, `date`, `time`) VALUES
('1', 'test', '8606414384', 2, '2024-03-16', '22:15:11'),
('1', 'test', '8606414384', 3, '2024-03-16', '22:15:11'),
('1', 'test', '8606414384', 4, '2024-03-16', '22:15:11'),
('1', 'test', '8606414384', 5, '2024-03-16', '22:15:11'),
('1', 'anonymous', 'anonymous', 6, '2024-03-16', '22:15:11'),
('1', 'anonymous', 'anonymous', 7, '2024-03-16', '22:15:11'),
('1', 'anonymous', 'anonymous', 8, '2024-03-16', '22:15:11'),
('1', 'anonymous', 'anonymous', 9, '2024-03-16', '22:15:11'),
('1', 'anonymous', 'anonymous', 10, '2024-03-16', '22:15:11'),
('1', 'anonymous', 'anonymous', 11, '2024-03-16', '22:15:11'),
('1', 'anonymous', 'anonymous', 12, '2024-03-16', '22:15:11'),
('1', 'anonymous', 'anonymous', 13, '2024-03-16', '22:15:11'),
('1', 'anonymous', 'anonymous', 14, '2024-03-16', '22:38:31');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserName`, `Email`, `Password`, `id`) VALUES
('test', '8606414384', '123', 4),
('anaz', '8606414384', '123', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adds`
--
ALTER TABLE `adds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ctr`
--
ALTER TABLE `ctr`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adds`
--
ALTER TABLE `adds`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ctr`
--
ALTER TABLE `ctr`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
