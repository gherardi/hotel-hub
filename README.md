**status:** building / in progress
**presentazione:** [link](https://www.canva.com/design/DAGE_h_6Ofc/zzbpHPs599Tl1z9Ik-fcqA/view?utm_content=DAGE_h_6Ofc&utm_campaign=designshare&utm_medium=link&utm_source=editor)

# HotelHub
HotelHub è un'applicazione web full-stack progettata per semplificare e ottimizzare il processo di prenotazione degli hotel. Con un'interfaccia pulita e funzionalità avanzate, offre un sistema di gestione delle prenotazioni all'avanguardia adatto ad hotel di qualsiasi dimensione.

**Pubblico di riferimento:**
Proprietari di hotel che desiderano digitalizzare il loro processo di gestione delle prenotazioni e delle camere in modo intuitivo attraverso una piattaforma web.

## Funzionalità

**Server: (Backend)**

- [x]  Registrazione e accesso degli utenti tramite email e password
- [x]  Middleware per il controllo e la sanificazione del corpo delle richieste
- [x]  Endpoint API RESTful
- [x]  Autenticazione e autorizzazione tramite JWT
- [x]  Invio di email per il recupero della password con token temporaneo unico

**Gestore: (Frontend)**

- [x]  Client Side Routing
- [x]  Registrazione con validazione degli input e messaggi di errori custom
- [x]  Accesso con validazione degli input e messaggi di errori custom
- [x]  Dashboard con riepilogo delle prenotazioni, vendite e occupazione albergo
- [x]  Pagina camere con gestione completa
- [x]  Pagina prenotazioni con gestione completa
- [x]  Recupero password tramite email con token

- [x]  Routing lato client
- [x]  Registrazione con validazione degli input e messaggi di errore personalizzati
- [x]  Accesso con validazione degli input e messaggi di errore personalizzati
- [x]  Dashboard che mostra riepiloghi delle prenotazioni, vendite e occupazione dell'hotel
- [x]  Pagina gestione camere con funzionalità complete
- [x]  Pagina gestione prenotazioni con funzionalità complete
- [x]  Recupero della password tramite email con token

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

## Prerequisiti

Assicurati che Node.js sia aggiornato a una versione superiore alla v18.0 e che npm sia installato localmente.

## Variabili d'Ambiente

Per eseguire questo progetto, aggiungi le seguenti variabili d'ambiente al tuo file .env nel codice lato server:

- `NODE_ENV`
- `PORT`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `SALT`
- `PASSWORD_RESET_EXPIRES`
- `RESEND_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_KEY`

## Esecuzione Locale

Clona il progetto

```bash
  git clone https://github.com/gherardi/hotel-hub
```

Naviga nella directory del progetto

```bash
  cd hotel-hub
```

Installa le dipendenze

```bash
  cd client && npm install
```

```bash
  cd server && npm install
```

Avvia il server

```bash
  cd server && npm start
```

```bash
  cd client && npm start
```

Ora visita http://localhost:5173 per iniziare a utilizzare l'applicazione.
