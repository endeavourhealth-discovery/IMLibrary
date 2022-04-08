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

## Reference

You may show props, slots, events, methods, etc. using Markdown.

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| Data | Array[Object]| []   | Array of objects with name key |
| Label | String | "Label" | Label of data |
| Size | String | "100%" | CSS width of element |
| id   | String | "ArrayObjectNameListboxWithLabel" | HTML id |

### Store props

| Name | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| arrayObjectNameListboxWithLabelStartExpanded | Array[String] | [] | List of Label names to start pre-expanded |
