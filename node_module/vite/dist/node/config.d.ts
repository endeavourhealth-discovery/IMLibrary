import type { Plugin } from './plugin';
import type { BuildOptions } from './build';
import type { ResolvedServerOptions, ServerOptions } from './server';
import type { ResolvedPreviewOptions, PreviewOptions } from './preview';
import type { CSSOptions } from './plugins/css';
import type { ESBuildOptions } from './plugins/esbuild';
import type { Alias, AliasOptions } from 'types/alias';
import type { InternalResolveOptions, ResolveOptions } from './plugins/resolve';
import type { Logger, LogLevel } from './logger';
import type { DepOptimizationOptions } from './optimizer';
import type { ResolvedBuildOptions } from '.';
import type { JsonOptions } from './plugins/json';
import type { PackageCache } from './packages';
export interface ConfigEnv {
    command: 'build' | 'serve';
    mode: string;
}
export declare type UserConfigFn = (env: ConfigEnv) => UserConfig | Promise<UserConfig>;
export declare type UserConfigExport = UserConfig | Promise<UserConfig> | UserConfigFn;
/**
 * Type helper to make it easier to use vite.config.ts
 * accepts a direct {@link UserConfig} object, or a function that returns it.
 * The function receives a {@link ConfigEnv} object that exposes two properties:
 * `command` (either `'build'` or `'serve'`), and `mode`.
 */
export declare function defineConfig(config: UserConfigExport): UserConfigExport;
export declare type PluginOption = Plugin | false | null | undefined;
export interface UserConfig {
    /**
     * Project root directory. Can be an absolute path, or a path relative from
     * the location of the config file itself.
     * @default process.cwd()
     */
    root?: string;
    /**
     * Base public path when served in development or production.
     * @default '/'
     */
    base?: string;
    /**
     * Directory to serve as plain static assets. Files in this directory are
     * served and copied to build dist dir as-is without transform. The value
     * can be either an absolute file system path or a path relative to <root>.
     *
     * Set to `false` or an empty string to disable copied static assets to build dist dir.
     * @default 'public'
     */
    publicDir?: string | false;
    /**
     * Directory to save cache files. Files in this directory are pre-bundled
     * deps or some other cache files that generated by vite, which can improve
     * the performance. You can use `--force` flag or manually delete the directory
     * to regenerate the cache files. The value can be either an absolute file
     * system path or a path relative to <root>.
     * @default 'node_modules/.vite'
     */
    cacheDir?: string;
    /**
     * Explicitly set a mode to run in. This will override the default mode for
     * each command, and can be overridden by the command line --mode option.
     */
    mode?: string;
    /**
     * Define global variable replacements.
     * Entries will be defined on `window` during dev and replaced during build.
     */
    define?: Record<string, any>;
    /**
     * Array of vite plugins to use.
     */
    plugins?: (PluginOption | PluginOption[])[];
    /**
     * Configure resolver
     */
    resolve?: ResolveOptions & {
        alias?: AliasOptions;
    };
    /**
     * CSS related options (preprocessors and CSS modules)
     */
    css?: CSSOptions;
    /**
     * JSON loading options
     */
    json?: JsonOptions;
    /**
     * Transform options to pass to esbuild.
     * Or set to `false` to disable esbuild.
     */
    esbuild?: ESBuildOptions | false;
    /**
     * Specify additional picomatch patterns to be treated as static assets.
     */
    assetsInclude?: string | RegExp | (string | RegExp)[];
    /**
     * Server specific options, e.g. host, port, https...
     */
    server?: ServerOptions;
    /**
     * Build specific options
     */
    build?: BuildOptions;
    /**
     * Preview specific options, e.g. host, port, https...
     */
    preview?: PreviewOptions;
    /**
     * Dep optimization options
     */
    optimizeDeps?: DepOptimizationOptions;
    /**
     * SSR specific options
     * @alpha
     */
    ssr?: SSROptions;
    /**
     * Log level.
     * Default: 'info'
     */
    logLevel?: LogLevel;
    /**
     * Custom logger.
     */
    customLogger?: Logger;
    /**
     * Default: true
     */
    clearScreen?: boolean;
    /**
     * Environment files directory. Can be an absolute path, or a path relative from
     * the location of the config file itself.
     * @default root
     */
    envDir?: string;
    /**
     * Env variables starts with `envPrefix` will be exposed to your client source code via import.meta.env.
     * @default 'VITE_'
     */
    envPrefix?: string | string[];
    /**
     * Import aliases
     * @deprecated use `resolve.alias` instead
     */
    alias?: AliasOptions;
    /**
     * Force Vite to always resolve listed dependencies to the same copy (from
     * project root).
     * @deprecated use `resolve.dedupe` instead
     */
    dedupe?: string[];
}
export declare type SSRTarget = 'node' | 'webworker';
export interface SSROptions {
    external?: string[];
    noExternal?: string | RegExp | (string | RegExp)[] | true;
    /**
     * Define the target for the ssr build. The browser field in package.json
     * is ignored for node but used if webworker is the target
     * Default: 'node'
     */
    target?: SSRTarget;
}
export interface InlineConfig extends UserConfig {
    configFile?: string | false;
    envFile?: false;
}
export declare type ResolvedConfig = Readonly<Omit<UserConfig, 'plugins' | 'alias' | 'dedupe' | 'assetsInclude' | 'optimizeDeps'> & {
    configFile: string | undefined;
    configFileDependencies: string[];
    inlineConfig: InlineConfig;
    root: string;
    base: string;
    publicDir: string;
    command: 'build' | 'serve';
    mode: string;
    isProduction: boolean;
    env: Record<string, any>;
    resolve: ResolveOptions & {
        alias: Alias[];
    };
    plugins: readonly Plugin[];
    server: ResolvedServerOptions;
    build: ResolvedBuildOptions;
    preview: ResolvedPreviewOptions;
    assetsInclude: (file: string) => boolean;
    logger: Logger;
    createResolver: (options?: Partial<InternalResolveOptions>) => ResolveFn;
    optimizeDeps: Omit<DepOptimizationOptions, 'keepNames'>;
    /** @internal */
    packageCache: PackageCache;
}>;
export declare type ResolveFn = (id: string, importer?: string, aliasOnly?: boolean, ssr?: boolean) => Promise<string | undefined>;
export declare function resolveConfig(inlineConfig: InlineConfig, command: 'build' | 'serve', defaultMode?: string): Promise<ResolvedConfig>;
export declare function mergeConfig(defaults: Record<string, any>, overrides: Record<string, any>, isRoot?: boolean): Record<string, any>;
export declare function sortUserPlugins(plugins: (Plugin | Plugin[])[] | undefined): [Plugin[], Plugin[], Plugin[]];
export declare function loadConfigFromFile(configEnv: ConfigEnv, configFile?: string, configRoot?: string, logLevel?: LogLevel): Promise<{
    path: string;
    config: UserConfig;
    dependencies: string[];
} | null>;
export declare function loadEnv(mode: string, envDir: string, prefixes?: string | string[]): Record<string, string>;
export declare function resolveEnvPrefix({ envPrefix }: UserConfig): string[];
