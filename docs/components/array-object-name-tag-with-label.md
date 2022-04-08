<script setup>
import Basic from './demo/ArrayObjectNameTagWithLabel/Basic.vue'
</script>

# ArrayObjectNameTagWithLabel

## Dependencies

This component depends on third-party component librarys for Vue 3:

- Components (Tag) from [PrimeVue](https://www.primefaces.org/primevue/)
- CSS from [PrimeIcons](https://www.primefaces.org/showcase/icons.xhtml) and [PrimeFlex](https://www.primefaces.org/primeflex/)

## Summary

Renders an array of `TTIriRef` objects as primevue `Tag` components with a label.

Tag severity is set using vuex store variable `TagSeverityMatches`.

## Example Usage

<DemoContainer>
  <Basic/>
</DemoContainer>

<<< @/components/demo/ArrayObjectNameTagWithLabel/Basic.vue

## Reference

You may show props, slots, events, methods, etc. using Markdown.

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| Data | Array[Object{TTIriRef}]| []   | Array of TTIriRef objects |
| Label | String | "Label" | Label of data |
| Size | String | "100%" | CSS width of element |
| id   | String | "ArrayObjectNameTagWithLabel" | HTML id |

### Store props

| Name | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| TagSeverityMatches | Array[Object{"@id":string,severity:string}] | [] | severity must be valid primevue Tag severity |
