import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://mwequdymbuaffcfuejya.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13ZXF1ZHltYnVhZmZjZnVlanlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2MDQxMjgsImV4cCI6MjAzMTE4MDEyOH0.BNvuQGfCV5jAlaPSZIqXEmec029cr6vvcpd9DtknriM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
