export async function GET() {
  return Response.json({
    name: "ASEO MARKET",
    short_name: "AseoMarket",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b0b0b",
    icons: [{ src: "/favicon.ico", sizes: "64x64", type: "image/x-icon" }]
  });
}
