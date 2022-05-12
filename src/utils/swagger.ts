import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const version = '0.0.1';
const url = 'https://www.sahasp.com.np';
const name = 'Deerhold Nepal Pvt. Ltd.';
const email = '';
const defaultServer = 'http://localhost:3000';
const title = 'Deerhold Food System';

interface DocumentOptions {
  title?: string;
  description?: string;
  version?: string;
  contact?: {
    name: string;
    url: string;
    email: string;
  };
  servers?: string[];
  explorer?: boolean;
}

export const addSwaggerPage = (
  app: NestExpressApplication,
  path: string,
  option: DocumentOptions,
  include: any[],
  addBearerAuth = true,
) => {
  const optionsBuilder = new DocumentBuilder();

  // Set Title
  !!option.title
    ? optionsBuilder.setTitle(option.title)
    : optionsBuilder.setTitle(title);
  // Set Version
  !!option.version
    ? optionsBuilder.setVersion(option.version)
    : optionsBuilder.setVersion(version);

  // Set Description
  option.description && optionsBuilder.setDescription(option.description);

  // Set Contact
  !!option.contact
    ? optionsBuilder.setContact(
        option.contact.name,
        option.contact.url,
        option.contact.url,
      )
    : optionsBuilder.setContact(name, url, email);

  // Bearer Auth
  addBearerAuth && optionsBuilder.addBearerAuth();

  // Set Servers
  !!option.servers
    ? option.servers.map((server) => {
        optionsBuilder.addServer(server);
      })
    : optionsBuilder.addServer(defaultServer);

  // .setTitle(option.title)
  // .setDescription('API Description for food system')
  // .setVersion('0.1')
  // .addBearerAuth()

  const options = optionsBuilder.build();

  const document = SwaggerModule.createDocument(app, options, {
    include: include,
  });
  SwaggerModule.setup(`docs/${path}`, app, document, {
    explorer: !!option.explorer,
  });
};

export interface SwaggerPages {
  modules: any[];
  title: string;
  path: string;
  description: string;
  explorer?: boolean;
}
