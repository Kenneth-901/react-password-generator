-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: password_generator
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `genpass`
--

DROP TABLE IF EXISTS `genpass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genpass` (
  `genPassID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `password` varchar(999) NOT NULL,
  `description` varchar(999) DEFAULT NULL,
  `descriptionDate` varchar(999) DEFAULT NULL,
  `descriptionTime` varchar(999) DEFAULT NULL,
  PRIMARY KEY (`genPassID`),
  KEY `userID_idx` (`userID`),
  CONSTRAINT `userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=276 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genpass`
--

LOCK TABLES `genpass` WRITE;
/*!40000 ALTER TABLE `genpass` DISABLE KEYS */;
INSERT INTO `genpass` VALUES (262,1,'Germany22taylorswifT@#','For google','2022-11-16','00:29:42'),(263,1,'GermanyTaylorswift22@#',NULL,NULL,NULL),(265,1,'G3rm@nyt@yl0r$w!1T22@#',NULL,NULL,NULL),(267,1,'%germany22neongreen%',NULL,NULL,NULL),(268,1,'NeongreeN@#22',NULL,NULL,NULL),(269,1,'GermanyNeongreen22@#',NULL,NULL,NULL),(270,1,'G3rm@nyn30n9r33N22@#',NULL,NULL,NULL),(271,1,'GermanyNeongreen22@#',NULL,NULL,NULL);
/*!40000 ALTER TABLE `genpass` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-16  1:51:03
