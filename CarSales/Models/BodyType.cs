using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarSales.Models
{
    public class BodyType
    {
        public int BodyTypeID { get; set; }
        [Required]
        [StringLength(50, ErrorMessage = "Body Type cann't be longet than 50 characters")]
        [Display(Name = "Body Type")]
        public string Name { get; set; }

        public ICollection<Car> Cars { get; set; }

    }
}
