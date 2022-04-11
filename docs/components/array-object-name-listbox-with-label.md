<script setup>
import Basic from './demo/ArrayObjectNameListboxWithLabel/Basic.vue'
</script>

# ArrayObjectNameListboxWithLabel

## Dependencies

This component depends on third-party component librarys for Vue 3:

- Components (Button, Listbox) from [PrimeVue](https://www.primefaces.org/primevue/)
- CSS from [PrimeIcons](https://www.primefaces.org/showcase/icons.xhtml) and [PrimeFlex](https://www.primefaces.org/primeflex/)

## Summary

Renders an array of objects containing `name` key into a primevue listbox.

Listbox display is toggleable through a vuex store variable `arrayObjectNameListboxWithLabelStartExpanded`.

## Example Usage

<DemoContainer>
  <Basic/>
</DemoContainer>

<<< @/components/demo/ArrayObjectNameListboxWithLabel/Basic.vue

### Props

| Name | Type | Required | Default | Description |
| ---- | ---- | -------- |------- | ----------- |
| data | Array[Object{name:string}]| false | null   | Array of objects with name key |
| label | String | true | null | Label of data |
| size | String | false | "100%" | CSS width of element |
| id   | String | false | "array-object-name-listbox-with-label" | HTML id |

### Store props

| Name | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| arrayObjectNameListboxWithLabelStartExpanded | Array[String] | null | List of Label names to start pre-expanded |
