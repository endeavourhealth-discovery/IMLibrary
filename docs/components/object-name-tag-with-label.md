<script setup>
import Basic from './demo/ObjectNameTagWithLabel/Basic.vue'
</script>

# ObjectNameTagWithLabel

## Dependencies

This component depends on third-party component librarys for Vue 3:

- Components (Tag) from [PrimeVue](https://www.primefaces.org/primevue/)
- CSS from [PrimeIcons](https://www.primefaces.org/showcase/icons.xhtml) and [PrimeFlex](https://www.primefaces.org/primeflex/)

## Summary

Renders a `TTIriRef` object as primevue `Tag` component with a label.

Tag severity is set using vuex store variable `TagSeverityMatches`.

## Example Usage

<DemoContainer>
  <Basic/>
</DemoContainer>

<<< @/components/demo/ObjectNameTagWithLabel/Basic.vue

## Reference

You may show props, slots, events, methods, etc. using Markdown.

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| Data | Object{TTIriRef}| {}   | TTIriRef object |
| Label | String | "Label" | Label of data |
| Size | String | "100%" | CSS width of element |
| id   | String | "ObjectNameTagWithLabel" | HTML id |

### Store props

| Name | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| TagSeverityMatches | Array[Object{"@id":string,severity:string}] | [] | severity must be valid primevue Tag severity |
