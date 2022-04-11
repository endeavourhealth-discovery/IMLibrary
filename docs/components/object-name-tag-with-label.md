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

### Props

| Name | Type | Required | Default | Description |
| ---- | ---- | ---- |------- | ----------- |
| data | TTIriRef | true | null   | TTIriRef object |
| label | String | true | null | Label of data |
| size | String | false | "100%" | CSS width of element |
| id   | String | false | "object-name-tag-with-label" | HTML id |

### Store props

| Name | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| TagSeverityMatches | Array[Object{"@id":string,severity:string}] | [] | severity must be valid primevue Tag severity |
