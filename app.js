(function () {
  "use strict";

  const savedHelpful = readHelpful();
  const categoryGrid = document.getElementById("category-grid");
  const eventList = document.getElementById("event-list");
  const listingGrid = document.getElementById("listing-grid");
  const sponsoredGrid = document.getElementById("sponsored-grid");
  const emptyMessage = document.getElementById("empty-message");
  const categoryView = document.getElementById("category-view");
  const townMeterView = document.getElementById("town-meter-view");
  const businessView = document.getElementById("business-view");
  const posterSlider = document.getElementById("poster-slider");
  const foodFilters = document.getElementById("food-filters");
  const genericCategoryContent = document.getElementById("generic-category-content");
  const marketplaceContent = document.getElementById("marketplace-content");
  const newcomerChecklist = document.getElementById("newcomer-checklist");
  const checklistGroups = document.getElementById("checklist-groups");
  const marketGrid = document.getElementById("market-grid");
  const marketEmpty = document.getElementById("market-empty");
  const postDialog = document.getElementById("post-item-dialog");
  const postForm = document.getElementById("post-item-form");
  const postKind = document.getElementById("post-kind");
  const postPrice = document.getElementById("post-price");
  const postPhoto = document.getElementById("post-photo");
  const photoPreview = document.getElementById("photo-preview");
  const photoPreviewWrap = document.getElementById("photo-preview-wrap");
  const homeSearchInput = document.getElementById("home-search-input");
  const homeSearchResults = document.getElementById("home-search-results");
  let audience = "visiting";
  let activeFilter = "All";
  let marketFilter = "all";
  let postedMarketItems = readMarketplacePosts();
  let completedChecklist = readCompletedChecklist();
  let selectedPhotoFile = null;
  let selectedPhotoUrl = "";

  document.title = STARTUP.name + " | Antigonish, Nova Scotia";
  document.getElementById("pitch").textContent = STARTUP.pitch;
  renderTownPicker();
  renderAd();
  renderEvents();
  renderCategories();
  renderBusinessPlans();
  homeSearchInput.addEventListener("input", renderHomeSearch);
  posterSlider.addEventListener("input", renderGrowthProjections);
  document.getElementById("council-demo-button").addEventListener("click", showBusinessDemoMessage);
  document.querySelectorAll("[data-market-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      marketFilter = button.dataset.marketFilter;
      document.querySelectorAll("[data-market-filter]").forEach(function (filterButton) {
        const selected = filterButton === button;
        filterButton.classList.toggle("is-active", selected);
        filterButton.setAttribute("aria-pressed", selected ? "true" : "false");
      });
      renderMarketItems();
    });
  });
  document.getElementById("open-post-form").addEventListener("click", function () { postDialog.showModal(); });
  document.getElementById("close-post-form").addEventListener("click", closePostDialog);
  document.getElementById("cancel-post-form").addEventListener("click", closePostDialog);
  postKind.addEventListener("change", updatePostPrice);
  postPhoto.addEventListener("change", showPhotoPreview);
  postForm.addEventListener("submit", submitMarketPost);
  updatePostPrice();
  document.querySelectorAll("[data-audience]").forEach(function (button) {
    button.addEventListener("click", function () {
      audience = button.dataset.audience;
      document.querySelectorAll("[data-audience]").forEach(function (option) {
        const selected = option === button;
        option.classList.toggle("is-active", selected);
        option.setAttribute("aria-pressed", selected ? "true" : "false");
      });
      renderCategories();
    });
  });

  window.addEventListener("hashchange", showView);
  window.addEventListener("storage", function (event) {
    if (event.key === "localTownMarketplacePosts") {
      postedMarketItems = readMarketplacePosts();
      if (!townMeterView.hidden) renderTownMeter();
      if (!marketplaceContent.hidden) renderMarketItems();
    }
  });
  showView();

  function readHelpful() {
    try {
      return JSON.parse(localStorage.getItem("localTownHelpful") || "[]");
    } catch (error) {
      return [];
    }
  }

  function readMarketplacePosts() {
    try {
      const saved = JSON.parse(localStorage.getItem("localTownMarketplacePosts") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch (error) {
      return [];
    }
  }

  function readCompletedChecklist() {
    try {
      const saved = JSON.parse(localStorage.getItem("localTownNewcomerChecklist") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch (error) {
      return [];
    }
  }

  function renderCategories() {
    const priority = CATEGORY_ORDER[audience];
    const ordered = CATEGORIES.slice().sort(function (first, second) {
      return priority.indexOf(first.id) - priority.indexOf(second.id);
    });
    categoryGrid.replaceChildren.apply(categoryGrid, ordered.map(function (category) {
      const link = document.createElement("a");
      link.className = "category-tile accent-" + category.id;
      link.href = "#category-" + category.id;

      const iconCircle = document.createElement("span");
      iconCircle.className = "category-icon-circle";
      iconCircle.append(createCategoryIcon(category.id));

      const title = document.createElement("strong");
      title.textContent = category.name;

      const arrow = document.createElement("span");
      arrow.className = "tile-arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "↗";

      link.append(iconCircle, title, arrow);
      return link;
    }));
  }

  function createCategoryIcon(categoryId) {
    const shapes = {
      "events": [
        ["rect", { x: "5", y: "7", width: "22", height: "20", rx: "2" }],
        ["path", { d: "M10 4v6M22 4v6M5 13h22M10 18h.01M16 18h.01M22 18h.01" }]
      ],
      "food-drink": [
        ["path", { d: "M7 4v7m-3-7v5c0 2 1.3 3 3 3s3-1 3-3V4M7 12v16M22 4c-2 2-3 5-3 9h4V4M21 13v15" }]
      ],
      "local-attractions": [
        ["path", { d: "M4 13 16 5l12 8M7 12v13m6-17v17m6-17v17m6-13v13M4 25h24M2 29h28" }]
      ],
      "outdoors-nature": [
        ["circle", { cx: "19", cy: "5", r: "2.5" }],
        ["path", { d: "m17 9-4 6 5 3 3-4 4 3m-12-5-5 3m9 2-5 7m5-6 6 1 3 6M8 11 4 29" }]
      ],
      "schools-daycares": [
        ["path", { d: "M3 13 16 4l13 9M6 12v16h20V12M3 28h26M11 28v-8h10v8M10 15h2m8 0h2" }]
      ],
      "services": [
        ["path", { d: "M20 5a7 7 0 0 0-8.8 8.5L4 20.7A3 3 0 1 0 8.3 25l7.2-7.2A7 7 0 0 0 24 9l-4 4-4-4 4-4ZM6 22l2 2" }]
      ],
      "health-essentials": [
        ["rect", { x: "4", y: "4", width: "24", height: "24", rx: "5" }],
        ["path", { d: "M16 9v14M9 16h14" }]
      ],
      "buy-sell": [
        ["path", { d: "M5 11h22l-2 17H7L5 11ZM11 11V8a5 5 0 0 1 10 0v3" }]
      ],
      "newcomer-guide": [
        ["path", { d: "M16 29s10-9 10-17a10 10 0 1 0-20 0c0 8 10 17 10 17Z" }],
        ["circle", { cx: "16", cy: "12", r: "3" }]
      ]
    };
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "category-icon");
    svg.setAttribute("viewBox", "0 0 32 32");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.8");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    shapes[categoryId].forEach(function (shape) {
      const element = document.createElementNS("http://www.w3.org/2000/svg", shape[0]);
      Object.keys(shape[1]).forEach(function (attribute) {
        element.setAttribute(attribute, shape[1][attribute]);
      });
      svg.appendChild(element);
    });
    return svg;
  }

  function renderHomeSearch() {
    const query = homeSearchInput.value.trim().toLowerCase();
    homeSearchResults.replaceChildren();
    homeSearchResults.hidden = query.length === 0;
    if (!query) return;

    const matches = LISTINGS.filter(function (listing) {
      const category = CATEGORIES.find(function (item) { return item.id === listing.category; });
      return listing.name.toLowerCase().includes(query) || category.name.toLowerCase().includes(query);
    });
    if (matches.length === 0) {
      const empty = document.createElement("p");
      empty.className = "search-empty";
      empty.textContent = "No local listings match that search.";
      homeSearchResults.append(empty);
      return;
    }

    matches.forEach(function (listing) {
      const category = CATEGORIES.find(function (item) { return item.id === listing.category; });
      const result = document.createElement("a");
      result.className = "search-result";
      result.href = "#category-" + category.id;
      const name = document.createElement("strong");
      name.textContent = listing.name;
      const categoryName = document.createElement("span");
      categoryName.textContent = category.name;
      result.append(name, categoryName);
      homeSearchResults.append(result);
    });
  }

  function renderTownPicker() {
    const activeTown = TOWNS.find(function (town) { return town.active; });
    const picker = document.getElementById("town-picker");
    picker.replaceChildren.apply(picker, TOWNS.map(function (town) {
      const option = document.createElement("option");
      option.value = town.id;
      option.textContent = town.active ? town.name : town.name + " · coming soon";
      option.disabled = !town.active;
      return option;
    }));
    picker.value = activeTown.id;
    document.getElementById("active-town").textContent = activeTown.name;
    document.getElementById("town-region").textContent = activeTown.region;
  }

  function renderAd() {
    document.getElementById("ad-kicker").textContent = AD.kicker;
    document.getElementById("ad-name").textContent = AD.name;
    document.getElementById("ad-description").textContent = AD.description;
    document.getElementById("ad-cta").textContent = AD.callToAction;
    document.querySelector(".ad-banner").href = "#category-" + AD.category;
  }

  function renderEvents() {
    eventList.replaceChildren.apply(eventList, EVENTS.map(function (event) {
      const article = document.createElement("article");
      article.className = "event-item";

      const date = document.createElement("div");
      date.className = "event-date";
      const day = document.createElement("span");
      day.textContent = event.day;
      const dateNumber = document.createElement("strong");
      dateNumber.textContent = event.date;
      const month = document.createElement("span");
      month.textContent = event.month;
      date.append(day, dateNumber, month);

      const details = document.createElement("div");
      details.className = "event-details";
      const title = document.createElement("h3");
      title.textContent = event.name;
      const description = document.createElement("p");
      description.textContent = event.description;
      const meta = document.createElement("span");
      meta.className = "event-meta";
      meta.textContent = event.time + "  ·  " + event.place;
      details.append(title, description, meta);
      article.append(date, details);
      return article;
    }));
  }

  function showView() {
    const requested = (window.location.hash || "#home").slice(1);
    const categoryId = requested.indexOf("category-") === 0 ? requested.slice("category-".length) : "";
    const category = CATEGORIES.find(function (item) { return item.id === categoryId; });
    const isCategory = Boolean(category);
    const isTownMeter = requested === "town-meter";
    const isBusinessPage = requested === "for-businesses";
    document.getElementById("home").hidden = isCategory || isTownMeter || requested !== "home" && requested !== "";
    categoryView.hidden = !isCategory;
    townMeterView.hidden = !isTownMeter;
    businessView.hidden = !isBusinessPage;
    document.querySelectorAll("nav a").forEach(function (link) {
      const href = link.getAttribute("href");
      const selected = isCategory
        ? href === "#category-events" && category.id === "events"
        : isTownMeter
          ? href === "#town-meter"
          : isBusinessPage
            ? href === "#for-businesses"
          : href === "#home";
      if (selected) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    if (isCategory) renderCategory(category);
    else if (isTownMeter) renderTownMeter();
    else if (isBusinessPage) renderBusinessPlans();
    else if (requested !== "home" && requested !== "") window.location.hash = "home";
    window.scrollTo(0, 0);
  }

  function renderTownMeter() {
    const marketItems = MARKET_ITEMS.concat(postedMarketItems);
    const localSellers = new Set(marketItems.map(function (item) { return item.seller; }));
    const recentMarketItems = marketItems.filter(function (item) { return item.postedAgo !== "1 week ago"; }).length;
    document.getElementById("live-listing-count").textContent = (LISTINGS.length + marketItems.length).toLocaleString("en-CA");
    document.getElementById("live-poster-count").textContent = (TOWN_METER_BASE.localPosters + localSellers.size).toLocaleString("en-CA");
    document.getElementById("live-week-count").textContent = (TOWN_METER_BASE.newListingsThisWeek + recentMarketItems).toLocaleString("en-CA");
    renderGrowthProjections();
  }

  function renderGrowthProjections() {
    const posters = Number(posterSlider.value);
    document.getElementById("poster-count-output").value = posters;
    document.getElementById("poster-count-output").textContent = posters;

    const projections = [
      { id: "listings", value: Math.round(posters * 2.4), max: 1200, format: function (value) { return value.toLocaleString("en-CA"); } },
      { id: "visitors", value: Math.round(posters * 2.8), max: 1400, format: function (value) { return value.toLocaleString("en-CA"); } },
      { id: "ratings", value: Number((0.4 + posters / 500 * 7.1).toFixed(1)), max: 8, format: function (value) { return value.toFixed(1); } },
      { id: "chance", value: Math.round((1 - Math.exp(-posters / 180)) * 100), max: 100, format: function (value) { return value + "%"; } }
    ];
    projections.forEach(function (projection) {
      document.getElementById("projection-" + projection.id).textContent = projection.format(projection.value);
      const bar = document.getElementById("bar-" + projection.id);
      const percentage = Math.min(100, projection.value / projection.max * 100);
      bar.style.width = percentage + "%";
      bar.parentElement.setAttribute("aria-valuenow", Math.round(percentage));
    });
  }

  function renderCategory(category, preserveFilter) {
    if (!preserveFilter) activeFilter = "All";
    categoryView.className = "category-page accent-" + category.id;
    document.getElementById("category-eyebrow").textContent = "Explore Antigonish";
    document.getElementById("category-title").textContent = category.name;
    document.getElementById("category-title-icon").replaceChildren(createCategoryIcon(category.id));
    document.getElementById("category-description").textContent = category.description;
    const isMarketplace = category.id === "buy-sell";
    const isNewcomerGuide = category.id === "newcomer-guide";
    genericCategoryContent.hidden = isMarketplace || isNewcomerGuide;
    marketplaceContent.hidden = !isMarketplace;
    newcomerChecklist.hidden = !isNewcomerGuide;
    if (isMarketplace) {
      renderMarketItems();
      return;
    }
    if (isNewcomerGuide) {
      renderNewcomerChecklist();
      return;
    }
    const isFood = category.id === "food-drink";
    foodFilters.hidden = !isFood;
    if (isFood) renderFilters();

    const entries = LISTINGS.filter(function (item) { return item.category === category.id; });
    const sponsored = category.id === "health-essentials" ? [] : entries.filter(function (item) { return item.sponsored; });
    const regular = entries.filter(function (item) { return !item.sponsored; });
    const sponsoredSection = document.getElementById("sponsored-section");
    sponsoredSection.hidden = sponsored.length === 0;
    sponsoredGrid.replaceChildren.apply(sponsoredGrid, sponsored.map(makeListing));
    document.getElementById("regular-heading").textContent = category.id === "events" ? "More to explore" : "Local listings";
    renderRegular(regular);
  }

  function renderNewcomerChecklist() {
    const groups = Array.from(new Set(NEWCOMER_CHECKLIST.map(function (item) { return item.group; })));
    checklistGroups.replaceChildren.apply(checklistGroups, groups.map(function (groupName) {
      const section = document.createElement("section");
      section.className = "checklist-group";
      const heading = document.createElement("h3");
      heading.textContent = groupName;
      const list = document.createElement("div");
      list.className = "checklist-items";
      NEWCOMER_CHECKLIST.filter(function (item) { return item.group === groupName; }).forEach(function (item) {
        const row = document.createElement("article");
        row.className = "checklist-item";
        const label = document.createElement("label");
        label.className = "checklist-label";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completedChecklist.includes(item.id);
        checkbox.setAttribute("aria-label", item.title);
        const text = document.createElement("span");
        text.className = "checklist-task";
        text.textContent = item.title;
        label.append(checkbox, text);
        const tip = document.createElement("p");
        tip.className = "checklist-tip";
        tip.textContent = item.tip;
        row.append(label, tip);
        if (item.category) {
          const category = CATEGORIES.find(function (entry) { return entry.id === item.category; });
          const link = document.createElement("a");
          link.className = "checklist-link";
          link.href = "#category-" + item.category;
          link.textContent = "Explore " + category.name + " ↗";
          row.append(link);
        }
        checkbox.addEventListener("change", function () {
          if (checkbox.checked && !completedChecklist.includes(item.id)) completedChecklist.push(item.id);
          if (!checkbox.checked) completedChecklist = completedChecklist.filter(function (id) { return id !== item.id; });
          try {
            localStorage.setItem("localTownNewcomerChecklist", JSON.stringify(completedChecklist));
          } catch (error) {
            // Keep progress for this session if storage is unavailable.
          }
          updateChecklistProgress();
        });
        list.append(row);
      });
      section.append(heading, list);
      return section;
    }));
    updateChecklistProgress();
  }

  function updateChecklistProgress() {
    document.getElementById("checklist-progress").textContent = Math.min(completedChecklist.length, NEWCOMER_CHECKLIST.length) + " of " + NEWCOMER_CHECKLIST.length + " done";
  }

  function renderBusinessPlans() {
    const plansContainer = document.getElementById("business-plans");
    plansContainer.replaceChildren.apply(plansContainer, BUSINESS_PLANS.map(function (plan) {
      const card = document.createElement("article");
      card.className = "business-plan" + (plan.id === "top-spot" ? " is-highlighted" : "");
      const title = document.createElement("h3");
      title.textContent = plan.name;
      const price = document.createElement("p");
      price.className = "plan-price";
      price.textContent = plan.price;
      if (plan.interval) {
        const interval = document.createElement("span");
        interval.textContent = plan.interval;
        price.append(interval);
      }
      const summary = document.createElement("p");
      summary.className = "plan-summary";
      summary.textContent = plan.summary;
      const features = document.createElement("ul");
      plan.features.forEach(function (feature) {
        const item = document.createElement("li");
        item.textContent = feature;
        features.append(item);
      });
      const button = document.createElement("button");
      button.type = "button";
      button.className = "business-demo-button";
      button.textContent = "Get started (demo)";
      button.addEventListener("click", showBusinessDemoMessage);
      card.append(title, price, summary, features, button);
      return card;
    }));
  }

  function showBusinessDemoMessage() {
    const message = document.getElementById("business-demo-message");
    message.textContent = "Demo only. In the real version, a sales team would contact you.";
    message.hidden = false;
  }

  function renderMarketItems() {
    const allItems = postedMarketItems.concat(MARKET_ITEMS);
    const visibleItems = marketFilter === "all"
      ? allItems
      : allItems.filter(function (item) { return item.kind === marketFilter; });
    marketGrid.replaceChildren.apply(marketGrid, visibleItems.map(makeMarketCard));
    marketEmpty.hidden = visibleItems.length > 0;
  }

  function makeMarketCard(item) {
    const card = document.createElement("article");
    card.className = "market-card";

    const photo = document.createElement("div");
    photo.className = "market-photo photo-" + (item.icon || "box");
    if (item.photoData) {
      const image = document.createElement("img");
      image.src = item.photoData;
      image.alt = item.title + " photo";
      image.loading = "lazy";
      photo.append(image);
    } else {
      photo.append(createMarketIcon(item.icon || "box"));
    }

    const badges = document.createElement("div");
    badges.className = "market-badges";
    const kind = document.createElement("span");
    kind.className = "market-kind";
    kind.textContent = item.kind === "rent" ? "For rent" : item.kind === "free" ? "Free" : "For sale";
    badges.append(kind);
    if (item.protected) {
      const protectedBadge = document.createElement("span");
      protectedBadge.className = "protected-badge";
      protectedBadge.textContent = "Protected purchase";
      badges.append(protectedBadge);
    }

    const title = document.createElement("h2");
    title.textContent = item.title;
    const price = document.createElement("p");
    price.className = "market-price";
    price.textContent = item.kind === "free" ? "Free" : "$" + Number(item.price).toLocaleString("en-CA") + (item.kind === "rent" ? " / month" : "");
    const description = document.createElement("p");
    description.className = "market-description";
    description.textContent = item.description;

    const facts = document.createElement("div");
    facts.className = "market-facts";
    const condition = document.createElement("span");
    condition.textContent = "Condition: " + item.condition;
    const posted = document.createElement("span");
    posted.textContent = item.postedAgo;
    facts.append(condition, posted);

    const seller = document.createElement("p");
    seller.className = "market-seller";
    seller.textContent = item.seller + "  ·  ★ " + Number(item.sellerRating).toFixed(1);

    const request = document.createElement("button");
    request.type = "button";
    request.className = "protected-request";
    request.textContent = "Request protected purchase (demo)";
    const dealBox = document.createElement("div");
    dealBox.className = "deal-message";
    dealBox.setAttribute("role", "status");
    dealBox.hidden = true;
    const message = document.createElement("p");
    message.textContent = "Demo only. In the real version, your payment would be held safely by Local Town Hub's payment provider and released to the seller when you confirm you received the item.";
    const closeDeal = document.createElement("button");
    closeDeal.type = "button";
    closeDeal.className = "deal-message-close";
    closeDeal.textContent = "Close";
    closeDeal.addEventListener("click", function () { dealBox.hidden = true; });
    dealBox.append(message, closeDeal);
    request.addEventListener("click", function () {
      dealBox.hidden = false;
    });

    const offerButton = document.createElement("button");
    offerButton.type = "button";
    offerButton.className = "make-offer-button";
    offerButton.textContent = "Make an offer (demo)";
    const offerPanel = document.createElement("div");
    offerPanel.className = "offer-panel";
    offerPanel.hidden = true;
    const offerLabel = document.createElement("label");
    offerLabel.className = "offer-label";
    offerLabel.textContent = "Offer amount (CAD)";
    const offerInput = document.createElement("input");
    offerInput.type = "number";
    offerInput.min = "0.01";
    offerInput.step = "0.01";
    offerInput.inputMode = "decimal";
    offerInput.setAttribute("aria-label", "Offer amount in Canadian dollars");
    offerLabel.append(offerInput);
    const offerActions = document.createElement("div");
    offerActions.className = "offer-actions";
    const sendOffer = document.createElement("button");
    sendOffer.type = "button";
    sendOffer.className = "send-offer";
    sendOffer.textContent = "Send offer · demo";
    const closeOffer = document.createElement("button");
    closeOffer.type = "button";
    closeOffer.className = "close-offer";
    closeOffer.textContent = "Close";
    const offerResult = document.createElement("p");
    offerResult.className = "offer-result";
    offerResult.setAttribute("role", "status");
    offerResult.hidden = true;
    offerButton.addEventListener("click", function () {
      offerPanel.hidden = false;
      offerInput.focus();
    });
    closeOffer.addEventListener("click", function () {
      offerPanel.hidden = true;
      offerResult.hidden = true;
      offerInput.value = "";
    });
    sendOffer.addEventListener("click", function () {
      const amount = Number(offerInput.value);
      if (!offerInput.value || !Number.isFinite(amount) || amount <= 0) {
        offerInput.setCustomValidity("Enter an offer greater than zero.");
        offerInput.reportValidity();
        return;
      }
      offerInput.setCustomValidity("");
      const formattedAmount = new Intl.NumberFormat("en-CA", { maximumFractionDigits: 2 }).format(amount);
      offerResult.textContent = "Offer of $" + formattedAmount + " sent to " + item.seller + " (demo only).";
      offerResult.hidden = false;
    });
    offerActions.append(sendOffer, closeOffer);
    offerPanel.append(offerLabel, offerActions, offerResult);

    card.append(photo, badges, title, price, description, facts, seller, request, dealBox, offerButton, offerPanel);
    if (postedMarketItems.some(function (postedItem) { return postedItem.id === item.id; })) {
      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "remove-market-item";
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", function () {
        postedMarketItems = postedMarketItems.filter(function (postedItem) { return postedItem.id !== item.id; });
        try {
          localStorage.setItem("localTownMarketplacePosts", JSON.stringify(postedMarketItems));
        } catch (error) {
          // Keep the item removed for this session if storage is unavailable.
        }
        document.getElementById("marketplace-status").textContent = "Your demo item was removed.";
        renderMarketItems();
      });
      card.append(removeButton);
    }
    return card;
  }

  function createMarketIcon(iconName) {
    const drawings = {
      desk: [["path", "M12 27h40M17 27v18m30-18v18M10 19h44v8H10z"], ["path", "M18 19v-8h14v8m4-8h14v8"]],
      bike: [["path", "M13 44a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm38 0a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"], ["path", "m13 34 12-18 12 18H13l10-14h14l14 14m-25-23h8"]],
      snowboard: [["path", "M25 8 40 56M21 10l5-2m13 50 5-2M19 18l7-2m2 12 7-2m2 12 7-2m2 12 7-2"]],
      coat: [["path", "m23 10 9-5 9 5 10 8-7 9-5-4v24H16V23l-5 4-7-9 10-8Zm9-5v42m-7-25 7 4 7-4"], ["path", "M18 38h9"]],
      books: [["path", "M10 13h18v37H10zM31 8h20v42H31zM14 19h10m-10 6h10m11-10h12m-12 6h12"]],
      room: [["path", "M7 48V16h50v32M7 32h50M14 32v16m36-16v16M7 48h50"], ["path", "M18 22h12v10H18zM38 22h12v10H38z"]],
      apartment: [["path", "M15 54V8h34v46M9 54h46M22 17h6m8 0h6M22 26h6m8 0h6M22 35h6m8 0h6M28 54V43h9v11"]],
      lamp: [["path", "M22 8h22l7 17H15zM33 25v22m-10 7h20M26 47h14"]],
      box: [["path", "m8 18 24-12 24 12v29L32 59 8 47V18Zm0 0 24 12 24-12M32 30v29m-12-47 24 12"]]
    };
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "market-photo-icon");
    svg.setAttribute("viewBox", "0 0 64 64");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2.5");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    (drawings[iconName] || drawings.box).forEach(function (shape) {
      const element = document.createElementNS("http://www.w3.org/2000/svg", shape[0]);
      element.setAttribute(shape[0] === "circle" ? "cx" : "d", shape[1]);
      svg.appendChild(element);
    });
    return svg;
  }

  function updatePostPrice() {
    const isFree = postKind.value === "free";
    postPrice.disabled = isFree;
    postPrice.required = !isFree;
    if (isFree) postPrice.value = "0";
    else if (postPrice.value === "0") postPrice.value = "";
  }

  function showPhotoPreview() {
    const file = postPhoto.files && postPhoto.files[0];
    if (selectedPhotoUrl) URL.revokeObjectURL(selectedPhotoUrl);
    selectedPhotoFile = file && file.type.indexOf("image/") === 0 ? file : null;
    selectedPhotoUrl = selectedPhotoFile ? URL.createObjectURL(selectedPhotoFile) : "";
    photoPreviewWrap.hidden = !selectedPhotoUrl;
    if (selectedPhotoUrl) photoPreview.src = selectedPhotoUrl;
    else photoPreview.removeAttribute("src");
  }

  function compressLocalImage(file) {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onerror = function () { reject(new Error("The selected photo could not be read.")); };
      reader.onload = function () {
        const image = new Image();
        image.onerror = function () { reject(new Error("The selected photo could not be previewed.")); };
        image.onload = function () {
          const scale = Math.min(1, 900 / Math.max(image.naturalWidth, image.naturalHeight));
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(image.naturalWidth * scale);
          canvas.height = Math.round(image.naturalHeight * scale);
          canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.76));
        };
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  async function submitMarketPost(event) {
    event.preventDefault();
    let photoData = "";
    try {
      if (selectedPhotoFile) photoData = await compressLocalImage(selectedPhotoFile);
    } catch (error) {
      document.getElementById("marketplace-status").textContent = error.message;
      return;
    }

    const item = {
      id: "posted-" + Date.now(),
      title: document.getElementById("post-title").value.trim(),
      price: postKind.value === "free" ? 0 : Number(postPrice.value),
      kind: postKind.value,
      condition: document.getElementById("post-condition").value,
      description: document.getElementById("post-description").value.trim(),
      seller: "Alex",
      sellerRating: 5,
      postedAgo: "Just now",
      protected: false,
      icon: "box",
      photoData: photoData
    };
    postedMarketItems.unshift(item);
    marketFilter = "all";
    document.querySelectorAll("[data-market-filter]").forEach(function (button) {
      const selected = button.dataset.marketFilter === marketFilter;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    });
    let saved = true;
    try {
      localStorage.setItem("localTownMarketplacePosts", JSON.stringify(postedMarketItems));
    } catch (error) {
      saved = false;
    }
    renderMarketItems();
    document.getElementById("marketplace-status").textContent = saved
      ? "Your demo item is at the top of the board."
      : "Your item is shown for this session, but browser storage is unavailable.";
    resetPostForm();
    postDialog.close();
  }

  function resetPostForm() {
    postForm.reset();
    if (selectedPhotoUrl) URL.revokeObjectURL(selectedPhotoUrl);
    selectedPhotoUrl = "";
    selectedPhotoFile = null;
    photoPreviewWrap.hidden = true;
    photoPreview.removeAttribute("src");
    updatePostPrice();
  }

  function closePostDialog() {
    resetPostForm();
    postDialog.close();
  }

  function renderFilters() {
    const options = ["All", "Seafood", "Burgers", "Pizza", "Sushi", "Cafes"];
    const filterList = document.getElementById("filter-list");
    filterList.replaceChildren.apply(filterList, options.map(function (filter) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "filter-button" + (filter === activeFilter ? " is-active" : "");
      button.textContent = filter;
      button.setAttribute("aria-pressed", filter === activeFilter ? "true" : "false");
      button.addEventListener("click", function () {
        activeFilter = filter;
        renderFilters();
        const regular = LISTINGS.filter(function (item) {
          return item.category === "food-drink" && !item.sponsored;
        });
        renderRegular(regular);
      });
      return button;
    }));
  }

  function renderRegular(entries) {
    const matches = activeFilter === "All" ? entries : entries.filter(function (item) {
      return item.filters && item.filters.includes(activeFilter);
    });
    listingGrid.replaceChildren.apply(listingGrid, matches.map(makeListing));
    emptyMessage.hidden = matches.length > 0;
    document.getElementById("listing-count").textContent = matches.length + (matches.length === 1 ? " place" : " places");
  }

  function makeListing(item) {
    const card = document.createElement("article");
    card.className = item.sponsored ? "listing-card sponsored-card" : "listing-card";
    if (item.sponsored) {
      const badge = document.createElement("span");
      badge.className = "sponsored-badge";
      badge.textContent = "Sponsored";
      card.append(badge);
    }
    const header = document.createElement("div");
    header.className = "listing-card-header";
    const category = CATEGORIES.find(function (entry) { return entry.id === item.category; });
    const tag = document.createElement("span");
    tag.className = "listing-type";
    tag.textContent = category ? category.name : "Local";
    const rating = document.createElement("span");
    rating.className = "rating";
    rating.setAttribute("aria-label", item.rating + " out of 5 stars");
    rating.textContent = "★ " + item.rating.toFixed(1);
    header.append(tag, rating);

    const title = document.createElement("h3");
    title.textContent = item.name;
    const description = document.createElement("p");
    description.className = "listing-description";
    description.textContent = item.description;
    const contact = document.createElement("div");
    contact.className = "listing-contact";
    const address = document.createElement("span");
    address.textContent = item.address;
    const phone = document.createElement("a");
    phone.href = "tel:" + item.phone.replace(/[^0-9+]/g, "");
    phone.textContent = item.phone;
    contact.append(address, phone);

    const actions = document.createElement("div");
    actions.className = "listing-actions";
    const helpful = document.createElement("button");
    helpful.type = "button";
    helpful.className = "helpful-button";
    const markedHelpful = savedHelpful.includes(item.id);
    helpful.textContent = markedHelpful ? "Helpful ✓" : "Helpful";
    helpful.setAttribute("aria-pressed", markedHelpful ? "true" : "false");
    helpful.addEventListener("click", function () { toggleHelpful(item.id); });
    const maps = document.createElement("a");
    maps.className = "map-link";
    maps.href = "geo:0,0?q=" + encodeURIComponent(item.name + ", " + item.address);
    maps.textContent = "Open in maps ↗";
    actions.append(helpful, maps);
    card.append(header, title, description, contact, actions);
    return card;
  }

  function toggleHelpful(id) {
    const index = savedHelpful.indexOf(id);
    if (index === -1) savedHelpful.push(id);
    else savedHelpful.splice(index, 1);
    try {
      localStorage.setItem("localTownHelpful", JSON.stringify(savedHelpful));
    } catch (error) {
      // The button still works for this page when storage is unavailable.
    }
    const categoryId = window.location.hash.slice("#category-".length);
    const category = CATEGORIES.find(function (item) { return item.id === categoryId; });
    if (category) renderCategory(category, true);
  }
})();