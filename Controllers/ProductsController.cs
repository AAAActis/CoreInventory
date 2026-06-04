using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly InMemoryProductService _productService;

    public ProductsController(InMemoryProductService productService)
    {
        _productService = productService;
    }

    [HttpGet ("enpu")]
    public ActionResult<List<Product>> Get()
    {
        var products = _productService.GetAllProducts();
        return Ok(products);
    }
}