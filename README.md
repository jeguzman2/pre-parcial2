# PREPARCIAL2

Este es el preparcial 2 para el parcial 2. 

---

# Tecnologías

* NestJS
* TypeORM
* PostgreSQL
* Supabase

---

# Inciar el parcial:

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar al proyecto:

```bash
cd travel-planner-api
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env`:

```env
DATABASE_URL=YOUR_DATABASE_URL
```

Ejecutar el proyecto:

```bash
npm run start:dev
```

---

# Estructura general

El proyecto está dividido en dos módulos principales:

## CountriesModule

Se encarga de manejar la información de países de manera interna.
Este módulo no tiene endpoints públicos.

Su función principal es:

* buscar países en la base de datos
* consumir la API RestCountries si el país no existe
* guardar la información localmente para reutilizarla después

---

## TravelPlansModule

Módulo encargado de los endpoints relacionados con los planes de viaje.

Endpoints implementados:

| Método | Endpoint            |
| ------ | ------------------- |
| POST   | `/travel-plans`     |
| GET    | `/travel-plans`     |
| GET    | `/travel-plans/:id` |
| DELETE | `/travel-plans/:id` |

---

# Funcionamiento de la caché

Cuando se crea un plan de viaje, el servicio primero verifica si el país ya existe en PostgreSQL.

* Si existe, reutiliza la información local.
* Si no existe, consume la API RestCountries y guarda el país en la base de datos.

De esta manera se evitan llamadas repetidas a la API externa.

---

# Base de datos

Se utilizó PostgreSQL mediante Supabase.

Tablas utilizadas:

* `country`
* `travel_plan`

Las tablas se crean automáticamente con TypeORM usando:

```ts
synchronize: true
```

---

# Validaciones

Se implementaron DTOs para validar:

* campos obligatorios
* formato de fechas
* código Alpha-3 del país

---

# API externa utilizada

```txt
https://restcountries.com
```

---

# Ejemplo de petición

## POST `/travel-plans`

```json
{
  "title": "Viaje a Colombia",
  "startDate": "2026-06-01",
  "endDate": "2026-06-15",
  "destinationCountryCode": "COL"
}
```

