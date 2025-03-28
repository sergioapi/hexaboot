<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId> <%= groupID %></groupId>
    <artifactId> <%= appName %></artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>pom</packaging>

    <name> <%= appName %></name>
    <description>Proyecto utilizando arquitectura hexagonal</description>

    <modules>
        <module>domain</module>
        <module>application</module>
        <module>infrastructure</module>
    </modules>

    <properties>
        <java.version>17</java.version>
    </properties>
</project>
