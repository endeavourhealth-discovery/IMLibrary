<template>
  <Button label="show License" @click="showDialog" />
  <div v-if="show">
    <SnomedLicense />
  </div>
</template>
<script>
import Button from "primevue/button";
export default {
  components: { Button },
  data() {
    return {
      show: false
    };
  },
  methods: {
    showDialog() {
      this.show = !this.show;
    }
  }
};
</script>
