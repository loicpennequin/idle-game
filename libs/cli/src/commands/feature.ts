import { PROJECT_ROOT } from '../constants';
import fs from 'fs-extra';
import { resolve } from 'path';
import { logger } from '../gui';
import dedent from 'dedent';
import _ from 'lodash-es';

const serverRoot = resolve(PROJECT_ROOT, 'apps/server/src');
const clientRoot = resolve(PROJECT_ROOT, 'apps/client/src');
const sharedRoot = resolve(PROJECT_ROOT, 'libs/shared/src');

const createServerFeature = (name: string) => {
  const capitalizedName = _.capitalize(name);

  const featureDir = resolve(serverRoot, 'features', name);
  fs.ensureDirSync(featureDir);

  const routerTemplate = dedent`
    import { contract } from '@daria/shared';
    import { initServer } from '@ts-rest/express';
    import { HTTP_STATUS_CODES, errorFactory } from '../../utils/errorFactory';

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
    import { UUID } from '@daria/shared';

    export type ${capitalizedName}Repository = {
      findAll(): Promise<E.Either<UnexpectedError, ${capitalizedName}[]>>;
      
    };

    export const ${name}userRepository = ({ prisma }: { prisma: PrismaClient }): ${capitalizedName}Repository => {
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

  fs.writeFileSync(resolve(featureDir, `${name}.router.ts`), routerTemplate);
  fs.writeFileSync(
    resolve(featureDir, `usecases/getAll${name}s.usecase.ts`),
    useCaseTemplate
  );
  fs.writeFileSync(resolve(featureDir, `${name}.repository.ts`), repositoryTemplate);
  fs.writeFileSync(resolve(featureDir, `${name}.entity.ts`), entityTemplate);
  fs.writeFileSync(resolve(featureDir, `${name}.mapper.ts`), mapperTemplate);
  fs.writeFileSync(resolve(featureDir, `${name}.providers.ts`), providersTemplate);
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
