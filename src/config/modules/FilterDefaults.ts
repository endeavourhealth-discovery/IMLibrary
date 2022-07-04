import { SortDirection } from "../../models/modules/Search";
import { IM, RDF, RDFS } from "../../vocabulary/Vocabulary";

const FILTER_DEFAULTS = {
  schemeOptions: [IM.NAMESPACE, IM.DOMAIN + "sct#"],
  statusOptions: [IM.ACTIVE, IM.DRAFT],
  typeOptions: [IM.CONCEPT, IM.VALUE_SET, IM.CONCEPT_SET, IM.DATAMODEL_ENTITY, IM.DATAMODEL_PROPERTY, IM.QUERY, RDFS.CLASS, RDF.PROPERTY],
  sortFields: [{ label: "Usage", value: "weighting" }],
  sortDirections: [
    { label: "Descending", value: SortDirection.DESC },
    { label: "Ascending", value: SortDirection.ASC }
  ]
};

export default { ...FILTER_DEFAULTS };
