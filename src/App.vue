<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="row w-50">
      <div class="col-sm-12 mb-3">
        <b-card class="text-center">
          <b-dropdown id="dropdown-export" text="选择存档导出" variant="primary" class="m-md-2">
            <b-dropdown-item
              v-for="(value, key) in filteredLocalStorage"
              :key="key"
              @click="selectSave(key)"
            >
              {{ key }}
            </b-dropdown-item>
          </b-dropdown>
          <b-button
            variant="primary"
            :disabled="!selectedSaveKey"
            @click="exportSelectedSave"
          >
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
    selectSave(key) {
      this.selectedSaveKey = key;
    },
    exportSelectedSave() {
      if (!this.selectedSaveKey) {
        alert('请选择要导出的存档。');
        return;
      }

      const key = this.selectedSaveKey;
      const value = this.localStorageItems[key];
      let filename = '';

      if (key.startsWith('RPG File')) {
        const fileNumber = key.replace('RPG File', '').trim();
        filename = `file${fileNumber}.rpgsave`;
      } else {
        alert('不支持的存档格式。');
        return;
      }

      const blob = new Blob([value], { type: 'text/plain' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = filename;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    },
    importLocalStorage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const filename = file.name;
          let key = '';

          if (filename.startsWith('file') && filename.endsWith('.rpgsave')) {
            const fileNumber = filename.replace('file', '').replace('.rpgsave', '').trim();
            key = `RPG File ${fileNumber}`;
          } else {
            alert('不支持的文件格式。');
            return;
          }

          const encodedValue = e.target.result;
          localStorage.setItem(key, encodedValue);
          this.loadLocalStorageItems();
          alert('存档导入成功。');
        };
        reader.readAsText(file);
      }
    },
    triggerImport() {
      this.$refs.importInput.click();
    },
    loadLocalStorageItems() {
      const keys = Object.keys(localStorage);
      const items = {};
      keys.forEach((key) => {
        items[key] = localStorage.getItem(key);
      });
      this.localStorageItems = items;
    }
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
