using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarSales.Models
{
    public abstract class Vehicle
    {
        public int ID { get; set; }

        [DataType(DataType.Date)]
        public DateTime Created { get; set; }

    }
}
