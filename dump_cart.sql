-- -------------------------------------------------------------
-- TablePlus 5.8.2(528)
--
-- https://tableplus.com/
--
-- Database: mysql
-- Generation Time: 2024-01-07 21:30:06.0920
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `cart_product` (
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `cart_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  KEY `cart_product_cart_id_foreign` (`cart_id`),
  KEY `cart_product_product_id_foreign` (`product_id`),
  CONSTRAINT `cart_product_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_product_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `carts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` enum('pending','ordered') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `user_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `carts_user_id_foreign` (`user_id`),
  CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `order_product` (
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `order_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  KEY `order_product_order_id_foreign` (`order_id`),
  KEY `order_product_product_id_foreign` (`product_id`),
  CONSTRAINT `order_product_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_product_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  `user_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`),
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `price` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` enum('admin','user') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `first_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `education` enum('Basic','Secondary','Higher') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hobbies` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `cart_product` (`created_at`, `updated_at`, `quantity`, `cart_id`, `product_id`) VALUES
('2024-01-07 20:29:24', '2024-01-07 20:29:24', 1, 1, 1),
('2024-01-07 20:29:27', '2024-01-07 20:29:34', 2, 1, 2);

INSERT INTO `carts` (`id`, `created_at`, `updated_at`, `status`, `user_id`) VALUES
(1, '2024-01-07 20:29:24', '2024-01-07 20:29:24', 'pending', 2);

INSERT INTO `products` (`id`, `created_at`, `updated_at`, `name`, `description`, `image`, `price`) VALUES
(1, '2024-01-07 10:41:07', '2024-01-07 10:41:07', 'Test 1', 'Test 1 desc', 'https://picsum.photos/id/1/300', 1.00),
(2, '2024-01-07 10:41:07', '2024-01-07 10:41:07', 'Test 2', 'Test 2 desc', 'https://picsum.photos/id/2/300', 2.00),
(3, '2024-01-07 10:41:07', '2024-01-07 10:41:07', 'Test 3', 'Test 3 desc', 'https://picsum.photos/id/3/300', 3.00),
(4, '2024-01-07 10:41:07', '2024-01-07 10:41:07', 'Test 4', 'Test 4 desc', 'https://picsum.photos/id/4/300', 4.00),
(5, '2024-01-07 10:41:07', '2024-01-07 10:41:07', 'Test 5', 'Test 5 desc', 'https://picsum.photos/id/5/300', 5.00),
(6, '2024-01-07 10:41:07', '2024-01-07 10:41:07', 'Test 6', 'Test 6 desc', 'https://picsum.photos/id/6/300', 6.00),
(7, '2024-01-07 10:41:07', '2024-01-07 10:41:07', 'Test 7', 'Test 7 desc', 'https://picsum.photos/id/7/300', 7.00),
(8, '2024-01-07 10:41:07', '2024-01-07 10:41:07', 'Test 8', 'Test 8 desc', 'https://picsum.photos/id/8/300', 8.00),
(9, '2024-01-07 10:41:07', '2024-01-07 10:41:07', 'Test 9', 'Test 9 desc', 'https://picsum.photos/id/9/300', 9.00);

INSERT INTO `users` (`id`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role`, `first_name`, `last_name`, `address`, `city`, `state`, `zip`, `country`, `education`, `hobbies`) VALUES
(1, 'admin@test.com', NULL, '$2y$12$hiJ2/VTO7yof1R5dC8lmce3VNEyjL2rCA3aq19DkADIMD67riQIIW', NULL, '2024-01-07 19:19:07', '2024-01-07 19:19:07', 'admin', 'Admin', 'Test', '3850 Reynolds Alley', 'Long Beach', 'CA', '90808', NULL, 'Secondary', '[\"Coding\", \"Music\", \"Movies\"]'),
(2, 'johndoe@test.com', NULL, '$2y$12$MgwptYLBK4tc4R3ON6DHM.mb1cwe7cBBToAKAXvtKmGZiErBsbMsa', NULL, '2024-01-07 19:21:44', '2024-01-07 19:21:44', 'user', 'John', 'Doe', '2412 Crestview Manor', 'Indianapolis', 'IN', '46214', NULL, 'Higher', '[\"Gaming\", \"Reading\", \"Cooking\"]');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;