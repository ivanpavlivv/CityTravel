using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Cities.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Cities.Commands
{
    public class CreateCity
    {
        public class Command : IRequest<string>
        {
            public required CreateCityDto CityDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, string>
        {
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                var city = mapper.Map<City>(request.CityDto);

                city.CreateDate = DateTime.Now;
                city.UpdateDate = DateTime.Now;

                context.Cities.Add(city);

                await context.SaveChangesAsync(cancellationToken);

                return city.Id;
            }
        }
    }
}