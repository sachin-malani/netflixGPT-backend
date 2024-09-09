import { Hono } from "hono";
import { cors } from "hono/cors";
import openai from "./openai";

const app = new Hono();
app.use("/*", cors());

app.get("/", (c) => {
  return c.text("Netflix Backend");
});

app.post("/gptSearch", async (c) => { 
  try {
    const body = await c.req.json(); 
    
    const GPT_QUERY =
      "Act as a Movie recommendation system and only give me the name of 10 movies, comma separated like the example result given ahead. Example Result: Fast & Furious, Sholay, Interstellar, KGF, Golmaal Returns. Suggest some movies for the query ";

      const searchResult = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: GPT_QUERY + body.searchString }],
    });
    
    return c.json({ searchResult });
    
  } catch (error) {
    console.log(error);
    return c.json({ error: "An error occurred while processing your request." }, 500);
  }
});

export default app;
