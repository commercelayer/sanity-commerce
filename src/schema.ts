import { defineType, FieldDefinition } from 'sanity';

export type Config = {
  productLabel?: string;
  variantLabel?: string;
  taxonomyLabel?: string;
  taxonLabel?: string;
  productAttributes?: FieldDefinition[];
  variantAttributes?: FieldDefinition[];
};

const getAttributes = (
  defaultAttributes: Record<string, FieldDefinition>,
  customAttributes: FieldDefinition[],
): FieldDefinition[] => {
  return Object.values(
    customAttributes.reduce((carry, field) => {
      return {
        ...carry,
        [field.name]: field,
      };
    }, defaultAttributes),
  );
};

const getSchema = ({
  productLabel = 'Product',
  variantLabel = 'Variant',
  taxonomyLabel = 'Taxonomy',
  taxonLabel = 'Taxon',
  productAttributes = [],
  variantAttributes = [],
}: Config): any[] => {
  const catalog = defineType({
    name: 'catalog',
    title: 'Catalog',
    description:
      'Represents a collection of products, typically grouped under specific taxonomies for organizational purposes. A catalog is used to present a curated selection of products, often tailored for specific markets, seasons, or themes. It references taxonomies to leverage the established hierarchical structure for product categorization.',
    type: 'document',
    fields: [
      {
        name: 'name',
        validation: (Rule) => Rule.required(),
        title: 'Name',
        type: 'string',
        description:
          'The title of the catalog, which may denote its purpose or the collection it represents.',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        description:
          'Detailed information about the catalog, including its target audience or the range of products it includes.',
      },
      {
        name: 'taxonomies',
        validation: (Rule) => Rule.required(),
        title: 'Taxonomies',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'taxonomy' }] }],
        description:
          'The taxonomies included in this catalog, which structure the organization of the products within.',
      },
    ],
  });

  const taxonomy = defineType({
    name: 'taxonomy',
    title: taxonomyLabel,
    description:
      'Represents the overall categorization system used to organize products. A taxonomy is a hierarchical structure comprising various taxons. This content type defines the broad categories and their relationships, serving as a framework for the classification of products.',
    type: 'document',
    fields: [
      {
        name: 'name',
        validation: (Rule) => Rule.required(),
        title: 'Name',
        type: 'string',
        description:
          'The name of the taxonomy, usually representing a broad category.',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        description:
          'A general overview of the taxonomy purpose and what types of products it includes.',
      },
      {
        name: 'taxons',
        validation: (Rule) => Rule.required(),
        title: 'Taxons',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'taxon' }] }],
        description:
          'The individual categories or "taxons" that make up the levels of this taxonomy.',
      },
    ],
  });

  const taxon = defineType({
    name: 'taxon',
    title: taxonLabel,
    description:
      'Represents individual categories or subcategories within a taxonomy. Taxons help in organizing products into hierarchical structures, making it easier to navigate and find products. A taxon can reference other taxons, allowing for nested categorization, and can also link to specific products that fall under it.',
    type: 'document',
    fields: [
      {
        name: 'name',
        validation: (Rule) => Rule.required(),
        title: 'Name',
        type: 'string',
        description:
          'The name of the category or subcategory as it should be displayed.',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        description:
          'An explanation of the category, possibly including what types of products it encompasses.',
      },
      {
        name: 'taxons',
        title: 'Taxons',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'taxon' }] }],
        description:
          'Subcategories or nested categories within this taxon, allowing for a multi-level taxonomy structure.',
      },
      {
        name: 'products',
        title: 'Products',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'product' }] }],
        description: 'Products that fall under this specific category.',
      },
    ],
  });

  const product = defineType({
    name: 'product',
    title: productLabel,
    description:
      'Represents a general product offering that can have multiple variants. This content type includes basic product information such as the product name and description. It also references the various variants of the product, allowing for a comprehensive view of all available options.',
    type: 'document',
    fields: getAttributes(
      {
        name: {
          name: 'name',
          validation: (Rule) => Rule.required(),
          title: 'Name',
          type: 'string',
          description:
            'The name of the product as it should appear in listings.',
        },
        description: {
          name: 'description',
          title: 'Description',
          type: 'text',
          description:
            'Detailed information about the product, highlighting its features and benefits.',
        },
        variants: {
          name: 'variants',
          validation: (Rule) => Rule.required(),
          title: 'Variants',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'variant' }] }],
          description:
            'Different variations of the product, such as sizes or colors, each with its own SKU.',
        },
      },
      productAttributes,
    ),
  });

  const variant = defineType({
    name: 'variant',
    title: variantLabel,
    description:
      'Represents a specific variant of a product. Variants are typically different versions of a product, differentiated by attributes like size, color, or other specifications. Each variant has a unique SKU for inventory tracking and may have its own set of images.',
    type: 'document',
    fields: getAttributes(
      {
        name: {
          name: 'name',
          validation: (Rule) => Rule.required(),
          title: 'Name',
          type: 'string',
          description: 'The unique name or title of this particular variant',
        },
        description: {
          name: 'description',
          title: 'Description',
          type: 'text',
          description:
            'A description that details the specifics of this variant, such as its unique features or differences from other variants.',
        },
        sku: {
          name: 'sku',
          validation: (Rule) => Rule.required(),
          title: 'SKU',
          type: 'string',
          description:
            'Stock Keeping Unit, a unique identifier for each variant used for inventory management.',
        },
        images: {
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [{ type: 'image' }],
          description:
            'Visual representations of the variant, providing a clear and accurate portrayal of the product appearance.',
        },
      },
      variantAttributes,
    ),
  });

  return [catalog, taxonomy, taxon, product, variant];
};

export default getSchema;
