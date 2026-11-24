// 仅含 Supabase 公开钥匙（publishable），按设计可暴露在浏览器；敏感钥匙一律只在服务器 .env
window.APP_CONFIG = {
  "APP_NAME": "AMZ增长工作室",
  "SUPABASE_URL": "https://nvmjsxnmstqkfvxgqvex.supabase.co",
  "SUPABASE_PUBLISHABLE_KEY": "sb_publishable_VjvbwzKkaWBh3L2Gu1_AHA_kXiR1wqd",
  "STORAGE_BUCKET": "reports-inbox",
  "TASK_TABLE": "tasks",
  "STEP_TABLE": "module_steps",
  "MAX_UPLOAD_BYTES": 10485760,
  "REFRESH_MS": 30000,
  "PAGE_SIZE": 10
};

// 模块注册表：顶部菜单与工作台入口都从这里读。
// 新增模块只加一条并把 enabled 设为 true；enabled=false 的模块不在任何入口出现。
window.APP_MODULES = [
  { "id": "keyword", "name": "关键词作战台", "path": "tool/", "aliases": ["task/", "report/"], "desc": "上传广告报表，生成关键词诊断与动作清单", "enabled": true },
  { "id": "voc", "name": "用户洞察", "path": "voc/", "aliases": ["voc/report/"], "desc": "输入 ASIN，逐条理解真实评论中的需求、场景与购买动机", "enabled": true },
  { "id": "search", "name": "搜索词分析看板", "path": "search/", "desc": "搜索词趋势与流量结构看板", "enabled": false }
];
