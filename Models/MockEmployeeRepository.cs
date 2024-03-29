﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SecondCoreApp.Models
{
    public class MockEmployeeRepository : IEmployeeRepository
    {
        private List<Employee> _employeeList;
        public MockEmployeeRepository()
        {
            _employeeList = new List<Employee>() {
                                new Employee() { Id = 1, Name = "Mary", Department = Dept.HR, Email = "mary@pragimtech.com" },
                                new Employee() { Id = 2, Name = "John", Department = Dept.IT, Email = "john@pragimtech.com" },
                                new Employee() { Id = 3, Name = "Sam", Department = Dept.Payroll, Email = "sam@pragimtech.com" },
                                };
        }

        public Employee GetEmployee(int Id)
        {
            return this._employeeList.FirstOrDefault(e => e.Id == Id);
        }

        public IEnumerable<Employee> GetAllEmployee()
        {
            return _employeeList;
        }

        public Employee Add(Employee emp)
        {
            emp.Id = _employeeList.Max(x => x.Id) + 1;
            _employeeList.Add(emp);
            return emp;
        }

        public Employee Update(Employee employee)
        {
            Employee emp = _employeeList.FirstOrDefault(x => x.Id == employee.Id);
            if (employee != null)
            {
                emp.Name = employee.Name;
                emp.Email = employee.Email;
                emp.Department = employee.Department;
            }

            return emp;
        }

        public Employee Delete(int id)
        {
            Employee employee=_employeeList.FirstOrDefault(x => x.Id == id);
            if(employee != null)
            {
                _employeeList.Remove(employee);
            }
            return employee;
        }
    }
}
