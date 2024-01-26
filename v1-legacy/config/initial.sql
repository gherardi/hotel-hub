CREATE DATABASE IF NOT EXISTS hotelhub;
USE hotelhub;

CREATE TABLE IF NOT EXISTS albergatori (
  id INT AUTO_INCREMENT UNIQUE,
  nominativo VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  passwordResetToken VARCHAR(255) UNIQUE,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS camere (
  id INT AUTO_INCREMENT UNIQUE,
  tipologia VARCHAR(255),
  numero INT NOT NULL,
  prezzo_giornaliero DECIMAL(10, 2),
  occupata BIT,
  sconto INT CHECK (sconto BETWEEN 0 AND 100),
  id_albergatore INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_albergatore) REFERENCES albergatori(id)
);

CREATE TABLE IF NOT EXISTS prenotazioni (
  id INT AUTO_INCREMENT UNIQUE,
  nominativo_cliente VARCHAR(255) NOT NULL,
  email_cliente VARCHAR(255) NOT NULL,
  data_prenotazione DATE,
  data_check_in DATE,
  data_check_out DATE,
  prezzo_totale DECIMAL(10, 2),
  data_creazione_prenotazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  id_camera INT NOT NULL,
  id_albergatore INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_camera) REFERENCES camere(id),
  FOREIGN KEY (id_albergatore) REFERENCES albergatori(id)
);
