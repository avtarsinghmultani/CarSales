using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarSales.Models
{
    public class Make
    {
        public int MakeID { get; set; }
       
        [Required]
        [StringLength(50, ErrorMessage ="Make Name cann't be longet than 50 characters")]
        [Display(Name="Make")]
        public string Name { get; set; }

        public ICollection<Model> Models { get; set; }

        public ICollection<VehicleTypeMake> VehicleTypeMakes { get; set; }


    }
}
