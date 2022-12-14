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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `First_Name` varchar(999) NOT NULL,
  `Last_Name` varchar(999) NOT NULL,
  `Email` varchar(999) NOT NULL,
  `Password` varchar(999) NOT NULL,
  `DOB` varchar(999) NOT NULL,
  `Phone_Number` varchar(999) NOT NULL,
  `question` int NOT NULL,
  `answer` varchar(999) NOT NULL,
  `question2` int NOT NULL,
  `answer2` varchar(999) NOT NULL,
  `Created` datetime(6) NOT NULL,
  PRIMARY KEY (`userID`),
  KEY `question_idx` (`question`),
  KEY `question2_idx` (`question2`),
  CONSTRAINT `question` FOREIGN KEY (`question`) REFERENCES `phase_questions` (`questionsID`),
  CONSTRAINT `question2` FOREIGN KEY (`question2`) REFERENCES `phase_questions` (`questionsID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Kenneth','Tey','kennethtey@gmail.com','$2b$10$m0DD8b3DKX6TWfpuUO0ig.d3JlhzVTwGiP.D2nDjZV5zLqbVBvvve','2021-12-03','321321312',3,'Batman',5,'Joker','2022-10-23 19:21:10.000000'),(2,'Tung','Ho','ho@gmail.com','$2b$10$4cKn0G9B1dCfiPS7owIBc.Vcur8RcZcFj6gdyBel4N6NC0X52c6L2','1970-03-02','0162172018',3,'Batman',5,'Joker','2022-10-24 15:18:55.000000'),(3,'Kenneth','Tey','kennethtey@outlook.com','$2b$10$7RgZpQQQqR6EVvty2Pw9TOAWt0vVUgSsRP225nwG7zG2IUp5Sv76W','2022-11-10','0162171018',1,'Batman',2,'Joker','2022-11-15 17:56:25.000000');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
