<script lang="ts">
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { ImLibrarySample } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  // components: {
  //  ImLibrarySample,
  // }
});
</script>

<template>
  <div id="app">
    <im-library-sample />
  </div>
</template>
