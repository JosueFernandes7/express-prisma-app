class AccessLog {
  constructor(userId, url, granted, accessTime) {
    this.userId = userId || null;
    this.url = url || null;
    this.granted = granted || false;
    this.accessTime = accessTime || new Date();
  }
}

export default AccessLog;
