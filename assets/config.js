// 仅含 Supabase 公开钥匙（publishable），按设计可暴露在浏览器；敏感钥匙一律只在服务器 .env
window.APP_CONFIG = {
  "APP_NAME": "关键词作战台",
  "SUPABASE_URL": "https://nvmjsxnmstqkfvxgqvex.supabase.co",
  "SUPABASE_PUBLISHABLE_KEY": "sb_publishable_VjvbwzKkaWBh3L2Gu1_AHA_kXiR1wqd",
  "STORAGE_BUCKET": "reports-inbox",
  "TASK_TABLE": "tasks",
  "MAX_UPLOAD_BYTES": 10485760,
  "REFRESH_MS": 30000,
  "PAGE_SIZE": 10
};
