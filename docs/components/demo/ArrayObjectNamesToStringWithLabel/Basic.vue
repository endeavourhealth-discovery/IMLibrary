<template>
  <ArrayObjectNamesToStringWithLabel :data="data" id="demo-1" label="Label" size="100%" />
</template>
<script>
export default {
  data() {
    return {
      data: [{ name: "Item 1" }, { name: "Item 2" }, { name: "Item 3" }]
    };
  }
};
</script>
