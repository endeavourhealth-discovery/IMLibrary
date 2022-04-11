<script setup>
import Basic from './demo/TextHTMLWithLabel/Basic.vue'
</script>

# Text HTML with label

## Summary

Textbox which replaces `<p>` and `\n` tags with correct HTML tags

## Example Usage

<DemoContainer>
  <Basic/>
</DemoContainer>

<<< @/components/demo/TextHTMLWithLabel/Basic.vue

## Reference

You may show props, slots, events, methods, etc. using Markdown.

### Props

| Name | Type | Required | Default | Description |
| ---- | ---- | ---- | ------- | ----------- |
| Data | String| false | null   | Data as string |
| Label | String | true | null | Label of data |
| Size | String | false | "100%" | CSS width of element |
| id   | String | false | "text-html-with-label" | HTML id |

