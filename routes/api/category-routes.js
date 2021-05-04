const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll({
			include: {
				model: Product
			}
		}).catch((err) => {
  	res.json(err);
  });
  res.json(categories);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const category = await Category.findByPk(req.params.id, {
  	include:[{model: Product}]
  }).catch((err) => {
  	res.json(err);
  });
  res.json(category);
});

router.post('/', (req, res) => {
  // create a new category
  /* req.body should look like this...
    {
      category_name: "Sporting Goods",
    }
  */
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
   	.catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {where: {category_id: req.params.id}})
  	.then((code) => {
  		code == 1 ? res.status(200).json(code) : res.status(400).json(code);   
  	})
  	.catch((err) => {
  		console.log(err);
  		res.status(400).json(err);
  	});
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({where: {category_id: req.params.id}})
  	.then((code) => {
  		code == 1 ? res.status(200).json(code) : res.status(400).json(code); 
  	})
  	.catch((err) => {
  		console.log(err);
  		res.status(400).json(err);
  	});
});

module.exports = router;
