import { getData } from "@/stores/authStore";

export default {
  saveGameData() {
    try {
      const data =  getData().data 
      if (data) {
        window.localStorage.setItem('data', JSON.stringify(data));
      } else {
        console.error("Trying to save undefined data");
      }
    } catch (error) {
      console.error("Error while saving game data:", error);
    }
  },

  getGameData() {
    try {
      const data =  getData().data
      if (data){
        const storedGameData = window.localStorage.getItem('data');
        return storedGameData ? JSON.parse(storedGameData) : null;
      }
    } catch (error) {
      console.error("Error while getting game data:", error);
      return null;
    }
  }
};
