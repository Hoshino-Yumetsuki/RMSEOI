<template>
  <div class="app-container">
    <div class="background-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>

    <header class="app-header">
      <h1 class="title-text">RMSEOI</h1>
    </header>

    <main class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <!-- Export Card -->
          <b-card no-body class="feature-card mb-4">
            <b-card-header class="bg-transparent border-0 pt-4">
              <div class="card-header-content">
                <i class="bi bi-archive header-icon"></i>
                <h4>存档导出</h4>
              </div>
            </b-card-header>
            <b-card-body class="d-flex flex-column align-items-center px-4 pb-4">
              <b-dropdown id="dropdown-export" block variant="primary" class="mb-3 w-100 custom-dropdown" :disabled="!Object.keys(filteredLocalStorage).length">
                <template #button-content> <i class="bi bi-archive-fill me-2"></i> {{ selectedSaveKey || "选择存档导出" }} </template>
                <template v-if="Object.keys(filteredLocalStorage).length">
                  <b-dropdown-item v-for="(value, key) in filteredLocalStorage" :key="key" @click="selectSave(key)"> <i class="bi bi-file-earmark-text me-2"></i> {{ key }} </b-dropdown-item>
                </template>
                <template v-else>
                  <b-dropdown-item disabled>没有可以导出的存档</b-dropdown-item>
                </template>
              </b-dropdown>
              <b-button block variant="primary" :disabled="!selectedSaveKey" @click="exportSelectedSave" class="w-100 action-button"> <i class="bi bi-download me-2"></i> 导出选中的存档 </b-button>
            </b-card-body>
          </b-card>

          <!-- Import Card -->
          <b-card no-body class="feature-card mb-4">
            <b-card-header class="bg-transparent border-0 pt-4">
              <div class="card-header-content">
                <i class="bi bi-upload header-icon"></i>
                <h4>存档导入</h4>
              </div>
            </b-card-header>
            <b-card-body class="d-flex flex-column align-items-center px-4 pb-4">
              <b-button block variant="success" @click="triggerImport" class="w-100 action-button"> <i class="bi bi-upload me-2"></i> 导入存档 </b-button>
              <input type="file" ref="importInput" @change="importLocalStorage" style="display: none" />
            </b-card-body>
          </b-card>

          <!-- Note Card -->
          <b-card no-body class="note-card">
            <b-card-body class="text-center p-4">
              <div class="note-content">
                <i class="bi bi-info-circle-fill info-icon"></i>
                <p class="note-text mb-0">导出存档时请记得导出 <strong>RPG Global</strong> 哦</p>
              </div>
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
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap");

:root {
  /* Color Variables */
  --primary-color: #4361ee;
  --primary-light: #7a8fff;
  --primary-dark: #3046cc;
  --success-color: #2ecc71;
  --success-light: #66e792;
  --success-dark: #25a25a;
  --info-color: #3abff8;
  --bg-light: #f8f9fa;
  --bg-dark: #1e1e2e;
  --card-light: #ffffff;
  --card-dark: #282838;
  --text-light: #333333;
  --text-dark: #e6e6e6;
  --border-radius: 16px;
  --box-shadow-light: 0 8px 30px rgba(0, 0, 0, 0.08);
  --box-shadow-dark: 0 8px 30px rgba(0, 0, 0, 0.25);
  --transition-default: all 0.3s ease;
}

/* Base styles */
body {
  font-family: "Noto Sans SC", sans-serif;
  margin: 0;
  padding: 0;
  transition: var(--transition-default);
  line-height: 1.6;
}

[data-bs-theme="light"] {
  --bg-color: var(--bg-light);
  --card-bg: var(--card-light);
  --text-color: var(--text-light);
  --box-shadow: var(--box-shadow-light);
}

[data-bs-theme="dark"] {
  --bg-color: var(--bg-dark);
  --card-bg: var(--card-dark);
  --text-color: var(--text-dark);
  --box-shadow: var(--box-shadow-dark);
}

/* Layout */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: var(--transition-default);
}

/* Background shapes */
.background-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.15;
  transition: var(--transition-default);
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: var(--primary-light);
  top: -150px;
  right: -150px;
  animation: float 15s ease-in-out infinite;
}

.shape-2 {
  width: 300px;
  height: 300px;
  background: var(--success-light);
  bottom: -100px;
  left: -100px;
  animation: float 18s ease-in-out infinite reverse;
}

.shape-3 {
  width: 200px;
  height: 200px;
  background: var(--info-color);
  bottom: 30%;
  right: 10%;
  animation: float 12s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}

/* Header */
.app-header {
  padding: 3rem 1rem 2rem 1rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.title-text {
  font-weight: 800;
  font-size: 3rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--info-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.subtitle {
  color: var(--text-color);
  opacity: 0.8;
  font-weight: 300;
  font-size: 1.1rem;
  margin-bottom: 0;
}

/* Main content */
.container {
  flex: 1;
  position: relative;
  z-index: 1;
  padding-bottom: 3rem;
}

/* Cards */
.feature-card {
  border-radius: var(--border-radius);
  border: none;
  background-color: var(--card-bg);
  box-shadow: var(--box-shadow);
  transition: var(--transition-default);
  overflow: hidden;
  transform: translateY(0);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.card-header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.header-icon {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

/* Note card */
.note-card {
  border-radius: var(--border-radius);
  border: none;
  background-color: var(--card-bg);
  box-shadow: var(--box-shadow);
  transition: var(--transition-default);
  overflow: hidden;
  border-left: 5px solid var(--info-color);
}

.note-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.info-icon {
  font-size: 1.5rem;
  color: var(--info-color);
  margin-bottom: 0.5rem;
}

.note-text {
  font-size: 1rem;
}

/* Buttons and form elements */
.action-button {
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  border: none;
}

.action-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.action-button:active {
  transform: translateY(0);
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
}

.btn-success {
  background: linear-gradient(135deg, var(--success-color), var(--success-light));
}

.custom-dropdown button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  border: none;
}

/* Footer */
.app-footer {
  padding: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.7;
  position: relative;
  z-index: 1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .title-text {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .shape-1 {
    width: 250px;
    height: 250px;
  }

  .shape-2 {
    width: 200px;
    height: 200px;
  }

  .shape-3 {
    width: 150px;
    height: 150px;
  }
}
</style>
