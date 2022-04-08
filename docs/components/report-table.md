<script setup>
import Basic from './demo/ReportTable/Basic.vue'
</script>

# ReportTable

## Dependencies

This component depends on third-party component librarys for Vue 3:

- Components (Card, Column, DataTable, ProgressSpinner) from [PrimeVue](https://www.primefaces.org/primevue/)
- CSS from [PrimeIcons](https://www.primefaces.org/showcase/icons.xhtml) and [PrimeFlex](https://www.primefaces.org/primeflex/)

## Summary

Card containing a table with title, subtitle and loading. Processes an array of objects with `label` and `count` keys.

## Example Usage

<DemoContainer>
  <Basic/>
</DemoContainer>

<<< @/components/demo/ReportTable/Basic.vue

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| title | String | null   | card title |
| subtitle | String | null | card subtitle |
| tableHeader | String | null | table header |
| inputData | Array[Object{count: number,label:string}] | [] | table data |
| id   | String | "ReportTable" | HTML id |

### Events

None

### Slots

None
