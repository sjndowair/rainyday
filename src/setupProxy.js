const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/ws",
    createProxyMiddleware({
      target:
        process.env.NODE_ENV === "production"
          ? "wss://sjndowair.github.io/rainyday" // 프로덕션 환경
          : "ws://localhost:3000", // 개발 환경
      ws: true, // WebSocket 프로토콜 사용 설정
      logLevel: "silent", // 로그 출력 비활성화
      secure: process.env.NODE_ENV === "production", // production에서는 SSL/TLS 사용
    })
  );

  app.use(
    ["/api/upbit", "/rainyday/api/upbit"],
    createProxyMiddleware({
      target: "https://api.upbit.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api/upbit": "",
        "^/rainyday/api/upbit": "",
      },
    })
  );
};
