import { ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthModule } from './feature/auth/auth.module';
import { DogsModule } from './feature/dogs/dogs.module';
import { TestModule } from './feature/test/test.module';
import { addSwaggerPage, SwaggerPages } from './utils/swagger';

const title = 'Deerhold Food System';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  pages.map((page) => {
    addSwaggerPage(
      app,
      page.path,
      {
        title: `${title} (${page.title})`,
        description: page.description,
        explorer: !!page.explorer,
      },
      page.modules,
    );
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();

const pages: SwaggerPages[] = [
  {
    modules: [AuthModule],
    title: 'Auth',
    path: 'auth',
    description: 'Auth page',
  },
  {
    modules: [AuthModule, TestModule],
    title: 'Test',
    path: 'test',
    description: 'Auth page',
  },
  {
    modules: [DogsModule, AuthModule],
    title: 'Cats',
    path: 'cats',
    description: 'Cat page',
  },
  {
    modules: [],
    title: 'Api',
    path: '',
    description: 'App page',
    explorer: true,
  },
];
