const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// Make sure both are defined
if (!username || !password) {
  throw new Error(
    "Missing DB_USERNAME or DB_PASSWORD in environment variables"
  );
}

export const connectionStr = `mongodb+srv://${username}:${password}@cluster0.hmveheq.mongodb.net/restoDB?retryWrites=true&w=majority&appName=Cluster0`;
