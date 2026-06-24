CREATE DATABASE IF NOT EXISTS heros;
USE heros;

-- 1. Tabela: users (image_cd92a3.png)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(100) NULL,
    coins INT NULL DEFAULT 0
);

-- 2. Tabela: challanges (image_cd8f05.png)
CREATE TABLE IF NOT EXISTS challanges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    render TINYINT(1) NULL DEFAULT 0,
    status TINYINT(1) NOT NULL DEFAULT 0,
    goal INT NULL DEFAULT 1
);

-- 3. Tabela: heros (image_cd9227.png)
CREATE TABLE IF NOT EXISTS heros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    class ENUM('EVO', 'Herói', 'Campeão') NOT NULL,
    status ENUM('Online', 'Ausente', 'Offline') NOT NULL,
    img VARCHAR(255) NULL,
    render TINYINT(1) NULL DEFAULT 1,
    fk_userId INT NULL,
    FOREIGN KEY (fk_userId) REFERENCES users(id) ON DELETE SET NULL
);

-- 4. Tabela: guilda (image_cd8f3f.png)
CREATE TABLE IF NOT EXISTS guilda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    fk_userId INT NULL,
    tipo ENUM('Herói', 'EVO', 'Campeão') NOT NULL DEFAULT 'Herói',
    FOREIGN KEY (fk_userId) REFERENCES users(id) ON DELETE SET NULL
);

-- 5. Tabela: guilda_heros (image_cd8f61.png) - Tabela intermediária (N:M)
CREATE TABLE IF NOT EXISTS guilda_heros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_guildaId INT NOT NULL,
    fk_heroId INT NOT NULL,
    FOREIGN KEY (fk_guildaId) REFERENCES guilda(id) ON DELETE CASCADE,
    FOREIGN KEY (fk_heroId) REFERENCES heros(id) ON DELETE CASCADE
);

-- 6. Tabela: user_challanges (image_cd9269.png) - Tabela intermediária (N:M)
CREATE TABLE IF NOT EXISTS user_challanges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_userId INT NOT NULL,
    fk_challange_id INT NOT NULL,
    render TINYINT(1) NULL DEFAULT 0,
    status TINYINT(1) NULL DEFAULT 0,
    FOREIGN KEY (fk_userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (fk_challange_id) REFERENCES challanges(id) ON DELETE CASCADE
);