(function () {
  const mobileQuery = window.matchMedia("(max-width: 860px)");
  const menuToggle = document.querySelector("[data-mobile-menu-toggle]");
  const desktopNav = document.querySelector("[data-desktop-nav]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const desktopDrops = desktopNav ? Array.from(desktopNav.querySelectorAll(".drop")) : [];
  const mobileDrops = mobileNav ? Array.from(mobileNav.querySelectorAll(".drop")) : [];

  const consentSchemaVersion = "1";
  const consentStorageKey = "apes-cookie-consent-v1";
  const cookiePolicyHref = "/policies/cookies-policy/";
  const analyticsId = "G-FKGRRCJ0QE";
  const oneSignalAppId = "1526fa8e-132a-46ff-90b2-94386a285bde";
  const chatwootBaseUrl = "https://chatwoot.workspace.apes.org.uk";
  const chatwootToken = "tumZummeGRYAFXGaUW6EDTAV";
  const donorboxWidgetSrc = "https://donorbox.org/widgets.js";

  const consentLabels = {
    necessary: "Strictly necessary",
    preferences: "Preferences and functionality",
    analytics: "Analytics",
    marketing: "Marketing",
    thirdParty: "Third-party services",
  };

  const consentDescriptions = {
    necessary:
      "Keeps consent records and security working.",
    preferences:
      "Remembers cookie choices and settings.",
    analytics:
      "Helps us improve content.",
    marketing:
      "Supports campaign tools.",
    thirdParty:
      "Loads chat and notifications.",
  };

  const consentLoaders = {
    analytics: false,
    marketing: false,
    thirdParty: false,
  };

  const state = {
    record: null,
    controls: null,
    banner: null,
    panel: null,
    closeButton: null,
    savedFocus: null,
  };

  const canUseStorage = () => {
    try {
      const testKey = "__apes_cookie_test__";
      window.localStorage.setItem(testKey, "1");
      window.localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  };

  const normaliseChoices = (choices = {}) => ({
    necessary: true,
    preferences: Boolean(choices.preferences),
    analytics: Boolean(choices.analytics),
    marketing: Boolean(choices.marketing),
    thirdParty: Boolean(choices.thirdParty),
  });

  const createRecord = (choices, updatedAt = new Date().toISOString()) => ({
    version: consentSchemaVersion,
    updatedAt,
    choices: normaliseChoices(choices),
  });

  const readStoredConsent = () => {
    if (!canUseStorage()) return null;

    try {
      const raw = window.localStorage.getItem(consentStorageKey);
      if (!raw) return null;

      const parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== consentSchemaVersion || !parsed.choices) {
        return null;
      }

      return createRecord(parsed.choices, parsed.updatedAt || new Date().toISOString());
    } catch {
      return null;
    }
  };

  const consentAllows = (category) => Boolean(state.record && state.record.choices[category]);

  const createScript = (src, attributes = {}) => {
    if (document.querySelector(`script[data-apes-consent-src="${src}"]`)) {
      return null;
    }

    const script = document.createElement("script");
    script.src = src;
    Object.entries(attributes).forEach(([name, value]) => {
      if (value === null || value === undefined || value === false) return;
      if (name === "text") return;
      script.setAttribute(name, String(value));
    });
    script.dataset.apesConsentSrc = src;
    document.head.appendChild(script);
    return script;
  };

  const loadAnalytics = () => {
    if (consentLoaders.analytics || !consentAllows("analytics")) return;
    consentLoaders.analytics = true;

    if (window.gtag) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    createScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`, {
      async: true,
    });

    window.gtag("js", new Date());
    window.gtag("config", analyticsId, { anonymize_ip: true });
  };

  const loadDonorboxWidget = () => {
    if (consentLoaders.marketing || !consentAllows("marketing")) return;
    consentLoaders.marketing = true;

    createScript(donorboxWidgetSrc, {
      async: true,
      type: "module",
    });

    if (document.querySelector('dbox-widget[data-apes-donorbox="sticky-popup"]')) {
      return;
    }

    const widget = document.createElement("dbox-widget");
    widget.dataset.apesDonorbox = "sticky-popup";
    widget.setAttribute("interval", "1 M");
    widget.setAttribute("campaign", "donations-909664");
    widget.setAttribute("type", "popup");
    widget.setAttribute("button-label", "Donate Now!");
    widget.setAttribute("button-type", "sticky");
    widget.setAttribute("button-color", "#008000");
    widget.setAttribute("button-size", "medium");
    widget.setAttribute("sticky-position", "left");
    widget.setAttribute("show-icon", "");
    document.body.appendChild(widget);
  };

  const loadOneSignal = () => {
    if (consentLoaders.thirdParty || !consentAllows("thirdParty")) return;
    consentLoaders.thirdParty = true;

    window.OneSignal = window.OneSignal || [];
    createScript("https://cdn.onesignal.com/sdks/OneSignalSDK.js", {
      defer: true,
    });

    window.OneSignal.push(function () {
      window.OneSignal.init({
        appId: oneSignalAppId,
      });
    });
  };

  const loadChatwoot = () => {
    if (!consentAllows("thirdParty") || window.chatwootSDK) return;

    window.chatwootSettings = {
      position: "right",
      type: "standard",
      launcherTitle: "",
    };

    const script = createScript(`${chatwootBaseUrl}/packs/js/sdk.js`, { async: true });
    if (!script) return;

    script.addEventListener("load", () => {
      if (window.chatwootSDK) {
        window.chatwootSDK.run({ websiteToken: chatwootToken, baseUrl: chatwootBaseUrl });
      }
    });
  };

  const loadApprovedIntegrations = () => {
    if (!state.record) return;

    if (consentAllows("analytics")) {
      loadAnalytics();
    }

    if (consentAllows("marketing")) {
      loadDonorboxWidget();
    }

    if (consentAllows("thirdParty")) {
      loadChatwoot();
      loadOneSignal();
    }
  };

  const hideCookieBanner = () => {
    if (state.banner) state.banner.hidden = true;
  };

  const closeCookiePanel = () => {
    if (!state.panel) return;
    state.panel.hidden = true;
    if (!state.record && state.banner) state.banner.hidden = false;
    if (state.savedFocus instanceof HTMLElement) {
      state.savedFocus.focus();
    }
  };

  const acceptAllConsent = () => {
    saveConsent({
      preferences: true,
      analytics: true,
      marketing: true,
      thirdParty: true,
    });
    hideCookieBanner();
    closeCookiePanel();
  };

  const syncConsentUI = () => {
    if (!state.panel) return;

    Object.keys(consentLabels).forEach((category) => {
      const toggle = state.panel.querySelector(`[data-cookie-toggle="${category}"]`);
      if (!toggle) return;
      toggle.checked = Boolean(state.record && state.record.choices[category]);
      toggle.disabled = category === "necessary";
    });

    if (!state.record) {
      if (state.banner) state.banner.hidden = false;
    } else {
      hideCookieBanner();
    }
  };

  const saveConsent = (choices) => {
    state.record = createRecord(choices);

    if (canUseStorage()) {
      window.localStorage.setItem(consentStorageKey, JSON.stringify(state.record));
    }

    document.documentElement.dataset.cookieConsent = "true";
    document.documentElement.dataset.cookieConsentVersion = consentSchemaVersion;
    syncConsentUI();
    loadApprovedIntegrations();
    window.dispatchEvent(
      new CustomEvent("apes-cookie-consent-change", { detail: { record: state.record } })
    );
    return state.record;
  };

  const createCookieControls = () => {
    if (state.controls) return state.controls;

    const root = document.createElement("section");
    root.className = "cookie-consent";
    root.dataset.cookieConsentRoot = "true";
    root.setAttribute("aria-live", "polite");

    root.innerHTML = `
      <div class="cookie-consent__banner" data-cookie-banner hidden>
        <div class="cookie-consent__banner-copy">
          <p class="cookie-consent__eyebrow">Cookie choices</p>
          <h2 class="cookie-consent__title">We use cookies to support the site and your preferences.</h2>
          <p class="cookie-consent__text">Strictly necessary cookies keep the website working. Optional cookies are only used if you choose to allow them.</p>
          <p class="cookie-consent__links"><a href="${cookiePolicyHref}">Read the cookies policy</a></p>
        </div>
        <div class="cookie-consent__actions">
          <button class="btn btn-outline" type="button" data-cookie-reject>Reject non-essential</button>
          <button class="btn btn-outline" type="button" data-cookie-manage>Manage preferences</button>
          <button class="btn btn-primary" type="button" data-cookie-accept>Accept all</button>
        </div>
      </div>
      <div class="cookie-consent__panel" data-cookie-panel hidden role="dialog" aria-modal="true" aria-labelledby="cookie-panel-title">
        <div class="cookie-consent__panel-header">
          <div>
            <p class="cookie-consent__eyebrow">Cookie preferences</p>
            <h2 class="cookie-consent__title" id="cookie-panel-title">Manage your choices</h2>
          </div>
          <button class="cookie-consent__close" type="button" data-cookie-close aria-label="Close cookie preferences">Close</button>
        </div>
        <p class="cookie-consent__text">You can update your preferences any time. Strictly necessary cookies stay on because the site needs them to work.</p>
        <div class="cookie-consent__choices" role="group" aria-label="Cookie categories">
          ${Object.keys(consentLabels)
            .map(
              (category) => `
                <label class="cookie-consent__choice${category === "necessary" ? " is-required" : ""}">
                  <span>
                    <strong>${consentLabels[category]}</strong>
                    <span>${consentDescriptions[category]}</span>
                  </span>
                  <input type="checkbox" data-cookie-toggle="${category}" ${
                category === "necessary" ? "checked disabled" : ""
              }>
                </label>
              `
            )
            .join("")}
        </div>
        <div class="cookie-consent__actions cookie-consent__actions--panel">
          <button class="btn btn-outline" type="button" data-cookie-reject>Reject non-essential</button>
          <button class="btn btn-outline" type="button" data-cookie-accept-all>Accept all</button>
          <button class="btn btn-primary" type="button" data-cookie-save>Save preferences</button>
        </div>
      </div>
      <button class="cookie-consent__settings" type="button" data-cookie-open aria-label="Cookie settings" title="Cookie settings">
        <span class="cookie-consent__settings-icon" aria-hidden="true">🍪</span>
      </button>
    `;

    document.body.appendChild(root);
    state.controls = root;
    state.banner = root.querySelector("[data-cookie-banner]");
    state.panel = root.querySelector("[data-cookie-panel]");
    state.closeButton = root.querySelector("[data-cookie-close]");

    root.querySelectorAll("[data-cookie-accept]").forEach((button) => {
      button.addEventListener("click", () => {
        acceptAllConsent();
      });
    });

    root.querySelectorAll("[data-cookie-accept-all]").forEach((button) => {
      button.addEventListener("click", () => {
        acceptAllConsent();
      });
    });

    root.querySelectorAll("[data-cookie-reject]").forEach((button) => {
      button.addEventListener("click", () => {
        saveConsent({ preferences: false, analytics: false, marketing: false, thirdParty: false });
        hideCookieBanner();
        closeCookiePanel();
      });
    });

    root.querySelectorAll("[data-cookie-manage], [data-cookie-open]").forEach((button) => {
      button.addEventListener("click", () => {
        openCookiePanel();
      });
    });

    if (state.closeButton) {
      state.closeButton.addEventListener("click", () => {
        closeCookiePanel();
      });
    }

    root.querySelectorAll("[data-cookie-save]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextChoices = {
          preferences: Boolean(root.querySelector('[data-cookie-toggle="preferences"]')?.checked),
          analytics: Boolean(root.querySelector('[data-cookie-toggle="analytics"]')?.checked),
          marketing: Boolean(root.querySelector('[data-cookie-toggle="marketing"]')?.checked),
          thirdParty: Boolean(root.querySelector('[data-cookie-toggle="thirdParty"]')?.checked),
        };

        saveConsent(nextChoices);
        hideCookieBanner();
        closeCookiePanel();
      });
    });

    root.querySelectorAll("[data-cookie-toggle]").forEach((input) => {
      input.addEventListener("change", () => {
        if (input.dataset.cookieToggle === "necessary") {
          input.checked = true;
        }
      });
    });

    root.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (state.panel && !state.panel.hidden) {
        closeCookiePanel();
      }
    });

    syncConsentUI();
    return root;
  };

  const showCookieBanner = () => {
    createCookieControls();
    if (state.banner) state.banner.hidden = false;
  };

  const openCookiePanel = () => {
    createCookieControls();
    if (!state.panel) return;

    state.savedFocus = document.activeElement;
    syncConsentUI();
    state.panel.hidden = false;
    hideCookieBanner();

    const firstFocusable = state.panel.querySelector("button:not([disabled]), input:not([disabled])");
    if (firstFocusable instanceof HTMLElement) {
      firstFocusable.focus();
    }
  };

  const initCookieConsent = () => {
    state.record = readStoredConsent();
    document.documentElement.dataset.cookieConsent = state.record ? "true" : "false";
    document.documentElement.dataset.cookieConsentVersion = consentSchemaVersion;
    createCookieControls();
    syncConsentUI();
    loadApprovedIntegrations();
    if (!state.record) {
      showCookieBanner();
    }
  };

  const openPopupWindow = (url, popupName, width, height) => {
    const left = Math.max(0, Math.floor((window.screen.width - width) / 2));
    const top = Math.max(0, Math.floor((window.screen.height - height) / 2));
    const features = `popup=yes,width=${width},height=${height},left=${left},top=${top},noopener,noreferrer`;
    const popup = window.open(url, popupName, features);
    if (!popup) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    popup.focus();
  };

  const bindPopupLinks = (selector, defaults) => {
    document.querySelectorAll(selector).forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const href = link.getAttribute("href");
        if (!href) return;

        const popupName = link.dataset.popupName || defaults.name;
        const popupWidth = Number(link.dataset.popupWidth || defaults.width);
        const popupHeight = Number(link.dataset.popupHeight || defaults.height);

        openPopupWindow(href, popupName, popupWidth, popupHeight);
      });
    });
  };

  const syncBodyState = () => {
    document.body.classList.toggle(
      "nav-open",
      Boolean(mobileNav && mobileNav.classList.contains("open") && mobileQuery.matches)
    );
  };

  const closeDrop = (drop) => {
    if (!drop) return;
    drop.classList.remove("open");
    const trigger = drop.querySelector(".drop-trigger");
    const panel = drop.querySelector(".drop-panel");
    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
    }
    if (panel) {
      panel.style.left = "";
      panel.style.right = "";
      panel.style.transform = "";
    }
  };

  const closeDrops = (drops, except) => {
    drops.forEach((drop) => {
      if (drop !== except) closeDrop(drop);
    });
  };

  const positionDesktopPanel = (drop) => {
    if (!drop || mobileQuery.matches || !desktopNav || !desktopNav.contains(drop)) return;
    const panel = drop.querySelector(".drop-panel");
    if (!panel) return;

    if (panel.classList.contains("mega-panel")) {
      panel.style.left = "50%";
      panel.style.right = "auto";
      panel.style.transform = "translateX(-50%)";

      const rect = panel.getBoundingClientRect();
      let shift = 0;
      if (rect.left < 16) {
        shift = 16 - rect.left;
      } else if (rect.right > window.innerWidth - 16) {
        shift = window.innerWidth - 16 - rect.right;
      }

      if (shift !== 0) {
        panel.style.transform = `translateX(calc(-50% + ${shift}px))`;
      }
      return;
    }

    panel.style.left = "0";
    panel.style.right = "auto";
    panel.style.transform = "";
    const rect = panel.getBoundingClientRect();
    if (rect.right > window.innerWidth - 16) {
      panel.style.left = "auto";
      panel.style.right = "0";
    }
  };

  const closeMobileNav = ({ restoreFocus = false } = {}) => {
    if (!mobileNav || !menuToggle) return;
    mobileNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    closeDrops(mobileDrops);
    syncBodyState();
    if (restoreFocus) {
      menuToggle.focus();
    }
  };

  const syncNavMode = () => {
    if (!mobileQuery.matches) {
      if (mobileNav) {
        mobileNav.classList.remove("open");
      }
      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
      }
      closeDrops(mobileDrops);
    } else {
      closeDrops(desktopDrops);
    }
    syncBodyState();
  };

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      if (!open) {
        closeDrops(mobileDrops);
      }
      syncBodyState();
    });
  }

  desktopDrops.forEach((drop) => {
    const trigger = drop.querySelector(":scope > .drop-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const opening = !drop.classList.contains("open");
      closeDrops(desktopDrops, drop);

      if (!opening) {
        closeDrop(drop);
        return;
      }

      drop.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
      positionDesktopPanel(drop);
    });
  });

  mobileDrops.forEach((drop) => {
    const trigger = drop.querySelector(":scope > .drop-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const opening = !drop.classList.contains("open");
      closeDrops(mobileDrops, drop);

      if (!opening) {
        closeDrop(drop);
        return;
      }

      drop.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (
      (desktopNav && desktopNav.contains(target)) ||
      (mobileNav && mobileNav.contains(target)) ||
      (menuToggle && menuToggle.contains(target))
    ) {
      return;
    }

    if (mobileQuery.matches) {
      closeMobileNav();
      return;
    }

    closeDrops(desktopDrops);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeDrops(desktopDrops);
    closeDrops(mobileDrops);
    if (mobileNav && mobileNav.classList.contains("open")) {
      closeMobileNav({ restoreFocus: true });
    }
  });

  if (desktopNav) {
    desktopNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeDrops(desktopDrops);
      });
    });
  }

  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileNav();
      });
    });
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target instanceof Element
      ? event.target.closest("[data-cookie-settings-trigger]")
      : null;
    if (!trigger) return;
    event.preventDefault();
    openCookiePanel();
  });

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", syncNavMode);
  } else if (typeof mobileQuery.addListener === "function") {
    mobileQuery.addListener(syncNavMode);
  }

  window.addEventListener("resize", () => {
    const openDrop = desktopDrops.find((drop) => drop.classList.contains("open"));
    if (openDrop && !mobileQuery.matches) {
      positionDesktopPanel(openDrop);
    }
  });

  window.addEventListener("scroll", () => {
    const openDrop = desktopDrops.find((drop) => drop.classList.contains("open"));
    if (openDrop && !mobileQuery.matches) {
      positionDesktopPanel(openDrop);
    }
  });

  bindPopupLinks(".js-popup-window", {
    name: "apes_popup_window",
    width: 720,
    height: 820,
  });

  bindPopupLinks(".js-contact-ticket", {
    name: "apes_contact_ticket",
    width: 560,
    height: 760,
  });

  const isLocalFilePreview = window.location.protocol === "file:";
  const isLocalDirectoryLink = (href) => {
    if (!href) return false;
    if (/^(#|mailto:|tel:|javascript:|https?:|\/\/)/.test(href)) return false;
    return href.endsWith("/") || href === "." || href === "./" || href === ".." || href === "../";
  };

  if (isLocalFilePreview) {
    document.querySelectorAll("a").forEach((link) => {
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.classList.contains("js-popup-window")) return;
      if (link.target && link.target !== "_self") return;

      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!isLocalDirectoryLink(href)) return;

        event.preventDefault();
        link.setAttribute("href", href.replace(/\/?$/, "/") + "index.html");
        window.location.href = link.getAttribute("href");
      });
    });
  }

  const changeLogRoot = document.querySelector("[data-change-log-root]");
  if (changeLogRoot) {
    const search = changeLogRoot.querySelector("#changeLogSearch");
    const entries = Array.from(changeLogRoot.querySelectorAll(".release-card"));
    const filterButtons = Array.from(changeLogRoot.querySelectorAll("[data-filter]"));
    const expandAll = changeLogRoot.querySelector('[data-action="expand-all"]');
    const collapseAll = changeLogRoot.querySelector('[data-action="collapse-all"]');
    const empty = changeLogRoot.querySelector("[data-change-log-empty]");
    let activeFilter = "all";

    const matchesSearch = (entry) => {
      if (!search) return true;
      const term = search.value.trim().toLowerCase();
      if (!term) return true;
      return entry.textContent.toLowerCase().includes(term);
    };

    const matchesFilter = (entry) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "current") return entry.dataset.current === "true";
      const haystack = [
        entry.dataset.status,
        entry.dataset.types,
        entry.dataset.impact,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(activeFilter);
    };

    const updateEntries = () => {
      let visibleCount = 0;
      entries.forEach((entry) => {
        const visible = matchesSearch(entry) && matchesFilter(entry);
        entry.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      if (empty) {
        empty.hidden = visibleCount !== 0;
      }
    };

    if (search) {
      search.addEventListener("input", updateEntries);
    }

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.filter || "all";
        filterButtons.forEach((item) => {
          item.setAttribute("aria-pressed", String(item === button));
        });
        updateEntries();
      });
    });

    if (expandAll) {
      expandAll.addEventListener("click", () => {
        entries.forEach((entry) => {
          if (!entry.hidden) entry.open = true;
        });
      });
    }

    if (collapseAll) {
      collapseAll.addEventListener("click", () => {
        entries.forEach((entry) => {
          if (!entry.hidden) entry.open = false;
        });
      });
    }

    updateEntries();
  }

  const hydrateClinicEmails = () => {
    document.querySelectorAll(".js-clinic-email").forEach((link) => {
      const user = link.getAttribute("data-email-user");
      const domain = link.getAttribute("data-email-domain");
      if (!user || !domain) return;
      const address = `${user}@${domain}`;
      link.setAttribute("href", `mailto:${address}`);
      link.setAttribute("rel", "nofollow");
      link.textContent = address;
    });
  };

  hydrateClinicEmails();

  const cards = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    cards.forEach((card, index) => {
      card.style.transitionDelay = `${Math.min(index * 40, 300)}ms`;
      observer.observe(card);
    });
  } else {
    cards.forEach((card) => card.classList.add("is-visible"));
  }

  initCookieConsent();
})();

