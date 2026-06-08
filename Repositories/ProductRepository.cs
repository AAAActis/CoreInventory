public class ProductRepository : IProductRepository
{
    private readonly List<Product> _products;
    private int _nextId;

    public ProductRepository()
    {
        _products = new List<Product>
        {
            new Product { Id = 1, Name = "Laptop",      Price = 999.99m, Description = "A high-performance laptop." },
            new Product { Id = 2, Name = "Smartphone",  Price = 499.99m, Description = "A sleek smartphone with a great camera." },
            new Product { Id = 3, Name = "Headphones",  Price = 199.99m, Description = "Noise-cancelling over-ear headphones." }
        };
        _nextId = 4;
    }

    public IEnumerable<Product> GetAll() => _products;

    public Product? GetById(int id) =>
        _products.FirstOrDefault(p => p.Id == id);

    public void Add(Product product)
    {
        product.Id = _nextId++;
        _products.Add(product);
    }

    public void Update(Product product)
    {
        var existing = _products.FirstOrDefault(p => p.Id == product.Id);
        if (existing is null) return;

        existing.Name        = product.Name;
        existing.Price       = product.Price;
        existing.Description = product.Description;
    }

    public void Delete(int id)
    {
        var product = _products.FirstOrDefault(p => p.Id == id);
        if (product is not null)
            _products.Remove(product);
    }
}
