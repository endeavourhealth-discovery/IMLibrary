<script setup>
import Basic from './demo/TextDefinition/Basic.vue'
</script>

# TextDefinition

## Dependencies

This component depends on third-party component librarys for Vue 3:

- Components (Button, ProgressSpinner) from [PrimeVue](https://www.primefaces.org/primevue/)
- CSS from [PrimeIcons](https://www.primefaces.org/showcase/icons.xhtml) and [PrimeFlex](https://www.primefaces.org/primeflex/)

## Summary

Renders a TTBundle into a readable display with labels replacing iris.

Start expanded if label is included in vuex store property `textDefinitionStartExpanded`.

## Example Usage

<DemoContainer>
  <Basic/>
</DemoContainer>

<<< @/components/demo/TextDefinition/Basic.vue

### Props

| Name | Type | Required | Default | Description |
| ---- | ---- | ---- |------- | ----------- |
| data | TTBundle | true | null | Definition as TTBundle |
| label | String | true | null | Label of data |
| size | String | false | "100%" | CSS width of element |
| id   | String | false | "TextDefinition" | HTML id |

### Store props

| Name | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| textDefinitionStartExpanded | Array[String] | null | List of Label names to start pre-expanded |
