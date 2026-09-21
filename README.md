# COLORS Application

COLORS is a small web application built for the COP 4331 COLORS lab. A user logs in with a username and password, can search the list of colors saved under their account, and can add new colors to it.

It is a LAMP-stack project: a static HTML/CSS/JavaScript front end talks to PHP API endpoints, which read and write a MySQL database.

## Technologies Used

- Ubuntu Linux (DigitalOcean droplet)
- Apache web server
- MySQL database
- PHP (API endpoints)
- HTML, CSS and JavaScript (front end)
- Postman (testing the API endpoints)

## Repository Structure

```
colors-lab-project/
  |---- api/
  |       |-- Login.php
  |       |-- AddColor.php
  |       |-- SearchColors.php
  |---- public/
  |       |-- index.html
  |       |-- color.html
  |       |-- css/
  |       |-- js/
  |       |-- images/
  |---- README.md
  |---- LICENSE.md
  |---- .gitignore
```

## Setup

This assumes you have a Linux server with Apache, MySQL and PHP installed. A DigitalOcean "LAMP" droplet already has all three.

	*Note: I did have to install these manually actually, since the droplet actually didn't 	already have these installed. 

### 1. Create the server

1. Create a LAMP droplet on DigitalOcean (Ubuntu, Basic plan) and note its root password.
2. Log in with `ssh root@your-domain-or-ip`.
3. The web root is `/var/www/html`. Point your domain at the droplet's IP address using your domain registrar's DNS settings.

### 2. Create the database

Log in to MySQL with `mysql -u root -p`, then run:

```sql
CREATE DATABASE COP4331;
USE COP4331;

CREATE TABLE `COP4331`.`Users`
(
    `ID` INT NOT NULL AUTO_INCREMENT ,
    `FirstName` VARCHAR(50) NOT NULL DEFAULT '' ,
    `LastName` VARCHAR(50) NOT NULL DEFAULT '' ,
    `Login` VARCHAR(50) NOT NULL DEFAULT '' ,
    `Password` VARCHAR(50) NOT NULL DEFAULT '' ,
    PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

CREATE TABLE `COP4331`.`Colors`
(
    `ID` INT NOT NULL AUTO_INCREMENT ,
    `Name` VARCHAR(50) NOT NULL DEFAULT '' ,
    `UserID` INT NOT NULL DEFAULT '0' ,
    PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

CREATE TABLE `COP4331`.`Contacts`
(
    `ID` INT NOT NULL AUTO_INCREMENT ,
    `FirstName` VARCHAR(50) NOT NULL DEFAULT '' ,
    `LastName` VARCHAR(50) NOT NULL DEFAULT '' ,
    `Phone` VARCHAR(50) NOT NULL DEFAULT '' ,
    `Email` VARCHAR(50) NOT NULL DEFAULT '' ,
    `UserID` INT NOT NULL DEFAULT '0' ,
    PRIMARY KEY (`ID`)
) ENGINE = InnoDB;
```

Add at least one user and a few colors for that user (replace the values with your own):

```sql
INSERT INTO Users (FirstName,LastName,Login,Password) VALUES ('First','Last','yourLogin','yourPassword');
INSERT INTO Colors (Name,UserID) VALUES ('Blue',1);
INSERT INTO Colors (Name,UserID) VALUES ('Red',1);
```

Then create a database user for the API and give it access to the database:

```sql
CREATE USER 'your_db_user' IDENTIFIED BY 'your_db_password';
GRANT ALL PRIVILEGES ON COP4331.* TO 'your_db_user'@'%';
```

### 3. Set up the API

1. On the server, create a folder for the PHP files inside the web root (for example `/var/www/html/LAMPAPI`).
2. Upload the three files from `api/` into it (with `scp`, FileZilla or PSFTP).
3. In each file, replace the placeholder line with your own database details:

   ```php
   $conn = new mysqli("localhost", "username", "password", "database");
   ```

   becomes, for example, `new mysqli("localhost", "your_db_user", "your_db_password", "COP4331")`. Only make this change on the server. Never commit real credentials.

### 4. Set up the front end

1. Upload everything inside `public/` (`index.html`, `color.html`, `css/`, `js/`, `images/`) into `/var/www/html`.
2. In `js/code.js`, change `urlBase` so it points at your own domain and the folder you created in step 3, for example `http://your-domain.com/LAMPAPI`.

## Running and Accessing the Application

1. Open `http://your-domain-or-ip/` in a web browser. This shows the login page.
2. Log in with a username and password from the `Users` table.
3. On the colors page, type a name and press **Search Color** to list matching colors, or type a new name and press **Add Color** to save it. **Log Out** returns you to the login page.

The API can also be tested directly with Postman or curl. Each endpoint takes a `POST` request with a JSON body (`Content-Type: application/json`):

| Endpoint | JSON fields |
|----------|-------------|
| `Login.php` | `login`, `password` |
| `AddColor.php` | `userId`, `color` |
| `SearchColors.php` | `userId`, `search` |

## Assumptions, Limitations

- The project is a class lab, not production software. It runs over plain HTTP.
- Passwords are compared exactly as typed against the `Password` column. The MD5 hashing lines in `js/code.js` are commented out, so passwords are stored and sent unhashed unless you enable them.
- The `Contacts` table is created but is not used by the current pages or API.
- The README assumes a fresh Ubuntu LAMP server and a domain you already own.

## AI Usage

I used Claude Sonnet 5 (through Claude Code) while working on this project. It helped me with:

- Connecting the MySQL database to the web server. This covered the SQL to create the `COP4331` database, tables and sample data, creating the database user for the API, and getting the PHP files to connect to it.
- Writing this README so it's clear for someone who didn't attend the lab.
- Creating the license.

## License

This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md).
