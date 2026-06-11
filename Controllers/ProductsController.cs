using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly IProductService _service;

    public ProductsController(IProductService service)
    {
        _service = service;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Product>> GetAll()
    {
        return Ok(_service.GetAll());
    }

    [HttpGet("{id}")]
    public ActionResult<Product> GetById(int id)
    {
        var product = _service.GetById(id);
        if (product is null)
            return NotFound($"No se encontró el producto con Id {id}.");
        return Ok(product);
    }

    [HttpPost]
    public ActionResult<Product> Create([FromBody] Product product)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        if (string.IsNullOrWhiteSpace(product.Name))
            return BadRequest("El campo Name es obligatorio.");
        var created = _service.Add(product);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Product product)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        if (id != product.Id)
            return BadRequest("El Id de la ruta no coincide con el Id del cuerpo.");
        if (_service.GetById(id) is null)
            return NotFound($"No se encontró el producto con Id {id}.");
        _service.Update(product);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        if (_service.GetById(id) is null)
            return NotFound($"No se encontró el producto con Id {id}.");
        _service.Delete(id);
        return NoContent();
    }
}
