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
    type: 'document',
    fields: [
      { name: 'name', title: 'Name', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
      {
        name: 'taxonomies',
        title: 'Taxonomies',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'taxonomy' }] }],
      },
    ],
  });

  const taxonomy = defineType({
    name: 'taxonomy',
    title: taxonomyLabel,
    type: 'document',
    fields: [
      { name: 'name', title: 'Name', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
      {
        name: 'taxons',
        title: 'Taxons',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'taxon' }] }],
      },
    ],
  });

  const taxon = defineType({
    name: 'taxon',
    title: taxonLabel,
    type: 'document',
    fields: [
      { name: 'name', title: 'Name', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
      {
        name: 'taxons',
        title: 'Taxons',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'taxon' }] }],
      },
      {
        name: 'products',
        title: 'Products',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'product' }] }],
      },
    ],
  });

  const product = defineType({
    name: 'product',
    title: productLabel,
    type: 'document',
    fields: getAttributes(
      {
        name: { name: 'name', title: 'Name', type: 'string' },
        description: {
          name: 'description',
          title: 'Description',
          type: 'text',
        },
        variants: {
          name: 'variants',
          title: 'Variants',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'variant' }] }],
        },
      },
      productAttributes,
    ),
  });

  const variant = defineType({
    name: 'variant',
    title: variantLabel,
    type: 'document',
    fields: getAttributes(
      {
        name: {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        description: {
          name: 'description',
          title: 'Description',
          type: 'text',
        },
        sku: {
          name: 'sku',
          title: 'SKU',
          type: 'string',
        },
        images: {
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [{ type: 'image' }],
        },
      },
      variantAttributes,
    ),
  });

  return [catalog, taxonomy, taxon, product, variant];
};

export default getSchema;
