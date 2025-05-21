<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId><%= groupID %></groupId>
        <artifactId><%= appName %></artifactId>
        <version><%= globalSnapShot %></version>
    </parent>

    <groupId><%= groupID %></groupId>
    <artifactId>application</artifactId>

    <dependencies>
        <dependency>
            <groupId><%= groupID %></groupId>
            <artifactId>domain</artifactId>
            <version><%= globalSnapShot %></version>
        </dependency>
        <dependency>
            <groupId><%= groupID %></groupId>
            <artifactId>application-inbound</artifactId>
            <version><%= globalSnapShot %></version>
        </dependency>
    </dependencies>
</project>
