declare module 'node-java-maven' {
  type callback = (
    err: Error | null,
    mvnResults: {
      classpath: string[];
      dependencies: {
        [package: string]: {
          reason: string;
          groupId?: string;
          artifactId?: string;
          classifier: string | undefined;
          version?: string;
          scope: 'compile' | string;
          optional: boolean;
          state:
            | 'waitUntilComplete'
            | 'resolvePom'
            | 'processJar'
            | 'processParents'
            | 'processChildDependencies';
          pomUrl?: string;
          pomPath: string;
          pomXml: {
            project?: {
              $?: {
                xmlns?: string | unknown;
                'xmlns:xsi'?: string | unknown;
                'xsi:schemaLocation'?: string | unknown;
                [key: string]: unknown;
              };
              modelVersion?: string[] | unknown;
              groupId?: string[] | unknown;
              artifactId?: string[] | unknown;
              packaging?: string[] | unknown;
              version?: string[] | unknown;
              name?: string[] | unknown;
              url?: string[] | unknown;
              inceptionYear?: string[] | unknown;
              organization?: Record<string, unknown>[] | unknown;
              description?: string[] | unknown;
              parent?: Record<string, unknown>[] | unknown;
              licenses?: Record<string, unknown>[] | unknown;
              developers?: Record<string, unknown>[] | unknown;
              issueManagement?: Record<string, unknown>[] | unknown;
              scm?: Record<string, unknown>[] | unknown;
              properties?: Record<string, unknown>[] | unknown;
              dependencies?: Record<string, unknown>[] | unknown;
              build?: Record<string, unknown>[] | unknown;
              profiles?: Record<string, unknown>[] | unknown;
              [key: string]: unknown;
            };
            [key: string]: unknown;
          };
          complete: boolean;
          jarUrl?: string;
          jarPath?: string;
        };
      };
    }
  ) => unknown;

  function DefaultFunction(callback: callback): void;
  function DefaultFunction(
    options: {
      packageJsonPath: string;
      repositories: Array<{id: string; url: string}>;
      localRepository: string;
      concurrency: number;
      debug: boolean;
      [key: string]: unknown;
    },
    callback: callback
  ): void;
  export = DefaultFunction;
}
