import { create } from 'ipfs-http-client'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const projectSecretKey = process.env.NEXT_PUBLIC_PROJECT_KEY;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecretKey).toString('base64');

export const ipfs = create({
  url: "https://ipfs.infura.io:5001",
  headers: {
    authorization: auth,
  },
});