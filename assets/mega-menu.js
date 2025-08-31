function trapFocus(container, focusFirst) {
  var selectors =
    'a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])';
  var nodes = container.querySelectorAll(selectors);
  if (!nodes.length) return;
  var first = nodes[0],
    last = nodes[nodes.length - 1];
  function key(e) {
    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    if (e.key === "Escape") {
      container.dispatchEvent(new CustomEvent("menu:close", { bubbles: true }));
    }
  }
  container.addEventListener("keydown", key);
  if (focusFirst) first.focus();
  return function () {
    container.removeEventListener("keydown", key);
  };
}

document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector("[data-header]");
  if (!header) return;
  var triggers = header.querySelectorAll("[data-mega-trigger]");
  var mobileToggle = header.querySelector("[data-menu-toggle]");
  var mobileMenu = header.querySelector("[data-mobile-menu]");
  var activeMenu = null;
  var releaseTrap = null;

  function open(menu, btn) {
    close();
    menu.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    activeMenu = menu;
    releaseTrap = trapFocus(menu);
    document.addEventListener("click", outside);
  }
  function close() {
    if (!activeMenu) return;
    var btn = header.querySelector('[aria-controls="' + activeMenu.id + '"]');
    activeMenu.hidden = true;
    if (btn) btn.setAttribute("aria-expanded", "false");
    if (releaseTrap) releaseTrap();
    activeMenu = null;
    document.removeEventListener("click", outside);
  }
  function outside(e) {
    if (
      activeMenu &&
      !activeMenu.contains(e.target) &&
      !header.contains(e.target)
    ) {
      close();
    }
  }

  triggers.forEach(function (btn) {
    var menu = document.getElementById(btn.getAttribute("aria-controls"));
    btn.addEventListener("mouseenter", function () {
      open(menu, btn);
    });
    btn.addEventListener("focus", function () {
      open(menu, btn);
    });
    btn.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
    menu.addEventListener("mouseleave", close);
    menu.addEventListener("menu:close", close);
  });

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", function () {
      var expanded = mobileToggle.getAttribute("aria-expanded") === "true";
      mobileToggle.setAttribute("aria-expanded", String(!expanded));
      mobileMenu.hidden = expanded;
      mobileMenu.classList.toggle("open", !expanded);
      if (!expanded) {
        releaseTrap = trapFocus(mobileMenu, true);
      } else if (releaseTrap) {
        releaseTrap();
      }
    });
    mobileMenu.addEventListener("menu:close", function () {
      mobileToggle.click();
      mobileToggle.focus();
    });
  }
});
