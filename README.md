# CommunHive

## Overview

TODO: Explain Project

## Prerequisites

1. Install Java 21+ (openjdk 21.0.2 2024-01-16 LTS)
    1. Make sure java service is running in the background.
2. Install MySql 8.3.0
    1. Make sure mysql service is running in the background.
3. Install DBeaver (https://dbeaver.io/download/)

## How To Set Up

1. Clone Repository
    1. Setup ssh (you should have the access of repository)
    2. Open Terminal
    3. Clone Repository Using SSH: `git clone git@github.com:<YOUR_GITHUB_USERNAME>/commun-hive-server.git`
    4. Run Command: `cd commun-hive-server`
2. Intellij IDEA Community Editor (open source editor)
3. Open Intellij IDEA
4. Open Project In Intellij IDEA
5. Right Click On pom.xml file
    1. Click on Maven
    2. Click on Reload Project
    3. Optional - If required, need to set up JDK
6. Database setup:
    1. Open DBeaver
    2. Create new connection in DBeaver
    3. Select MySql
        1. First Time: it may ask to download drivers, so installed it if asked.
    4. Provide Database Credentials and Connect to Database
    5. Note the database credentials
    6. Create user in database and setup password for the user created in database
    7. Provide all the required access to the database user
    8. Open SQL Editor for connect mysql instance
    9. Copy Content From scripts/init.sql to sql editor and execute the query
    10. Clear sql editor
    11. Copy Content from scripts/seed.sql to sql editor and execute the query
    12. Create/Update resources/application.properties file with proper details
7. As of now, everything is Setup
8. Open Intellij IDEA
9. Open File CommunHiveApplication.java
10. Click on play/debug icon
11. It should start server
12. Open browser with url: http://localhost:8080/swagger-ui/index.html
13. Now, you can start exploring your api's

