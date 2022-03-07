import { MultipleQueriesQuery, SearchForFacetValuesResponse, SearchResponse } from '@algolia/client-search';
import { SearchClient } from 'algoliasearch/lite';
import { fetchAlgoliaResults } from '../search';
declare type Fetcher = typeof fetchAlgoliaResults;
declare type FacetHit = {
    label: string;
    count: number;
    _highlightResult: {
        label: {
            value: string;
        };
    };
};
export declare type FetcherParams = Pick<Parameters<Fetcher>[0], 'searchClient' | 'queries'>;
export declare type RequesterParams<THit> = {
    transformResponse(response: TransformResponseParams<THit>): TransformedRequesterResponse<THit>;
};
declare type TransformResponseParams<THit> = {
    results: Array<SearchResponse<THit> | SearchForFacetValuesResponse>;
    hits: Array<SearchResponse<THit>['hits']>;
    facetHits: FacetHit[][];
};
export declare type TransformedRequesterResponse<THit> = Array<SearchResponse<THit>['hits']> | SearchResponse<THit>['hits'] | FacetHit[][] | FacetHit[];
export declare type TransformResponse<THit> = (response: TransformResponseParams<THit>) => TransformedRequesterResponse<THit>;
declare type FetcherParamsQuery<THit> = {
    query: MultipleQueriesQuery;
    sourceId: string;
    transformResponse: TransformResponse<THit>;
};
declare type ExecuteParams<THit> = {
    searchClient: SearchClient;
    requests: Array<FetcherParamsQuery<THit>>;
};
export declare type Execute<THit> = (params: ExecuteParams<THit>) => Promise<ExecuteResponse<THit>>;
export declare type ExecuteResponse<THit> = Array<{
    items: SearchResponse<THit> | SearchForFacetValuesResponse;
    sourceId: string;
    transformResponse: TransformResponse<THit>;
}>;
export declare type RequestParams<THit> = FetcherParams & {
    /**
     * The function to transform the Algolia response before passing it to the Autocomplete state. You have access to the full Algolia results, as well as the pre-computed hits and facet hits.
     *
     * This is useful to manipulate the hits, or store data from the results in the [context](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/context/).
     */
    transformResponse?: TransformResponse<THit>;
};
export declare type RequesterDescription<THit> = {
    searchClient: SearchClient;
    queries: MultipleQueriesQuery[];
    transformResponse: TransformResponse<THit>;
    execute: Execute<THit>;
};
export declare function createRequester(fetcher: Fetcher): (requesterParams: RequesterParams<any>) => <TTHit>(requestParams: RequestParams<TTHit>) => RequesterDescription<TTHit>;
export {};
