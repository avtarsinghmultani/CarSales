using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarSales.Models
{
    public class Car : Vehicle
    {

        public int BodyTypeID { get; set; }

        public int ModelID { get; set; }

        [Range(2,5), Required]
        public int Doors { get; set; }

        public BodyType BodyType { get; set; }
        public Model Model { get; set; }


    }
}
