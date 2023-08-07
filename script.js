const express = require('express');
const req = require('express/lib/request');
const Joi = require('@hapi/joi');
const app = express();
app.use(express.json());

const customers = [
	{
		title: 'Siri', id: 1
	},
	{
		title: 'Mag', id: 2
	},
	{
		title: 'Yam', id: 3
	},
	{
		title: 'Van', id: 4
	},
	{
		title: 'ram', id: 5
	},
]
app.get('/', (req, res)=>{
	res.send('Welcome');
})

app.get('/api/customers', (req, res)=>{
	res.send(customers);
})
app.get('/api/customers/:id',(req, res)=>{
	const ci = customers.find(c=> c.id === parseInt(req.params.id));
	if(!customers)res.status(404).send('<h2 style="font-family: Malgun Gothic; color:darkred;">Ooooooooooops......</h2> ');
	res.send(ci);
});

app.post('/api/customers',(req, res)=>{
	const{error} = validateCustomer(req.body);
	if(error){
		res.status(400).send(error.details[0].message)
		return;
	}
	const cst ={
		id:customers.length+1,
		title: req.body.title
	};
	customers.push(cst);
	res.send(cst);  
});
app.put('/api/customers/:id',(req, res)=>{
	const cst = customers.find(c=> c.id===parseInt(req.params.id));
	if(!customers)res.status(404).send('<h2 style="font-family: Malgun Gothic; color:darkred;">Ooooooooooops......</h2> ');
	const{error} = validateCustomer(req.body);
	if(error){
		res.status(400).send(error.details[0].message)
		return;
	}
	
	cst.title = req.body.title;
	res.send(cst);
});

app.delete('/api/customers/:id',(req, res)=>{
	const cst = customers.find(c=> c.id===parseInt(req.params.id));
	if(!customers)res.status(404).send('<h2 style="font-family: Malgun Gothic; color:darkred;">Ooooooooooops......</h2> ');
	
	const index = customers.indexOf(cst);
	customers.splice(index,1);
	res.send(cst);
});
function validateCustomer(cst){
	const schema={
	title: Joi.string().min(3).required()
   };
   return Joi.validate(cst, schema);
}



const port = process.env.PORT || 8080;

app.listen(port, ()=>console.log('............'));
