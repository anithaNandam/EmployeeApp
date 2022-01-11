using API.Controllers;
using Core.Entities;
using Core.Interfaces;
using Moq;
using System;
using System.Collections.Generic;
using Xunit;

namespace EmployeeTest
{
    public class EmployeeUnitTest
    {

        public Mock<IEmployeeRepository> _employeeRepomock = new Mock<IEmployeeRepository>();

        [Fact]
        public async void Should_GetEmployeebyId()
        {
            Employee employeeDto = new Employee
            {
                Id = 1,
                FirstName = "Test",
                LastName = "Sample",
                Email = "Test@gmail.com",
                MobileNo = "9874563214"
            };
            _employeeRepomock.Setup(p => p.GetEmployeeById(1)).ReturnsAsync(employeeDto);
            EmployeeController emp = new EmployeeController(_employeeRepomock.Object);
            var result = await emp.Get(1);
            Assert.Equal(employeeDto.FirstName, ((Core.Entities.Employee)((Microsoft.AspNetCore.Mvc.ObjectResult)result.Result).Value).FirstName);
        }
        [Fact]
        public async void Should_GetAllEmployeesList()
        {
            List<Employee> employeeList = new List<Employee>()
            {
                new Employee{
                Id = 1,
                FirstName = "Test",
                LastName = "Sample",
                Email = "Test@gmail.com",
                MobileNo = "9874563214"
                },new Employee
                {
                Id = 2,
                FirstName = "Test1",
                LastName = "Sample1",
                Email = "Test1@gmail.com",
                MobileNo = "9987458758"
                }
            };

            IEnumerable<Employee> employeeDto = employeeList;
            _employeeRepomock.Setup(p => p.GetEmployeeList()).ReturnsAsync(employeeDto);
            EmployeeController emp = new EmployeeController(_employeeRepomock.Object);
            var result = await emp.Get();
            Assert.True(employeeDto.Equals(result));
        }
        [Fact]
        public async void Should_CreateEmployee()
        {
            Employee employeeDto = new Employee
            {
                Id = 3,
                FirstName = "Test3",
                LastName = "Sample3",
                Email = "Test3@gmail.com",
                MobileNo = "2323232333"
            };
            _employeeRepomock.Setup(p => p.CreateEmployee(employeeDto)).ReturnsAsync(employeeDto);
            EmployeeController emp = new EmployeeController(_employeeRepomock.Object);
            var result = await emp.Post(employeeDto);
            Assert.Equal(employeeDto.FirstName, ((Core.Entities.Employee)((Microsoft.AspNetCore.Mvc.ObjectResult)result.Result).Value).FirstName);
        }
        [Fact]
        public async void Should_UpdateEmployee()
        {
            Employee employeeDto = new Employee
            {
                Id = 3,
                FirstName = "Test3",
                LastName = "Sample3",
                Email = "Test3@gmail.com",
                MobileNo = "2323232333"
            };
            _employeeRepomock.Setup(p => p.UpdateEmployee(employeeDto));
            EmployeeController emp = new EmployeeController(_employeeRepomock.Object);
            var result = await emp.Put(3,employeeDto);
            Assert.NotNull(result);
        }
        [Fact]
        public async void Should_DeleteEmployee()
        {
            Employee employeeDto = new Employee
            {
                Id = 3,
                FirstName = "Test3",
                LastName = "Sample3",
                Email = "Test3@gmail.com",
                MobileNo = "2323232333"
            };
            
            _employeeRepomock.Setup(p => p.GetEmployeeById(3)).ReturnsAsync(employeeDto); 
            _employeeRepomock.Setup(p => p.DeleteEmployee(employeeDto));
            EmployeeController emp = new EmployeeController(_employeeRepomock.Object);
            var result = await emp.Delete(3);
            Assert.NotNull(result);
        }

    }
}
