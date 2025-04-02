import { APIGatewayRequestAuthorizerEvent, APIGatewayAuthorizerResult, Handler } from 'aws-lambda';
import { JwtService } from '@nestjs/jwt';

const jwtService = new JwtService({
  secret: process.env.JWT_SECRET || 'my-secret-token',
  signOptions: { expiresIn: '1h' },
});

export const handler: Handler = async (
  event: APIGatewayRequestAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  try {

    const token = event.headers?.Authorization || event.headers?.authorization;
    if (!token) {
      throw new Error('No token provided');
    }
    console.log('JWT_SECRET: ', process.env.JWT_SECRET);

    const actualToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    console.log('actualToken: ', actualToken);

    let decoded = jwtService.verify(
      actualToken,
      {
        secret: process.env.JWT_SECRET
      }
    );
    console.log('Token verificado: ', decoded);

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*',
          },
        ],
      },
    };
  } catch (error) {

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*',
          },
        ],
      },
    };
  }
};
