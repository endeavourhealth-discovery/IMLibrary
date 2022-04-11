<script setup>
import Basic from './demo/ArrayObjectNamesToStringWithLabel/Basic.vue'
</script>

# ArrayObjectNamesToStringWithLabel

## Summary

Renders an array of objects containing `name` key into a comma separated string with a label.

## Example Usage

<DemoContainer>
  <Basic/>
</DemoContainer>

<<< @/components/demo/ArrayObjectNamesToStringWithLabel/Basic.vue

## Reference

You may show props, slots, events, methods, etc. using Markdown.

### Props

| Name | Type | Required | Default | Description |
| ---- | ---- | ---- | ------- | ----------- |
| data | Array[Object{name:string}]| true | null | Array of objects with name key |
| label | String | true | null | Label of data |
| size | String | false | "100%" | CSS width of element |
| id   | String | false | "array-object-names-to-string-with-label" | HTML id |
