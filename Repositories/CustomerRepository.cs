public class CustomerRepository : ICustomerRepository
{
    private readonly List<Customer> _customers;
    private int _nextId;

    public CustomerRepository()
    {
        _customers = new List<Customer>
        {
            new Customer { Id = 1, Name = "Juan Pérez",   Email = "juan@example.com",  Phone = "123-456-7890" },
            new Customer { Id = 2, Name = "María García", Email = "maria@example.com", Phone = "098-765-4321" }
        };
        _nextId = 3;
    }

    public IEnumerable<Customer> GetAll() => _customers;

    public Customer? GetById(int id) =>
        _customers.FirstOrDefault(c => c.Id == id);

    public void Add(Customer customer)
    {
        customer.Id = _nextId++;
        _customers.Add(customer);
    }

    public void Update(Customer customer)
    {
        var existing = _customers.FirstOrDefault(c => c.Id == customer.Id);
        if (existing is null) return;

        existing.Name  = customer.Name;
        existing.Email = customer.Email;
        existing.Phone = customer.Phone;
    }

    public void Delete(int id)
    {
        var customer = _customers.FirstOrDefault(c => c.Id == id);
        if (customer is not null)
            _customers.Remove(customer);
    }
}
