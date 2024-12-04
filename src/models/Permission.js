class Permission {
    constructor(userId, moduleId) {
      this.userId = userId || null;
      this.moduleId = moduleId || null;
    }
  
    validate() {
      return this.userId !== null && this.moduleId !== null;
    }
  }
  
  export default Permission;
  