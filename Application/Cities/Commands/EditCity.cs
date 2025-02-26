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
    public class EditCity
    {
        public class Command : IRequest
        {
            public required EditCityDto CityDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var city = await context.Cities.FindAsync([request.CityDto.Id], cancellationToken) 
                    ?? throw new Exception("City does not exist");

                mapper.Map(request.CityDto, city);
                
                await context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}