const config = {
    baseUrl: process.env.NODE_ENV === "production" ? "http://automation.singlequiver.com:4004/api" 
    : "https://localhost:4004/api",
    sourceBlogUrl: "https://www.singlequiver.com/enelpico/wp-json/wp/v2",
};

export default config;