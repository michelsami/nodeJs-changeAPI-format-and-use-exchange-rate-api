

export const fetchData = async(url)=>{
	try {
		const response = await fetch(url);
		
		
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		
			
			 
		
		return data.info.rate;
	  } catch (error) {
		console.error('Error fetching data:', error);
	  }
}




