const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tags = await Tag.findAll({
			include: {
				model: Product
			}
		}).catch((err) => {
  	res.json(err);
  });
  res.json(tags);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tag = await Tag.findByPk(req.params.id, {
  	include:[{model: Product}]
  }).catch((err) => {
  	res.json(err);
  });
  res.json(tag);
});

router.post('/', (req, res) => {
  // create a new tag
  /* req.body should look like this...
    {
      tag_name: "sports",
    }
  */
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
   	.catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {where: {tag_id: req.params.id}})
  	.then((code) => {
  		code == 1 ? res.status(200).json(code) : res.status(400).json(code);   
  	})
  	.catch((err) => {
  		console.log(err);
  		res.status(400).json(err);
  	});
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({where: {tag_id: req.params.id}})
  	.then((code) => {
  		code == 1 ? res.status(200).json(code) : res.status(400).json(code); 
  	})
  	.catch((err) => {
  		console.log(err);
  		res.status(400).json(err);
  	});
});

module.exports = router;
