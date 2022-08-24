import { IM } from "../../vocabulary/IM";
import { SHACL } from "../../vocabulary/SHACL";
import { RDFS } from "../../vocabulary/RDFS";
import { RDF } from "../../vocabulary/RDF";

const ENTITY_TYPES = [IM.CONCEPT, IM.VALUE_SET, IM.CONCEPT_SET, SHACL.NODESHAPE, IM.DATAMODEL_PROPERTY, IM.QUERY, RDFS.CLASS, RDF.PROPERTY, IM.FOLDER];

export default [...ENTITY_TYPES];
