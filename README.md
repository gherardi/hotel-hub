# HotelHub

L'applicazione è stata progettata per semplificare e ottimizzare il processo di prenotazione alberghiera. Con un'interfaccia pulita e funzionalità avanzate, offre un sistema di gestione delle prenotazioni all'avanguardia per hotel di ogni dimensione.

**Target:**
Albergatori che vogliono digitalizzare il loro processo di gestione prenotazioni, camere ecc. in modo semplice e attraverso una piattaforma web intuitiva.

## Funzionalità

**Server: (Backend)**

- [x] Registrazione al servizio tramite email e password
- [x] Gestione delle route del programma
- [x] Gestire le richieste API a determinati endpoint
- [x] Calcolo costo totale di una prenotazione

**Gestore: (Frontend)**

- [x] Riepilogo delle prenotazioni
- [x] Riepilogo delle camere
- [x] Creazione delle prenotazioni
- [x] Creazione di camere
- [ ] Fare check-in/check-out in modo semplice
- [ ] Tenere soto controllo entrate/uscite mensili dell'albergo
- [ ] Grafici di rendimento nei vari mesi dell'anno
- [ ] Grafici per avere il tempo di permanenza media
- [ ] Grafici per capire quali camere sono più richieste (singole, matrimoniali, altro)
- [ ] Possibilità di recuperare la password tramite email

## Mockup & Wireframe

```js
/  landing page del servizio
/login  accedere al servizio
/signup  registrarsi servizio
/dashboard  dashboard del servizio
/:feature  ogni funzionalità del programma avrà una sua route (coming soon)
```

![image](https://github.com/gherardi/hotel-hub/assets/81379878/e9401d78-eddc-4290-920a-1f21904a8035)

---

![image](https://github.com/gherardi/hotel-hub/assets/81379878/a0d08c23-b647-4016-9b33-1c0f2ef0af0b)
![image](https://github.com/gherardi/hotel-hub/assets/81379878/c9740aea-17a5-4004-a0e0-7e1936a9f094)

![image](https://github.com/gherardi/hotel-hub/assets/81379878/2b525988-29a9-423b-915b-136fd63ebf00)
![image](https://github.com/gherardi/hotel-hub/assets/81379878/bd908765-0575-48d8-930a-0a49ed65e753)
![image](https://github.com/gherardi/hotel-hub/assets/81379878/2bdd14e5-c444-4d9a-bb5e-e58934923fae)

## Scherma E/R

![image](https://github.com/gherardi/hotel-hub/assets/81379878/da166165-9b8e-4370-beac-d87cb35f7bd2)

## Schema logico

- **albergatore** (id, nominativo, email, password)
- **prenotazione** (id, nominativo_cliente, email_cliente, data_creazione_prenotazione, data_prenotazione, data_check_in, data_check_out, prezzo_giornaliero, sconto_percentuale, prezzo_totale, id_camera, id_albergatore)
- **camera** (id, tipologia, capacita, occupata, prezzo_giornaliero, sconto_percentuale id_albergatore)

## Modello fisico SQL

```sql
CREATE DATABASE IF NOT EXISTS hotelhub;
USE hotelhub;

CREATE TABLE IF NOT EXISTS albergatori (
  id INT AUTO_INCREMENT UNIQUE,
  nominativo VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS camere (
  id INT AUTO_INCREMENT UNIQUE,
  tipologia VARCHAR(255),
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
```

## Prerequisites

1. avere xamp installato sul proprio pc (o qualsiasi altro modo per avere un database mysql locale)
2. copiare il codice che trovi [qui](#modello-fisico-sql) ed eseguirlo

nb: il file di configurazione per le connessioni al database si trova su /config/database.js, modificando quelle impostazioni potrai connettersi ad un tuo database a piacere con username, password e porta

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
  npm start
```

a questo punto recarsi all'indirizzo http://localhost:3000 e iniziare ad utilizzare il programma

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
