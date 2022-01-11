using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Core.Interfaces;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace API.Controllers
{
    public class EmployeeController : BaseApiController
    {
        private readonly IEmployeeRepository _employeeRepo;

        public EmployeeController(IEmployeeRepository employeeRepo)
        {
            _employeeRepo = employeeRepo;
        }
        /// <summary>
        /// Get All Employees List
        /// </summary>
        /// <returns></returns>
        /// <response code="200">If response success</response>
        /// <response code="400">If response is null</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IEnumerable<Employee>> Get()
        {
            return await _employeeRepo.GetEmployeeList();
        }
        /// <summary>
        /// Get Employee record by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Employee>> Get(int id)
        {
            var employee = await _employeeRepo.GetEmployeeById(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }
       /// <summary>
       /// Create new employee
       /// </summary>
       /// <param name="employee"></param>
       /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Employee>> Post(Employee employee)
        {
            await _employeeRepo.CreateEmployee(employee);
            return CreatedAtAction("Post", new { id = employee.Id }, employee);
        }
       /// <summary>
       /// Update the existing employee record
       /// </summary>
       /// <param name="id"></param>
       /// <param name="employee"></param>
       /// <returns></returns>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Put(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest("Not a valid employee id");
            }
            await _employeeRepo.UpdateEmployee(employee);
            return NoContent();
        }
        /// <summary>
        /// Delete the employee by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid employee id");

            var employee = await _employeeRepo.GetEmployeeById(id);
            if (employee == null)
            {
                return NotFound();
            }
            await _employeeRepo.DeleteEmployee(employee);
            return NoContent();
        }
    }
}
