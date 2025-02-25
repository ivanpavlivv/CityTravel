using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class CitiesController(AppDbContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<City>>> GetCities()
        {
            return await context.Cities.Include(x => x.Details).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<City>> GetCityWithDetails(string id)
        {
            var city = await context.Cities.Include(x => x.Details).FirstAsync(x => x.Id == id);

            if (city == null) return NotFound();

            return city;
        }
    }
}