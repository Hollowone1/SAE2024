import { getData } from "@/stores/authStore";


export default {
  saveGameData() {
    try {
      const data = getData().data.Series_by_id;

      
      if (data && typeof data === 'object') {
        window.localStorage.setItem('data', JSON.stringify(data));
      } else {
        console.error("Trying to save undefined or non-object data");
      }
    } catch (error) {
      console.error("Error while saving game data:", error);
    }
  },

  
  getGameData() {
    try {
      const data = getData().data;

      if (data && typeof data === 'object') {
        const storedGameData = window.localStorage.getItem('data');
        return storedGameData ? JSON.parse(storedGameData) : null;
      } else {
        console.error("Data is not an object or is undefined");
      }
    } catch (error) {
      console.error("Error while getting game data:", error);
      return null;
    }
  },
};