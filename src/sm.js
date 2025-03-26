export function selectSave(key) {
  this.selectedSaveKey = key;
}

export function exportSelectedSave() {
  if (!this.selectedSaveKey) {
    alert("请选择要导出的存档。");
    return;
  }

  const key = this.selectedSaveKey;
  const value = this.localStorageItems[key];
  let filename = "";

  if (key === "RPG Global") {
    filename = "global.rpgsave";
  } else if (key.startsWith("RPG File")) {
    const fileNumber = key.replace("RPG File", "").trim();
    filename = `file${fileNumber}.rpgsave`;
  } else {
    alert("不支持的存档格式。");
    return;
  }

  const blob = new Blob([value], { type: "text/plain" });
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

export function importLocalStorage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const filename = file.name;
      let key = "";

      if (filename === "global.rpgsave") {
        key = "RPG Global";
      } else if (filename.startsWith("file") && filename.endsWith(".rpgsave")) {
        const fileNumber = filename.replace("file", "").replace(".rpgsave", "").trim();
        key = `RPG File${fileNumber}`;
      } else {
        alert("不支持的文件格式。");
        return;
      }

      const encodedValue = e.target.result;
      localStorage.setItem(key, encodedValue);
      this.loadLocalStorageItems();
      alert("存档导入成功。");
    };
    reader.readAsText(file);
  }
}

export function triggerImport() {
  this.$refs.importInput.click();
}

export function loadLocalStorageItems() {
  const keys = Object.keys(localStorage);
  const items = {};
  keys.forEach((key) => {
    items[key] = localStorage.getItem(key);
  });
  this.localStorageItems = items;
}
