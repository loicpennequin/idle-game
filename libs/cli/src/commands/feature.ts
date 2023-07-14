import { PROJECT_ROOT } from '../constants';
import fs from 'fs-extra';
import { resolve } from 'path';
import { logger } from '../gui';
import dedent from 'dedent';
import _ from 'lodash-es';

const serverRoot = resolve(PROJECT_ROOT, 'apps/server/src');
const clientRoot = resolve(PROJECT_ROOT, 'apps/client/src');
const sharedRoot = resolve(PROJECT_ROOT, 'libs/shared/src');

const createFile = (path: string, content: string) => {
  fs.outputFileSync(path, content);
  logger.info(`created file ${path}`);
};

const warningBanner = dedent`
  /*
   *  THE CONTENT OF THIS FILE IS AUTOGENERATED BY THE CLI. DONT EDIT IT DIRECTLY
   *  If you need to edit the template, to to libs/cli/src/commands/feature.ts
   */
`;

const createServerFeature = (name: string) => {
  const capitalizedName = _.capitalize(name);

  const featureDir = resolve(serverRoot, 'features', name);
  fs.ensureDirSync(featureDir);

  const routerTemplate = dedent`
    import { contract } from '@daria/shared';
    import { initServer } from '@ts-rest/express';
    import { HTTP_STATUS_CODES } from '../../utils/errorFactory';
    import { pipe } from 'fp-ts/function';

    const s = initServer();

    export const ${name}Router = s.router(contract.${name}, {
      async getAll({ req: { container } }) {
        return pipe(
          await container.getAll${capitalizedName}sUseCase(),
          container.responseMapper(HTTP_STATUS_CODES.OK, container.${name}Mapper.toResponseArray)
        );
      },
    });
  `;

  const entityTemplate = dedent`
    import { UUID } from '@daria/shared';

    export type ${capitalizedName}Id = UUID;

    export type ${capitalizedName} = { id: ${capitalizedName}Id };
  `;

  const repositoryTemplate = dedent`
    import { PrismaClient } from '@prisma/client';
    import * as E from 'fp-ts/Either';
    import {
      UnexpectedError,
      errorFactory
    } from '../../utils/errorFactory';
    import { ${capitalizedName} } from './${name}.entity';

    export type ${capitalizedName}Repository = {
      findAll(): Promise<E.Either<UnexpectedError, ${capitalizedName}[]>>;
      
    };

    export const ${name}Repository = ({ prisma }: { prisma: PrismaClient }): ${capitalizedName}Repository => {
      return {
        async findAll() {
          try {
            throw errorFactory.unexpected({ message: 'not implemented' })
          } catch (err) {
            return E.left(handlePrismaError(prismaNotUniqueMatchers)(err));
          }
        }
      };
    };
  `;

  const useCaseTemplate = dedent`
    import { ${name}Contract } from '@daria/shared';
    import { ServerInferRequest } from '@ts-rest/core';
    import { UnexpectedError } from '../../../utils/errorFactory';
    import { ${capitalizedName} } from '../${name}entity';
    import { ${capitalizedName}Repository } from '../${name}.repository';
    import { UseCase } from '../../../utils/helpers';

    export type GetAll${capitalizedName}Input = ServerInferRequest<typeof ${name}Contract.getAll>['body'];
    export type GetAll${capitalizedName}Error = UnexpectedError;

    export type GetAll${capitalizedName}sUseCase = UseCase<GetAll${capitalizedName}InputInput, ${capitalizedName}, GetAll${capitalizedName}Error>;

    type Dependencies = { ${name}Repo: ${capitalizedName}Repository };

    export const getAll${capitalizedName}sUseCase =
      ({ ${name}Repo }: Dependencies): GetAll${capitalizedName}sUseCase =>
      async () => {
        return ${name}Repo.findAll();
      };
  `;

  const mapperTemplate = dedent`
    import { ${capitalizedName}Response } from '@daria/shared';
    import { ${capitalizedName} } from './${name}.entity';

    export type ${capitalizedName}Mapper = {
      toResponse(${name}: ${capitalizedName}): ${capitalizedName}Response;
      toResponseArray(${name}s: ${capitalizedName}[]): ${capitalizedName}Response[];
    };

    export const ${name}Mapper = (): ${capitalizedName}Mapper => {
      const map${capitalizedName} = (${name}: ${capitalizedName}): ${capitalizedName}Response => {
        return {
          id: ${name}.id,
        };
      };

      return {
        toResponse: map${capitalizedName},
        toResponseArray(${name}s) {
          return ${name}s.map(map${capitalizedName});
        }
      };
  };
  `;

  const providersTemplate = dedent`
    import { asFunction } from 'awilix';
    import { ${name}Mapper } from './${name}.mapper';
    import { ${name}Repository } from './${name}.repository';
    import { getAll${capitalizedName}sUseCase } from './usecases/getall${capitalizedName}s.usecase';

    export const ${name}Providers = {
      ${name}Repo: asFunction(${name}Repository),
      ${name}Mapper: asFunction(${name}Mapper),

      getAll${capitalizedName}sUseCase: asFunction(getAll${capitalizedName}sUseCase),
    };
  `;

  createFile(resolve(featureDir, `${name}.router.ts`), routerTemplate);
  createFile(
    resolve(featureDir, `usecases/getAll${capitalizedName}s.usecase.ts`),
    useCaseTemplate
  );
  createFile(resolve(featureDir, `${name}.repository.ts`), repositoryTemplate);
  createFile(resolve(featureDir, `${name}.entity.ts`), entityTemplate);
  createFile(resolve(featureDir, `${name}.mapper.ts`), mapperTemplate);
  createFile(resolve(featureDir, `${name}.providers.ts`), providersTemplate);

  const features = fs
    .readdirSync(resolve(serverRoot, 'features'))
    .filter(fileOrdir => fs.lstatSync(fileOrdir).isDirectory());
  const featuresWithRouter = features.filter(feature =>
    fs.existsSync(resolve(serverRoot, 'features', feature, `${feature}.router.ts`))
  );
  const featuresWithProviders = features.filter(feature =>
    fs.existsSync(resolve(serverRoot, 'features', feature, `${feature}.providers.ts`))
  );

  const routerIndexTemplate = dedent`
    ${warningBanner}
    import { contract } from '@daria/shared';
    import { initServer } from '@ts-rest/express';
    ${featuresWithRouter
      .map(
        feature => `import { ${feature}Router } from '../${feature}/${feature}.router';`
      )
      .join('\n')}
    
    const s = initServer();

    export const router = s.router(contract, {
      ${featuresWithRouter.map(feature => `${feature}: ${feature}Router`).join(',\n')}
    });
  `;

  createFile(resolve(serverRoot, 'features/core/router.ts'), routerIndexTemplate);

  const containerTemplate = dedent`
    ${warningBanner}
    import { Express } from 'express';
    import { asFunction, asValue, Resolver } from 'awilix';
    import { Nullable, TypedAwilixContainer, createTypedContainer } from '@daria/shared';
    import { config } from './config';
    import { User } from './features/user/user.entity';
    ${featuresWithProviders
      .map(
        feature =>
          `import { ${feature}Providers } from './features/${feature}/${feature}.providers';`
      )
      .join('\n')}

    const dependencies = {
      config: asFunction(config),
      req: asValue(null),
      res: asValue(null),
      session: asValue(null),
       ${featuresWithRouter.map(feature => `...${feature}Providers`).join(',\n')}
    };

    export const container = createTypedContainer(dependencies);

    type Dependencies = typeof dependencies;
    type RequestScopedDependencies = Omit<Dependencies, 'req' | 'res' | 'session'> & {
      session: Resolver<Nullable<User>>;
      req: Resolver<Express['request']>;
      res: Resolver<Express['response']>;
    };

    export type Container = typeof container;
    export type RequestScopedContainer = TypedAwilixContainer<RequestScopedDependencies>;
  `;

  createFile(resolve(serverRoot, 'container.ts'), containerTemplate);
};

const createClientFeature = (name: string) => {};
const createSharedFeature = (name: string) => {};

export const feature = (name: string) => {
  // const __filename = fileURLToPath(import.meta.url);
  // const distPath = path.dirname(__filename);

  const featureExists = [
    resolve(serverRoot, 'features', name),
    resolve(clientRoot, 'features', name),
    resolve(sharedRoot, 'features', name)
  ].some(fs.existsSync);

  if (featureExists) {
    logger.error(`Feature ${name} already exists.`);
  }
  feature;
  createServerFeature(name);
  createClientFeature(name);
  createSharedFeature(name);
};
