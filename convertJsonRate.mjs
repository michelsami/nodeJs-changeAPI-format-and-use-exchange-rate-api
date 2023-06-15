
import { readFileSync, writeFileSync } from "fs";

const url = "https://api.exchangerate.host/convert?from=USD&to=EGP";


const fetchData = async(url)=>{
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

const readJsonFile = (filepath) => {
  try {
    const data = readFileSync(filepath);

    const jsonData = JSON.parse(data);
    return jsonData;

  } catch (error) {
    console.error('Error reading JSON file:', error);
    return null;
  }
};

const writeJsonFile = (filepath, jsonData) => {
  try {
    const jsonString = JSON.stringify(jsonData, null, 2);
    writeFileSync(filepath, jsonString);
    console.log("JSON file saved successfully:", filepath);

  } catch (error) {
    console.error('Error writing JSON file:', error);
  }
};



const convert = async () => {
	const data = readJsonFile('dataConverted.txt');
	
	for (const category of data) {
		for (const product of category.products) {
		  const exchangeRate = Math.floor(await fetchData(url));
		  product.price = Math.round(product.price * exchangeRate);
		  product.description = "aaaaaaaaaaaaaa";
		}
	  }
  
	writeJsonFile('dataConvertedwithUSD.txt', data);
  };

convert();

