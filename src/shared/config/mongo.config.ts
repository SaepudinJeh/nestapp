const isDevelopment = process.env.NODE_ENV !== 'production';
const {
  MONGO_PORT,
  MONGO_HOSTNAME,
  MONGO_DATABASE,
  MONGO_USERNAME,
  MONGO_PASSWORD,
} = process.env;

export const mongo_uri = isDevelopment
  ? `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DATABASE}`
  : `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.ked2wqs.mongodb.net/?retryWrites=true&w=majority`;
