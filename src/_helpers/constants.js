export const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const prod = {
  url: {
    API_URL: "https://dropform.vercel.app/",
  },
};

const dev = {
  url: {
    API_URL: "http://localhost:3000/",
  },
};

export const config = import.meta.env.NODE_ENV === "development" ? dev : prod;
