module.exports = {
  apps: [
    {
      name: "voyage-hack-agent-gamification-ui",
      script: "node",
      args: "server.js",
      instances: 1,
      exec_mode: "fork",
      watch: true,
      ignore_watch: ["node_modules", "public"],
      error_file: "../logs/gamification-error.log",
      out_file: "../logs/gamification-out.log",
      log_file: '../logs/gamification-combined.log',
      env: {
        NODE_ENV: "production"
      },
      watch_options: {
        "followSymlinks": false
      }
    }
  ]
};
