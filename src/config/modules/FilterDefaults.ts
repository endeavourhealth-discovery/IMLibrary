import { SortDirection } from "../../enums/modules/SortDirection";
import { IM, RDF, RDFS, SHACL } from "../../vocabulary/Vocabulary";

const FILTER_DEFAULTS = {
  schemeOptions: [IM.NAMESPACE, "http://snomed.info/sct#"],
  statusOptions: [IM.ACTIVE, IM.DRAFT],
  typeOptions: [IM.CONCEPT, IM.VALUE_SET, IM.CONCEPT_SET, SHACL.NODESHAPE, IM.DATAMODEL_PROPERTY, IM.QUERY, RDFS.CLASS, RDF.PROPERTY],
  sortFields: [{ label: "Usage", value: "weighting" }],
  sortDirections: [
    { label: "Descending", value: SortDirection.DESC },
    { label: "Ascending", value: SortDirection.ASC }
  ]
};

export default { ...FILTER_DEFAULTS };
