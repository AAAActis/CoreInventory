public class CustomerService : ICustomerService
{
    private readonly ICustomerRepository _repository;

    public CustomerService(ICustomerRepository repository)
    {
        _repository = repository;
    }

    public IEnumerable<Customer> GetAll() => _repository.GetAll();

    public Customer? GetById(int id) => _repository.GetById(id);

    public Customer Add(Customer customer)
    {
        _repository.Add(customer);
        return customer;
    }

    public void Update(Customer customer) => _repository.Update(customer);

    public void Delete(int id) => _repository.Delete(id);
}
