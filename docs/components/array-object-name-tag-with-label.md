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

| Name | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| data | Array[Object{TTIriRef}]| true | null | Array of TTIriRef objects |
| label | String | true | null | Label of data |
| size | String | "100%" | CSS width of element |
| id   | String | "array-object-name-tag-with-label" | HTML id |

### Store props

| Name | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| TagSeverityMatches | Array[Object{"@id":string,severity:string}] | null | severity must be valid primevue Tag severity |
