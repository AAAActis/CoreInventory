using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class CustomersController : ControllerBase
{
    private readonly ICustomerRepository _repository;

    public CustomersController(ICustomerRepository repository)
    {
        _repository = repository;
    }

    // GET /api/customers
    [HttpGet]
    public ActionResult<IEnumerable<Customer>> GetAll()
    {
        var customers = _repository.GetAll();
        return Ok(customers);
    }

    // GET /api/customers/{id}
    [HttpGet("{id}")]
    public ActionResult<Customer> GetById(int id)
    {
        var customer = _repository.GetById(id);
        if (customer is null)
            return NotFound($"No se encontró el cliente con Id {id}.");

        return Ok(customer);
    }

    // POST /api/customers
    [HttpPost]
    public ActionResult<Customer> Create([FromBody] Customer customer)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (string.IsNullOrWhiteSpace(customer.Name))
            return BadRequest("El campo Name es obligatorio.");

        _repository.Add(customer);
        return CreatedAtAction(nameof(GetById), new { id = customer.Id }, customer);
    }

    // PUT /api/customers/{id}
    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Customer customer)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (id != customer.Id)
            return BadRequest("El Id de la ruta no coincide con el Id del cuerpo.");

        var existing = _repository.GetById(id);
        if (existing is null)
            return NotFound($"No se encontró el cliente con Id {id}.");

        _repository.Update(customer);
        return NoContent();
    }

    // DELETE /api/customers/{id}
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var existing = _repository.GetById(id);
        if (existing is null)
            return NotFound($"No se encontró el cliente con Id {id}.");

        _repository.Delete(id);
        return NoContent();
    }
}
