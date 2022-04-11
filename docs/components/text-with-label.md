<script setup>
import Basic from './demo/TextWithLabel/Basic.vue'
</script>

# Text with label

## Summary

Textbox which renders a label and associated string.

## Example Usage

<DemoContainer>
  <Basic/>
</DemoContainer>

<<< @/components/demo/TextWithLabel/Basic.vue

### Props

| Name | Type | Required |  Default | Description |
| ---- | ---- | ---- |------- | ----------- |
| data | String| false | null   | Data as string |
| label | String | true |  null | Label of data |
| size | String | false | "100%" | CSS width of element |
| id | String | false | "text-with-label" | HTML id |

### Events

None

### Slots

None
