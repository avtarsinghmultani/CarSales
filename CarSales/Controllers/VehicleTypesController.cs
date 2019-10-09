using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarSales.Data;
using CarSales.Models;

namespace CarSales.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleTypesController : ControllerBase
    {
        private readonly CarSalesDbContext _context;

        public VehicleTypesController(CarSalesDbContext context)
        {
            _context = context;
        }

        // GET: api/VehicleTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleType>>> GetVehicleTypes()
        {
            return await _context.VehicleTypes.Include(v => v.Models).ToListAsync();
        }

        // GET: api/vehicleTypes/6
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleType>> GetVehicleType(int id)
        {
            var vehicleWithModels = await _context.VehicleTypes.Include(v => v.VehicleTypeMakes).ThenInclude(vtm => vtm.Make).FirstOrDefaultAsync(x => x.VehicleTypeID==id);

            if(vehicleWithModels == null)
            {
                return NotFound();
            }
            return vehicleWithModels;

        }

        
    }
}
