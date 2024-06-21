<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="row w-50">
      <div class="col-sm-12 mb-3">
        <b-card class="text-center">
          <b-dropdown id="dropdown-export" text="选择存档导出" variant="primary" class="m-md-2">
            <template v-if="Object.keys(filteredLocalStorage).length">
              <b-dropdown-item v-for="(value, key) in filteredLocalStorage" :key="key" @click="selectSave(key)">
                {{ key }}
              </b-dropdown-item>
            </template>
            <template v-else>
              <b-dropdown-item disabled>没有可以导出的存档</b-dropdown-item>
            </template>
          </b-dropdown>
          <b-button variant="primary" :disabled="!selectedSaveKey" @click="exportSelectedSave">
            导出选中的存档
          </b-button>
        </b-card>
      </div>
      <div class="col-sm-12 mb-3">
        <b-card class="text-center">
          <b-button variant="primary" @click="triggerImport">导入存档</b-button>
          <input type="file" ref="importInput" @change="importLocalStorage" style="display: none" />
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { BDropdown, BDropdownItem, BCard, BButton } from 'bootstrap-vue-next';
import { selectSave, exportSelectedSave, importLocalStorage, triggerImport, loadLocalStorageItems } from './main';

export default {
  name: 'App',
  components: {
    BDropdown,
    BDropdownItem,
    BCard,
    BButton
  },
  data() {
    return {
      selectedSaveKey: null,
      localStorageItems: {}
    };
  },
  computed: {
    filteredLocalStorage() {
      const filtered = {};
      for (const [key, value] of Object.entries(this.localStorageItems)) {
        if (key.startsWith('RPG File ')) {
          filtered[key] = value;
        }
      }
      return filtered;
    }
  },
  methods: {
    selectSave,
    exportSelectedSave,
    importLocalStorage,
    triggerImport,
    loadLocalStorageItems
  },
  mounted() {
    this.loadLocalStorageItems();
    const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const setTheme = (theme) => {
      document.documentElement.setAttribute('data-bs-theme', theme);
    };
    setTheme(getSystemTheme());
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      setTheme(getSystemTheme());
    });
  }
};
</script>

<style>
.d-flex {
  height: 100vh;
}
</style>
