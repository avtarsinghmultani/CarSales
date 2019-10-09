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
    public class MakesController : ControllerBase
    {
        private readonly CarSalesDbContext _context;

        public MakesController(CarSalesDbContext context)
        {
            _context = context;
        }

        // GET: api/Makes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Make>>> GetMakes()
        {
           
            return await _context.Makes.ToListAsync();
        }

        // GET: api/Makes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Make>> GetMake(int id)
        {
            var make = await _context.Makes.Include(m => m.Models).FirstOrDefaultAsync(m => m.MakeID == id);

            if (make == null)
            {
                return NotFound();
            }

            return make;
        }
    }
}
