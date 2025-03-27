# Custom GraphQL query

## Purpose

- Allow us to write custom GraphQL query rather than auto generated ones by AppSync
- Take advantage of graphql-codegen tool for type/hooks/mocks generation
- Custom query can be put in feature module, so it's easier to maintain

## How to use

- Create a folder named `graphql-documents` in your feature module
- Create a file named `*.graphql` in `graphql-documents` folder. E.g: `queries.graphql`, or `transactions.graphql`, `whatever-scope.graphql`
- Write our custom query in `*.graphql` file
- Export your github token in `GITHUB_TOKEN` environment variable

  ```shell
    export GITHUB_TOKEN=<your-github-token>
  ```

- Run `yarn graphql-codegen` to generate type/hooks/mocks
- Generated query hooks and mock for mock server are put into `graphql-documents/*.generated.ts`
- Types are still in `src/graphql/generated.ts` to avoid duplication

## Query convention

Use `@graphql-eslint/eslint-plugin` to force convention

## How it works

[graphql-codegen.custom-query.yml](../graphql-codegen.custom-query.yml) is introduced

- Scan `src/**/graphql-documents/*.graphql`
- Generate hooks and mock for mock server and put them into a file in the same directory.
