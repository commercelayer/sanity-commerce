# Sanity Commerce by Commerce Layer

> The Sanity Commerce Plugin is designed to seamlessly integrate e-commerce functionalities into Sanity CMS. Focused on simplifying content management for e-commerce platforms, this plugin allows you to manage your product catalog directly within Sanity, leveraging the power and flexibility of headless commerce.

## Rationale

Traditionally, product catalogs and commerce engines are closely tied together, often leading to complex management and limited flexibility in content presentation. This plugin proposes a paradigm shift by decoupling the product catalog from the commerce engine. It enables you to manage your product catalog within Sanity CMS, while platforms like Commerce Layer handle the transactional aspects. This approach offers enhanced content management capabilities, improved editorial workflows, and a richer user experience.

## Features

- Spin up a content model to handle products within Sanity.
- Customizable schema for products, variants, taxonomies, and taxons.
- Flexible configuration options to adapt to different e-commerce needs.
- Streamlined management of product details, variants, and categorizations.

## Installation

```sh
npm install sanity-plugin-sanity-commerce
```

## Usage

Configure the plugin in your `sanity.config.ts` file. Here’s an example configuration:

```typescript
import { defineConfig } from 'sanity';
import { sanityCommerce } from 'sanity-plugin-commerce';

const sanityCommerceConfig = {
  // ...configure the plugin here.
};

export default defineConfig({
  // ... other config settings.
  plugins: [sanityCommerce(sanityCommerceConfig)],
});
```

### Configuration Options

The Sanity Commerce Plugin offers flexible configuration to adapt to your specific e-commerce needs. Below is a table summarizing the configuration options:

| Option              | Type                | Description                                                | Example                                      |
| ------------------- | ------------------- | ---------------------------------------------------------- | -------------------------------------------- |
| `productLabel`      | `string`            | Sets the display name for products in the CMS.             | `'Coffee'`                                   |
| `variantLabel`      | `string`            | Sets the display name for product variants.                | `'Coffee Variant'`                           |
| `taxonomyLabel`     | `string`            | Sets the display name for taxonomies.                      | `'Category System'`                          |
| `taxonLabel`        | `string`            | Sets the display name for individual taxons or categories. | `'Category'`                                 |
| `productAttributes` | `FieldDefinition[]` | An array of additional field definitions for the product.  | `[ { name: 'origin', type: 'string' } ]`     |
| `variantAttributes` | `FieldDefinition[]` | An array of additional field definitions for the variant.  | `[ { name: 'roastLevel', type: 'string' } ]` |

#### Example Configuration

Here is a full example of how you might configure the plugin in your `sanity.config.ts`:

```typescript
import { defineConfig } from 'sanity';
import { sanityCommerce } from 'sanity-plugin-commerce';

const sanityCommerceConfig = {
  productLabel: 'Coffee',
  variantLabel: 'Coffee Variant',
  taxonomyLabel: 'Category System',
  taxonLabel: 'Category',
  productAttributes: [{ name: 'origin', title: 'Origin', type: 'string' }],
  variantAttributes: [
    {
      name: 'roastLevel',
      title: 'Roast Level',
      type: 'string',
      options: {
        list: [
          { title: 'Light', value: 'light' },
          { title: 'Medium', value: 'medium' },
          { title: 'Dark', value: 'dark' },
        ],
      },
    },
  ],
};

export default defineConfig({
  plugins: [sanityCommerce(sanityCommerceConfig)],
});
```

This configuration allows you to tailor the plugin to best fit your product catalog and editorial workflow.

## License

This plugin is released under the [MIT License](LICENSE) © Commerce Layer.

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
