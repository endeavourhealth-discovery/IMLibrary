<script setup>
import Basic from './demo/TextDefinition/Basic.vue'
</script>

# TextDefinition

## Summary

Renders an object with a `name` key with a label.

## Example Usage

<DemoContainer>
  <Basic/>
</DemoContainer>

<<< @/components/demo/TextDefinition/Basic.vue

### Props

| Name | Type | Required | Default | Description |
| ---- | ---- | ---- |------- | ----------- |
| data | PartialEntity | true | null | Definition as PartialEntity |
| label | String | true | null | Label of data |
| size | String | false | "100%" | CSS width of element |
| id   | String | false | "TextDefinition" | HTML id |
