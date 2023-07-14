export const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
export const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const prod = {
  url: {
    API_URL: "https://dropform.vercel.app/",
  },
};

const dev = {
  url: {
    API_URL: "http://localhost:3030/",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
