using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _repository;

    public ProductsController(IProductRepository repository)
    {
        _repository = repository;
    }

    // GET /api/products
    [HttpGet]
    public ActionResult<IEnumerable<Product>> GetAll()
    {
        var products = _repository.GetAll();
        return Ok(products);
    }

    // GET /api/products/{id}
    [HttpGet("{id}")]
    public ActionResult<Product> GetById(int id)
    {
        var product = _repository.GetById(id);
        if (product is null)
            return NotFound($"No se encontró el producto con Id {id}.");

        return Ok(product);
    }

    // POST /api/products
    [HttpPost]
    public ActionResult<Product> Create([FromBody] Product product)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (string.IsNullOrWhiteSpace(product.Name))
            return BadRequest("El campo Name es obligatorio.");

        _repository.Add(product);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    // PUT /api/products/{id}
    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Product product)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (id != product.Id)
            return BadRequest("El Id de la ruta no coincide con el Id del cuerpo.");

        var existing = _repository.GetById(id);
        if (existing is null)
            return NotFound($"No se encontró el producto con Id {id}.");

        _repository.Update(product);
        return NoContent();
    }

    // DELETE /api/products/{id}
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var existing = _repository.GetById(id);
        if (existing is null)
            return NotFound($"No se encontró el producto con Id {id}.");

        _repository.Delete(id);
        return NoContent();
    }
}
