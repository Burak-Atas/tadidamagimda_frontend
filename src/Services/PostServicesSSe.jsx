class PostServicesSSe {
  constructor(url) {
    this.url = url;
    this.count = 0;
    this.eventSource = null;
    this.newData = []
  }
  

  start(onMessage, onError) {
    console.log("post service sse yenilendi")
    if (!this.eventSource) {
      this.eventSource = new EventSource(this.url);
      console.log("SSE başlatıldı");

      
      this.eventSource.onmessage = (event) => {
        // Tüm gelen veriyi konsola yazdır
        console.log("Gelen veri:", event.data);
        if (this.count===0){
          if (onMessage) {
            // "post" verisini almak için
            const postData = JSON.parse(event.data)["post"];
            console.log("Post verisi:", postData);
            onMessage(postData);
          }
        }else{
          console.log("new data verileri",this.newData)
          this.newData.push(JSON.parse(event.data)["post"])
        }
        this.count = 1;
        console.log("new count",this.count)
       
      };

      this.eventSource.onerror = (error) => {
        if (onError) {
          onError(error);
        }
        this.eventSource.close();
      };
    }
  }

  stop() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      console.log("SSE durduruldu");
    }
  }
}

export default PostServicesSSe;
