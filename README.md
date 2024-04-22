**status:** backend/frontend refactoring in progress

# HotelHub
L'applicazione è stata progettata per semplificare e ottimizzare il processo di prenotazione alberghiera. Con un'interfaccia pulita e funzionalità avanzate, offre un sistema di gestione delle prenotazioni all'avanguardia per hotel di ogni dimensione.

**Target:**
Albergatori che vogliono digitalizzare il loro processo di gestione prenotazioni, camere ecc. in modo semplice e attraverso una piattaforma web intuitiva.

## Funzionalità

**Server: (Backend)**

- [x]  Registrazione e Login al servizio tramite email e password
- [x]  Middleware di controllo e sanitizzazione del body di ogni richiesta
- [x]  Limitazione di richieste alle api per evitare spam
- [x]  Esposizione API tramite protocollo REST
- [x]  Autenticazione e Autorizzazione tramite jwt
- [x]  Invio email di recupero password con token univoco temporaneo

**Gestore: (Frontend)**

- [x]  Client Side Routing
- [x]  Registrazione con validazione degli input e messaggi di errori custom
- [x]  Accesso con validazione degli input e messaggi di errori custom
- [x]  Dashboard con riepilogo delle prenotazioni, vendite e occupazione albergo
- [x]  Pagina camere con gestione completa
- [x]  Pagina prenotazioni con gestione completa
- [x]  Recupero password tramite email con token

## Mockup & Wireframe

![image](https://github.com/gherardi/hotel-hub/assets/81379878/a0d08c23-b647-4016-9b33-1c0f2ef0af0b)

![image](https://github.com/gherardi/hotel-hub/assets/81379878/c9740aea-17a5-4004-a0e0-7e1936a9f094)

![image](https://github.com/gherardi/hotel-hub/assets/81379878/2b525988-29a9-423b-915b-136fd63ebf00)

![image](https://github.com/gherardi/hotel-hub/assets/81379878/bd908765-0575-48d8-930a-0a49ed65e753)

![image](https://github.com/gherardi/hotel-hub/assets/81379878/2bdd14e5-c444-4d9a-bb5e-e58934923fae)

## Scherma E/R

![image](https://github.com/gherardi/hotel-hub/assets/81379878/86f4417b-f24b-4361-a6c6-76b599bc10da)

[schema](https://app.eraser.io/workspace/DPMmFcnNEUQWkDtrU404?origin=share)

## Schema logico

- **hotel** (id, created_at, name)
- **users (albergatori)** (id, created_at, name, email, password, password_reset_token, id_admin, hotel_id)
- **bookings** (id, created_at, customer_name, start, nights, total, room_id, hotel_id ,user_id)
- **rooms** (id, created_at, type, price, number, hotel_id)

## Modello fisico SQL

```sql
create table
  public.hotel (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    name text not null,
    constraint hotel_pkey primary key (id),
    constraint hotel_name_check check ((length(name) <> 0))
  ) tablespace pg_default;

create table
  public.users (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    name text not null,
    email text not null,
    password text not null,
    password_reset_token text null,
    is_admin boolean not null default false,
    hotel_id uuid null,
    constraint users_pkey primary key (id),
    constraint users_email_key unique (email),
    constraint users_password_reset_token_key unique (password_reset_token),
    constraint public_users_hotel_id_fkey foreign key (hotel_id) references hotel (id) on update cascade on delete cascade
  ) tablespace pg_default;

create table
  public.rooms (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    type public.room_type not null,
    price numeric not null,
    number numeric not null,
    hotel_id uuid not null,
    constraint rooms_pkey primary key (id),
    constraint rooms_number_key unique (number),
    constraint public_rooms_hotel_id_fkey foreign key (hotel_id) references hotel (id) on update cascade on delete cascade
  ) tablespace pg_default;

create table
  public.bookings (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    customer_name text not null,
    start timestamp with time zone not null,
    "end" timestamp with time zone not null,
    nights numeric not null,
    total numeric not null,
    user_id uuid not null,
    hotel_id uuid not null,
    room_id uuid not null,
    constraint bookings_pkey primary key (id),
    constraint public_bookings_hotel_id_fkey foreign key (hotel_id) references hotel (id) on update cascade on delete cascade,
    constraint public_bookings_room_id_fkey foreign key (room_id) references rooms (id) on update cascade on delete cascade,
    constraint public_bookings_user_id_fkey foreign key (user_id) references users (id) on update cascade on delete cascade
  ) tablespace pg_default;

insert into
  users (name, email, password, is_admin)
values
  ('Amministratore', 'amministratore@gmail.com', '$2a$12$B/H27IxlpiulOh/MRxiZ9ej4YiU70VdGIBQpn2q71Gj6/ERbf3yPS', true);

```

## Prerequisites

avere nodejs > v18.0 e npm installato localmente

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in the server side code

`NODE_ENV`

`PORT`

`JWT_SECRET`

`JWT_EXPIRES_IN`

`SALT`

`PASSWORD_RESET_EXPIRES`

`RESEND_API_KEY`

`SUPABASE_URL`

`SUPABASE_KEY`

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
  cd client && npm install
```

```bash
  cd server && npm install
```

Start the server

```bash
  cd server && npm start
```

```bash
  cd client && npm start
```

a questo punto recarsi all'indirizzo http://localhost:5173 e iniziare ad utilizzare il programma

## Convenzioni dei commit
In questo progetto utilizzo le convenzioni di [commitlint](https://commitlint.js.org/) per gestire i commit e fornire loro uno standard uniforme. Ciò facilita la comprensione del log dei commit e promuove una pratica coerenza nel processo di sviluppo.
