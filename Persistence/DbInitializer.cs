using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bogus;
using Domain;
using Microsoft.VisualBasic;

namespace Persistence
{

    public class DbInitializer
    {
        public static async Task SeedData(AppDbContext context)
        {
            if (context.Cities.Any()) return;

            var cities = new List<City>();
            var citiesDetails = new List<CityDetails>();

            cities.AddRange(new CityFaker().Generate(7));

            foreach (var city in cities)
            {
                citiesDetails.Add(city.Details!);
            }

            context.Cities.AddRange(cities);
            context.CitiesDetails.AddRange(citiesDetails);
            await context.SaveChangesAsync();
        }
    }

    public class CityFaker : Faker<City>
    {
        string id = Guid.NewGuid().ToString();
        public CityFaker()
        {
            RuleFor(c => c.Id, _ => id = Guid.NewGuid().ToString());
            RuleFor(c => c.Name, f => f.Address.City());
            RuleFor(c => c.Description, f => f.Lorem.Sentence());
            RuleFor(c => c.Latitude, f => f.Address.Latitude());
            RuleFor(c => c.Longitude, f => f.Address.Longitude());
            RuleFor(c => c.CreateDate, _ => DateTime.Now);
            RuleFor(c => c.UpdateDate, _ => DateTime.Now);
            RuleFor(c => c.Details, _ => new CityDetailsFaker(id).Generate());
        }
    }

    public class CityDetailsFaker : Faker<CityDetails>
    {
        public CityDetailsFaker(string id)
        {
            RuleFor(d => d.CostOfFood, f => f.Random.Number(100));
            RuleFor(d => d.TaxiCost, f => f.Random.Number(100));
            RuleFor(d => d.ApartmentCost, f => f.Random.Number(100));
            RuleFor(d => d.RentCost, f => f.Random.Number(100));
            RuleFor(d => d.CityId, _ => id);
            RuleFor(d => d.CreateDate, _ => DateTime.Now);
            RuleFor(d => d.UpdateDate, _ => DateTime.Now);
        }
    }
}