﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Core.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string UserName { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        [JsonIgnore]
        public string Password { get; set; }
        public int? EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public string Token { get; set; }
    }
}
