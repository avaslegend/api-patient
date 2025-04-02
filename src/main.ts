import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ReplaySubject, firstValueFrom } from 'rxjs';
import { configure as serverlessExpress } from '@codegenie/serverless-express';
import { Callback, Handler, Context } from 'aws-lambda';

const serverSubject = new ReplaySubject<Handler>();

async function bootstrap(): Promise<Handler> {
    console.log('COLD START: Initializing Nest');
    const app = await NestFactory.create(AppModule);

    // Configuración de Swagger
    const config = new DocumentBuilder()
      .setTitle('Patients API')
      .setDescription('API RESTful para la gestión de pacientes')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    //app.enableCors();
    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({ app: expressApp });
}

void bootstrap().then((server) => serverSubject.next(server));

type EventPayload = {
    [key: string]: any;
}


export const handler: Handler = async (
    event: EventPayload,
    context: Context,
    callback: Callback,
) => {
    if (event.path === '' || event.path === undefined) event.path = '/';

    const server = await firstValueFrom(serverSubject);
    return server(event, context, callback);
}

// Permite ejecutar la aplicación localmente (por ejemplo, con serverless-offline)
/*if (process.env.NODE_ENV !== 'lambda') {
    bootstrap().then(() => {
    console.log('Aplicación corriendo localmente.');
  });
}*/
