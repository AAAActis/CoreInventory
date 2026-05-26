public class InMemoryProductService
{
    private readonly List<Product> _products;

    public InMemoryProductService()
    {
        _products = new List<Product>
        {
            new Product { Id = 1, Name = "Laptop", Price = 999.99m, Description = "A high-performance laptop." },
            new Product { Id = 2, Name = "Smartphone", Price = 499.99m, Description = "A sleek smartphone with a great camera." },
            new Product { Id = 3, Name = "Headphones", Price = 199.99m, Description = "Noise-cancelling over-ear headphones." }
        };
    }
    
    public List<Product> GetAllProducts()
    {
        return _products;
    }
}