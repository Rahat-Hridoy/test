const menuToggle = document.getElementById("menuToggle");
const navList = document.getElementById("nav-list");
const isActive = document.getElementById("isActive");

let isOpen = false;

menuToggle.addEventListener("click", () => {
  isOpen = !isOpen;

  isActive.src = isOpen ? "/icons/close.png" : "/icons/menu.png";

  navList.classList.toggle("hidden", !isOpen);
  navList.classList.toggle("flex", isOpen);
});

// tab view
document.addEventListener("DOMContentLoaded", function () {
  const tabsContainer = document.getElementById("tabsContainer");
  const leftArrow = document.getElementById("leftArrow");
  const rightArrow = document.getElementById("rightArrow");
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  // Function to update arrow visibility
  function updateArrowVisibility() {
    // Show left arrow if scrolled to the right
    if (tabsContainer.scrollLeft > 0) {
      leftArrow.classList.remove("opacity-0", "pointer-events-none");
    } else {
      leftArrow.classList.add("opacity-0", "pointer-events-none");
    }

    // Show right arrow if there's more content to scroll to
    if (
      tabsContainer.scrollLeft + tabsContainer.clientWidth <
      tabsContainer.scrollWidth - 1
    ) {
      rightArrow.classList.remove("opacity-0", "pointer-events-none");
    } else {
      rightArrow.classList.add("opacity-0", "pointer-events-none");
    }
  }

  // Initial arrow visibility check
  updateArrowVisibility();

  // Arrow click handlers
  leftArrow.addEventListener("click", () => {
    tabsContainer.scrollBy({
      left: -200,
      behavior: "smooth",
    });

    // Update arrow visibility after scroll
    setTimeout(updateArrowVisibility, 300);
  });

  rightArrow.addEventListener("click", () => {
    tabsContainer.scrollBy({
      left: 200,
      behavior: "smooth",
    });

    // Update arrow visibility after scroll
    setTimeout(updateArrowVisibility, 300);
  });

  // Update arrow visibility on scroll
  tabsContainer.addEventListener("scroll", updateArrowVisibility);

  // Update arrow visibility on window resize
  window.addEventListener("resize", updateArrowVisibility);

  // Tab switching functionality
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active state from all buttons
      tabButtons.forEach((btn) => {
        btn.classList.remove("bg-blue-500", "text-white");
        btn.classList.add("text-gray-600", "hover:bg-gray-100");
      });

      // Add active state to clicked button
      button.classList.remove("text-gray-600", "hover:bg-gray-100");
      button.classList.add("bg-blue-500", "text-white");

      // Hide all tab contents
      tabContents.forEach((content) => {
        content.classList.add("hidden");
      });

      // Show selected tab content
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.remove("hidden");
    });
  });

  // Auto-scroll to active tab if it's not fully visible
  function ensureActiveTabVisible() {
    const activeTab = document.querySelector(".tab-button.bg-blue-500");
    if (activeTab) {
      const containerRect = tabsContainer.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();

      // If tab is not fully visible, scroll to it
      if (
        tabRect.left < containerRect.left ||
        tabRect.right > containerRect.right
      ) {
        activeTab.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }

  // Add event listener to ensure active tab is visible after switching
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setTimeout(ensureActiveTabVisible, 10);
    });
  });
});
