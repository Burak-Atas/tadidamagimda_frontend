class PostServicesWs {
    constructor() {
      this.socket = null;
      this.onMessageCallback = null; // Mesaj callback fonksiyonu
    }
  
    connect() {
      // WebSocket URL'sini düzeltin
      this.socket = new WebSocket("ws://localhost:8080/ws"); // WebSocket URL'nizi buraya ekleyin
  
      this.socket.onmessage = (event) => {
        if (this.onMessageCallback) {
          this.onMessageCallback(event);
        }
      };
  
      this.socket.onopen = () => {
        console.log("WebSocket bağlantısı açıldı");
      };
  
      this.socket.onclose = () => {
        console.log("WebSocket bağlantısı kapandı");
      };
  
      this.socket.onerror = (error) => {
        console.error("WebSocket hatası:", error);
      };
    }
  
    disconnect() {
      if (this.socket) {
        this.socket.close();
      }
    }
  
    onMessage(callback) {
      this.onMessageCallback = callback; // Callback fonksiyonunu kaydet
    }
  }
  
  export default PostServicesWs;
  