<template>
  <TermCodeTable :terms="data" />
</template>
<script>
export default {
  data() {
    return {
      data: [
        { name: "Term1", code: "100001" },
        { name: "Term2", code: "100002" }
      ]
    };
  }
};
</script>
