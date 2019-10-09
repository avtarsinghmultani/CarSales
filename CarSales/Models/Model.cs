using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarSales.Models
{
    public class Model
    {
        public int ModelID { get; set; }

        

        [Required]
        [StringLength(50, ErrorMessage = "Model Name cann't be longet than 50 characters")]
        [Display(Name = "Model")]
        public string Name { get; set; }

        public int MakeID { get; set; }
        public Make Make { get; set; }

        public int VehicleTypeID { get; set; }
        public VehicleType VehicleType { get; set; }
        public ICollection<Car> Cars { get; set; }



    }
}
