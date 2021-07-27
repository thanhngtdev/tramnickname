class ModelManager {
  getLocation() {
    return JSON.parse(localStorage.getItem("defaultAcademy")) || {};
  }
}

export default new ModelManager();
