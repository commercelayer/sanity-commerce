import { defineType, FieldDefinition } from 'sanity';

export type Config = {
  productLabel?: string;
  variantLabel?: string;
  taxonomyLabel?: string;
  taxonLabel?: string;
  productAttributes?: FieldDefinition[];
  variantAttributes?: FieldDefinition[];
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
    fields: [
      { name: 'name', title: 'Name', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
      ...productAttributes,
      {
        name: 'variants',
        title: 'Variants',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'variant' }] }],
      },
    ],
  });

  const variant = defineType({
    name: 'variant',
    title: variantLabel,
    type: 'document',
    fields: [
      { name: 'name', title: 'Name', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
      { name: 'sku', title: 'SKU', type: 'string' },
      {
        name: 'imageUrls',
        title: 'Image URLs',
        type: 'array',
        of: [{ type: 'url' }],
      },
      ...variantAttributes,
    ],
  });

  return [catalog, taxonomy, taxon, product, variant];
};

export default getSchema;
