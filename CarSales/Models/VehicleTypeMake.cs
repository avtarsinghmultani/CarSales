using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarSales.Models
{
    public class VehicleTypeMake
    {
        public int MakeID { get; set; }
        public Make Make { get; set; }

        public int VehicleTypeID { get; set; }
        public VehicleType VehicleType { get; set; }

    }
}
