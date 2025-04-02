# NestJS Patients API (Serverless)

API RESTful para gestionar pacientes ha sido creado creado bajo los principios de arquitectura SOLID, clean architecture y está integrado por los siguientes recursos:
- AWS Lambda, DynamoDB, API Gateway
- NestJS
- Serverless Framework
- randomuser.me (para obtener datos automáticos al crear pacientes)
- Autenticación básica con JWT (Lambda Authorizer)
- GitHub Actions

## Requerimientos Previos

- Node.js (versión 20 o superior)
- Serverless Framework instalado globalmente (`npm i -g serverless`)
- Una cuenta de AWS configurada (credenciales en `~/.aws/credentials`)

## Configuración e Instalación

1. Clona este repositorio.
2. Instala dependencias:
   ```bash
   npm install
3. Duplica el archivo .env.template a .env e ingresa la firma para el jwt token en la variable de entorno JWT_SECRET.
4. Compila la aplicación desde la raíz del proyecto
   ```bash
   npm run build
   ```
Para el uso de serverless framework V4

Crearse una cuenta en Serverless framework y crear un provider (AWS) 

## Unit Testing

Ejecuta el siguiente comando:
   ```bash
    npm run test
   ```
   
## Endpoints

`/auth/login, POST`

`/patients, POST`

`/patients/:id, GET`

`/patients/:id, PATCH`

`/patients/:id, DELETE`

`/patients, GET`



## Despliegue


Para levantar la aplicacion de forma local:
```bash
npx serverless offline
```
Para desplegar la aplicacion:
```bash
sls deploy --stage dev
```

## Ejecución

Los endpoints requieren de un token

Obtener token en el endpoint:
`/auth/login, POST`

Asignarle un usuario y contraseña
