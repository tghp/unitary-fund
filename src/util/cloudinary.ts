import { Cloudinary } from '@cloudinary/url-gen';

export const cld = new Cloudinary({
  cloud: {
    // TODO: Change to env variable
    cloudName: 'de4xlna6t',
  },
  url: {
    secure: true,
  },
});
