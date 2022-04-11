<template>
  <ArrayObjectNameTagWithLabel :data="data" id="demo-1" label="Label" size="100%" />
</template>
<script>
export default {
  data() {
    return {
      data: [
        { "@id": "http://endhealth.info/im#Active", name: "Active" },
        { "@id": "http://endhealth.info/im#Inactive", name: "Inactive" }
      ]
    };
  }
};
</script>
