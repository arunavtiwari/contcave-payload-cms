import { S3UploadCollectionConfig } from 'payload-s3-upload';

export const Media: S3UploadCollectionConfig = {
  slug: 'media',
  upload: {
    staticURL: '/assets',
    staticDir: 'assets',
    disableLocalStorage: true,
    s3: {
      bucket: 'payloadawsbucket',
      prefix: 'images/payload', // files will be stored in bucket folder images/xyz
      // prefix: ({ doc }) => `assets/${doc.type}`, // dynamic prefixes are possible too
      commandInput: {
        // optionally, use here any valid PutObjectCommandInput property
        // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/putobjectcommandinput.html
        ACL: 'public-read',
      },
    },
    adminThumbnail: ({ doc }) =>
      `https://payloadawsbucket.s3-ap-southeast-2.amazonaws.com/images/payload/${doc.filename}`,
  },
  // create a field to access uploaded files in s3 from payload api
  fields: [
    {
      name: 'url',
      type: 'text',
      access: {
        create: () => false,
      },
      admin: {
        disabled: true,
      },
      hooks: {
        afterRead: [
          ({ data: doc }) =>
            `https://payloadawsbucket.s3-ap-southeast-2.amazonaws.com/images/${doc.type}/${doc.filename}`,
        ],
      },
    },
  ],
};
