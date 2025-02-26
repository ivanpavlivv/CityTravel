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
    public class GetCityList
    {
        public class Query : IRequest<List<City>> { }

        public class Handler(AppDbContext context) : IRequestHandler<Query, List<City>>
        {
            public async Task<List<City>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Cities.ToListAsync(cancellationToken);
            }
        }
    }
}