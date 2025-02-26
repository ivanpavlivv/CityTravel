using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Cities.Queries
{
    public class GetCityWithDetails
    {
        public class Query : IRequest<City>
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Query, City>
        {
            public async Task<City> Handle(Query request, CancellationToken cancellationToken)
            {
                var city = await context.Cities.Include(x => x.Details)
                    .FirstAsync(x => x.Id == request.Id, cancellationToken) 
                        ?? throw new Exception("City does not exist");

                return city;
            }
        }
    }
}