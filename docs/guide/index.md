# Getting Started

## Setup

This setup assumes your client app is created with Vite and vue-ts template, and you use 'npm link' to link to `im-library` locally.

In your `package.json`, you should have the following compatible dependencies:

```json
"dependencies": {
  "primeflex": "^3.1.2",
  "primeicons": "^5.0.0",
  "primevue": "^3.11.1",
  "vue": "^3.2.25"
}
```

In your `vite.config.ts`, you shall configure to dedupe `vue`:

```ts
export default defineConfig({
  resolve: {
    dedupe: ["vue"],
  },
});
```

In your `main.ts`, you shall import the libraries and CSS:

```ts
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import "im-library/dist/style.css";
```

## Importing

### Components

Import components from this library in your own component:

```html
<script setup lang="ts">
  import { ComponentA, ComponentB } from "im-library";
</script>
```

### Types

Import types from this library:

```html
<script>
  import { TypeA, TypeB } from "im-library/dist/types/interfaces/Interfaces"
</script>
```

### Object unpacking

Import and unpack objects:

```html
<script>
  import { Helpers } from "im-library"
  const { Function1, Function2: { SubFunction1: SubFunction2 } } = Helpers
</script>
