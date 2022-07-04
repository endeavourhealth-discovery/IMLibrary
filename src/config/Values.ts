import { SortDirection } from "../models/modules/Search";

export class Values {
  // Text definition exclusion list
  public static TEXT_DEFINITION_EXCLUDE_PREDICATES = ["http://www.w3.org/ns/shacl#property"] as string[];

  // Default filters for search
  public static FILTER_DEFAULTS = {
    schemeOptions: ["http://endhealth.info/im#", "http://snomed.info/sct#"],
    statusOptions: ["http://endhealth.info/im#Active", "http://endhealth.info/im#Draft"],
    typeOptions: [
      "http://endhealth.info/im#Concept",
      "http://endhealth.info/im#ValueSet",
      "http://endhealth.info/im#ConceptSet",
      "http://endhealth.info/im#DataModelEntity",
      "http://endhealth.info/im#dataModelProperty",
      "http://endhealth.info/im#Query"
    ],
    sortFields: [{ label: "Usage", value: "weighting" }],
    sortDirections: [
      { label: "Descending", value: SortDirection.DESC },
      { label: "Ascending", value: SortDirection.ASC }
    ]
  };

  // Graph predicate exclusion list
  public static GRAPH_EXCLUDE_PREDICATES = [
    "http://endhealth.info/im#matchedTo",
    "http://endhealth.info/im#query",
    "http://endhealth.info/im#select",
    "http://www.w3.org/2000/01/rdf-schema#label",
    "http://endhealth.info/im#status",
    "http://endhealth.info/im#Status",
    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
    "http://www.w3.org/2000/01/rdf-schema#comment",
    "http://endhealth.info/im#isChildOf",
    "http://endhealth.info/im#hasChildren",
    "http://endhealth.info/im#definition",
    "http://endhealth.info/im#usageStats",
    "http://endhealth.info/im#isA"
  ];

  // Default predicate names - Predicate name overrides for display purposes
  public static DEFAULT_PREDICATE_NAMES = {
    "http://www.w3.org/2000/01/rdf-schema#subClassOf": "Is subclass of",
    "http://www.w3.org/2000/01/rdf-schema#label": "Name",
    "http://endhealth.info/im#roleGroup": "Where",
    "http://www.w3.org/2002/07/owl#equivalentClass": "Is equivalent to",
    "http://www.w3.org/2002/07/owl#intersectionOf": "Combination of",
    "http://www.w3.org/2002/07/owl#someValuesFrom": "With a value",
    "http://www.w3.org/2002/07/owl#onProperty": "On property",
    "http://www.w3.org/ns/shacl#class": "Type",
    "http://www.w3.org/ns/shacl#path": "Property",
    "http://www.w3.org/ns/shacl#datatype": "Type"
  };

  // XML Schema datatypes
  public static XML_SCHEMA_DATATYPES = [
    "http://www.w3.org/2001/XMLSchema#string",
    "http://www.w3.org/2001/XMLSchema#boolean",
    "http://www.w3.org/2001/XMLSchema#float",
    "http://www.w3.org/2001/XMLSchema#double",
    "http://www.w3.org/2001/XMLSchema#decimal",
    "http://www.w3.org/2001/XMLSchema#dateTime",
    "http://www.w3.org/2001/XMLSchema#duration",
    "http://www.w3.org/2001/XMLSchema#hexBinary",
    "http://www.w3.org/2001/XMLSchema#base64Binary",
    "http://www.w3.org/2001/XMLSchema#anyURI",
    "http://www.w3.org/2001/XMLSchema#ID",
    "http://www.w3.org/2001/XMLSchema#IDREF",
    "http://www.w3.org/2001/XMLSchema#ENTITY",
    "http://www.w3.org/2001/XMLSchema#NOTATION",
    "http://www.w3.org/2001/XMLSchema#normalizedString",
    "http://www.w3.org/2001/XMLSchema#token",
    "http://www.w3.org/2001/XMLSchema#language",
    "http://www.w3.org/2001/XMLSchema#IDREFS",
    "http://www.w3.org/2001/XMLSchema#ENTITIES",
    "http://www.w3.org/2001/XMLSchema#NMTOKEN",
    "http://www.w3.org/2001/XMLSchema#NMTOKENS",
    "http://www.w3.org/2001/XMLSchema#Name",
    "http://www.w3.org/2001/XMLSchema#QName",
    "http://www.w3.org/2001/XMLSchema#NCName",
    "http://www.w3.org/2001/XMLSchema#integer",
    "http://www.w3.org/2001/XMLSchema#nonNegativeInteger",
    "http://www.w3.org/2001/XMLSchema#positiveInteger",
    "http://www.w3.org/2001/XMLSchema#nonPositiveInteger",
    "http://www.w3.org/2001/XMLSchema#negativeInteger",
    "http://www.w3.org/2001/XMLSchema#byte",
    "http://www.w3.org/2001/XMLSchema#int",
    "http://www.w3.org/2001/XMLSchema#long",
    "http://www.w3.org/2001/XMLSchema#short",
    "http://www.w3.org/2001/XMLSchema#unsignedByte",
    "http://www.w3.org/2001/XMLSchema#unsignedInt",
    "http://www.w3.org/2001/XMLSchema#unsignedLong",
    "http://www.w3.org/2001/XMLSchema#unsignedShort",
    "http://www.w3.org/2001/XMLSchema#date",
    "http://www.w3.org/2001/XMLSchema#time",
    "http://www.w3.org/2001/XMLSchema#gYearMonth",
    "http://www.w3.org/2001/XMLSchema#gYear",
    "http://www.w3.org/2001/XMLSchema#gMonthDay",
    "http://www.w3.org/2001/XMLSchema#gDay",
    "http://www.w3.org/2001/XMLSchema#gMonth"
  ];
}
