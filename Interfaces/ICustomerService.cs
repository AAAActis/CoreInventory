public interface ICustomerService
{
    IEnumerable<Customer> GetAll();
    Customer? GetById(int id);
    Customer Add(Customer customer);
    void Update(Customer customer);
    void Delete(int id);
}
