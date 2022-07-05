import { SHACL } from "../../vocabulary/Vocabulary";

const TEXT_DEFINITION_EXCLUDE_PREDICATES = [SHACL.PROPERTY] as string[];

export default [...TEXT_DEFINITION_EXCLUDE_PREDICATES];
