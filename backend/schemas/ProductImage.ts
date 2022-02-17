import { cloudinaryImage } from '@keystone-next/cloudinary';
import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

import 'dotenv/config';

// cloudinary config
console.log(process.env.CLOUDINARY_CLOUD_NAME);
export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: 'sickfits',
};

export const ProductImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
    // reference the photo
    product: relationship({ ref: 'Product.photo' }),
  },
  ui: {
    listView: {
      // array of fields that will show up by default
      initialColumns: ['altText', 'image', 'product'],
    },
  },
});
