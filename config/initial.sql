CREATE DATABASE IF NOT EXISTS hotel_hub;
USE hotel_hub;

CREATE TABLE IF NOT EXISTS albergatori (
  id INT AUTO_INCREMENT,
  nominativo VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS camere (
  id INT AUTO_INCREMENT,
  tipologia VARCHAR(255),
  prezzo_giornaliero DECIMAL(10, 2),
  occupata BOOLEAN,
  sconto INT CHECK (sconto BETWEEN 0 AND 100),
  PRIMARY KEY (id)
  FOREIGN KEY (id_albergatore) REFERENCES albergatori(id)
);

CREATE TABLE IF NOT EXISTS prenotazioni (
  id INT AUTO_INCREMENT,
  nominativo VARCHAR(255),
  email VARCHAR(255),
  data_prenotazione DATE,
  data_check_in DATE,
  data_check_out DATE,
  prezzo_totale DECIMAL(10, 2),
  data_creazione_prenotazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  id_camera INT,
  id_albergatore INT,
  PRIMARY KEY (id),
  FOREIGN KEY (id_camera) REFERENCES camere(id),
  FOREIGN KEY (id_albergatore) REFERENCES albergatori(id)
);