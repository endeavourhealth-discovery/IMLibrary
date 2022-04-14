<template>
  <ProfileDisplay theme="light" :modelValue="data" :activeProfile="active"/>
</template>
<script>
import ProfileDisplay from "../../../../src/components/modules/ProfileDisplay.vue";
import {Profile} from "../../../../src/models/modules/Query";
export default {
  components: {ProfileDisplay},
  data() {
    return {
      data: new Profile({
        "@id": "urn:uuid:6d517466-813b-46a8-b848-aaf5a4fbdcbf",
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [
          {
            "@id": "http://endhealth.info/im#Query",
            "name": "Query definition"
          }
        ],
        "http://www.w3.org/2000/01/rdf-schema#label": "SMI Population",
        "http://www.w3.org/2000/01/rdf-schema#comment": "Adults 18+ with SMI",
        "http://endhealth.info/im#definition": "{\"id\":{\"@id\":\"urn:uuid:6d517466-813b-46a8-b848-aaf5a4fbdcbf\"},\"name\":\"SMI Population\",\"entityType\":{\"@id\":\"http://endhealth.info/im#Person\"},\"and\":[{\"name\":\"Registered with GP for GMS services on the reference date\",\"property\":{\"@id\":\"http://endhealth.info/im#inResultSet\"},\"valueIn\":[{\"name\":\"Registered with GP for GMS services on the reference date\",\"@id\":\"http://endhealth.info/im#Q_RegisteredGMS\"}],\"id\":{\"@id\":\"urn:uuid:7ce6ae41-2411-4770-9638-e52fee05994c\"}},{\"id\":{\"@id\":\"urn:uuid:cebe3297-5f54-4556-81f0-0ca14f27922e\"},\"and\":[{\"pathTo\":{\"@id\":\"http://endhealth.info/im#isSubjectOf\"},\"entityType\":{\"@id\":\"http://endhealth.info/im#PersonDetails\"},\"property\":{\"@id\":\"http://endhealth.info/im#age\"},\"valueCompare\":{\"comparison\":\"GREATER_THAN_OR_EQUAL\",\"valueData\":\"18\"},\"valueFunction\":{\"id\":{\"@id\":\"http://endhealth.info/im#AgeFunction\"},\"argument\":[{\"parameter\":\"units\",\"value\":\"YEAR\"}]},\"valueVar\":\"age1\"},{\"pathTo\":{\"@id\":\"http://endhealth.info/im#isSubjectOf\"},\"entityType\":{\"@id\":\"http://endhealth.info/im#GPRegistration\"},\"property\":{\"@id\":\"http://endhealth.info/im#patientType\"},\"valueIn\":[{\"name\":\"Regular GMS patient\",\"@id\":\"http://endhealth.info/im#2751000252106\"}],\"valueVar\":\"patientType2\"}]},{\"pathTo\":{\"@id\":\"http://endhealth.info/im#isSubjectOf\"},\"entityType\":{\"@id\":\"http://endhealth.info/im#Event\"},\"sort\":{\"orderBy\":{\"@id\":\"http://endhealth.info/im#effectiveDate\"},\"count\":1,\"direction\":\"DESCENDING\"},\"test\":{\"property\":{\"@id\":\"http://endhealth.info/im#concept\"},\"valueIn\":[{\"@id\":\"urn:uuid:8ab86afb-94e0-45fc-9875-3d16705cf41c\"}],\"valueVar\":\"concept5\"},\"id\":{\"@id\":\"urn:uuid:36817d95-6552-43f1-9c7a-85c46b1a77b5\"},\"and\":[{\"property\":{\"@id\":\"http://endhealth.info/im#concept\"},\"valueIn\":[{\"@id\":\"urn:uuid:837c474c-f6af-4a05-83ad-7c4ee7557e11\"},{\"@id\":\"urn:uuid:8ab86afb-94e0-45fc-9875-3d16705cf41c\"}],\"valueVar\":\"concept3\"},{\"property\":{\"@id\":\"http://endhealth.info/im#effectiveDate\"},\"valueVar\":\"effectiveDate4\"}]}]}",
        "subtypes": [],
        "termCodes": [],
        "inferred": {
          "entity": {
            "http://endhealth.info/im#definition": "{\"id\":{\"@id\":\"urn:uuid:6d517466-813b-46a8-b848-aaf5a4fbdcbf\"},\"name\":\"SMI Population\",\"entityType\":{\"@id\":\"http://endhealth.info/im#Person\"},\"and\":[{\"name\":\"Registered with GP for GMS services on the reference date\",\"property\":{\"@id\":\"http://endhealth.info/im#inResultSet\"},\"valueIn\":[{\"name\":\"Registered with GP for GMS services on the reference date\",\"@id\":\"http://endhealth.info/im#Q_RegisteredGMS\"}],\"id\":{\"@id\":\"urn:uuid:7ce6ae41-2411-4770-9638-e52fee05994c\"}},{\"id\":{\"@id\":\"urn:uuid:cebe3297-5f54-4556-81f0-0ca14f27922e\"},\"and\":[{\"pathTo\":{\"@id\":\"http://endhealth.info/im#isSubjectOf\"},\"entityType\":{\"@id\":\"http://endhealth.info/im#PersonDetails\"},\"property\":{\"@id\":\"http://endhealth.info/im#age\"},\"valueCompare\":{\"comparison\":\"GREATER_THAN_OR_EQUAL\",\"valueData\":\"18\"},\"valueFunction\":{\"id\":{\"@id\":\"http://endhealth.info/im#AgeFunction\"},\"argument\":[{\"parameter\":\"units\",\"value\":\"YEAR\"}]},\"valueVar\":\"age1\"},{\"pathTo\":{\"@id\":\"http://endhealth.info/im#isSubjectOf\"},\"entityType\":{\"@id\":\"http://endhealth.info/im#GPRegistration\"},\"property\":{\"@id\":\"http://endhealth.info/im#patientType\"},\"valueIn\":[{\"name\":\"Regular GMS patient\",\"@id\":\"http://endhealth.info/im#2751000252106\"}],\"valueVar\":\"patientType2\"}]},{\"pathTo\":{\"@id\":\"http://endhealth.info/im#isSubjectOf\"},\"entityType\":{\"@id\":\"http://endhealth.info/im#Event\"},\"sort\":{\"orderBy\":{\"@id\":\"http://endhealth.info/im#effectiveDate\"},\"count\":1,\"direction\":\"DESCENDING\"},\"test\":{\"property\":{\"@id\":\"http://endhealth.info/im#concept\"},\"valueIn\":[{\"@id\":\"urn:uuid:8ab86afb-94e0-45fc-9875-3d16705cf41c\"}],\"valueVar\":\"concept5\"},\"id\":{\"@id\":\"urn:uuid:36817d95-6552-43f1-9c7a-85c46b1a77b5\"},\"and\":[{\"property\":{\"@id\":\"http://endhealth.info/im#concept\"},\"valueIn\":[{\"@id\":\"urn:uuid:837c474c-f6af-4a05-83ad-7c4ee7557e11\"},{\"@id\":\"urn:uuid:8ab86afb-94e0-45fc-9875-3d16705cf41c\"}],\"valueVar\":\"concept3\"},{\"property\":{\"@id\":\"http://endhealth.info/im#effectiveDate\"},\"valueVar\":\"effectiveDate4\"}]}]}"
          },
          "predicates": {
            "http://endhealth.info/im#definition": "definition",
            "http://www.w3.org/2000/01/rdf-schema#subClassOf": "Is subclass of",
            "http://endhealth.info/im#roleGroup": "Where",
            "http://www.w3.org/2002/07/owl#equivalentClass": "Is equivalent to",
            "http://www.w3.org/2002/07/owl#intersectionOf": "Combination of",
            "http://www.w3.org/2002/07/owl#someValuesFrom": "With a value",
            "http://www.w3.org/2002/07/owl#onProperty": "On property",
            "http://www.w3.org/ns/shacl#property": "Properties",
            "http://www.w3.org/ns/shacl#class": "Type",
            "http://www.w3.org/ns/shacl#path": "Property",
            "http://www.w3.org/ns/shacl#datatype": "Type"
          }
        }
      }),
      active: {
        get() { return {};},
        set(value) {}
      }
    };
  }
};
</script>
