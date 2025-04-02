import { NestFactory } from '@nestjs/core';
import { configure as serverlessExpress } from '@codegenie/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { ReplaySubject, firstValueFrom } from 'rxjs';
import { AuthModule } from './auth.module';

const serverSubject = new ReplaySubject<Handler>();

async function bootstrap(): Promise<Handler> {
    console.log('Auth START: Initializing Nest');
    const app = await NestFactory.create(AuthModule);

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