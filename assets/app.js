(function () {
  'use strict';
  var C = window.APP_CONFIG || {};
  var path = location.pathname;
  var m = path.match(/^(.*?)\/(?:tool|report)\//);
  var APP_BASE = m ? m[1] + '/' : (path.endsWith('/') ? path : path.replace(/[^/]*$/, ''));
  window.APP_BASE = APP_BASE;

  if (!window.supabase || !C.SUPABASE_URL || !C.SUPABASE_PUBLISHABLE_KEY) {
    window.sb = null;
    document.addEventListener('DOMContentLoaded', function () {
      var el = document.getElementById('fatal');
      if (el) { el.textContent = '页面配置没加载好，请刷新重试'; el.hidden = false; }
    });
    return;
  }

  var sb = window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
  });
  window.sb = sb;

  var ERR = [
    [/invalid login credentials/i, '邮箱或密码不对，再检查一遍'],
    [/email not confirmed/i, '邮箱还没确认，去邮箱点一下确认链接再登录'],
    [/user already registered/i, '这个邮箱已经注册过了，直接登录吧'],
    [/password should be at least/i, '密码至少 6 位'],
    [/unable to validate email|invalid email|email format/i, '邮箱格式不太对'],
    [/rate limit|too many requests/i, '操作太频繁了，歇一会儿再试'],
    [/failed to fetch|network|timeout|load failed/i, '连不上服务，等一下再试（可能是网络抽风）'],
    [/row-level security|permission denied|new row violates/i, '没有权限：可能没登录，或者中转台门禁没配好'],
    [/duplicate key/i, '这条任务已经提交过了'],
    [/invalid input syntax for type uuid/i, '任务号格式不对']
  ];
  window.humanError = function (e) {
    var msg = (e && (e.message || e.error_description || e.msg)) || String(e || '未知错误');
    for (var i = 0; i < ERR.length; i++) if (ERR[i][0].test(msg)) return ERR[i][1];
    return '出了点问题：' + msg;
  };

  window.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  window.requireSession = async function () {
    var r = await sb.auth.getSession();
    var s = r.data && r.data.session;
    if (!s) { location.replace(APP_BASE); return null; }
    return s;
  };

  window.fmtTime = function (iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    function p(n) { return n < 10 ? '0' + n : '' + n; }
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  };

  window.mountHeader = function (title) {
    var h = document.getElementById('app-header');
    if (!h) return;
    var name = C.APP_NAME || '关键词作战台';
    h.innerHTML = '<div class="hd-inner"><a class="brand" href="' + APP_BASE + '">' + window.esc(name) + '</a>'
      + '<span class="hd-sub">' + window.esc(title || '') + '</span>'
      + '<span class="hd-spacer"></span><span class="hd-user" id="hd-user"></span>'
      + '<button class="btn btn-ghost btn-sm" id="btn-logout" type="button">退出登录</button></div>';
    sb.auth.getUser().then(function (r) {
      var u = r.data && r.data.user;
      var el = document.getElementById('hd-user');
      if (el && u) el.textContent = u.email || '';
    });
    document.getElementById('btn-logout').onclick = async function () {
      await sb.auth.signOut();
      location.replace(APP_BASE);
    };
  };

  window.showMsg = function (id, text, kind) {
    var el = document.getElementById(id);
    if (!el) return;
    el.className = 'msg msg-' + (kind || 'info');
    el.textContent = text;
    el.hidden = false;
  };
  window.hideMsg = function (id) {
    var el = document.getElementById(id);
    if (el) el.hidden = true;
  };
})();
