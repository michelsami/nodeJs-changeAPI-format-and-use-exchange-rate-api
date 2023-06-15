import {writeFile} from "fs";
import {readFileSync} from "fs";

const fetchData = async()=>{
	try {
		const response = await fetch('https://api.escuelajs.co/api/v1/products');
		
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		
			
			 writeFile("dataJsonFromAPI.txt", JSON.stringify(data), err=>{
				if (err) throw err;
				console.log("data saved")
			});
		
		//console.log(data);
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
  

// fetch data and save it in JSON file
//fetchData();

const data = readJsonFile('dataJsonFromAPI.txt');


export let newStructure = [];

// adding the unique categories
const changeStructure = data.forEach(element => {
	
	if(newStructure.length == 0){
		const newObj = {
			category: {
			  id: element.category.id,
			  name: element.category.name
			},
		  };
		newStructure.push(newObj);
	} else {
	
		if((newStructure.some((obj) => obj.category.id == element.category.id) == false)){
			
          const newObj2 = {
			category: {
			  id: element.category.id,
			  name: element.category.name
			},
		  };
		newStructure.push(newObj2);
		}
		
	  } 
		
	
});




// adding the products to each category
const addingProducts = data.forEach(elementProduct => {
	 let products = [];
	// const productObject = {} 

	

	for (let i = 0; i < newStructure.length; i++) {
		//const products = [];

		if (newStructure[i].category.id == elementProduct.category.id) 
		{
		
			
			if(newStructure[i].products == undefined){
				
				newStructure[i].products = [];
				
				newStructure[i].products.push(elementProduct); 
				
				break; 
			}else{
				newStructure[i].products.push(elementProduct); 
				break; 
			}
		}
		
	  }
	  

		// if((newStructure.some((obj) => obj.category.id == element.category.id) == true)){
			
		// 	console.log(element)
		//   }
	
});





writeFile("dataConverted.txt", JSON.stringify(newStructure), err=>{
	if (err) throw err;
	console.log("data saved")
});