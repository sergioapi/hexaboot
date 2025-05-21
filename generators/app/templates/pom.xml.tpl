<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId><%= groupID %></groupId>
    <artifactId><%= appName %></artifactId>
    <version><%= globalSnapShot %></version>
    <packaging>pom</packaging>

    <name><%= appName %></name>

    <modules>
        <module>domain</module>
        <module>application</module>
        <module>infrastructure</module>
        <module>shared-kernel</module>
    </modules>

    <properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<java.version>17</java.version>
		<lombok.version>1.18.34</lombok.version>
	</properties>

	<dependencies>
		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
			<version>${lombok.version}</version>
			<scope>compile</scope>
		</dependency>
	</dependencies>
</project>
