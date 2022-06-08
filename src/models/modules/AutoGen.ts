/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.36.1070 on 2022-06-08 16:45:11.

/**
 * Structure containing search request parameters and filters
 */
export interface SearchRequest {
    /**
     * Plain text, space separated list of terms
     */
    termFilter: string;
    index: string;
    /**
     * List of entity status IRI's
     */
    statusFilter: string[];
    /**
     * List of entity type IRI's
     */
    typeFilter: string[];
    /**
     * List of code scheme IRI's
     */
    schemeFilter: string[];
    /**
     * Marks the results if they are descendants of any of these entities, but does not filter by them
     */
    markIfDescendentOf: string[];
    /**
     * List of IRIs that must be supertypes of the matches
     */
    isA: string[];
    /**
     * The search result page number to retrieve
     */
    page: number;
    /**
     * The number of results to retrieve per page
     */
    size: number;
    from: number;
    /**
     * list of fields or property paths from search result summary to return 
     */
    select: string[];
}

export interface SearchResponse {
    page: number;
    count: number;
    entities: SearchResultSummary[];
}

export interface Alias extends TTIriRef {
    alias: string;
}

export interface Argument {
    parameter: string;
    valueData: any;
    valueVariable: string;
    valueSelect: Select;
    valueProperty: ConceptRef;
}

export interface Compare {
    comparison: Comparison;
    valueData: string;
    valueVariable: string;
    valueSelect: string;
}

export interface ConceptRef extends Alias {
    includeSubtypes: boolean;
    includeSupertypes: boolean;
    includeValueSets: boolean;
}

export interface Function extends TTIriRef {
    argument: Argument[];
}

export interface Heading extends TTIriRef {
    description: string;
    var: string;
}

export interface Match extends Heading {
    subselect: Select;
    notExist: boolean;
    entityType: ConceptRef;
    entityId: ConceptRef;
    entityInSet: ConceptRef[];
    property: ConceptRef;
    isConcept: ConceptRef[];
    inRange: Range;
    value: Compare;
    function: Function;
    within: Within;
    match: Match;
    and: Match[];
    or: Match[];
    orderLimit: OrderLimit;
    optional: Match[];
    graph: TTIriRef;
    entityNotInSet: ConceptRef[];
    inSet: ConceptRef[];
    notInSet: ConceptRef[];
    isNotConcept: ConceptRef[];
    argument: Argument[];
    entityVar: string;
    inverseOf: boolean;
    index: boolean;
}

export interface OrderLimit {
    orderBy: Alias;
    direction: Order;
    count: number;
    test: Match[];
}

export interface PropertySelect extends TTIriRef {
    inverseOf: boolean;
    alias: string;
    function: Function;
    select: Select;
}

export interface Query extends Heading {
    mainEntity: TTIriRef;
    resultFormat: ResultFormat;
    activeOnly: boolean;
    referenceDate: string;
    select: Select;
    graph: TTIriRef;
    subselect: Select[];
    usePrefixes: boolean;
    page: number;
    pageSize: number;
}

export interface Range {
    from: Compare;
    to: Compare;
}

export interface Select {
    name: string;
    distinct: boolean;
    sum: boolean;
    average: boolean;
    max: boolean;
    entityType: ConceptRef;
    entityId: ConceptRef;
    entityIn: TTIriRef;
    property: PropertySelect[];
    match: Match;
    count: boolean;
    groupBy: PropertySelect[];
    orderLimit: OrderLimit;
}

export interface SetDocument {
    id: TTIriRef;
    profile: Query[];
    dataSet: Query[];
}

export interface SetFactory {
}

export interface Summariser {
}

export interface Within {
    range: Range;
    compare: Compare;
    of: string;
    function: Function;
    targetFilter: Match;
}

export interface SearchResultSummary {
    name: string;
    iri: string;
    code: string;
    description: string;
    status: TTIriRef;
    scheme: TTIriRef;
    entityType: TTIriRef[];
    weighting: number;
    match: string;
    key: string[];
    isA: TTIriRef[];
    termCode: SearchTermCode[];
}

export interface TTIriRef extends TTValue, Serializable {
    name: string;
    "@id": string;
}

export interface SearchTermCode {
    term: string;
    code: string;
    status: TTIriRef;
}

export interface TTValue extends Serializable {
    order: number;
}

export interface Serializable {
}

export type Comparison = "EQUAL" | "LESS_THAN" | "LESS_THAN_OR_EQUAL" | "GREATER_THAN" | "GREATER_THAN_OR_EQUAL" | "MEMBER_OF" | "NOT_EQUAL" | "STARTS_WITH" | "LIKE";

export type Operator = "AND" | "OR" | "NOT";

export type Order = "ASCENDING" | "DESCENDING";

export type ResultFormat = "OBJECT" | "RELATIONAL";
