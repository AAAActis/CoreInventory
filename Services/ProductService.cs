public class ProductService : IProductService
{
    private readonly IProductRepository _repository;

    public ProductService(IProductRepository repository)
    {
        _repository = repository;
    }

    public IEnumerable<Product> GetAll() => _repository.GetAll();

    public Product? GetById(int id) => _repository.GetById(id);

    public Product Add(Product product)
    {
        _repository.Add(product);
        return product;
    }

    public void Update(Product product) => _repository.Update(product);

    public void Delete(int id) => _repository.Delete(id);
}
