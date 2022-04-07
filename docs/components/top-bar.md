<script setup>
import Basic from './demo/TopBar/Basic.vue'
import Content from './demo/TopBar/Content.vue'
</script>

# Topbar

This component depends on third-party component library for Vue 3:

- Components (Button, Menu, OverlayPanel) from [PrimeVue](https://www.primefaces.org/primevue/)
- CSS from [PrimeIcons](https://www.primefaces.org/showcase/icons.xhtml) and [PrimeFlex](https://www.primefaces.org/primeflex/)

## Example Usage

### Basic

<DemoContainer>
  <Basic/>
</DemoContainer>

<<< @/components/demo/TopBar/Basic.vue

### Content slot

<DemoContainer>
  <Content/>
</DemoContainer>

<<< @/components/demo/TopBar/Content.vue

## Reference

You may show props, slots, events, methods, etc. using Markdown.

### Props

None

### Store props

| Name | Type | Description |
| ---- | ---------- | ----------- |
|   currentUser   |      User      |      AWS Cognito verified user       |
| isLoggedIn | Boolean | boolean for currentUser verified |
| authReturnUrl | string | return URL sent to IMAuth app |

### Events

None

### Slots

| Name | Parameters | Description |
| ---- | ---------- | ----------- |
|   Content   |      None      |       Content fits between icon and app/user menus      |
