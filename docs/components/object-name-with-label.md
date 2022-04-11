<script setup>
import Basic from './demo/ObjectNameWithLabel/Basic.vue'
</script>

# ObjectNameWithLabel

## Summary

Renders an object with a `name` key with a label.

## Example Usage

<DemoContainer>
  <Basic/>
</DemoContainer>

<<< @/components/demo/ObjectNameWithLabel/Basic.vue

### Props

| Name | Type | Required | Default | Description |
| ---- | ---- | ---- |------- | ----------- |
| data | Object{name:string} | true | null   | Object with name key |
| label | String | true | null | Label of data |
| size | String | false | "100%" | CSS width of element |
| id   | String | false | "object-name-with-label" | HTML id |
