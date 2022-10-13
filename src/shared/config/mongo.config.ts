const isDevelopment = process.env.NODE_ENV !== 'production';
const { MONGO_PORT, MONGO_HOSTNAME, MONGO_USERNAME, MONGO_PASSWORD } =
  process.env;

export const mongo_uri: string = isDevelopment
  ? `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}`
  : `mongodb+srv://wkwkwk:wkwkwk@cluster0.ked2wqs.mongodb.net/?retryWrites=true&w=majority`;
