<template>
  <TextDefinition :data="data" label="Definition" size="100%" :show="true" id="demo-text-with-label" />
</template>
<script>
export default {
  data() {
    return {
      data: {
        entity: {
          "http://www.w3.org/2000/01/rdf-schema#subClassOf": [
            { "@id": "http://snomed.info/sct#41969006", name: "Idiopathic disease (disorder)" },
            { "@id": "http://snomed.info/sct#298382003", name: "Scoliosis deformity of spine (disorder)" },
            {
              "http://endhealth.info/im#roleGroup": [
                {
                  "http://snomed.info/sct#116676008": [
                    { "@id": "http://snomed.info/sct#31739005", name: "Lateral abnormal curvature (morphologic abnormality)" }
                  ],
                  "http://snomed.info/sct#363698007": [
                    { "@id": "http://snomed.info/sct#289959001", name: "Musculoskeletal structure of spine (body structure)" }
                  ]
                }
              ]
            }
          ],
          "http://endhealth.info/im#scheme": [{ "@id": "http://snomed.info/sct#", name: "Snomed-CT code scheme and graph" }],
          "http://endhealth.info/im#hasMap": [
            {
              "http://endhealth.info/im#someOf": [
                {
                  "http://endhealth.info/im#mapAdvice": "ALWAYS M41.2",
                  "http://endhealth.info/im#mapPriority": "1",
                  "http://endhealth.info/im#mappedTo": [{ "@id": "http://endhealth.info/icd10#M412", name: "Other idiopathic scoliosis" }],
                  "http://endhealth.info/im#assuranceLevel": [{ "@id": "http://endhealth.info/im#NationallyAssuredUK", name: "Nationally assured UK level" }]
                }
              ]
            }
          ],
          "http://endhealth.info/im#1261000252108": [{ "@id": "http://endhealth.info/im#1251000252106", name: "Necessary and sufficient" }],
          "http://endhealth.info/im#hasTermCode": [
            {
              "http://www.w3.org/2000/01/rdf-schema#label": "Idiopathic scoliosis",
              "http://endhealth.info/im#status": [{ "@id": "http://endhealth.info/im#Active", name: "Active" }],
              "http://endhealth.info/im#code": "312420013"
            },
            {
              "http://www.w3.org/2000/01/rdf-schema#label": "Idiopathic scoliosis (disorder)",
              "http://endhealth.info/im#status": [{ "@id": "http://endhealth.info/im#Active", name: "Active" }],
              "http://endhealth.info/im#code": "588768010"
            }
          ]
        },
        predicates: {
          "http://snomed.info/sct#33308003": "Disorder of back (disorder)",
          "http://endhealth.info/im#code": "code",
          "http://snomed.info/sct#928000": "Disorder of musculoskeletal system (disorder)",
          "http://snomed.info/sct#64217002": "Curvature of spine (disorder)",
          "http://snomed.info/sct#123946008": "Disorder by body site (disorder)",
          "http://endhealth.info/im#mapAdvice": "mapping advice",
          "http://endhealth.info/im#hasMap": "has map",
          "http://snomed.info/sct#417893002": "Deformity (finding)",
          "http://endhealth.info/im#isA": "is a",
          "http://endhealth.info/im#groupNumber": "group Number",
          "http://snomed.info/sct#699699005": "Disorder of vertebral column (disorder)",
          "http://endhealth.info/im#1251000252106": "Necessary and sufficient",
          "http://endhealth.info/im#NationallyAssuredUK": "Nationally assured UK level",
          "http://www.w3.org/2000/01/rdf-schema#subClassOf": "Is subclass of",
          "http://endhealth.info/im#status": "status",
          "http://snomed.info/sct#404684003": "Clinical finding (finding)",
          "http://endhealth.info/im#someOf": "some of",
          "http://snomed.info/sct#64572001": "Disease (disorder)",
          "http://endhealth.info/im#Active": "Active",
          "http://snomed.info/sct#203800001": "[X]Other idiopathic scoliosis (disorder)",
          "http://endhealth.info/im#mappedTo": "mapped to",
          "http://snomed.info/sct#106028002": "Musculoskeletal finding (finding)",
          "http://snomed.info/sct#118234003": "Finding by site (finding)",
          "http://endhealth.info/im#roleGroup": "Where",
          "http://snomed.info/sct#116676008": "Associated morphology (attribute)",
          "http://snomed.info/sct#467661000000104": "[X]Other idiopathic scoliosis (disorder)",
          "http://snomed.info/sct#410730009": "Disorder of spinal region (disorder)",
          "http://snomed.info/sct#363698007": "Finding site (attribute)",
          "http://snomed.info/sct#203639008": "Idiopathic scoliosis (disorder)",
          "http://snomed.info/sct#41969006": "Idiopathic disease (disorder)",
          "http://endhealth.info/im#hasTermCode": "has term code",
          "http://endhealth.info/icd10#M412": "Other idiopathic scoliosis",
          "http://endhealth.info/im#mapPriority": "mapPriority",
          "http://endhealth.info/im#scheme": "scheme",
          "http://snomed.info/sct#298379008": "Finding of spinal region (finding)",
          "http://snomed.info/sct#414252009": "Finding of back (finding)",
          "http://endhealth.info/im#assuranceLevel": "assurance level",
          "http://snomed.info/sct#362965005": "Disorder of body system (disorder)",
          "http://snomed.info/sct#": "Snomed-CT code scheme and graph",
          "http://snomed.info/sct#289959001": "Musculoskeletal structure of spine (body structure)",
          "http://snomed.info/sct#119414006": "Vertebral column finding (finding)",
          "http://snomed.info/sct#31739005": "Lateral abnormal curvature (morphologic abnormality)",
          "http://snomed.info/sct#298382003": "Scoliosis deformity of spine (disorder)",
          "http://endhealth.info/im#1261000252108": "Definitional status",
          "http://snomed.info/sct#301857004": "Finding of body region (finding)",
          "http://snomed.info/sct#298380006": "Deformity of spine (finding)",
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
    };
  }
};
</script>
