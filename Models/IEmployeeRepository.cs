using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SecondCoreApp.Models
{
    public interface IEmployeeRepository
    {
        IEnumerable<Employee> GetAllEmployee();
        Employee GetEmployee(int id);

        Employee Add(Employee emp);
        Employee Update(Employee employee);
        Employee Delete(int id);
    }
}
