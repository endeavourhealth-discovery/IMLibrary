import { AliasOptions } from 'vite';
import anchor from 'markdown-it-anchor';
import { BuildOptions } from 'vite';
import MarkdownIt from 'markdown-it';
import { Options } from '@vitejs/plugin-vue';
import { ServerOptions } from 'vite';
import { UserConfig as UserConfig_2 } from 'vite';
import { ViteDevServer } from 'vite';

export declare function build(root: string, buildOptions?: BuildOptions & {
    mpa?: string;
}): Promise<void>;

export declare const createMarkdownRenderer: (srcDir: string, options?: MarkdownOptions) => MarkdownRenderer;

export declare function createServer(root?: string, serverOptions?: ServerOptions): Promise<ViteDevServer>;

export declare namespace DefaultTheme {
    export interface Config {
        logo?: string
        nav?: NavItem[] | false
        sidebar?: SideBarConfig | MultiSideBarConfig

        /**
         * GitHub repository following the format <user>/<project>.
         *
         * @example `"vuejs/vue-next"`
         */
        repo?: string

        /**
         * Customize the header label. Defaults to GitHub/Gitlab/Bitbucket
         * depending on the provided repo.
         *
         * @example `"Contribute!"`
         */
        repoLabel?: string

        /**
         * If your docs are in a different repository from your main project.
         *
         * @example `"vuejs/docs-next"`
         */
        docsRepo?: string

        /**
         * If your docs are not at the root of the repo.
         *
         * @example `"docs"`
         */
        docsDir?: string

        /**
         * If your docs are in a different branch. Defaults to `master`.
         *
         * @example `"next"`
         */
        docsBranch?: string

        /**
         * Enable links to edit pages at the bottom of the page.
         */
        editLinks?: boolean

        /**
         * Custom text for edit link. Defaults to "Edit this page".
         */
        editLinkText?: string

        /**
         * Show last updated time at the bottom of the page. Defaults to `false`.
         * If given a string, it will be displayed as a prefix (default value:
         * "Last Updated").
         */
        lastUpdated?: string | boolean

        prevLinks?: boolean
        nextLinks?: boolean

        locales?: Record<string, LocaleConfig & Omit<Config, 'locales'>>

        algolia?: AlgoliaSearchOptions

        carbonAds?: {
            carbon: string
            custom?: string
            placement: string
        }
    }

    // navbar --------------------------------------------------------------------

    export type NavItem = NavItemWithLink | NavItemWithChildren

    export interface NavItemBase {
        text: string
        target?: string
        rel?: string
        ariaLabel?: string
        activeMatch?: string
    }

    export interface NavItemWithLink extends NavItemBase {
        link: string
    }

    export interface NavItemWithChildren extends NavItemBase {
        items: NavItemWithLink[]
    }

    // sidebar -------------------------------------------------------------------

    export type SideBarConfig = SideBarItem[] | 'auto' | false

    export interface MultiSideBarConfig {
        [path: string]: SideBarConfig
    }

    export type SideBarItem = SideBarLink | SideBarGroup

    export interface SideBarLink {
        text: string
        link: string
    }

    export interface SideBarGroup {
        text: string
        link?: string

        /**
         * @default false
         */
        collapsable?: boolean

        children: SideBarItem[]
    }

    // algolia  ------------------------------------------------------------------
    // partially copied from @docsearch/react/dist/esm/DocSearch.d.ts
    export interface AlgoliaSearchOptions {
        appId?: string
        apiKey: string
        indexName: string
        placeholder?: string
        searchParameters?: any
        disableUserPersonalization?: boolean
        initialQuery?: string
    }

    // locales -------------------------------------------------------------------

    export interface LocaleConfig {
        /**
         * Text for the language dropdown.
         */
        selectText?: string

        /**
         * Label for this locale in the language dropdown.
         */
        label?: string
    }
}

/**
 * Type config helper
 */
export declare function defineConfig(config: UserConfig<DefaultTheme.Config>): UserConfig<DefaultTheme.Config>;

/**
 * Type config helper for custom theme config
 */
export declare function defineConfigWithTheme<ThemeConfig>(config: UserConfig<ThemeConfig>): UserConfig<ThemeConfig>;

export declare type HeadConfig =
| [string, Record<string, string>]
| [string, Record<string, string>, string]

export declare interface Header {
    level: number
    title: string
    slug: string
}

export declare interface LocaleConfig {
    lang: string
    title?: string
    description?: string
    head?: HeadConfig[]
    label?: string
    selectText?: string
}

export declare interface MarkdownOptions extends MarkdownIt.Options {
    lineNumbers?: boolean;
    config?: (md: MarkdownIt) => void;
    anchor?: {
        permalink?: anchor.AnchorOptions['permalink'];
    };
    attrs?: {
        leftDelimiter?: string;
        rightDelimiter?: string;
        allowedAttributes?: string[];
    };
    toc?: any;
    externalLinks?: Record<string, string>;
}

export declare interface MarkdownParsedData {
    hoistedTags?: string[];
    links?: string[];
    headers?: Header[];
}

export declare interface MarkdownRenderer extends MarkdownIt {
    __path: string;
    __relativePath: string;
    __data: MarkdownParsedData;
}

export declare type RawConfigExports<ThemeConfig = any> = UserConfig<ThemeConfig> | Promise<UserConfig<ThemeConfig>> | (() => UserConfig<ThemeConfig> | Promise<UserConfig<ThemeConfig>>);

export declare function resolveConfig(root?: string, command?: 'serve' | 'build', mode?: string): Promise<SiteConfig>;

export declare function resolveSiteData(root: string, userConfig?: UserConfig, command?: 'serve' | 'build', mode?: string): Promise<SiteData>;

export declare function resolveSiteDataByRoute(siteData: SiteData, route: string): SiteData;

export declare function serve(options?: ServeOptions): Promise<void>;

export declare interface ServeOptions {
    root?: string;
    port?: number;
}

export declare interface SiteConfig<ThemeConfig = any> extends Pick<UserConfig, 'markdown' | 'vue' | 'vite' | 'shouldPreload' | 'mpa'> {
    root: string;
    srcDir: string;
    site: SiteData<ThemeConfig>;
    configPath: string | undefined;
    themeDir: string;
    outDir: string;
    tempDir: string;
    alias: AliasOptions;
    pages: string[];
}

export declare interface SiteData<ThemeConfig = any> {
    base: string
    /**
     * Language of the site as it should be set on the `html` element.
     * @example `en-US`, `zh-CN`
     */
    lang: string
    title: string
    description: string
    head: HeadConfig[]
    themeConfig: ThemeConfig
    scrollOffset: number | string
    locales: Record<string, LocaleConfig>
    /**
     * Available locales for the site when it has defined `locales` in its
     * `themeConfig`. This object is otherwise empty. Keys are paths like `/` or
     * `/zh/`.
     */
    langs: Record<
    string,
        {
        /**
         * Lang attribute as set on the `<html>` element.
         * @example `en-US`, `zh-CN`
         */
        lang: string
        /**
         * Label to display in the language menu.
         * @example `English`, `简体中文`
         */
        label: string
    }
    >
}

export declare interface UserConfig<ThemeConfig = any> {
    extends?: RawConfigExports<ThemeConfig>;
    lang?: string;
    base?: string;
    title?: string;
    description?: string;
    head?: HeadConfig[];
    themeConfig?: ThemeConfig;
    locales?: Record<string, LocaleConfig>;
    markdown?: MarkdownOptions;
    /**
     * Options to pass on to `@vitejs/plugin-vue`
     */
    vue?: Options;
    /**
     * Vite config
     */
    vite?: UserConfig_2;
    srcDir?: string;
    srcExclude?: string[];
    outDir?: string;
    shouldPreload?: (link: string, page: string) => boolean;
    /**
     * Configure the scroll offset when the theme has a sticky header.
     * Can be a number or a selector element to get the offset from.
     */
    scrollOffset?: number | string;
    /**
     * Enable MPA / zero-JS mode
     * @experimental
     */
    mpa?: boolean;
}

export { }
