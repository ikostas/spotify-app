  export const getAccessToken = async (setAccessCreds) => {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', import.meta.env.VITE_CID);
    params.append('client_secret', import.meta.env.VITE_CSECRET);
    const url = import.meta.env.VITE_BASEURL;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error_description || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const refreshBuffer = 15; // seconds, renew the token before it expires
      const newAccessCreds={
        token: data.access_token,
        life: data.expires_in,
        end: Date.now() + (data.expires_in - refreshBuffer) * 1000
      };
      setAccessCreds(newAccessCreds);
      return newAccessCreds.token;
    } catch (err) {
      console.error('Error fetching Spotify token:', err);
    }
  }

