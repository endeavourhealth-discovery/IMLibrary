<script setup>
import Basic from './demo/NumberWithLabel/Basic.vue'
</script>

# Number with label

## Summary

Textbox which renders a label and associated number.

## Example Usage

<DemoContainer>
  <Basic/>
</DemoContainer>

<<< @/components/demo/NumberWithLabel/Basic.vue

### Props

| Name | Type | Required | Default | Description |
| ---- | ---- | ---- |------- | ----------- |
| data | number| true | null   | Data as string |
| label | String | true | "Label | Label of data |
| size | String | false | "100%" | CSS width of element |
| id | String | false | "TextWithLabel | HTML id |

### Events

None

### Slots

None
