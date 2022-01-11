using Core.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class EmployeeContextSeed
    {
        public static async Task SeedAsync(EmployeeContext context)
        {
            try
            {
                if (!context.Employees.Any())
                {
                    Employee employee = new Employee()
                    {
                        FirstName = "Anitha",
                        LastName = "Nandam",
                        Email = "nandamanitha.1@gmail.com",
                        MobileNo = "0567611858"
                    };                  
                context.Employees.Add(employee);                    
                await context.SaveChangesAsync();
                }  
                if (!context.Users.Any())
                {
                    User user = new User()
                    {
                       EmployeeId = context.Employees.FirstOrDefault().Id,
                       Password = "P@ssw0rd",
                       Token = "SecurityToken",
                       UserName = "Anitha"
                    };                  
                context.Users.Add(user);                    
                await context.SaveChangesAsync();
                }               
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
