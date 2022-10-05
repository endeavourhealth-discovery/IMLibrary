<template>
  <a v-tooltip.right="'See in viewer app'" class="clickable" @click="navigate">{{ label || iri }}</a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { DirectService, Env } from "../../services/Services";
import { useStore } from "vuex";

export default defineComponent({
  name: "IMViewerLink",
  props: { iri: { type: String, required: true }, label: { type: String, required: false } },
  setup(props, _ctx) {
    const store = useStore();
    const directService = new DirectService(store);

    function navigate() {
      directService.directTo(Env.VIEWER_URL, props.iri, "concept");
    }

    return {
      navigate
    };
  }
});
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
