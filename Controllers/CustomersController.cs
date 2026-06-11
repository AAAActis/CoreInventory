using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class CustomersController : ControllerBase
{
    private readonly ICustomerService _service;

    public CustomersController(ICustomerService service)
    {
        _service = service;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Customer>> GetAll()
    {
        return Ok(_service.GetAll());
    }

    [HttpGet("{id}")]
    public ActionResult<Customer> GetById(int id)
    {
        var customer = _service.GetById(id);
        if (customer is null)
            return NotFound($"No se encontró el cliente con Id {id}.");
        return Ok(customer);
    }

    [HttpPost]
    public ActionResult<Customer> Create([FromBody] Customer customer)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        if (string.IsNullOrWhiteSpace(customer.Name))
            return BadRequest("El campo Name es obligatorio.");
        var created = _service.Add(customer);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Customer customer)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        if (id != customer.Id)
            return BadRequest("El Id de la ruta no coincide con el Id del cuerpo.");
        if (_service.GetById(id) is null)
            return NotFound($"No se encontró el cliente con Id {id}.");
        _service.Update(customer);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        if (_service.GetById(id) is null)
            return NotFound($"No se encontró el cliente con Id {id}.");
        _service.Delete(id);
        return NoContent();
    }
}
