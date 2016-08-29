class Config{
  constructor(){
    this.configuration = {};
  }

  register(key, value){
    this.configuration[key] = value;
  }

  retrieve(key){
    return this.configuration[key];
  }
}

const CONFIG = new Config();

export {CONFIG, Config};
