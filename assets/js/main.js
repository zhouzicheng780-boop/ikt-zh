/* ============================================================
   IKT 地下基础设施研究院 · 中文版
   站点脚本：移动端导航 / 课程筛选与检索
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 移动端汉堡菜单 ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // 窄屏下，带子菜单的栏目点击展开/收起子菜单
    nav.querySelectorAll('.has-sub > a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          link.parentElement.classList.toggle('sub-open');
        }
      });
    });

    // 视口拉宽时收起移动菜单，避免状态残留
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        nav.querySelectorAll('.sub-open').forEach(function (li) {
          li.classList.remove('sub-open');
        });
      }
    });
  }

  /* ---------- 研讨会列表：按类型筛选 + 关键词检索 ---------- */
  var courseList = document.querySelector('[data-course-list]');
  if (courseList) {
    var items = Array.prototype.slice.call(courseList.querySelectorAll('.course'));
    var buttons = Array.prototype.slice.call(document.querySelectorAll('.filter-btn'));
    var searchInput = document.querySelector('.filter-search input');
    var emptyTip = document.querySelector('.course-empty');
    var currentType = 'all';

    function applyFilter() {
      var keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
      var shown = 0;

      items.forEach(function (item) {
        var typeOk = currentType === 'all' || item.getAttribute('data-type') === currentType;
        var text = item.textContent.toLowerCase();
        var kwOk = !keyword || text.indexOf(keyword) !== -1;
        var visible = typeOk && kwOk;
        item.style.display = visible ? '' : 'none';
        if (visible) shown++;
      });

      if (emptyTip) emptyTip.classList.toggle('show', shown === 0);
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentType = btn.getAttribute('data-filter');
        buttons.forEach(function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        applyFilter();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', applyFilter);
    }
  }

  /* ---------- 页脚年份 ---------- */
  var yearSpan = document.querySelector('[data-year]');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();
