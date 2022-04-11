<script setup>
import Basic from './demo/SnomedLicense/Basic.vue'
</script>

# Snomed License

This component depends on third-party component librarys for Vue 3:

- Component (Dialog, Button) from [PrimeVue](https://www.primefaces.org/primevue/)
- CSS from [PrimeIcons](https://www.primefaces.org/showcase/icons.xhtml) and [PrimeFlex](https://www.primefaces.org/primeflex/)

## Summary

Dialog requesting acceptance of Snomed license.

Accepting returns to url defined in Vuex store `snomedReturnUrl` variable.

Declining routes to https://www.snomed.org.

## Example Usage

<DemoContainer>
  <Basic/>
</DemoContainer>

```html
<template>
  <SnomedLicense />
</template>
```

### Props

None

### Store props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| snomedLicenseAccepted | boolean| null   | stores if license agreement has been accepted |
| snomedReturnUrl | string | null | URL to return to previous app on agreement acceptance |

### Events

None

### Slots

None
