function exportLocalStorage() {
    const keys = Object.keys(localStorage);
    const exportData = {};
    keys.forEach((key) => {
      exportData[key] = localStorage.getItem(key);
    });
    const jsonData = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "RPG_Save.json";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  function importLocalStorage(fileInput) {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const importData = JSON.parse(e.target.result);
          for (const key in importData) {
            localStorage.setItem(key, importData[key]);
          }
          alert("LocalStorage data imported successfully.");
        } catch (error) {
          alert("Error importing localStorage data. Please make sure the file is a valid JSON.");
        }
      };
      reader.readAsText(file);
    }
  }
  document.getElementById("importInput").addEventListener("change", function () {
    importLocalStorage(this);
  });