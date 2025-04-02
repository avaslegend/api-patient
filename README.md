# NestJS Patients API (Serverless)

API RESTful para gestionar pacientes, integrando:
- AWS Lambda, DynamoDB, API Gateway
- NestJS
- Serverless Framework
- randomuser.me (para obtener datos automáticos al crear pacientes)
- Autenticación básica con JWT (Lambda Authorizer)

## Requerimientos Previos

- Node.js (versión 16 o superior)
- Serverless Framework instalado globalmente (`npm i -g serverless`)
- Una cuenta de AWS configurada (credenciales en `~/.aws/credentials`)

## Instalación

1. Clona este repositorio.
2. Instala dependencias:
   ```bash
   npm install


Se requiere instalar AWS

Configurar AWS

aws configure

Para el uso de serverless framework V4

Crearse una cuenta en Serverless framework y crear un provider (AWS) 

Para compilar el proyecto ejecutar :

npm run build

Para levantar la aplicacion de forma local:

npx serverless offline

Para desplegar la aplicacion:

sls deploy --stage dev
