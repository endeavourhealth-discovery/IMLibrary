<script setup>
import Basic from './demo/TermCodeTable/Basic.vue'
</script>

# TermCodeTable

## Summary

Renders an object with a `name` key with a label.

## Example Usage

<DemoContainer>
  <Basic/>
</DemoContainer>

<<< @/components/demo/TermCodeTable/Basic.vue

### Props

| Name | Type | Required | Default | Description |
| ---- | ---- | ---- |------- | ----------- |
| terms | `Object{name:string,code:string}` | true | null | Object with name key |
