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
    import("../../../../src/components/modules/TopBar.vue").then((module) => {
      this.dynamicComponent = module.default
    })
  }
}
</script>
