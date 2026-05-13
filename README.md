# PREPARCIAL2

Acá esta el preparcial 2

---

# Notas adicionales

* El preparcial sigue una arquitectura modular utilizando las convenciones de NestJS.
* CountriesModule funciona como un módulo interno y no expone controladores públicos.
* La comunicación entre módulos se realiza mediante inyección de dependencias y exportación de servicios.
* Se utilizó un provider separado para encapsular el consumo de la API RestCountries.
* La lógica de caché se implementó almacenando los países consultados en PostgreSQL para evitar llamadas repetidas a la API externa.
* Las entidades se encuentran organizadas por módulo dentro de carpetas `entities`.
* Los DTOs se encuentran separados dentro de la carpeta `dto` para mantener la validación desacoplada de la lógica de negocio.
* La base de datos utilizada fue PostgreSQL mediante Supabase.
* Los registros pueden visualizarse desde Supabase en la sección `Table Editor`.
* El preparcial utiliza `synchronize: true` para generar automáticamente las tablas durante el desarrollo.
* Antes de realizar nuevas pruebas se recomienda limpiar los registros de las tablas `country` y `travel_plan`.
* Para probar los endpoints se utilizó Postman.
*Evidencia de base de datos: Para la revisión de esta consultaré tu correo para mandar invitación a la Base de Datos.
* Acá está la evidencia de la base de datos vacía lista para el parcial:
<img width="1919" height="924" alt="image" src="https://github.com/user-attachments/assets/f677d4d1-7eff-4e43-bcd9-2cfc7787fd0b" />

<img width="1919" height="917" alt="image" src="https://github.com/user-attachments/assets/41b43780-dfe0-4e1a-a2e6-092c49c09b73" />


---

# Endpoints

| Método | Endpoint                                 |
| ------ | ---------------------------------------- |
| POST   | `http://localhost:3000/travel-plans`     |
| GET    | `http://localhost:3000/travel-plans`     |
| GET    | `http://localhost:3000/travel-plans/:id` |
| DELETE | `http://localhost:3000/travel-plans/:id` |

---

# Instalación

Clonar el repositorio:

```bash
git clone https://github.com/jeguzman2/pre-parcial2.git
```

Entrar al proyecto del Preparcial:

```bash
cd travel-planner-api
```

Instalar dependencias:

```bash
npm install
```

Revisar archivo `.env` en la raíz del preparcial:

```env
DATABASE_URL=***********************************
```

Ejecutar:

```bash
npm run start:dev
```

La aplicación correrá en:

```txt
http://localhost:3000
```

---

# Arquitectura y flujo de caché

El proyecto está dividido en dos módulos principales:

## CountriesModule

Módulo interno encargado de manejar la información de países.
No expone endpoints públicos y únicamente es utilizado desde otros módulos mediante inyección de dependencias.

Funciones:

* Buscar países en PostgreSQL
* Consumir la API RestCountries
* Guardar países en caché local

---

## TravelPlansModule

Módulo encargado de exponer los endpoints públicos relacionados con los planes de viaje.

Endpoints implementados:

* POST `/travel-plans`
* GET `/travel-plans`
* GET `/travel-plans/:id`
* DELETE `/travel-plans/:id`

---

# Flujo de caché

Cuando se crea un plan de viaje:

1. TravelPlansService solicita el país al CountriesService.
2. CountriesService busca el país en PostgreSQL.
3. Si el país existe, reutiliza la información almacenada.
4. Si no existe, consume la API RestCountries.
5. El país se guarda en PostgreSQL.
6. Finalmente se crea el plan de viaje.

La idea principal es evitar llamadas repetidas a la API externa reutilizando la información almacenada localmente.

---

# Ejemplos de peticiones JSON

## Crear plan de viaje

### POST `/travel-plans`

```json
{
  "title": "Viaje a Colombia",
  "startDate": "2026-06-01",
  "endDate": "2026-06-15",
  "destinationCountryCode": "COL"
}
```

---

## Crear otro plan reutilizando el caché

### POST `/travel-plans`

```json
{
  "title": "Viaje a Brasil",
  "startDate": "2026-07-10",
  "endDate": "2026-07-20",
  "destinationCountryCode": "BRA"
}
```

---

## Obtener todos los planes

### GET `/travel-plans`

---

## Obtener un plan por ID

### GET `/travel-plans/1`

---

## Eliminar un plan

### DELETE `/travel-plans/1`






