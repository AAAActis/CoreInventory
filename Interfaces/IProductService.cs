public interface IProductService
{
    IEnumerable<Product> GetAll();
    Product? GetById(int id);
    Product Add(Product product);
    void Update(Product product);
    void Delete(int id);
}
