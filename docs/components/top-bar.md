<script setup>
import Basic from './demo/TopBar/Basic.vue'
import Content from './demo/TopBar/Content.vue'
</script>

# Topbar

## Dependencies

This component depends on third-party component librarys for Vue 3:

- Components (Button, Menu, OverlayPanel) from [PrimeVue](https://www.primefaces.org/primevue/)
- CSS from [PrimeIcons](https://www.primefaces.org/showcase/icons.xhtml) and [PrimeFlex](https://www.primefaces.org/primeflex/)

## Summary

IM app suite top bar component.

Component comprises start, content and end sections.

* Start: IMLogo with home click functionality
* Content: Slot for injected content
* End: IM App selector and User menu

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
|   Content   |      None      |       Content fits between start and end sections    |
