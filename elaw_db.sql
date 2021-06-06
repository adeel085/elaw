-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2021 at 04:46 PM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `elaw_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id` int(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `start_date_time` datetime NOT NULL,
  `end_date_time` datetime NOT NULL,
  `case_id` int(255) NOT NULL,
  `created_by` int(255) NOT NULL,
  `status` enum('waiting','in_progress','completed','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id`, `title`, `description`, `start_date_time`, `end_date_time`, `case_id`, `created_by`, `status`) VALUES
(1, 'test title', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged', '2020-11-10 00:00:00', '2020-11-14 16:01:00', 20, 3, 'completed'),
(2, 'aaa', 'ddd', '2020-11-27 16:48:00', '2020-11-27 16:49:43', 20, 3, 'in_progress'),
(3, 'Past activity Title', 'Past Activity Description', '2020-10-01 16:21:00', '2020-10-03 16:21:00', 1, 3, 'completed'),
(4, 'Chupistan', 'Demo text for activity details', '2020-12-22 23:30:00', '2020-12-25 22:35:00', 28, 3, 'in_progress'),
(5, 'Chupistan 2 activity', 'Second activity', '2020-12-22 23:30:00', '2020-12-25 23:40:00', 28, 3, 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--

CREATE TABLE `cases` (
  `id` int(255) NOT NULL,
  `type` enum('plaintiffs','defense') NOT NULL,
  `sub_type` enum('commercial_litigation','criminal','etp_law_drafting_wills','etp_law_estate_administration','etp_law_probate','family_law_domestic_relation','family_law_juvenile_proceedings','general_business') NOT NULL,
  `assigned_to` int(255) DEFAULT NULL,
  `legal_assistant` int(255) NOT NULL,
  `court_number` int(255) NOT NULL,
  `judge` varchar(255) NOT NULL,
  `place` varchar(255) NOT NULL,
  `court_type` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `current_money` double NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cases`
--

INSERT INTO `cases` (`id`, `type`, `sub_type`, `assigned_to`, `legal_assistant`, `court_number`, `judge`, `place`, `court_type`, `date`, `current_money`) VALUES
(26, 'plaintiffs', 'etp_law_probate', 5, 6, 25, 'John Doe', 'Demo Place', 'Justice', '2020-12-22 00:28:15', 0),
(27, 'defense', 'criminal', 3, 6, 25, 'John Doe', 'Demo Place', 'Justice', '2020-12-22 00:31:17', 0),
(28, 'defense', 'general_business', 5, 6, 25, 'John Doe', 'Demo Place', 'Justice', '2020-12-22 00:32:35', 6519),
(29, 'plaintiffs', 'etp_law_probate', 5, 6, 25, 'John Doe', 'Demo Place', 'Justice', '2020-12-22 21:48:11', 0),
(30, 'defense', 'commercial_litigation', 5, 6, 25, 'John Doe', 'Demo Place', 'Justice', '2020-12-22 22:25:19', 0);

-- --------------------------------------------------------

--
-- Table structure for table `case_defendants`
--

CREATE TABLE `case_defendants` (
  `case_id` int(255) NOT NULL,
  `defendant_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `case_defendants`
--

INSERT INTO `case_defendants` (`case_id`, `defendant_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 2),
(17, 1),
(18, 1),
(19, 1),
(20, 1),
(21, 3),
(21, 1),
(22, 1),
(22, 3),
(23, 2),
(25, 1),
(26, 1),
(26, 2),
(27, 2),
(28, 1),
(29, 1),
(30, 1),
(30, 3);

-- --------------------------------------------------------

--
-- Table structure for table `case_plaintiffs`
--

CREATE TABLE `case_plaintiffs` (
  `case_id` int(255) NOT NULL,
  `plaintiff_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `case_plaintiffs`
--

INSERT INTO `case_plaintiffs` (`case_id`, `plaintiff_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 2),
(17, 1),
(18, 1),
(19, 1),
(20, 1),
(21, 3),
(21, 1),
(22, 1),
(22, 3),
(23, 2),
(25, 1),
(26, 1),
(26, 2),
(27, 2),
(28, 1),
(29, 1),
(30, 1),
(30, 3);

-- --------------------------------------------------------

--
-- Table structure for table `charges`
--

CREATE TABLE `charges` (
  `id` int(11) NOT NULL,
  `case_id` int(11) DEFAULT NULL,
  `unit` enum('hours','days','weeks','months') NOT NULL,
  `unit_cost` double NOT NULL,
  `time_period` double NOT NULL,
  `time` datetime NOT NULL,
  `created_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `charges`
--

INSERT INTO `charges` (`id`, `case_id`, `unit`, `unit_cost`, `time_period`, `time`, `created_by`) VALUES
(9, 28, 'days', 100, 2, '2021-01-22 16:23:35', 3),
(10, 28, 'weeks', 3, 5, '2021-01-22 16:34:30', 5),
(11, 28, 'hours', 69, 69, '2021-01-22 17:59:08', 3),
(12, 28, 'months', 39, 39, '2021-01-22 18:13:03', 3),
(13, 28, 'hours', 20, 6, '2021-01-26 23:31:46', 3),
(15, 28, 'days', 11, 2, '2021-01-27 19:12:20', 3);

-- --------------------------------------------------------

--
-- Table structure for table `defendants`
--

CREATE TABLE `defendants` (
  `id` int(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `type` enum('person','company','entity') NOT NULL,
  `date_added` datetime NOT NULL,
  `address` varchar(500) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `alt_phone` varchar(255) NOT NULL,
  `ssn` varchar(255) NOT NULL,
  `driver_license` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fax_number` varchar(255) NOT NULL,
  `sopa_name` varchar(255) NOT NULL,
  `sopa_address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `defendants`
--

INSERT INTO `defendants` (`id`, `first_name`, `last_name`, `type`, `date_added`, `address`, `city`, `state`, `zip`, `phone`, `alt_phone`, `ssn`, `driver_license`, `email`, `fax_number`, `sopa_name`, `sopa_address`) VALUES
(1, 'def', '1', 'company', '2020-11-22 18:16:20', '', '', '', '', '', '', '', '', '', '', '', ''),
(2, 'def', '2', 'company', '2020-11-22 18:16:23', '', '', '', '', '', '', '', '', '', '', '', ''),
(3, 'Abdul', 'Rehman', 'person', '2020-12-22 17:22:21', '', '', '', '', '', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `deposits`
--

CREATE TABLE `deposits` (
  `deposit_id` int(11) NOT NULL,
  `case_id` int(255) NOT NULL,
  `deposit` double DEFAULT NULL,
  `time` datetime NOT NULL,
  `created_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `deposits`
--

INSERT INTO `deposits` (`deposit_id`, `case_id`, `deposit`, `time`, `created_by`) VALUES
(3, 28, 200, '2021-01-22 21:39:23', 3);

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id` int(11) NOT NULL,
  `charges_id` int(11) DEFAULT NULL,
  `notes_id` int(11) DEFAULT NULL,
  `activity_id` int(11) DEFAULT NULL,
  `file_path` text NOT NULL,
  `type` enum('note','charges','','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`id`, `charges_id`, `notes_id`, `activity_id`, `file_path`, `type`) VALUES
(20, NULL, 17, NULL, 'uploads\\cases-documents\\case-28\\Adobe_Scan_18_Jan_2021_2021_1_19_2_56_50.pdf', 'note'),
(21, NULL, 17, NULL, 'uploads\\cases-documents\\case-28\\WhatsApp Image 2021-01-18 at 41708 PM_2021_1_19_2_56_50.jpeg', 'note'),
(22, NULL, 18, NULL, 'uploads\\cases-documents\\case-28\\db_queries_2021_1_19_2_57_19.txt', 'note'),
(23, 12, NULL, NULL, 'uploads\\cases-documents\\case-28\\dip3 (1)_2021_1_22_18_13_3.PNG', 'charges'),
(24, 12, NULL, NULL, 'uploads\\cases-documents\\case-28\\dip2 (1)_2021_1_22_18_13_3.PNG', 'charges'),
(25, NULL, 23, NULL, 'uploads\\cases-documents\\case-28\\balls_without_collision_2021_1_24_19_25_8.txt', 'note'),
(26, NULL, 23, NULL, 'uploads\\cases-documents\\case-28\\dip3 (1)_2021_1_22_18_13_3_2021_1_24_19_25_8.png', 'note'),
(27, NULL, 24, NULL, 'uploads\\cases-documents\\case-28\\balls_collision_no_loop_2021_1_24_19_27_13.txt', 'note'),
(28, 13, NULL, NULL, 'uploads\\cases-documents\\case-28\\533029_2021_1_26_23_31_46.jpg', 'charges'),
(29, 15, NULL, NULL, 'uploads\\cases-documents\\case-28\\533029_2021_1_27_19_12_20.jpg', 'charges'),
(30, NULL, 28, NULL, 'uploads\\cases-documents\\case-28\\533029_2021_1_27_19_13_16.jpg', 'note');

-- --------------------------------------------------------

--
-- Table structure for table `legal_details`
--

CREATE TABLE `legal_details` (
  `case_id` int(255) NOT NULL,
  `trial_date` datetime NOT NULL,
  `client_matter_number` varchar(255) NOT NULL,
  `address` varchar(500) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `alt_phone` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `legal_details`
--

INSERT INTO `legal_details` (`case_id`, `trial_date`, `client_matter_number`, `address`, `phone`, `alt_phone`, `city`, `state`, `zip`) VALUES
(24, '0000-00-00 00:00:00', '', '', '', '', '', '', ''),
(25, '2020-12-06 00:00:00', '12345', 'House # 895/81, Zaib Colony, Gujrat', '03314075902', '03310469778', 'Lalamusa', 'Gujrat', '50700'),
(26, '0000-00-00 00:00:00', '', '', '', '', '', '', ''),
(27, '0000-00-00 00:00:00', '', '', '', '', '', '', ''),
(28, '0000-00-00 00:00:00', '', '', '', '', '', '', ''),
(29, '0000-00-00 00:00:00', '', '', '', '', '', '', ''),
(30, '2020-12-22 00:00:00', '1234', 'Zaib Colony, Gujrat', '03314075902', '03245669878', 'Gujrat', 'Punjab', '50700');

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `note_title` text NOT NULL,
  `note_detail` text NOT NULL,
  `time` datetime NOT NULL,
  `charge_id` int(11) DEFAULT NULL,
  `activity_id` int(11) DEFAULT NULL,
  `case_id` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `note_title`, `note_detail`, `time`, `charge_id`, `activity_id`, `case_id`, `created_by`) VALUES
(17, 'dsf', 'cvb', '2021-01-19 02:56:50', NULL, NULL, 28, 3),
(18, 'dfg', 'cbv', '2021-01-19 02:57:19', NULL, NULL, 28, 3),
(19, 'sdf', 'bv', '2021-01-22 16:23:35', 9, NULL, 28, 0),
(20, 'dfg', 'vbn', '2021-01-22 16:34:30', 10, NULL, 28, 0),
(21, 'qwe', 'qwe', '2021-01-22 17:59:08', 11, NULL, 28, 0),
(22, 'sd', 'cvb', '2021-01-22 18:13:03', 12, NULL, 28, 0),
(23, 't1', 't2', '2021-01-24 19:25:08', NULL, NULL, 28, 3),
(24, 'sdf', 'xcv', '2021-01-24 19:27:13', NULL, NULL, 28, 5),
(25, 'Charges for something', 'This is a charge for something', '2021-01-26 23:31:46', 13, NULL, 28, 3),
(27, 'Test charges', 'Test charges description', '2021-01-27 19:12:20', 15, NULL, 28, 3),
(28, 'Test 2', 'Test 2', '2021-01-27 19:13:16', NULL, NULL, 28, 3);

-- --------------------------------------------------------

--
-- Table structure for table `plaintiffs`
--

CREATE TABLE `plaintiffs` (
  `id` int(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `type` enum('person','company','entity') NOT NULL,
  `date_added` datetime NOT NULL,
  `address` varchar(500) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `alt_phone` varchar(255) NOT NULL,
  `ssn` varchar(255) NOT NULL,
  `driver_license` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fax_number` varchar(255) NOT NULL,
  `sopa_name` varchar(255) NOT NULL,
  `sopa_address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `plaintiffs`
--

INSERT INTO `plaintiffs` (`id`, `first_name`, `last_name`, `type`, `date_added`, `address`, `city`, `state`, `zip`, `phone`, `alt_phone`, `ssn`, `driver_license`, `email`, `fax_number`, `sopa_name`, `sopa_address`) VALUES
(1, 'plain', 'tiff1', 'person', '2020-11-22 08:15:51', 'Gujrat zaib colony', 'Gujrat', 'Gujrat', '50700', '03246889420', '03124557865', '987456321', '123698745', 'test.mail@testmail.com', '852147963', 'SOPA Name', 'Sopa Address'),
(2, 'plain', 'tiff2', 'person', '2020-11-22 18:16:12', '', '', '', '', '', '', '', '', '', '', '', ''),
(3, 'Ahmad', 'Razzaq', 'person', '2020-11-24 19:59:49', '', '', '', '', '', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `workers`
--

CREATE TABLE `workers` (
  `id` int(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `cell_phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `tax_bar_num` varchar(255) NOT NULL,
  `role` enum('managing_attorney','it_admin','legal_assistant','associate_attorney') NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `workers`
--

INSERT INTO `workers` (`id`, `first_name`, `last_name`, `phone`, `cell_phone`, `email`, `tax_bar_num`, `role`, `username`, `password`) VALUES
(3, 'John', 'Kennedy', '', '03161782050', 'john@gmail.com', '', 'it_admin', 'john', '123'),
(5, 'Adeel', 'Ahmed', '03314075902', '03310469778', 'adeel.ahmed9360@gmail.com', '192837', 'legal_assistant', 'adeel', '123'),
(6, 'Ahmad', 'Razzaq', '03254887451', '03214556287', 'ahmed.razzaq@gmail.com', '789456', 'associate_attorney', 'ahmad', 'test123'),
(7, 'Saad', 'Shakeel', '03456889777', '03214556998', 'saad.shakeel432@gmail.com', '192837', 'legal_assistant', 'saadi', 'test123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `charges`
--
ALTER TABLE `charges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `defendants`
--
ALTER TABLE `defendants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deposits`
--
ALTER TABLE `deposits`
  ADD PRIMARY KEY (`deposit_id`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plaintiffs`
--
ALTER TABLE `plaintiffs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workers`
--
ALTER TABLE `workers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cases`
--
ALTER TABLE `cases`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `charges`
--
ALTER TABLE `charges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `defendants`
--
ALTER TABLE `defendants`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `deposits`
--
ALTER TABLE `deposits`
  MODIFY `deposit_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `plaintiffs`
--
ALTER TABLE `plaintiffs`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `workers`
--
ALTER TABLE `workers`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
