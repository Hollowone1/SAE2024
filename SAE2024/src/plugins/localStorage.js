export default {
    saveGameData(data) {
      window.localStorage.setItem('data', JSON.stringify(data.username));
    },
  
    getGameData() {
      const storedGameData = window.localStorage.getItem('data');
      return storedGameData ? JSON.parse(storedGameData) : null;
    }
  };
  
  
  


