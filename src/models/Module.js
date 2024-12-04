class Module {
    constructor(id, name, description) {
      this.id = id || null;
      this.name = name || null;
      this.description = description || null;
    }
  
    validateName() {
      return typeof this.name === "string" && this.name.trim().length > 0;
    }
  }
  
  export default Module;
  