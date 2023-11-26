import axios from 'axios';

export async function saveLogs(msg, url,portal) {
    const log={
        message:msg,
        url:url,
        portal:portal,
      }

      try {
          const response = await axios.post('http://localhost:3000/api/frontendLog', log, { 
              headers: {
                  "Content-Type": "application/json", 
              },
          });

          const responseData = response.data;
          console.log(responseData.message);
          if(responseData.message==="Log Saved"){
            console.log("Log saved");
          }
      } catch (error) {
          console.error('Error:', error.message);
      }
}
