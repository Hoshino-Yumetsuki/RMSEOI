<template>
  <div class="app-container">
    <header class="app-header">
      <h1 class="text-center mb-4">RMSEOI</h1>
    </header>

    <main class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <b-card no-body class="shadow-sm rounded-card mb-4 hover-card">
            <b-card-header class="bg-transparent border-0 pt-4">
              <h4 class="text-center">存档导出</h4>
            </b-card-header>
            <b-card-body class="d-flex flex-column align-items-center px-4 pb-4">
              <b-dropdown id="dropdown-export" block variant="primary" class="mb-3 w-100" :disabled="!Object.keys(filteredLocalStorage).length">
                <template #button-content> <i class="bi bi-archive"></i> {{ selectedSaveKey || "选择存档导出" }} </template>
                <template v-if="Object.keys(filteredLocalStorage).length">
                  <b-dropdown-item v-for="(value, key) in filteredLocalStorage" :key="key" @click="selectSave(key)">
                    {{ key }}
                  </b-dropdown-item>
                </template>
                <template v-else>
                  <b-dropdown-item disabled>没有可以导出的存档</b-dropdown-item>
                </template>
              </b-dropdown>
              <b-button block variant="outline-primary" :disabled="!selectedSaveKey" @click="exportSelectedSave" class="w-100 btn-with-icon"> <i class="bi bi-download"></i> 导出选中的存档 </b-button>
            </b-card-body>
          </b-card>

          <b-card no-body class="shadow-sm rounded-card mb-4 hover-card">
            <b-card-header class="bg-transparent border-0 pt-4">
              <h4 class="text-center">存档导入</h4>
            </b-card-header>
            <b-card-body class="d-flex flex-column align-items-center px-4 pb-4">
              <b-button block variant="success" @click="triggerImport" class="w-100 btn-with-icon"> <i class="bi bi-upload"></i> 导入存档 </b-button>
              <input type="file" ref="importInput" @change="importLocalStorage" style="display: none" />
            </b-card-body>
          </b-card>

          <b-card no-body class="shadow-sm rounded-card hover-card note-card">
            <b-card-body class="text-center p-4">
              <i class="bi bi-info-circle-fill text-info mb-2 info-icon"></i>
              <p class="note-text mb-0">导出存档时请记得导出 <strong>RPG Global</strong> 哦</p>
            </b-card-body>
          </b-card>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { BDropdown, BDropdownItem, BCard, BCardHeader, BCardBody, BButton } from "bootstrap-vue-next";
import { selectSave, exportSelectedSave, importLocalStorage, triggerImport, loadLocalStorageItems } from "./sm";

export default {
  name: "App",
  components: {
    BDropdown,
    BDropdownItem,
    BCard,
    BCardHeader,
    BCardBody,
    BButton,
  },
  data() {
    return {
      selectedSaveKey: null,
      localStorageItems: {},
    };
  },
  computed: {
    filteredLocalStorage() {
      const filtered = {};
      for (const [key, value] of Object.entries(this.localStorageItems)) {
        if (key.startsWith("RPG File") || key === "RPG Global") {
          filtered[key] = value;
        }
      }
      return filtered;
    },
  },
  methods: {
    selectSave,
    exportSelectedSave,
    importLocalStorage,
    triggerImport,
    loadLocalStorageItems,
  },
  async mounted() {
    this.loadLocalStorageItems();
    const getSystemTheme = () => (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const setTheme = (theme) => {
      document.documentElement.setAttribute("data-bs-theme", theme);
    };
    setTheme(getSystemTheme());
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      setTheme(getSystemTheme());
    });
  },
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");

:root {
  --card-transition: transform 0.3s ease, box-shadow 0.3s ease;
  --primary-color: #0d6efd;
  --success-color: #198754;
  --bg-light: #f8f9fa;
  --bg-dark: #212529;
  --card-radius: 12px;
}

/* Base styles */
body {
  font-family: "Roboto", "Helvetica Neue", sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
  overflow-x: hidden;
  line-height: 1.6;
}

/* Layout */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  padding: 2.5rem 1rem 1.5rem 1rem;
}

.app-header h1 {
  font-weight: 700;
  font-size: 2.5rem;
  letter-spacing: -0.5px;
  background: linear-gradient(45deg, var(--primary-color), #5c9eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.container {
  flex: 1;
}

.app-footer {
  margin-top: auto;
  font-size: 0.9rem;
}

/* Cards */
.rounded-card {
  border-radius: var(--card-radius);
  border: none;
  transition: var(--card-transition);
  overflow: hidden;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.note-card {
  border-left: 4px solid var(--primary-color);
}

.info-icon {
  font-size: 1.5rem;
  display: block;
  margin: 0 auto 0.5rem;
}

.note-text {
  font-size: 1rem;
}

/* Buttons */
.btn {
  border-radius: 6px;
  padding: 0.65rem 1.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-with-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn:active {
  transform: scale(0.97);
}

.btn-primary {
  background: linear-gradient(45deg, var(--primary-color), #5c9eff);
  border: none;
  box-shadow: 0 4px 6px rgba(13, 110, 253, 0.2);
}

.btn-success {
  background: linear-gradient(45deg, var(--success-color), #28a745);
  border: none;
  box-shadow: 0 4px 6px rgba(25, 135, 84, 0.2);
}

.btn-outline-primary {
  border-width: 2px;
}

.btn-outline-primary:hover {
  box-shadow: 0 4px 6px rgba(13, 110, 253, 0.2);
}

/* Dropdown styling */
.dropdown-menu {
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border: none;
  padding: 0.5rem;
}

.dropdown-item {
  border-radius: 4px;
  padding: 0.6rem 1rem;
  margin-bottom: 2px;
  transition: background-color 0.2s ease;
}

.dropdown-item:last-child {
  margin-bottom: 0;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .app-header h1 {
    font-size: 2rem;
  }

  .card-body {
    padding: 1.25rem;
  }
}

/* Dark mode adjustments */
[data-bs-theme="dark"] .app-header h1 {
  background: linear-gradient(45deg, #6ea8fe, #9ec5fe);
  -webkit-background-clip: text;
  background-clip: text;
}

[data-bs-theme="dark"] .shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(255, 255, 255, 0.075) !important;
}

/* Animation for cards */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeInUp 0.5s ease-out forwards;
}

.card:nth-child(2) {
  animation-delay: 0.1s;
}

.card:nth-child(3) {
  animation-delay: 0.2s;
}
</style>
