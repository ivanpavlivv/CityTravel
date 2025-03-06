using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Cities.Queries
{
    public class GetCityWithDetails
    {
        public class Query : IRequest<Result<City>>
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Query, Result<City>>
        {
            public async Task<Result<City>> Handle(Query request, CancellationToken cancellationToken)
            {
                var city = await context.Cities.Include(x => x.Details)
                    .FirstAsync(x => x.Id == request.Id, cancellationToken);

                if (city == null) return Result<City>.Failure("City not found", 404);

                return Result<City>.Success(city);
            }
        }
    }
}