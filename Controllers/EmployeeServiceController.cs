using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SecondCoreApp.Models;
using SecondCoreApp.ViewModels;
using System.Web;
using System.Threading.Tasks;

namespace SecondCoreApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeServiceController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IHostingEnvironment hostingEnvironment;
        private readonly IHttpContextAccessor contextAccessor;

        public EmployeeServiceController(IEmployeeRepository employeeRepository, IHostingEnvironment hostingEnvironment,
                                        IHttpContextAccessor contextAccessor)
        {
            _employeeRepository = employeeRepository;
            this.hostingEnvironment = hostingEnvironment;
            this.contextAccessor = contextAccessor;
        }

        [HttpGet]
        public IEnumerable<Employee> GetEmployees()
        {
            var model = _employeeRepository.GetAllEmployee();
            return model;
        }

        [HttpGet]
        [Route("{id}")]
        public Employee GetEmployee(int id)
        {
            var model = _employeeRepository.GetEmployee(id);
            return model;
        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("CreateEmployee")]
        public IActionResult Create([FromForm]EmployeeCreateViewModel model)
        {
            if (ModelState.IsValid)
            {
                string uniqueFileName = ProcessUploadedFile(model);

                Employee newEmployee = new Employee()
                {
                    Name = model.Name,
                    Email = model.Email,
                    Department = model.Department,
                    PhotoPath = uniqueFileName,
                };

                newEmployee = _employeeRepository.Add(newEmployee);
                return Ok(newEmployee);
            }

            return Ok(new Employee());

        }

        [HttpPut, DisableRequestSizeLimit]
        [Route("EditEmployee/{Id}")]
        public IActionResult EditEmployee(int Id, [FromForm]EmployeeEditViewModel model)
        {
            if (ModelState.IsValid)
            {
                Employee emp = _employeeRepository.GetEmployee(Id);

                emp.Name = model.Name;
                emp.Email = model.Email;
                emp.Department = model.Department;
                if (model.Photo != null)
                {
                    string uniqueFileName = ProcessUploadedFile(model);
                    emp.PhotoPath = uniqueFileName;
                }

                _employeeRepository.Update(emp);

                return Ok(emp);
            }

            return Ok(model);

        }

        [HttpDelete, DisableRequestSizeLimit]
        [Route("DeleteEmployee/{Id}")]
        public IActionResult DeleteEmployee(int Id)
        {

            Employee emp = _employeeRepository.GetEmployee(Id);

            if (emp == null)
            {
                return NotFound(new { Status = false, Message = "No Employee Found with Id: " + Id });
            }


           // _employeeRepository.Delete(Id);

            return Ok(new { Status = true, Message = "Employee Deleted Successfully" });


        }


        private string ProcessUploadedFile(EmployeeCreateViewModel model)
        {
            string uniqueFileName = null;
            if (model.Photo != null)
            {
                string uploadFolder = Path.Combine(hostingEnvironment.WebRootPath, "images");
                uniqueFileName = Guid.NewGuid().ToString() + "_" + model.Photo.FileName;
                string filePath = Path.Combine(uploadFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    model.Photo.CopyTo(fileStream);
                }

            }

            return uniqueFileName;
        }
    }
}