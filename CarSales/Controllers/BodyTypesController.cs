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
    public class BodyTypesController : ControllerBase
    {
        private readonly CarSalesDbContext _context;

        public BodyTypesController(CarSalesDbContext context)
        {
            _context = context;
        }

        // GET: api/BodyTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BodyType>>> GetBodyTypes()
        {
            return await _context.BodyTypes.Include(b => b.Cars).ToListAsync();
        }

        // GET: api/BodyTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BodyType>> GetBodyType(int id)
        {
            var bodyType = await _context.BodyTypes.FindAsync(id);

            if (bodyType == null)
            {
                return NotFound();
            }

            return bodyType;
        }
    }
}
