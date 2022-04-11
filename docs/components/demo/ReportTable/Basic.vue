<template>
  <ReportTable title="Title" subTitle="Subtitle" tableHeader="Header" id="demo-1" :inputData="inputData" />
</template>
<script>
export default {
  data() {
    return {
      inputData: [
        { count: 100, label: "orange" },
        { count: 200, label: "apple" }
      ]
    };
  }
};
</script>
