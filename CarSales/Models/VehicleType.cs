using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CarSales.Models
{
    public class VehicleType
    {
        public int VehicleTypeID { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Vehicle Type Name cann't be longet than 50 characters")]
        [Display(Name = "Vehicle Type")]
        public string Name { get; set; }

        public ICollection<Model> Models { get; set; }

        public ICollection<VehicleTypeMake> VehicleTypeMakes { get; set; }



    }
}
