
# HotelHub
L'applicazione è stata progettata per semplificare e ottimizzare il processo di prenotazione alberghiera. Con un'interfaccia pulita e funzionalità avanzate, offre un sistema di gestione delle prenotazioni all'avanguardia per hotel di ogni dimensione.

**Target:**
Albergatori che vogliono digitalizzare il loro processo di gestione prenotazioni, camere ecc. in modo semplice e attraverso una piattaforma web intuitiva.

## Funzionalità

**Gestore:**
- [ ] Riepilogo delle prenotazioni in arrivo/partenza oggi
- [ ] Fare check-in/check-out in modo semplice
- [ ] Gestire le prenotazioni
- [ ] Tenere soto controllo entrate/uscite mensili dell'albergo
- [ ] Grafici di rendimento nei vari mesi dell'anno
- [ ] Grafici per avere il tempo di permanenza media
- [ ] Grafici per capire quali camere sono più richieste (singole, matrimoniali, altro)
- [ ] Possibilità di recuperare la password tramite email

## Wireframe
![image](https://github.com/gherardi/hotel-hub/assets/81379878/b6e16b03-ad01-4aec-b7e1-da1d00b815ea)
![image](https://github.com/gherardi/hotel-hub/assets/81379878/3d327dae-cfbd-4396-9b87-12428ad2c4c7)
![image](https://github.com/gherardi/hotel-hub/assets/81379878/b45be0a7-dd84-4d3a-bd8c-3c818bdfa453)
![image](https://github.com/gherardi/hotel-hub/assets/81379878/eeca97dd-302d-4ed6-a0d9-cbe692e13c34)

## Scherma E/R

## Schema logico
- **albergatore** (id, nominativo, email)
- **prenotazione** (id, nominativo, email, data_creazione_prenotazione, data_prenotazione, data_check_in, data_check_out, prezzo_totale, id_camera, id_albergatore)
- **camera** (id, tipologia, prezzo_giornaliero, occupata, id_albergatore)

## Modello fisico SQL
```sql
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

```

## Run Locally
Clone the project

```bash
  git clone https://github.com/gherardi/hotel-hub
```

Go to the project directory

```bash
  cd hotel-hub
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

<!--
## Deployment

To deploy this project run

```bash
  npm run build
```
Take the "dist" folder that was created and put it in a web service.
Remember to add environment variables to the web service to make the application work.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`

## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.
-->
