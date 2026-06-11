public class CustomerRepository : ICustomerRepository
{
    private readonly AppDbContext _context;

    public CustomerRepository(AppDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Customer> GetAll() => _context.Customers.ToList();

    public Customer? GetById(int id) => _context.Customers.Find(id);

    public void Add(Customer customer)
    {
        _context.Customers.Add(customer);
        _context.SaveChanges();
    }

    public void Update(Customer customer)
    {
        _context.Customers.Update(customer);
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var customer = _context.Customers.Find(id);
        if (customer is not null)
        {
            _context.Customers.Remove(customer);
            _context.SaveChanges();
        }
    }
}
