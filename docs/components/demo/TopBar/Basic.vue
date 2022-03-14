<template>
  <component v-if="dynamicComponent" :is="dynamicComponent" />
</template>

<script>
export default {
  data() {
    return {
      dynamicComponent: null
    }
  },
  mounted() {
    import("../../../../src/components/TopBar.vue").then((module) => {
      this.dynamicComponent = module.default
    })
  }
}
</script>
