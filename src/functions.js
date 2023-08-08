// set data to localStorage//

const setData = (key, value) => {

    localStorage.setItem(key, JSON.stringify(value));

};



const getData = (key) => {
    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key))
    }
 return[];

};

/**
 * 
 * @param {facebook time post time line funcion /;/} timestamp 
 * @returns 
 */

function timeAgo(timestamp) {
    const currentTime = new Date();
    const postTime = new Date(timestamp);

    const timeDifference = currentTime - postTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return years === 1 ? "1 year ago" : `${years} years ago`;
    } else if (months > 0) {
        return months === 1 ? "1 month ago" : `${months} months ago`;
    } else if (days > 0) {
        return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
        return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
        return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else {
        return "Just now";
    }
}

/**
 * Create alert
 */

const creatAlert = (text, type ="danger") => {
    return `<p class="alert alert-${type} d-flex justify-content-between">${text}
    <button class="btn-close" data-bs-dismiss ="alert"> </button>
  </p>`

};


/**
 * uinquic ID creation function
 */
const getRandomUniqueID = (length = 10) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const cryptoObj = window.crypto || window.msCrypto; // For browser compatibility
  
    if (!cryptoObj || !cryptoObj.getRandomValues) {
      throw new Error(
        "Your browser does not support secure random number generation."
      );
    }
  
    const randomArray = new Uint32Array(length);
    cryptoObj.getRandomValues(randomArray);
  
    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset[randomArray[i] % charset.length];
    }
  
    return result;
  };

  function adminPage() {
    window.location.replace(`https://github.com/johurul-abir/student-result/`);
  }