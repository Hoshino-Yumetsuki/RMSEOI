<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="row w-5 w-md-50">
      <div class="col-12 mb-3">
        <b-card class="text-center">
          <b-dropdown id="dropdown-export" text="选择存档导出" variant="outline-primary">
            <template v-if="Object.keys(filteredLocalStorage).length">
              <b-dropdown-item
                v-for="(value, key) in filteredLocalStorage"
                :key="key"
                @click="selectSave(key)"
              >
                {{ key }}
              </b-dropdown-item>
            </template>
            <template v-else>
              <b-dropdown-item disabled>没有可以导出的存档</b-dropdown-item>
            </template>
          </b-dropdown>
          <b-button
            variant="outline-primary"
            :disabled="!selectedSaveKey"
            @click="exportSelectedSave"
          >
            导出选中的存档
          </b-button>
        </b-card>
      </div>
      <div class="col-12 mb-3">
        <b-card class="text-center">
          <b-button variant="outline-primary" @click="triggerImport">导入存档</b-button>
          <input type="file" ref="importInput" @change="importLocalStorage" style="display: none" />
        </b-card>
      </div><div class="col-12 mb-3">
        <b-card class="text-center">
          <div>ps:导出存档记得导出RPG Global哦</div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { BDropdown, BDropdownItem, BCard, BButton } from 'bootstrap-vue-next';
import { selectSave, exportSelectedSave, importLocalStorage, triggerImport, loadLocalStorageItems } from './sm';

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
        if (key.startsWith('RPG File') || key === 'RPG Global') {
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
  async mounted() {
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
.container {
  height: 100vh;
  padding: 15px;
}

.card-body .dropdown {
  padding: 5px;
}
</style>
