import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';

import { AwsProvider, S3Bucket, S3BucketObject } from './.gen/providers/aws';
// import necessary packages
import * as path from 'path';
import * as glob from 'glob';
import * as mime from 'mime-types';
import { readFileSync } from 'fs';

import { createHash } from 'crypto';
import { TerraformOutput } from 'cdktf';

function s3BucketPublicReadConfig(BUCKET_NAME: string) {
  return {
    acl: 'public-read',
    website: [{
      indexDocument: 'index.html',
      errorDocument: 'error.html',
    }],
    tags: {
      'Terraform': "true",
      "Environment": "dev"
    },
    bucket: BUCKET_NAME,
    policy: `{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "PublicReadGetObject",
        "Effect": "Allow",
        "Principal": "*",
        "Action": [
          "s3:GetObject"
        ],
        "Resource": [
          "arn:aws:s3:::${BUCKET_NAME}/*"
        ]
      }
    ]
  }`,
  };
}

const md5Hash = (file: string): string => {
    const hash = createHash('md5');
    const data = readFileSync(file)
    return hash.update(data).digest("base64");
};

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new AwsProvider(this, 'aws', {
      region: 'eu-west-1'
    });

    const bucketName = '2020-dambra-journal-web';

    const bucket = new S3Bucket(this, 'aws_s3_bucket', s3BucketPublicReadConfig(bucketName));
    const files = glob.sync('../docs/**/*', { absolute: false, nodir: true });
    for (const file of files) {
      new S3BucketObject(this, `aws_s3_bucket_object_${path.basename(file)}`, {
        dependsOn: [bucket], // Wait until the bucket is created
        key: file.replace(`../docs/`, ''), // Using relative path for folder structure on S3
        bucket: bucketName,
        source: path.resolve(file), // Using absolute path to upload
        etag: md5Hash(file),
        contentType: mime.contentType(path.extname(file)) || undefined // Set the content-type for each object
      });
    }

    new TerraformOutput(this, 's3_website_endpoint', {
      value: `http://${bucket.websiteEndpoint}`
    });
  }


}

const app = new App();
new MyStack(app, 'journal');
app.synth();
