---

# Notas adicionales

* El proyecto sigue una arquitectura modular utilizando las convenciones de NestJS.
* CountriesModule funciona como un módulo interno y no expone controladores públicos.
* La comunicación entre módulos se realiza mediante inyección de dependencias y exportación de servicios.
* Se utilizó un provider separado para encapsular el consumo de la API RestCountries.
* La lógica de caché se implementó almacenando los países consultados en PostgreSQL para evitar llamadas repetidas a la API externa.
* Las entidades se encuentran organizadas por módulo dentro de carpetas `entities`.
* Los DTOs se encuentran separados dentro de la carpeta `dto` para mantener la validación desacoplada de la lógica de negocio.
* La base de datos utilizada fue PostgreSQL mediante Supabase.
* Los registros pueden visualizarse desde Supabase en la sección `Table Editor`.
* El proyecto utiliza `synchronize: true` para generar automáticamente las tablas durante el desarrollo.
* Antes de realizar nuevas pruebas se recomienda limpiar los registros de las tablas `country` y `travel_plan`.
* Para probar los endpoints se utilizó Postman.

| Método | Endpoint            |
| ------ | ------------------- |
| POST   | `http://localhost:3000/travel-plans`     |
| GET    | `http://localhost:3000/travel-plans`     |
| GET    | `http://localhost:3000/travel-plans/:id` |
| DELETE | `http://localhost:3000/travel-plans/:id` |

* Para acceso a la DB te mandaré un link para eso de invitación para que veas los cambios y los datos que se guarden. 
<img width="1919" height="981" alt="image" src="https://github.com/user-attachments/assets/160d6ab4-6df3-48ad-aff8-50075714d29b" />

# Instalación

Clonar el repositorio:

```bash id="br97vh"
git clone <URL_DEL_REPOSITORIO>
```

Entrar al proyecto:

```bash id="kwwd1v"
cd travel-planner-api
```

Instalar dependencias:

```bash id="dcjlwm"
npm install
```

Crear un archivo `.env` en la raíz del proyecto:

```env id="d3aov8"
DATABASE_URL=YOUR_DATABASE_URL
```

Ejecutar el proyecto:

```bash id="95r9qv"
npm run start:dev
```

La aplicación correrá en:

```txt id="e6g2rq"
http://localhost:3000
```




