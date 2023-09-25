
# HotelHub

La nostra soluzione webapp è stata progettata per semplificare e ottimizzare il processo di prenotazione alberghiera. Con un'interfaccia pulita e funzionalità avanzate, offriamo un sistema di gestione delle prenotazioni all'avanguardia per hotel di ogni dimensione.


## Features

**Cliente:**
- [ ] Prenotare camere online tramite sito web
- [ ] Gestire le proprie prenotazioni online
- [ ] Spazio privato (username/password) in cui visualizzare le prenotazioni
- [ ] Possibilità di recuperare la password tramite email

**Gestore:**
- [ ] Riepilogo delle prenotazioni in arrivo/partenza oggi
- [ ] Fare check-in/check-out in modo semplice
- [ ] Tenere soto controllo entrate/uscite mensili dell'albergo
- [ ] Grafici di rendimento nei vari mesi dell'anno
- [ ] Grafici prr capire per quante notti sono prenotate
- [ ] Grafici per capire quali camere sono più richieste (singole, matrimoniali, altro)
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

